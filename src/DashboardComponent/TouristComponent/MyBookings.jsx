import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['myBookings', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });

  const { mutate: cancelBooking } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/bookings/cancel/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myBookings']);
      Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
    },
  });

  const handleCancel = (id) => {
    console.log('cancel button triggerd')
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        cancelBooking(id);
      }
    });
  };

  if (isLoading) return <div className="text-center mt-10">Loading bookings...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 font-signikaText">
      <h2 className="text-2xl font-bold text-[#263a88] mb-6">My Bookings</h2>

      <div className="bg-base-100 shadow rounded-lg overflow-hidden">
        {/* Scrollable Table Wrapper */}
        <div className="overflow-x-auto max-h-[500px]">
          <table className="table table-zebra w-full min-w-[800px]">
            <thead className="text-base text-[#263a88] font-semibold bg-base-200 sticky top-0 z-10">
              <tr>
                <th>#</th>
                <th>Package</th>
                <th>Tour Guide</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, idx) => (
                <tr key={booking._id}>
                  <td>{idx + 1}</td>
                  <td>{booking.packageName}</td>
                  <td>{booking.tourGuide}</td>
                  <td>{new Date(booking.tourDate).toLocaleDateString()}</td>
                  <td>{booking.price} tk</td>
                  <td>
                    <span
                      className={`badge ${booking.status === 'accepted'
                        ? 'badge-success '
                        : booking.status === 'rejected'
                          ? 'badge-error'
                          : booking.status === 'in review'
                            ? 'badge-info'
                            : booking.status === 'paid'
                              ? 'badge-success text-white'
                              : booking.status === 'cancelled'
                                ? 'badge-error text-red-500'
                                : 'badge-warning'
                        }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="flex gap-2 justify-center items-center">
                    {booking.status === 'accepted' && (
                      <>
                        <button
                          onClick={() => navigate(`/dashboard/payment/${booking._id}`)}
                          className="btn btn-sm bg-[#f050a6] hover:bg-[#e73d99] text-white"
                        >
                          Pay
                        </button>

                      </>
                    )}
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="text-center text-gray-500 py-6">No bookings found.</div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
