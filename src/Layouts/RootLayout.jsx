import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Shared/Navbar/Navbar';
import Footer from '../Components/Shared/Navbar/Footer';

const RootLayout = () => {
    return (
        <div className='bg-[#d1dbff]'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;