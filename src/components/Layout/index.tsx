import React from "react";
import { Grid } from './styles';

import Aside from '../Aside';
import MainHeader from '../MainHeader';
import MainContent from '../MainContent';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Grid>
            <MainHeader />
            <Aside />
            <MainContent>
                {children}
            </MainContent>
        </Grid>
    );
};

export default Layout;