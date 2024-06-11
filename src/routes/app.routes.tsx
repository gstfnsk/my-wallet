import React from 'react';
// import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';

import Dashboard from "../pages/Dashboard";
import List from "../pages/List";
import Layout from "../components/Layout";


const AppRoutes: React.FC = () => (
    <Layout>
        <Routes>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/list/:type" element={<List />}></Route>
        </Routes>
    </ Layout>
);


export default AppRoutes;