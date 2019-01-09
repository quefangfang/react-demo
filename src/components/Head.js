import React, { Component } from 'react';
import { Menu, Layout, Icon, Breadcrumb } from 'antd';
import routes from '@/router/config';
import { connect } from 'react-redux';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header } = Layout;

@connect(state => ({ menuActive: state.globalData.menuActive }))
class Head extends Component {
    state = {
        user: '',
        visible: false,
    };
    handleLogout() {
        window.location.hash = '#login';
    }
    render() {
        const menuActive = this.props.menuActive;
        let openKeys = routes.menus.filter(item => item.key == menuActive.openKeys)
        let selectedKey = [];
        if (openKeys[0].subs) {
            selectedKey = openKeys[0].subs.filter(item => item.key == menuActive.selectedKey)
        }
        return (
            <Header className="custom-theme header" >
                <div className="breadcumb-box" style={{ float: 'left' }}>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Icon
                                className="fem-custom-trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.onCollapse}
                                style={{ marginRight: '10px' }}
                            />
                            {openKeys[0].title}
                        </Breadcrumb.Item>
                        {
                            selectedKey.length > 0 && <Breadcrumb.Item>
                                {selectedKey[0].title}
                            </Breadcrumb.Item>
                        }


                    </Breadcrumb>
                </div>
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}
                >
                    <SubMenu title={
                        <span className="avatar">
                            <span style={{ paddingRight: '10px' }}>您好，欢迎登录~</span>
                            <img src={require('../assets/images/ic_use.png')} alt="头像" />
                            <i className="on bottom b-white" />
                        </span>
                    }>
                        <MenuItemGroup>
                            <Menu.Item key="logout" onClick={this.handleLogout.bind(this)}>退出</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>
            </Header>
        )
    }
}

export default Head