import React from 'react';
import { FacebookShareButton, FacebookIcon, WhatsappShareButton,
    WhatsappIcon } from 'react-share';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import useAxios from '../../../Hooks/useAxios';
import useAuth from '../../../Hooks/useAuth';

const TouristStorySection = () => {
    const axiosSecure = useAxios();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: stories = [] } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/stories');
            return res.data;
        },
    });


    const handleShareClick = () => {
        if (!user) {
            navigate('/login');
        }
    };

    return (
        <section className="bg-gray-50 py-12 px-4 ">
            <div className="container w-11/12 mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">Tourist Stories</h2>
                    <p className="text-gray-500 mt-2">Discover amazing adventures from fellow travelers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stories.map(story => (
                        <div key={story._id} className="bg-white rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
                            <div className="relative">
                                <img src={story.images[0]} alt={story.title} className="w-full h-48 object-cover" />
                                <div className="absolute top-2 right-2 space-x-2" onClick={handleShareClick}>
                                    <WhatsappShareButton
                                        url={window.location.href}
                                        title={story.title}
                                        separator=' :: '
                                    >
                                        <WhatsappIcon size={32} className='rounded-full'/>
                                    </WhatsappShareButton>
                                    
                                    <FacebookShareButton
                                        url={window.location.href}
                                        quote={`Check out this story: ${story.title}`}
                                        hashtag="#travel"
                                        // The button is disabled via CSS if the user is not logged in,
                                        // but the onClick handler provides a robust fallback.
                                        disabled={!user} 
                                    >
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{story.title}</h3>
                                <p className="text-gray-600 text-sm line-clamp-3">{story.storyText}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/all-stories" className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                        All Stories
                    </Link>
                </div>
            </div>
        </section>
    );
// };

};

export default TouristStorySection;
