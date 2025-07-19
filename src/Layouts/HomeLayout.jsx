import React from 'react';
import Bannner from '../Pages/Home/Banner/Bannner';
import PackageAndGuideTabs from '../Pages/Home/PackageAndGuidTabs/PackageAndGuideTabs';

const HomeLayout = () => {
    return (
        <div>
            <Bannner></Bannner>
            <PackageAndGuideTabs></PackageAndGuideTabs>
        </div>
    );
};

export default HomeLayout;