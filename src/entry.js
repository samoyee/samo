import { createHashHistory } from "history";
import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { Route, Router } from 'react-router';
import asyncComponent from 'utils/asyncComponent';
import store from './store';

const history = createHashHistory();

render(
    <Provider store={store}>
        <Router history={history}>
            <Route exact path="/" component={asyncComponent(() => import(/* webpackChunkName: 'home' */  "./pages/home"))} />
        </Router>
    </Provider>,
    document.getElementById("app")
);