import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router'; 

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Banner data - No Lorem Ipsum used
const bannerSlides = [
    {
        image: 'https://i.ibb.co/YTwGx1m7/Sundhorban-tigar.jpg',
        title: 'Explore the Endless Coastline',
        subtitle: "Discover the world's longest sea beach in Cox's Bazar and the pristine coral islands of Saint Martin's.",
        buttonText: 'View Beach Packages'
    },
    {
        image: 'https://i.ibb.co/qYGpWrS8/Kuakata-tupan.jpg',
        title: 'Journey Through the Clouds',
        subtitle: 'Trek through the lush green hills of Bandarban and experience the serene beauty of the Chittagong Hill Tracts.',
        buttonText: 'Discover Hill Tours'
    },
    {
        image: 'https://i.ibb.co/YBqrVggS/Kuakata-boy.jpg',
        title: 'Uncover Ancient Mysteries',
        subtitle: 'Step back in time and explore UNESCO World Heritage sites like Paharpur and the historic Mosque City of Bagerhat.',
        buttonText: 'Explore Heritage Sites'
    },
    {
        image: 'https://i.ibb.co/8nwCBrsf/Pamp-tree-Sundhorban.jpg',
        title: 'Adventure in the Mangrove Kingdom',
        subtitle: "Experience the thrill of the Sundarbans, the world's largest mangrove forest and home of the Royal Bengal Tiger.",
        buttonText: 'Book a Sundarbans Trip'
    }
];

// Framer Motion variants for animations
const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2,
        },
    },
};

const textItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};


const Banner = () => {
    return (
        <div className="relative w-full h-[60vh] md:h-[80vh] text-white">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                className="w-full h-full"
            >
                {bannerSlides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <div className="relative w-full h-full">
                                {/* Background Image */}
                                <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                                
                                {/* Content */}
                                <div className="absolute inset-0 flex items-center justify-center text-center">
                                    <motion.div
                                        className="max-w-3xl px-4"
                                        variants={textContainerVariants}
                                        initial="hidden"
                                        animate={isActive ? 'visible' : 'hidden'}
                                    >
                                        <motion.h1
                                            variants={textItemVariants}
                                            className="text-3xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg"
                                        >
                                            {slide.title}
                                        </motion.h1>
                                        <motion.p
                                            variants={textItemVariants}
                                            className="mt-4 text-md md:text-lg max-w-2xl mx-auto drop-shadow-md"
                                        >
                                            {slide.subtitle}
                                        </motion.p>
                                        <motion.div variants={textItemVariants} className="mt-8">
                                            <Link
                                                to="/all-packages" // Link to your packages page
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
                                            >
                                                {slide.buttonText}
                                            </Link>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
