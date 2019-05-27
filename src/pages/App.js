import React, { Component } from 'react'
import { Layout, } from 'antd';
import { Switch, Route } from 'react-router-dom';
import asyncComponent from '@/utils/asyncComponent';
// import HeaderLayout from '@/components/Head';
const { Sider, Content } = Layout;
const HeaderLayout = asyncComponent(() => import('@/components/Head'));


const SiderMenu = asyncComponent(() => import('@/components/SiderMenu'));
const Dashboard = asyncComponent(() => import('@/pages/dashboard/Home'));
const Form = asyncComponent(() => import('@/pages/form/Home'));
const Charts = asyncComponent(() => import('@/pages/charts/Home'));

class App extends Component {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render () {
        return (
            <Layout>
                <Sider collapsed={this.state.collapsed}>
                    <SiderMenu></SiderMenu>
                </Sider>
                <Layout>
                    <HeaderLayout toggle={this.toggle} collapsed={this.state.collapsed}></HeaderLayout>
                    <Content>
                        <Switch>
                            <Route path="/app/dashboard" component={Dashboard} />
                            <Route path="/app/form" component={Form} />
                            <Route path="/app/charts" component={Charts} />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
export default App