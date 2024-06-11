import React from "react";
import { Grid } from './styles';

import Aside from '../Aside';
import MainHeader from '../MainHeader';
import Content from '../Content';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Grid>
            <MainHeader />
            <Aside />
            <Content>
                {children}
            </Content>
        </Grid>
    );
};

export default Layout;