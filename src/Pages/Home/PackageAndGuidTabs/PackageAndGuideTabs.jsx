import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../Hooks/useAxios';
import { FaStar } from "react-icons/fa6";


const TourismSection = () => {
    const axiosSecure = useAxios();

    // Fetch packages (3 random) from server 
    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['packagesData'],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/packages/random');

                // console.log('packages data', res.data);

                return res.data;
            } catch (err) {
                console.error('Error fetching packages:', err);
                throw err;
            }
        }
    });


    const { data: guides = [] } = useQuery({
        queryKey: ['guidesData'],
        queryFn: async () => {
            try {

                const res = await axiosSecure.get('/guides/random');
                return res.data;
            } catch (err) {
                console.error('Error fetching guides:', err);
            }
        }
    })

    console.log('tour guide are', guides)

    if (isLoading) return <p className='text-center'>Loading...</p>


    return (
        <section className="bg-[#f7faff] py-16 px-4 md:px-10 font-signikaText">
            {/* 🌍 Overview Section */}
            <div className="max-w-11/12 mx-auto mb-16">
                <h2 className="text-3xl font-bold text-center text-[#263a88] mb-6">Explore Touristica</h2>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="md:w-1/2">
                        <p className="text-lg text-gray-600">
                            Discover the beauty of travel with Touristica. From curated travel packages to expert tour guides, we help you explore with ease and excitement.
                        </p>
                    </div>
                    <div className="md:w-1/2">

                        <video
                            className='w-full h-64 md:h-80 rounded-xl shadow-lg'
                            src='/video/Project Overview.mp4'
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>

            {/* 🧭 Tabs Section */}
            <div className="max-w-11/12 mx-auto">
                <Tabs>
                    <TabList className="flex justify-center gap-4 text-lg font-semibold mb-8 border-b-2 pb-2">
                        <Tab className="cursor-pointer text-[#263a88] hover:underline">Our Packages</Tab>
                        <Tab className="cursor-pointer text-[#263a88] hover:underline">Meet Our Tour Guides</Tab>
                    </TabList>

                    {/* 📦 Packages Tab */}
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {packages.map(pkg => (

                                <div key={pkg._id} className="flex flex-col bg-white rounded-xl shadow hover:shadow-xl transition p-4">
                                    <img src={pkg.images[0]} alt={pkg.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                                    <h3 className="flex-grow text-xl font-bold text-[#263a88] mb-1">{pkg.title}</h3>
                                    <p className="text-sm text-gray-500 mb-1">{pkg.type}</p>
                                    <div className='flex justify-between'>
                                        <p className="text-[#f050a6] font-semibold text-lg mb-3">${pkg.price}</p>

                                        <span className='flex items-center gap-1 text-[#263a88]'> <FaStar fill='gold' /><FaStar fill='gold' /><FaStar fill='gold' />  {pkg.rating}</span>
                                    </div>

                                    <Link
                                        to={`/packages/${pkg._id}`}
                                        className="w-32 text-center inline-block bg-[#0ea5e9] text-white px-4 py-2 rounded hover:bg-[#0ea5e9]/90"
                                    >
                                        View Details
                                    </Link>



                                </div>

                            ))}
                        </div>
                    </TabPanel>

                    {/* 🧑‍✈️ Guides Tab */}
                    <TabPanel>
                        {
                            guides.length < 1 ?
                                <div className='text-center'>Guides are empty!</div>
                                : <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                    {guides.map(guide => (
                                        <div key={guide._id} className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
                                            <img src={guide.photoURL} alt={guide.name} className="w-full h-44 object-cover rounded-lg mb-4" />
                                            <h3 className="text-lg font-bold text-[#263a88]">{guide.name}</h3>
                                            <p className="text-sm text-gray-500 mb-2">{guide.title}</p>
                                            <p className="text-sm text-gray-500 mb-4">Experience: {guide.experience} years</p>
                                            <Link
                                                to={`/guides/${guide._id}`}
                                                className="inline-block bg-[#f050a6] text-white px-4 py-2 rounded hover:bg-[#f050a6]/90"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                        }
                    </TabPanel>
                </Tabs>
            </div>
        </section>
    );
};

export default TourismSection;
