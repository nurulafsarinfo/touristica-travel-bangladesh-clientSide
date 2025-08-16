import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../../Components/Shared/LoadingSpinner';

const ManageStories = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch all stories for the current user
    const { data: stories = [], isLoading } = useQuery({
        queryKey: ['stories', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/stories?email=${user.email}`);
            return res.data;
        }
    });

    // Mutation for deleting a story
    const { mutate: deleteStory } = useMutation({
        mutationFn: async (storyId) => {
            return await axiosSecure.delete(`/stories/${storyId}`);
        },
        onSuccess: () => {
            Swal.fire('Deleted!', 'Your story has been deleted.', 'success');
            queryClient.invalidateQueries({ queryKey: ['stories'] });
        }
    });

    const handleDelete = (storyId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteStory(storyId);
            }
        });
    };

    if (isLoading) return <LoadingSpinner/>;

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Manage Your Stories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map(story => (
                    <div key={story._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                        <img src={story.images[0]} alt={story.title} className="w-full h-48 object-cover" />
                        <div className="p-4 flex-grow">
                            <h2 className="text-xl font-bold mb-2">{story.title}</h2>
                            <p className="text-gray-600 text-sm line-clamp-3">{story.storyText}</p>
                        </div>
                        <div className="p-4 bg-gray-50 flex justify-end space-x-2">
                            <Link to={`/dashboard/edit-story/${story._id}`} className="btn btn-sm btn-outline btn-info">
                                Edit
                            </Link>
                            <button onClick={() => handleDelete(story._id)} className="btn btn-sm btn-outline btn-error">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageStories;