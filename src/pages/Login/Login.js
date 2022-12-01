import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();

    const loginHandler = () => {
        navigate("/main");
    }
    useEffect(() => {
        loginHandler();
    }, []);
}

export default Login;
