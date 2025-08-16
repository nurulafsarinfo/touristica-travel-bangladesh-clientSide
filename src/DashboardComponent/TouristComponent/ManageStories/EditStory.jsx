import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import axios from 'axios';
import LoadingSpinner from '../../../Components/Shared/LoadingSpinner';

const EditStory = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset } = useForm();

    const [imagesToRemove, setImagesToRemove] = useState([]);
    const [newImagePreviews, setNewImagePreviews] = useState([]);
    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

    const { data: storyData, isLoading } = useQuery({
        queryKey: ['story', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/stories/${id}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (storyData) {
            reset(storyData);
        }
    }, [storyData, reset]);

    const { mutate: updateStory, isPending } = useMutation({
        mutationFn: async (formData) => {
            return await axiosSecure.patch(`/stories/${id}`, formData);
        },
        onSuccess: () => {
            Swal.fire('Updated!', 'Your story has been updated.', 'success');
            queryClient.invalidateQueries({ queryKey: ['stories', user?.email] });
            queryClient.invalidateQueries({ queryKey: ['story', id] });
            navigate('/dashboard/manage-stories');
        },
        onError: (error) => {
            console.error("Update failed:", error);
            Swal.fire('Error!', 'Failed to update the story.', 'error');
        }
    });

    const uploadImageToImgbb = async (imageFile) => {
        const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData);
        return response.data.data.url;
    };

    const handleAddNewImages = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const currentPreviews = [];

        for (const file of files) {
            currentPreviews.push(URL.createObjectURL(file));

            try {
                const uploadedUrl = await uploadImageToImgbb(file);
                setUploadedImageUrls(prev => [...prev, uploadedUrl]);
            } catch (err) {
                console.error('Image upload failed:', err);
            }
        }

        setNewImagePreviews(prev => [...prev, ...currentPreviews]);
        e.target.value = null;
    };

    const handleRemoveExistingImage = (imageUrl) => {
        setImagesToRemove(prev => [...prev, imageUrl]);
    };

    const handleRemoveNewImage = (indexToRemove) => {
        setNewImagePreviews(prev => {
            URL.revokeObjectURL(prev[indexToRemove]);
            return prev.filter((_, i) => i !== indexToRemove);
        });

        setUploadedImageUrls(prev => prev.filter((_, i) => i !== indexToRemove));
    };

    const onSubmit = (data) => {
        const payload = {
            title: data.title,
            storyText: data.storyText,
            imagesToRemove,
            newImageUrls: uploadedImageUrls
        };

        updateStory(payload);
    };

    if (isLoading) return <LoadingSpinner/>;

    return (
        <div className='p-4 sm:p-8'>
            <h1 className='text-3xl font-bold mb-8 text-center sm:text-left'>Edit Your Story</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6 max-w-4xl mx-auto'>

                {/* Title */}
                <div>
                    <label className="label"><span className="label-text">Title</span></label>
                    <input {...register('title')} className='input input-bordered w-full' />
                </div>

                {/* Story Text */}
                <div>
                    <label className="label"><span className="label-text">Story</span></label>
                    <textarea {...register('storyText')} className='textarea textarea-bordered w-full' rows="6" />
                </div>

                {/* Existing Images */}
                {storyData?.images && (
                    <div>
                        <label className="label"><span className="label-text">Existing Images (click ✕ to remove)</span></label>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                            {storyData.images.map((img, index) => (
                                !imagesToRemove.includes(img) && (
                                    <div key={index} className='relative group'>
                                        <img src={img} alt={`Story image ${index + 1}`} className='w-full h-32 object-cover rounded-lg shadow-sm' />
                                        <button
                                            type='button'
                                            onClick={() => handleRemoveExistingImage(img)}
                                            className='btn btn-xs btn-circle btn-error absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                                            ✕
                                        </button>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                )}

                {/* Add New Images */}
                <div>
                    <label className="label"><span className="label-text">Add New Photos</span></label>
                    <input type="file" multiple onChange={handleAddNewImages} className='file-input file-input-bordered w-full' />
                </div>

                {/* Preview New Images */}
                {newImagePreviews.length > 0 && (
                    <div>
                        <label className="label"><span className="label-text">New Images to Add</span></label>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                            {newImagePreviews.map((src, index) => (
                                <div key={index} className='relative group'>
                                    <img src={src} alt={`Preview ${index}`} className='w-full h-32 object-cover rounded-lg shadow-sm' />
                                    <button
                                        type='button'
                                        onClick={() => handleRemoveNewImage(index)}
                                        className='btn btn-xs btn-circle btn-error absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity'>
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button type='submit' disabled={isPending} className='btn btn-primary w-full mt-4'>
                    {isPending ? 'Updating...' : 'Update Story'}
                </button>
            </form>
        </div>
    );
};

export default EditStory;
