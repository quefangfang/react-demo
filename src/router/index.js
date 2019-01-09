import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin } from 'antd';
// 中文语言包
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import asyncComponent from '@/utils/asyncComponent';
const Login = asyncComponent(() => import('@/pages/login/Login'));
const NotFound = asyncComponent(() => import('@/components/NotFound'));
const App = asyncComponent(() => import('@/pages/App'));

@connect(state => state)
class Router extends Component {
    state = {
        auth: true
    };
    render() {
        return (
            <LocaleProvider locale={zh_CN}>
                <Spin
                    spinning={this.props.globalData.globalLoading}
                    tip="努力加载中"
                    wrapperClassName="spinning-wrapper"
                >
                    <HashRouter>
                        <Switch>
                            <Route path="/" exact component={Login} />
                            <Route path="/404" exact component={NotFound} />
                            <Route path="/login" component={Login} />
                            <Route path="/app" component={App} />
                        </Switch>
                    </HashRouter>
                </Spin>
            </LocaleProvider>
        );
    }
}
export default Router;