import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router';
import { FaUserCheck, FaBriefcase, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';
import useAxios from '../../Hooks/useAxios';



const GuideProfile = () => {
  const { id } = useParams(); 
  const axiosSecure = useAxios();

 
  const { data: guide, isLoading: isLoadingProfile, error: errorProfile } = useQuery({
    queryKey: ['guideProfile', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/guides/${id}`);
      return res.data;
    },
    enabled: !!id, // Only run query if id is available
  });

  // Fetch guide's stories from the server
  const { data: stories, error: errorStories } = useQuery({
    queryKey: ['guideStories', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories/${guide?.email}`);
      return res.data;
    },
    enabled: !!id, // Only run query if id is available
  });
  
  const isLoading = isLoadingProfile ;

  // Handle Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100">
        <div className="text-2xl font-signikaText text-[#263a88]">Loading Profile...</div>
      </div>
    );
  }

  // Handle Error State
  if (errorProfile ) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100">
        <div className="text-center p-4">
            <h2 className="text-2xl font-bold text-red-500">Failed to Load Profile</h2>
            <p className="text-gray-600 mt-2">{errorProfile?.message || errorStories?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 font-signikaText">
      <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Profile Header Section */}
        <div className="bg-white p-8 rounded-2xl shadow-lg md:flex md:items-center md:space-x-10">
          <div className="md:w-1/3 text-center">
            <img 
              src={guide.photoURL} 
              alt={`Profile of ${guide.name}`} 
              className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-[#0ea5e9] shadow-md"
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x300/d1dbff/263a88?text=Guide'; }}
            />
          </div>
          <div className="md:w-2/3 mt-6 md:mt-0">
            <h1 className="text-4xl font-raleway font-bold text-[#263a88]">{guide.name}</h1>
            <p className="text-xl text-[#f050a6] font-semibold mt-1">{guide.title}</p>
            <div className="grid grid-cols-2 gap-4 text-gray-600 mt-4 border-t pt-4">
              <div className="flex items-center"><FaBriefcase className="mr-3 text-sky-500" /> <strong>{guide.experience} Years</strong> of Experience</div>
              <div className="flex items-center"><FaUserCheck className="mr-3 text-green-500" /> Verified Guide</div>
              <div className="flex items-center col-span-2"><FaCalendarAlt className="mr-3 text-gray-500" /> Joined on {new Date(guide.createdAt).toLocaleDateString()}</div>
            </div>
            <p className="text-gray-700 mt-4 leading-relaxed">{guide.reason}</p>
            <a 
              href={guide.cvLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center mt-6 px-6 py-3 rounded-full bg-[#0ea5e9] hover:bg-[#0b98d2] text-white font-bold transition-all duration-300 transform hover:scale-105"
            >
              <FaFileAlt className="mr-2" /> View CV
            </a>
          </div>
        </div>

        {/* Stories Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-raleway font-bold text-[#263a88] text-center mb-10">
            Stories from {guide.name}
          </h2>
          {stories && stories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories?.map(story => (
                <div key={story._id} className="bg-white rounded-lg shadow-lg overflow-hidden group transition-transform duration-300 hover:-translate-y-2">
                  <figure className="h-56 overflow-hidden">
                    <img src={story.spotPhoto} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </figure>
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-raleway text-[#263a88] mb-2">{story.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 h-16">{story.content}</p>
                    <Link to={`/story/${story._id}`} className="font-bold text-[#f050a6] hover:underline">
                      Read More &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">This guide hasn't shared any stories yet.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default GuideProfile;
