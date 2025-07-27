// import React, { useState } from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import { useNavigate } from 'react-router';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';

// // --- Main AddStory Component ---
// const AddStory = () => {
//     const navigate = useNavigate();
//     const axiosSecure = useAxiosSecure();
//     const queryClient = useQueryClient();

//     const [imageFiles, setImageFiles] = useState([]); // State to hold File objects for preview

//     const {
//         register,
//         handleSubmit,
//         control,
//         reset,
//         formState: { errors },
//     } = useForm({
//         defaultValues: {
//             title: '',
//             storyText: '',
//             images: null,
//         }
//     });

//     // Mutation using Tanstack Query for submitting the form data
//     const { mutate, isPending } = useMutation({
//         mutationFn: async (storyData) => {
//             const formData = new FormData();
//             formData.append('title', storyData.title);
//             formData.append('storyText', storyData.storyText);
//             // Append all selected image files
//             for (const image of storyData.images) {
//                 formData.append('images', image);
//             }
//             const { data } = await axiosSecure.post('/stories', formData);
//             return data;
//         },
//         onSuccess: () => {
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Story Published!',
//                 text: 'Your story has been successfully shared.',
//                 timer: 2000,
//                 showConfirmButton: false,
//             });
//             queryClient.invalidateQueries({ queryKey: ['stories'] }); // Invalidate stories query to refetch
//             reset();
//             setImageFiles([]);
//             navigate('/dashboard/manage-stories');
//         },
//         onError: (err) => {
//             console.error('Failed to submit story:', err);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Submission Failed',
//                 text: 'Something went wrong. Please try again.',
//             });
//         }
//     });

//     // Handles the form submission
//     const onSubmit = (data) => {
//         if (imageFiles.length === 0) {
//             // This is a fallback, RHF validation should handle it
//             return;
//         }
//         // Pass form data along with the actual image files to the mutation
//         mutate({ ...data, images: imageFiles });
//     };

//     // Handles file selection and updates the preview state
//     const handleImageChange = (e) => {
//         if (e.target.files) {
//             const newFiles = Array.from(e.target.files);
//             setImageFiles(prevImages => [...prevImages, ...newFiles]);
//         }
//     };

//     // Removes an image from the preview list
//     const handleRemoveImage = (indexToRemove) => {
//         setImageFiles(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
//     };

//     return (
//         <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
//             <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
//                 <div className="text-center mb-8">
//                     <h2 className="text-3xl font-bold text-[#263a88]">Share Your Adventure</h2>
//                     <p className="text-gray-500 mt-2">Let the world know about your amazing experiences.</p>
//                 </div>

//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                     {/* Story Title */}
//                     <div>
//                         <label htmlFor="title" className="block text-sm font-medium text-[#263a88] mb-1">
//                             Story Title
//                         </label>
//                         <input
//                             type="text"
//                             id="title"
//                             {...register("title", { required: "Title is required." })}
//                             className={`w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
//                             placeholder="e.g., A Magical Trip to Saint Martin's"
//                         />
//                         {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
//                     </div>

//                     {/* Story Content */}
//                     <div>
//                         <label htmlFor="storyText" className="block text-sm font-medium text-[#263a88] mb-1">
//                             Your Story
//                         </label>
//                         <textarea
//                             id="storyText"
//                             {...register("storyText", { required: "Story content cannot be empty." })}
//                             rows="8"
//                             className={`w-full px-4 py-2 border ${errors.storyText ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
//                             placeholder="Describe your journey, the sights you saw, and the feelings you felt..."
//                         ></textarea>
//                         {errors.storyText && <p className="text-red-500 text-xs mt-1">{errors.storyText.message}</p>}
//                     </div>

//                     {/* Image Upload */}
//                     <div>
//                         <label className="block text-sm font-medium text-[#263a88] mb-2">
//                             Upload Photos
//                         </label>
//                         <Controller
//                             name="images"
//                             control={control}
//                             rules={{ validate: () => imageFiles.length > 0 || "At least one image is required." }}
//                             render={({ field }) => (
//                                 <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${errors.images ? 'border-red-500' : 'border-gray-300'} border-dashed rounded-md`}>
//                                     <div className="space-y-1 text-center">
//                                         <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
//                                             <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                                         </svg>
//                                         <div className="flex text-sm text-gray-600">
//                                             <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
//                                                 <span>Upload files</span>
//                                                 <input
//                                                     id="file-upload"
//                                                     type="file"
//                                                     className="sr-only"
//                                                     multiple
//                                                     accept="image/*"
//                                                     onChange={(e) => {
//                                                         field.onChange(e.target.files); // Update RHF state
//                                                         handleImageChange(e); // Update preview state
//                                                     }}
//                                                 />
//                                             </label>
//                                             <p className="pl-1">or drag and drop</p>
//                                         </div>
//                                         <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                                     </div>
//                                 </div>
//                             )}
//                         />
//                         {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images.message}</p>}
//                     </div>

//                     {/* Image Previews */}
//                     {imageFiles.length > 0 && (
//                         <div>
//                             <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Images:</h3>
//                             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//                                 {imageFiles.map((file, index) => (
//                                     <div key={index} className="relative group">
//                                         <img
//                                             src={URL.createObjectURL(file)}
//                                             alt={`preview ${index}`}
//                                             className="h-28 w-full object-cover rounded-lg"
//                                             onLoad={(e) => URL.revokeObjectURL(e.target.src)} // Clean up memory
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => handleRemoveImage(index)}
//                                             className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
//                                         >
//                                             &#x2715;
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Submit Button */}
//                     <div className="pt-4">
//                         <button
//                             type="submit"
//                             disabled={isPending}
//                             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
//                         >
//                             {isPending ? 'Publishing...' : 'Publish Story'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddStory;
