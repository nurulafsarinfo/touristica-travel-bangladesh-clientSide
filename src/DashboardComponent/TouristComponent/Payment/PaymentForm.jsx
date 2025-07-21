import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router'; // Assuming you use react-router-dom
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);

    const { data: bookingData = {}, isPending } = useQuery({
        queryKey: ['booking', id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/booking/${id}`);
            return res.data;
        }
    });

    // Create PaymentIntent as soon as the page loads with booking data
    useEffect(() => {
        if (bookingData?.price && bookingData.price > 0) {
            axiosSecure.post('/create-payment-intent', { price: bookingData.price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
                .catch(err => {
                    console.error("Error creating payment intent:", err);
                    setError("Could not initiate payment. Please try again.");
                });
        }
    }, [bookingData, axiosSecure]);


    if (isPending) {
        return <div className="text-center p-10">Loading payment details...</div>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            return;
        }

        setProcessing(true);

        const card = elements.getElement(CardElement);
        if (!card) {
            setProcessing(false);
            return;
        }

        // Step 1: Create payment method (This is optional but good for validation)
        const { error: createPaymentMethodError } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (createPaymentMethodError) {
            setError(createPaymentMethodError.message);
            setProcessing(false);
            return;
        }

        // Step 2: Confirm the card payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || 'Anonymous',
                    email: user?.email || 'anonymous@example.com'
                }
            }
        });

        if (confirmError) {
            setError(confirmError.message);
            setProcessing(false);
            return;
        }

        // Step 3: Handle success
        if (paymentIntent.status === 'succeeded') {
            setError('');
            const transactionId = paymentIntent.id;

            // Step 4: Save payment history to your database
            const paymentData = {
                bookingId: id,
                email: user.email,
                price: bookingData.price,
                transactionId: transactionId,
                paymentDate: new Date().toISOString(),
            };

            try {
                const paymentResult = await axiosSecure.post('/payments', paymentData);
                if (paymentResult.data.insertedId) {
                    await Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful!',
                        html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                        confirmButtonText: 'Go to My Bookings',
                    });
                    navigate(`/dashboard/bookings/${user.email}`); // Navigate to a relevant page
                }
            } catch (error) {
                console.log("payment error", error)
                setError("Payment was successful, but we failed to save the record. Please contact support.");
            }
        }
        
        setProcessing(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg w-full my-10 max-w-md mx-auto border">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">Card Information</span>
                    </label>
                    <CardElement
                        className='p-4 border rounded-lg bg-gray-50'
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>

                <button
                    type='submit'
                    className='btn btn-primary w-full text-lg'
                    disabled={!stripe || !clientSecret || processing}>
                    {processing ? 'Processing...' : `Pay ৳${bookingData.price}`}
                </button>

                {error && <p className='text-red-600 text-center pt-2'>{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;
