'use strict';

var util = require('util'),
    Base = require('./base');

var Read = function(args) {
  Read.super_.call(this, args);
};

util.inherits(Read, Base);

Read.prototype.action = 'read';
Read.prototype.method = 'get';
Read.prototype.plurality = 'singular';

Read.prototype.fetch = function(req, res, context) {
  var model = this.model,
      endpoint = this.endpoint,
      criteria = context.criteria || req.params[endpoint.attributes[0]],
      populate = req.query.populate,
      joinProp = {};

  if (!!populate) {
    joinProp[populate] = true;
  }

  return model
    .get(criteria)
    .getJoin(joinProp)
    .then(function(result) {
      context.instance = result;
      return context.continue;
    });
};

module.exports = Read;
