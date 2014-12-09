require('dotenv').load();
var collections = ['sales_rue', 'sales_myhabit', 'sales_hautelook', 'sales_jackthreads', 'sales_ideel', 'sales_gilt'];
var db = require("mongojs").connect(process.env.SLASHED_MONGODB_URL, collections);
var Joi = require('joi');
var _ = require('underscore');
var loading = 'Loading sales...';


String.prototype.replaceArray = function(find, replace) {
  var replaceString = this;
  var regex;
  for (var i = 0; i < find.length; i++) {
    regex = new RegExp(find[i], "g");
    replaceString = replaceString.replace(regex, replace[i]);
  }
  return replaceString;
};


module.exports = {
  all_sales: {
    handler: function(request, reply) {

      "use strict";

      var limit = request.query.limit || 20;
      var skip = request.query.offset || 0;
      var findObj = {};


      db.deals.find(findObj).skip(skip).sort({
        insert_date: -1
      }).limit(limit, function(err, results) {
        if (results.length === 0) reply(loading);

        if (results.length !== 0) {
          var cachedResults = _.shuffle(results);
          reply(cachedResults);
        }



      });
    },

    validate: {
      query: {
        limit: Joi.number().integer().min(1).max(50).
        default (20),
        offset: Joi.number().min(1).max(100).integer(),
        category: Joi.string(),
        city: Joi.string(),
        provider: Joi.string(),
        region: Joi.string()
      }
    }

  },



  categories: {
    handler: function(request, reply) {
      db.categories.find({}, function(err, results) {
        reply(results);
      });
    }

  },

  providers: {
    handler: function(request, reply) {
      db.providers.find({}, function(err, results) {
        reply(results);
      });
    }

  },


  search: {
    handler: function(request, reply) {

      var q = request.query.q;
      var limit = request.query.limit || 20;
      var skip = request.query.offset || 0;

      q = q.trim();
      db.deals.find({
        $text: {
          $search: q
        }
      }, {
        score: {
          $meta: "textScore"
        }
      }).sort({
        score: {
          $meta: "textScore"
        }
      }).limit(limit, function(err, results) {
        reply(results);
      });


    },

    validate: {
      query: {
        q: Joi.string(),
        limit: Joi.number().integer().min(1).max(50).
        default (20),
        offset: Joi.number().min(1).max(100).integer(),
				location: Joi.string()
      }
    }

  },


};