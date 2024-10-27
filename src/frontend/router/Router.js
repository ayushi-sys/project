import React from "react";
import {Route,Routes, Navigate} from 'react-router-dom';

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResult from "../pages/SearchResult";
import Tours from "../pages/Tours";
import ToursDetails from "../pages/ToursDetails";
import ThankYou from "../pages/ThankYou";

export default function Routers(){

    return(
        <>
        
        <Routes>
            <Route path="/" element={<Navigate to='/home'/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/thank-you" element={<ThankYou/>}/>
            <Route path="/tours/search" element={<SearchResult/>}/>
            <Route path="/tours" element={<Tours/>}/>
            <Route path="/tours/:id" element={<ToursDetails/>}/>



        </Routes>
        
        
        </>
    )

}

