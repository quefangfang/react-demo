import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import routes from '@/router/config';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { setMenuAction } from '@/store/global/action';
const { SubMenu } = Menu;

@withRouter
@connect(state => state, { setMenuAction })
class SiderMenu extends Component {
    state = {
        current: '',
        openKeys: '',
    }
    handleClick = (e) => {
        this.setState({
            current: e.key,
            openKeys: e.keyPath[e.keyPath.length - 1]
        });
        this.props.setMenuAction('menuActive', {
            selectedKey: e.key,
            openKeys: e.keyPath[e.keyPath.length - 1]
        })
    }
    componentDidMount() {
        const { location } = this.props;
        const pathname = location.pathname;
        const pathArr = pathname.split('/')
        const openKeys = `/${pathArr[1]}/${pathArr[2]}`
        if (!this.state.openKeys) {
            this.setState({
                current: pathname,
                openKeys: openKeys
            });
        }
        this.props.setMenuAction('menuActive', {
            selectedKey: pathname,
            openKeys: openKeys
        })
    }
    render() {
        const { location } = this.props;
        let openKeys = this.state.openKeys
        let current = this.state.current
        const pathname = location.pathname;
        const pathArr = pathname.split('/')
        if (!openKeys || current !== pathname) {
            openKeys = `/${pathArr[1]}/${pathArr[2]}`
            current = pathname
        }
        const menuItem = []
        routes.menus.map(item => {
            if (item.subs) {
                menuItem.push(
                    <SubMenu key={item.key}
                        title={<span><Icon type={item.icon} />{item.title}</span>}
                    >
                        {item.subs && item.subs.map(subItem =>
                            <Menu.Item key={subItem.key}>
                                <Link to={subItem.key}>
                                    {subItem.icon && <Icon type={subItem.icon} />}
                                    <span className="nav-text">{subItem.title}</span>
                                </Link>
                            </Menu.Item>
                        )
                        }
                    </SubMenu>
                )
            } else {
                menuItem.push(<Menu.Item key={item.key}>
                    <Link to={item.key}>
                        {item.icon && <Icon type={item.icon} />}
                        <span className="nav-text">{item.title}</span>
                    </Link>
                </Menu.Item>)
            }
        })
        return (
            <div>
                <div className='logo'>
                    <img src={require('../assets/images/logo.png')} alt="头像" />
                    <span>我是管理员</span>
                </div>
                <Menu
                    mode="inline"
                    defaultOpenKeys={[openKeys]}
                    defaultSelectedKeys={[current]}
                    selectedKeys={[current]}
                    onClick={this.handleClick}
                >
                    {menuItem}
                </Menu>
            </div>
        )
    }
}
export default SiderMenu
