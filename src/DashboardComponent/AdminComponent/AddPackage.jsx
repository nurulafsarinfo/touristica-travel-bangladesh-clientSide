import React, { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AddPackage = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            plan: [{ day: 1, activity: '', description: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "plan"
    });

    const [imageUrls, setImageUrls] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    // Handles image selection and uploads them to ImgBB
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setIsUploading(true);
        const uploadPromises = files.map(file => {
            const formData = new FormData();
            formData.append('image', file);
            return axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, formData);
        });

        try {
            const responses = await Promise.all(uploadPromises);
            const newUrls = responses.map(res => res.data.data.url);
            setImageUrls(prev => [...prev, ...newUrls]);
        } catch (error) {
            console.error("Image upload failed:", error);
            Swal.fire('Error', 'Image upload failed. Please try again.', 'error');
        } finally {
            setIsUploading(false);
        }
    };
    
    // Removes an uploaded image from the preview list
    const handleRemoveImage = (indexToRemove) => {
        setImageUrls(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    // Mutation for submitting the new package
    const { mutate, isPending } = useMutation({
        mutationFn: async (packageData) => {
            const { data } = await axiosSecure.post('/packages', packageData);
            return data;
        },
        onSuccess: (data) => {
            if (data.insertedId) {
                Swal.fire('Success!', 'New package has been added.', 'success');
                reset();
                setImageUrls([]);
                queryClient.invalidateQueries({ queryKey: ['packages'] });
            }
        },
        onError: (error) => {
            console.error("Failed to add package:", error);
            Swal.fire('Error', 'Failed to add the package.', 'error');
        }
    });

    const onSubmit = (data) => {
        if (imageUrls.length === 0) {
            Swal.fire('Validation Error', 'Please upload at least one image for the package.', 'warning');
            return;
        }

        const packageData = {
            ...data,
            images: imageUrls,
            price: parseFloat(data.price),
            duration: parseInt(data.duration),
            rating: parseFloat(data.rating),
        };
        
        mutate(packageData);
    };

    return (
        <div className="bg-gray-50 p-4 sm:p-8 min-h-screen">
            <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white shadow-lg rounded-xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">Add New Tour Package</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Basic Package Information */}
                    <fieldset className="border p-6 rounded-lg space-y-4">
                        <legend className="text-lg font-semibold px-2 text-gray-700">Basic Information</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="label"><span className="label-text">Package Title</span></label>
                                <input {...register("title", { required: "Title is required." })} placeholder="e.g., Cox's Bazar Beach Holiday" className="input input-bordered w-full" />
                                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                            </div>
                            <div>
                                <label className="label"><span className="label-text">Tour Type</span></label>
                                <input {...register("type", { required: "Type is required." })} placeholder="e.g., Adventure, Historical" className="input input-bordered w-full" />
                                {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="label"><span className="label-text">Description</span></label>
                            <textarea {...register("description", { required: "Description is required." })} placeholder="Detailed description of the tour..." className="textarea textarea-bordered w-full" rows="4"></textarea>
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                             <div>
                                <label className="label"><span className="label-text">Price (BDT)</span></label>
                                <input type="number" {...register("price", { required: "Price is required.", valueAsNumber: true })} placeholder="e.g., 8200" className="input input-bordered w-full" />
                                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                            </div>
                            <div>
                                <label className="label"><span className="label-text">Duration (Days)</span></label>
                                <input type="number" {...register("duration", { required: "Duration is required.", valueAsNumber: true })} placeholder="e.g., 3" className="input input-bordered w-full" />
                                {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>}
                            </div>
                            <div>
                                <label className="label"><span className="label-text">Location</span></label>
                                <input {...register("location", { required: "Location is required." })} placeholder="e.g., Naogaon & Bogura" className="input input-bordered w-full" />
                                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>}
                            </div>
                            <div>
                                <label className="label"><span className="label-text">Rating (1-5)</span></label>
                                <input type="number" step="0.1" {...register("rating", { required: "Rating is required.", min: 1, max: 5, valueAsNumber: true })} placeholder="e.g., 4.2" className="input input-bordered w-full" />
                                {errors.rating && <p className="text-red-500 text-xs mt-1">Rating must be between 1 and 5.</p>}
                            </div>
                        </div>
                    </fieldset>

                    {/* Image Upload Section */}
                    <fieldset className="border p-6 rounded-lg">
                        <legend className="text-lg font-semibold px-2 text-gray-700">Package Images</legend>
                        <div>
                            <label className="label"><span className="label-text">Select one or more images</span></label>
                            <input type="file" multiple onChange={handleImageUpload} className="file-input file-input-bordered w-full" accept="image/*" disabled={isUploading} />
                        </div>
                        {isUploading && <div className="text-center my-2"><span className="loading loading-spinner text-primary"></span><p>Uploading images...</p></div>}
                        {imageUrls.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold mb-2">Image Previews:</h4>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                    {imageUrls.map((url, index) => (
                                        <div key={index} className="relative group">
                                            <img src={url} alt={`Preview ${index}`} className="w-full h-24 object-cover rounded-lg shadow-md" />
                                            <button type="button" onClick={() => handleRemoveImage(index)} className="btn btn-xs btn-circle btn-error absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </fieldset>

                    {/* Tour Plan Section */}
                    <fieldset className="border p-6 rounded-lg">
                        <legend className="text-lg font-semibold px-2 text-gray-700">Tour Plan</legend>
                        <div className="space-y-4">
                            {fields.map((item, index) => (
                                <div key={item.id} className="p-4 border rounded-md relative">
                                    <h4 className="font-semibold mb-2">Day {index + 1}</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input {...register(`plan.${index}.day`)} type="hidden" value={index + 1} />
                                        <input {...register(`plan.${index}.activity`, { required: true })} placeholder="Activity (e.g., Exploration)" className="input input-bordered w-full" />
                                        <textarea {...register(`plan.${index}.description`, { required: true })} placeholder="Day's description..." className="textarea textarea-bordered w-full md:col-span-2" rows="2"></textarea>
                                    </div>
                                    {index > 0 && (
                                        <button type="button" onClick={() => remove(index)} className="btn btn-sm btn-circle btn-outline btn-error absolute top-2 right-2">✕</button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={() => append({ day: fields.length + 1, activity: '', description: '' })} className="btn btn-outline btn-primary mt-4">
                            Add Another Day
                        </button>
                    </fieldset>

                    <button type="submit" disabled={isPending || isUploading} className="btn btn-primary w-full text-lg">
                        {isPending ? 'Submitting...' : 'Add Package'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddPackage;
