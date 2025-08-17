import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxios from '../../Hooks/useAxios';
import useAuth from '../../Hooks/useAuth';

const Add_Story = () => {
    const {user}  = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPost = useAxios();
    // State for the actual File objects to be submitted
    const [imageFiles, setImageFiles] = useState([]);
    // State for the preview URLs
    const [imagePreviews, setImagePreviews] = useState([]);
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // This function now correctly ADDS new images to the existing list
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        const newFiles = [];
        const newPreviews = [];

        files.forEach(file => {
            newFiles.push(file);
            newPreviews.push(URL.createObjectURL(file));
        });

        // Append new files and previews to the existing state arrays
        setImageFiles(prevFiles => [...prevFiles, ...newFiles]);
        setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
    };


    
    // Function to remove an image from the preview and the file list
    const handleRemoveImage = (indexToRemove) => {
        // Remove from the File list
        setImageFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
        // Remove from the Preview list
        setImagePreviews(prevPreviews => {
            // Revoke the object URL to free up memory before removing it
            URL.revokeObjectURL(prevPreviews[indexToRemove]);
            return prevPreviews.filter((_, index) => index !== indexToRemove);
        });
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);

        // Check if any images have been selected using our state
        if (imageFiles.length === 0) {
            Swal.fire('Error', 'Please select at least one image.', 'error');
            setIsSubmitting(false);
            return; 
        }

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('storyText', data.storyText);
        formData.append('authorName', user?.email)

        // Append images from our manually managed state
        for (const file of imageFiles) {
            formData.append('images', file);
        }

        try {
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            
            // Simulate API call
            const response = await axiosPost.post('/stories', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if(response.data.insertedId) {
                Swal.fire('Success!', "Your story has been published.", 'success');
                reset();
                setImageFiles([]); // Clear the file state
                setImagePreviews([]); // Clear the preview state
                navigate('/dashboard/manage-stories');
            } else {
                Swal.fire('Error', "Something went wrong on the server.", 'error');
            }
        } catch (error) {
            console.error('Failed to submit story:', error);
            Swal.fire('Error', "Failed to publish story. Please try again.", 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className=" min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-medium text-[#263a88]">Share Your Adventure</h2>
                    <p className="text-gray-500 mt-2">Let the world know about your amazing experiences.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Story Title and Story Content inputs remain the same... */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-[#263a88] mb-1">Story Title</label>
                        <input
                            type="text"
                            {...register("title", { required: "Title is required." })}
                            className={`w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                            placeholder="e.g., A Magical Trip to Saint Martin's"
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="storyText" className="block text-sm font-medium text-[#263a88] mb-1">Your Story</label>
                        <textarea
                            id="storyText"
                            {...register("storyText", { required: "Story content cannot be empty." })}
                            rows="8"
                            className={`w-full px-4 py-2 border ${errors.storyText ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
                            placeholder="Describe your journey..."
                        ></textarea>
                        {errors.storyText && <p className="text-red-500 text-xs mt-1">{errors.storyText.message}</p>}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-[#263a88] mb-2">Upload Photos</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" /* ...svg path... */ ></svg>
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                        <span>Upload files</span>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            className="sr-only"
                                            multiple
                                            accept="image/*"
                                            // We don't register this with RHF because we manage its state manually
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>

                    {/* Image Previews with Remove Button */}
                    {imagePreviews.length > 0 && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Images:</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {imagePreviews.map((src, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={src}
                                            alt={`preview ${index}`}
                                            className="h-28 w-full object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 leading-none opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Remove image"
                                        >
                                            &#x2715;
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {isSubmitting ? 'Publishing...' : 'Publish Story'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Add_Story;
