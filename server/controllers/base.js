// This is the base controller. Used for base routes, such as the default index/root path, 404 error pages, and others.
module.exports = {
    index: {
        handler: function(request, reply) {
            // Render the view with the custom greeting
            reply.view('index', {
                title: 'We are making it easy to discover sale events from your favorite fashion brands.- Slashed!'
            });
        },
        app: {
            name: 'index'
        }
    },
    fbconfirm: {
        handler: function(request, reply) {
            reply.view('fbconfirm', {
                title: 'Thank you'
            });
        },
        app: {
            name: 'fbconfirm'
        }
    },
    missing: {
        handler: function(request, reply) {
            reply.view('404', {
                title: 'You found a missing page, but won the 404 error!'
            }).code(404);
        },
        app: {
            name: '404'
        }
    }
};