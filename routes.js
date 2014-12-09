var requireDirectory = require('require-directory');

module.exports = function(server) {
	
	var controller = requireDirectory(module, './controllers');
   
    // Array of routes for Hapi
    var routeTable = [
        {
					method: 'GET',
					path: '/api/sales',
					config: controller.base.all_sales
        },
			
				{
					method: 'GET',
					path: '/api/sales/categories',
					config: controller.base.categories
				},
				{
					method: 'GET',
					path: '/api/sales/search',
					config: controller.base.search
				},
				{
					method: 'GET',
					path: '/api/sales/providers',
					config: controller.base.providers
				}

    ];
    return routeTable;
};