
var Table = require('cli-table');
var _ = require('underscore');
var util = require("../util")
var colors = require("colors")

module.exports.introspect = function (muon, args) {

    var service = args[0];
    muon.introspect(service, function(response) {

        var header = new Table()

        var protocolNames = _.collect(response.protocols, function(it) { return it. protocolScheme })

        header.push(
            { 'Service Name': response.serviceName },
            { 'Protocols': protocolNames.join(", ") }
        );

        console.log(colors.bold('\n## Introspection Report ##\n'));
        console.log(header.toString())

        _.each(response.protocols, function(proto) {

            var protoheader = new Table()

            console.log(colors.bold('\n#### ' + proto.protocolName + ' ##\n'));
            protoheader.push(
                { 'Protocol Name': proto.protocolName },
                { 'Scheme': proto.protocolScheme },
                { 'Description': proto.description }
            );

            console.log(protoheader.toString())

            var table = new Table({
                head: ['Endpoint', 'Description']
                , colWidths: [30, 30]
            });

            if (proto.operations.length > 0 && proto.operations != "N/A") {
                _.each(proto.operations, function (op) {

                    var doc = op.doc
                    if (doc == null) doc = ''

                    table.push(
                        [op.resource, doc]
                    );
                });
                console.log(colors.green('\n' + proto.operations.length + ' operations available\n'));
                console.log(table.toString())
            } else {
                console.log(colors.bold(colors.red('\nNo operations are available for this protocol, or they cannot be read\n')));
            }
        })

        util.exit();
    });
}

module.exports.discover = function (muon) {
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
            util.exit();
        }, 4000)

    }