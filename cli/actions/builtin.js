
var Table = require('cli-table');
var _ = require('underscore');
var util = require("../util")

module.exports.introspect = function (muon, args) {

    var service = args[0];
    muon.introspect(service, function(response) {

        console.dir(response);
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