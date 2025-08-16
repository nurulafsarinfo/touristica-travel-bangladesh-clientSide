import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Shared/Navbar/Navbar';
import Footer from '../Components/Shared/Footer';

const RootLayout = () => {
    return (
        <div className='bg-[#d1dbff] flex flex-col min-h-screen'>
            <Navbar></Navbar>

            <main className='flex-grow'>
                <Outlet></Outlet>
            </main>
            
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;