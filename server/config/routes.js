/**
 * Dependencies.
 */
var requireDirectory = require('require-directory');

module.exports = function(server) {
    // Bootstrap your controllers so you dont have to load them individually. This loads them all into the controller name space. https://github.com/troygoode/node-require-directory
    var controller = requireDirectory(module, '../controllers');

    // Array of routes for Hapi
    var routeTable = [{
        method: 'GET',
        path: '/fbconfirm',
        config: controller.base.fbconfirm
    }, {
        method: 'GET',
        path: '/',
        config: controller.base.index
    }, {
        method: 'GET',
        path: '/{path*}',
        config: controller.base.missing
    }, {
        method: 'GET',
        path: '/partials/{path*}',
        config: controller.assets.partials
    }, {
        method: 'GET',
        path: '/img/{path*}',
        config: controller.assets.images
    }, {
        method: 'GET',
        path: '/css/{path*}',
        config: controller.assets.css
    }, {
        method: 'GET',
        path: '/fonts/{path*}',
        config: controller.assets.fonts
    }, {
        method: 'GET',
        path: '/js/{path*}',
        config: controller.assets.js
    }, {
        method: 'POST',
        path: '/process_email/{email}',
        config: controller.email.storeEmail
    }];
    return routeTable;
}