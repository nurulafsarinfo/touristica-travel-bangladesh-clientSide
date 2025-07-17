import React, { useState } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const JoinGuideModal = ({ isOpen, onRequestClose }) => {
    const {user} = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        reason: '',
        cvLink: '',
    });

    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure();


    const updatedUserMutation = useMutation({
        mutationFn: async (formData) => {
            const res = await axiosSecure.post('/beGuideRequest', {...formData, name: user.displayName, email: user.email});
            console.log('res save db data', res)
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['guideApplications'] });
        },
        onError: () => {
            toast.error('❌ Failed to update profile')
        }

    })

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await toast.promise(
                updatedUserMutation.mutateAsync(formData),
                {
                    // loading: 'Submitting application...',
                    success: '✅ Your Application Submitted!',
                    error: '❌ Failed to submit application',
                }
            );

            setIsSuccessOpen(true);
            setFormData({ title: '', reason: '', cvLink: ''});

        } catch (err) {
            console.error('Application failed:', err);
        }
    };


    const closeBothModals = () => {
        setIsSuccessOpen(false);
        onRequestClose();
    };

    return (
        <>
            {/* Form Modal */}
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                className="bg-white rounded-xl p-6 w-full max-w-xl mx-auto mt-24 shadow-xl outline-none"
                overlayClassName="fixed inset-0 bg-black/50 z-50 flex justify-center items-start"
            >
                <h2 className="text-xl font-bold mb-4 text-[#263a88]">Tour Guide Application</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Application Title</label>
                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded"
                            placeholder="e.g., Mountain Guide Expert"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">Why do you want to be a Tour Guide?</label>
                        <textarea
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1">CV Link</label>
                        <input
                            name="cvLink"
                            value={formData.cvLink}
                            onChange={handleChange}
                            required
                            type="url"
                            className="w-full px-4 py-2 border rounded"
                            placeholder="https://example.com/my-cv"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onRequestClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Success Modal */}
            <Modal
                isOpen={isSuccessOpen}
                onRequestClose={closeBothModals}
                className="bg-white rounded-xl p-6 w-full max-w-md mx-auto mt-40 shadow-xl outline-none"
                overlayClassName="fixed inset-0 bg-black/50 z-50 flex justify-center items-start"
            >
                <h3 className="text-xl font-bold text-green-600 mb-4">🎉 Application Submitted!</h3>
                <p className="text-gray-700">We'll review your application shortly.</p>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={closeBothModals}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default JoinGuideModal;
