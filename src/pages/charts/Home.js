import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '@/utils/asyncComponent';
const Echarts = asyncComponent(() => import('@/pages/charts/Echarts'));
class Charts extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="form-page">
          <Switch>
            <Route path="/app/charts" exact component={Echarts} />
            <Route path="/app/charts/echarts" exact component={Echarts} />
            <Redirect to="/404" />
        </Switch>  
      </div>
    );
  }
}
export default Charts;