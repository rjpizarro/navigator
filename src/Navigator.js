import React, {Component} from 'react';
import _ from 'lodash';
import createHistory from 'history/createBrowserHistory'

const history = createHistory();

class Navigator extends Component {
    /**
     *
     * @param {callback} callback
     */
    static browserHistoryListener(callback) {
        history.listen((location) => {
            callback(location);
        });
    }

    static getHistory() {
        return history;
    }
    /**
     *
     * @param {Object[]} routes
     * @param {string} routes[].path
     * @param {string} routes[].key
     * @param {string} routes[].parentKey
     * @return {*|T|{path: string, key: string, parentKey: string}}
     */
    static getCurrentRoute(routes) {
        const location = history.location;

        const routeByPath = _.find(routes, route => location.pathname === route.path);

        return routeByPath || {path: '/', key: 'root', parentKey: 'root'}
    }

    /**
     *
     * @param {Object[]} routes
     * @param {string} routes[].path
     * @param {string} routes[].key
     * @param {string} routes[].parentKey
     * @param location
     * @param {Object[]} defaultRoute
     * @param {string} defaultRoute[].path
     * @param {string} defaultRoute[].key
     * @param {string} defaultRoute[].parentKey
     * @return {{path: string, key: string, parentKey: string}}
     */
    static getRouteByPathLocation(routes, location, defaultRoute = undefined) {

        const routeByPath = _.find(routes, route => location.pathname === route.path );

        return routeByPath || defaultRoute || {path: '/', key: 'root', parentKey: 'root'}
    }

    /**
     *
     * @param {string} path
     * @return {boolean|*}
     */
    static isPage(path) {
        const testPath = new RegExp(path);
        return testPath.test(history.location.pathname);
    }

    static isLoginPage(currentRoutePath, loginPath) {
        return (currentRoutePath === loginPath);
    }


    static isEditPage() {
        return /edit/.test(history.location.pathname);
    }

    /**
     *
     * @param {string} route
     * @param {object} [params]
     */
    static push(route, params) {
        let path = (params) ? `${route}/${params}` : route;

        history.push(path);
    };

    static pop() {
        history.goBack();
    };

    /**
     *
     * @param {string} route
     */
    static replace(route) {
        history.replace(route);
    };
}

export default Navigator;