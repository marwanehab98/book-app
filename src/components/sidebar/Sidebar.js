import React from "react";
import { HomeOutlined, StarOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from "react-router-dom";


const { Header } = Layout;


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
            <Layout className="layout">
                <Header>
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
