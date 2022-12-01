import React from "react";
import "./Sidebar.scss";
import { HomeOutlined, StarOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import logo from '../../logo.svg'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";


const { Header, Content, Footer } = Layout;


const navigation = [
    // {
    //     title:"",
    //     to:"",
    //     // icon: logo
    // },
    {
        title: "Books",
        to: "/main",
        icon: <HomeOutlined />
    },
    {
        title: "Favourites",
        to: "/favourites",
        icon: <StarOutlined />
    }
]

const SideBar = () => {
    const navigate = useNavigate();
    return (
        <>
            <Layout>
                <Header className="header">
                    <div className="logo"></div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        items={navigation.map((item, index) => ({
                            key: String(item.to),
                            label: String(item.title),
                            icon: item.icon
                        }))}
                        onClick={(e) => navigate(e.key)}
                    >
                    </Menu>
                </Header>
            </Layout>
        </>
    );
};

export default SideBar;
