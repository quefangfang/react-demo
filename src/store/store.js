import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';
import * as global from './global/reducer';
const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
        : compose;

console.log('composeEnhancers', composeEnhancers)
let store =
    process.env.NODE_ENV === 'production'
        ? createStore(
            combineReducers({ ...global }),
            compose(applyMiddleware(thunk))
        )
        : createStore(
            combineReducers({ ...global }),
            composeEnhancers(applyMiddleware(thunk, createLogger()))
        );

export default store;
