#!/usr/bin/env node



var muoncore = require('muon-core');
var cli = require('cli').enable('status');
require('sexylog');
var url = require('url');
var Joi = require('joi');
var _ = require('underscore');
var util = require('util');
var Table = require('cli-table');
var uuid = require('node-uuid');


var cliName = "muon-cli-" + uuid.v4();
var amqpUrl = process.env.MUON_URL;


var cliobj;

cli.parse({
        // discover:   ['d', 'discover muon services'],

    },
    {
        "introspect":"Tap into a remote stream exposed by a service and output to standard out",
        "discover":"Tap into a remote stream exposed by a service and output to standard out",
        "rpc":"<url <payload>"
    });

cli.main(function(args, options) {
    cliobj = this;

    var validAmqpUrl =  Joi.validate(amqpUrl,  Joi.string().uri().required());

    if (validAmqpUrl.error) {
        logger.error('amqp env variable url invalid! MUON_URL=' + amqpUrl);
        logger.error('export MUON_URL=amqp://muon:microservices@localhost:5672');
        exit();
    }
    cliobj.ok('muon cli connected: ' + amqpUrl);
    logger.trace("rpc() args=" + JSON.stringify(args));

    switch(cli.command) {
        case "discover":
            discover();
            break;
        case "introspect":
            introspect(args);
            break;
        case "rpc":
            rpc(args);
            break;
        default:
            logger.error("Unknown command " + cli.command);
    }

});


function introspect(args) {
  logger.warn("not implemented, soz.");
}


function rpc(args) {

  var muon = muoncore.create(cliName, amqpUrl);
  var url = args[0];
  var payload = args[1];
  muon.request(url, payload, function(response) {
      logger.trace("RPC RESPONSE: \n" + JSON.stringify(response));
      var table = new Table({
          head: ['STATUS', 'CONTENT/TYPE', 'BODY']
        , colWidths: [12, 30, 60]
      });

      var status =  (response.status) ? response.status : "N/A";
      var content_type = (response.content_type) ? response.content_type : "N/A";
      var body = (response.body) ? response.body : "N/A";

      table.push(
          [status, content_type, body]
      );
      if (response) {
        console.log(table.toString());
      } else {
        console.log("no results");
        console.log(JSON.stringify(response));
      }


      process.exit();

  });
}

function discover() {
    var muon = muoncore.create(cliName, amqpUrl);
    var discovery = muon.discovery();

    setTimeout(function() {

            var table = new Table({
                head: ['SERVICE NAME', 'TAGS', 'CONTENT/TYPE']
              , colWidths: [30, 30, 30]
            });

            discovery.discoverServices(function(services) {
                    //console.log(services);
                    _.each(services.serviceList, function(service) {
                        table.push(
                            [service.identifier, service.tags, service.codecs]
                        );
                    });
             });


             console.log(table.toString());
             exit();
    }, 4000)


}

var validate = function(err, value) {
    logger.info(err);


    if (err) {
        logger.error(value);
        exit();
    }
}

function exit() {
    process.exit(0);
}
