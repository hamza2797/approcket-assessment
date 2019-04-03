/* eslint-disable no-restricted-properties */
import React from 'react';
import { Route } from 'react-router';
import App from '../App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
    require.ensure = function requireModule(deps, callback) {
        callback(require);
    };
}

if (process.env.NODE_ENV !== 'production') {
    // Require async routes only in development for react-hot-reloader to work.
    require('./modules/Post/pages/PostListPage/PostListPage');
    require('./modules/Post/pages/PostDetailPage/PostDetailPage');
}

// react-router setup with code-splitting
export default (
    <Route path="/" component={App}>
        <Route
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
                });
            }}
        />
        <Route
            path="/posts/:slug-:cuid"
            getComponent={(nextState, cb) => {
                require.ensure([], require => {
                    cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
                });
            }}
        />
    </Route>
);