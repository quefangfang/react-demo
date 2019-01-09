import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import asyncComponent from '@/utils/asyncComponent';
import './form.css';
const BasicForm = asyncComponent(() => import('@/pages/form/BasicForm'));
const StepForm = asyncComponent(() => import('@/pages/form/StepForm'));
const Advancedform = asyncComponent(() => import('@/pages/form/Advancedform'));

class FormHome extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="form-page">
          <Switch>
            <Route path="/app/form" exact component={BasicForm} />
            <Route path="/app/form/basicForm" exact component={BasicForm} />
            <Route path="/app/form/stepForm" exact component={StepForm} />
            <Route path="/app/form/advancedform" exact component={Advancedform} />
            <Redirect to="/404" />
        </Switch>  
      </div>
    );
  }
}
export default FormHome;