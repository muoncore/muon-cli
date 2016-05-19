
var Table = require('cli-table');


module.exports.introspect = function (muon, args) {

    var service = args[0];
    muon.introspect(service, function(response) {

        console.dir(response);
        process.exit();
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
            exit();
        }, 4000)


    }