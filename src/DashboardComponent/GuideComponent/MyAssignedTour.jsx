import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyAssignedTours = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();


    const { data: assignedTours = [], isLoading } = useQuery({
        queryKey: ['assignedTours', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/assigned-tours/${user.email}`);
            return res.data;
        }
    });



    const { mutate: updateStatus } = useMutation({
        mutationFn: async ({ tourId, newStatus }) => {
            return await axiosSecure.patch(`/bookings/update-status/${tourId}`, { newStatus });
        },
        onSuccess: () => {
            // সফলভাবে আপডেট হলে, টেবিলের ডেটা আবার লোড করার জন্য
            queryClient.invalidateQueries({ queryKey: ['assignedTours'] });
        }
    });

    const handleReject = (tourId) => {
        Swal.fire({
            title: 'Are you sure you want to reject?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, reject it!'
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatus({ tourId, newStatus: 'rejected' });
                Swal.fire('Rejected!', 'The tour has been rejected.', 'success');
            }
        });
    };

    const handleAccept = (tourId) => {
        updateStatus({ tourId, newStatus: 'accepted' });
        Swal.fire('Accepted!', 'The tour has been accepted.', 'success');
    };

    if (isLoading) return <p>Loading your assigned tours...</p>;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">My Assigned Tours</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Package Name</th>
                            <th>Tourist Name</th>
                            <th>Tour Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignedTours.map(tour => (
                            <tr key={tour._id}>
                                <td>{tour.packageName}</td>
                                <td>{tour.name}</td>
                                <td>{new Date(tour.tourDate).toLocaleDateString()}</td>
                                <td>${tour.price}</td>
                                <td><span className="badge badge-info">{tour.status}</span></td>
                                <td>
                                    {/* ধাপ গ: শর্ত অনুযায়ী বাটন দেখানো */}
                                    
                                       { tour.status === 'accepted' || tour.status === 'rejected' ? '' :
                                        <div className="space-x-2">

                                            <button onClick={() => handleAccept(tour._id)} className='btn btn-sm btn-success' 
                                            disabled={tour.status === 'pending'}
                                            >
                                                Accept
                                            </button>

                                            <button onClick={() => handleReject(tour._id)} className="btn btn-sm btn-error">Reject</button>

                                        </div>
                                        }
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAssignedTours;