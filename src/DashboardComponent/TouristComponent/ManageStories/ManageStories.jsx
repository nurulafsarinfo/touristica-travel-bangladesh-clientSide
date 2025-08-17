import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../../Components/Shared/LoadingSpinner';
import { Links } from 'react-router';
import { NavLink } from 'react-router';

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
        <div className="container min-h-screen mx-auto ">
            <h1 className="text-2xl font-medium text-[#263a88] mb-6">Manage Your Stories</h1>
            {
                stories.length === 0 && 
                    <div className='flex flex-col items-center justify-center h-[70vh]'> 
                        <p className='text-center text-xl mb-4'>You have no Story.</p> 
                        <NavLink to={"/dashboard/add-Story"} className="px-4 py-2 bg-teal-400 rounded-md">
                            Add Story    
                        </NavLink>   
                    </div>
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stories.map(story => (
                    <div key={story._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                        <img src={story.images[0]} alt={story.title} className="w-full h-42 lg:h-36 object-cover" />
                        <div className="p-2 flex-grow">
                            <h2 className="text-md md:text-sm font-bold mb-2">{story.title}</h2>
                            <p className="text-gray-600 text-[10px] line-clamp-3">{story.storyText}</p>
                        </div>
                        <div className="p-4 bg-gray-50 flex justify-end space-x-2">
                            <Link to={`/dashboard/edit-story/${story._id}`} className="btn btn-sm btn-outline btn-info text-[10px]">
                                Edit
                            </Link>
                            <button onClick={() => handleDelete(story._id)} className="btn btn-sm btn-outline btn-error text-[10px] py-1">
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