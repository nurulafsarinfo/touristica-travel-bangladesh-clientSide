import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const EditProfileModal = ({ isOpen, onRequestClose, userData, onSave }) => {
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    if (userData) {
      setName(userData.name || '');
      setPhotoURL(userData.photoURL || '');
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ displayName: name, photoURL });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Profile Modal"
      className="bg-white rounded-xl p-6 w-full max-w-lg mx-auto mt-24 outline-none shadow-xl relative"
      overlayClassName="fixed inset-0 bg-black/50 z-50 flex justify-center items-start"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm">Name</label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Photo URL</label>
          <input
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-600">Email</label>
          <input
            type="text"
            disabled
            className="w-full px-4 py-2 border rounded bg-gray-100"
            value={userData.email}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-gray-600">Role</label>
          <input
            type="text"
            disabled
            className="w-full px-4 py-2 border rounded bg-gray-100 capitalize"
            value={userData.role}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
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
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditProfileModal;
