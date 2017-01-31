
var Table = require('cli-table');
var _ = require('underscore');
var util = require("../util")

module.exports = function (muon, args) {
    if (! args[1]) args[1] = ' ';
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

        bodyString = JSON.stringify(body);
        console.log(typeof body);

        table.push(
            [status, content_type, bodyString]
        );
        if (response) {
            console.log(table.toString());
            console.log('\n========= RESPONSE FULL BODY: ============================================================================\n');
            console.dir(body );
            console.log('\n');
        } else {
            console.log("no results");
            console.log(JSON.stringify(response));
        }

        util.exit();
    });
}

module.exports.complete = function(data, done) {


    withMuon(function (muon) {

        var discovery = muon.discovery();

        done(null, [JSON.stringify(discovery)])
        // if (data.words < 3) {
            discovery.discoverServices(function (services) {

                done(null, ["hello", "world2"])


                // done(null, ["HAPPY"]);
                // return
                // var serviceList = _.map(services.serviceList, function (service) {
                //     return service.identifier
                // });
                //
                // done(null, serviceList);
                // util.exit()
            });
        // } else {
        //     muon.introspect(data.last, function(response) {
        //
        //         var rpcProto = _.find(response.protocols, function(prot) { return prot.protocolScheme == "rpc" })
        //
        //         var endpointList= _.map(rpcProto.operations, function (op) {
        //             return op.resource
        //         });
        //
        //         done(null, endpointList);
        //         exit()
        //     })
        // }
    })
}


var muoncore = require('muon-core');
var amqpUrl = process.env.MUON_URL;
var cliName = "muon-cli"

function withMuon(exec) {
    var muon = muoncore.create(cliName, amqpUrl);
    exec(muon)
}