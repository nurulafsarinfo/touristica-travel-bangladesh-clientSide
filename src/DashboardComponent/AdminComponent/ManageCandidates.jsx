import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ManageCandidates = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();


    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Fetch all guide applications
    const { data, isLoading, } = useQuery({
        queryKey: ['guideApplications', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get('/guide-applications', {
                params: {
                    page: currentPage,
                    limit: itemsPerPage
                }
            });
            return res.data;
        }
    });

    // console.log('data is candidate', data);

    const applications = data || [];
    const totalCount = data?.totalCount || 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    // console.log("manageCandidates data ", applications)

    // Mutation for accepting an application
    const { mutate: acceptApplication } = useMutation({
        mutationFn: async ({ applicationId, applicantEmail }) => {
            return await axiosSecure.patch(`/guide-applications/accept/${applicationId}`, { applicantEmail });
        },
        onSuccess: () => {
            Swal.fire('Accepted!', 'The candidate is now a guide.', 'success');
            queryClient.invalidateQueries({ queryKey: ['guideApplications'] });
        },
        onError: () => {
            Swal.fire('Error!', 'Failed to accept the application.', 'error');
        }
    });

    // Mutation for rejecting an application
    const { mutate: rejectApplication } = useMutation({
        mutationFn: async (applicationId) => {
            return await axiosSecure.delete(`/guide-applications/reject/${applicationId}`);
        },
        onSuccess: () => {
            Swal.fire('Rejected!', 'The application has been rejected and removed.', 'success');
            queryClient.invalidateQueries({ queryKey: ['guideApplications'] });
        },
        onError: () => {
            Swal.fire('Error!', 'Failed to reject the application.', 'error');
        }
    });

    const handleAccept = (application) => {
        Swal.fire({
            title: 'Accept this Candidate?',
            text: `Are you sure you want to make ${application.name} a guide?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, accept!'
        }).then((result) => {
            if (result.isConfirmed) {
                acceptApplication({ applicationId: application._id, applicantEmail: application.email });
            }
        });
    };

    const handleReject = (application) => {
        Swal.fire({
            title: 'Reject this Candidate?',
            text: `Are you sure you want to reject ${application.name}'s application?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, reject!'
        }).then((result) => {
            if (result.isConfirmed) {
                rejectApplication(application._id);
            }
        });
    };

    return (
        <div className="bg-gray-50 p-4 sm:p-8 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Manage Guide Applications</h2>

                {/* Applications Table */}
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th>#</th>
                                <th>Candidate Name</th>
                                <th>Email</th>
                                <th>Reason</th>
                                <th>CV Link</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="6" className="text-center p-4">Loading applications...</td></tr>
                            ) : applications.length === 0 ? (
                                <tr><td colSpan="6" className="text-center p-4">No pending applications found.</td></tr>
                            ) : (
                                applications.map((app, index) => (
                                    <tr key={app._id} className="hover">
                                        <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                        <td>{app.name}</td>
                                        <td>{app.email}</td>
                                        <td className="max-w-xs truncate" title={app.reason}>{app.reason}</td>
                                        <td>
                                            <a href={app.cvLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                View CV
                                            </a>
                                        </td>
                                        <td className="space-x-2">
                                            <button onClick={() => handleAccept(app)} className="btn btn-sm btn-success text-white">
                                                Accept
                                            </button>
                                            <button onClick={() => handleReject(app)} className="btn btn-sm btn-error text-white">
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* --- START: Pagination Controls --- */}
                <div className="flex justify-center items-center space-x-2 mt-8">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="btn btn-sm"
                    >
                        « Prev
                    </button>

                    {[...Array(totalPages).keys()].map(pageNumber => (
                        <button
                            key={pageNumber + 1}
                            onClick={() => setCurrentPage(pageNumber + 1)}
                            className={`btn btn-sm ${currentPage === pageNumber + 1 ? 'btn-primary' : ''}`}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="btn btn-sm"
                    >
                        Next »
                    </button>
                </div>
                {/* --- END: Pagination Controls --- */}
            </div>
        </div>
    );
};

export default ManageCandidates;
