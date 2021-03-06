import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import '@/assets/css/reset.css';
import Router from '@/router/index';
import store from '@/store/store';

const render = Component => {
    ReactDOM.render(
        <Provider store={store}>
            <Component store={store} />
        </Provider>
        ,
        document.getElementById('root')
    );
};

render(Router);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
