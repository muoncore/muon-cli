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


cli.parse({
    discover:   ['d', 'discover muon services'],
    rpc:  ['rpc', 'remote procedure call url', 'string'],
    stream: ['s', 'print events from stream', 'string']
});
 
cli.main(function(args, options) {

    var validAmqpUrl =  Joi.validate(amqpUrl,  Joi.string().uri().required());

    if (validAmqpUrl.error) {
        logger.error('amqp env variable url invalid! MUON_URL=' + amqpUrl);
        logger.error('export MUON_URL=amqp://muon:microservices@localhost:5672');
        exit();
    }
    this.ok('muon cli connected: ' + amqpUrl);

    if (options.discover) {
        discover();
    } else {
       console.log('mli: discovery/-d');
    }

});


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
    }, 5000)


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