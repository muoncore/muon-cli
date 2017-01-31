#!/usr/bin/env node

var _ = require("underscore")


var rpc = require("./actions/rpc")
var builtin = require("./actions/builtin")
var stream = require("./actions/stream")
var event = require("./actions/event")

// var validAmqpUrl =  Joi.validate(amqpUrl,  Joi.string().uri().required());

// if (validAmqpUrl.error) {
//     logger.error('amqp env variable url invalid! MUON_URL=' + amqpUrl);
//     logger.error('export MUON_URL=amqp://muon:microservices@localhost:5672');
//     exit();
// }


var tab = require('tabtab')({
    name: 'program',
    cache: false
});

tab.on('introspect', builtin.introspect.complete)
tab.on('rpc', rpc.complete)

tab.on('simple', function(data, done) {
    // General handler

    if (data.partial.endsWith("woot")) {
        done(null, ['woot/happy', 'woot/not']);
    } else {
        done(null, ["woot/"]);
    }
});


// General handler. Gets called on `program <tab>` and `program stuff ... <tab>`
tab.on('program', function(data, done) {
    // General handler

    if (data.words == 1) {
        done(null, ['discover', 'introspect', "rpc", "stream", "emit", "replay", "simple"]);
    } else if(data.line.contains("rpc")) {
        // rpc.complete(data, done)
    }
});

tab.start();

function withMuon(exec) {
    var muon = muoncore.create(cliName, amqpUrl);
    exec(muon)
}

function exit() {
    process.exit(0);
}
