import React from 'react';
import Bannner from '../Pages/Home/Banner/Bannner';
import PackageAndGuideTabs from '../Pages/Home/PackageAndGuidTabs/PackageAndGuideTabs';
import Story from '../Pages/Home/Story/Story';

const HomeLayout = () => {
    return (
        <div>
            <Bannner></Bannner>
            <PackageAndGuideTabs></PackageAndGuideTabs>
            <Story></Story>
        </div>
    );
};

export default HomeLayout;