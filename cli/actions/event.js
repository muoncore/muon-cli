
var Table = require('cli-table');
var _ = require('underscore');
var util = require("../util")

module.exports.emit = function (muon, args) {
    if (! args[0]) args[0] = '{}';
    var payload = JSON.parse(args[0]);

    payload["service-id"] = "cli"

    muon.emit(payload).then(function(result) {
        logger.trace("EVENT RESPONSE: \n" + JSON.stringify(result));

        if (result.status != "PERSISTED") {
            fail(result)
        } else {

            var table = new Table({
                head: ['STATUS', 'ORDER ID', 'EVENT TIME']
                , colWidths: [12, 30, 30]
            });

            table.push(
                [result.status,
                    result.orderId,
                    result.eventTime]
            );

            console.log(table.toString());
        }
        util.exit();
    }).catch(function(error) {
        fail(error)
        util.exit();
    })
}


function fail(result) {
    var table = new Table({
        head: ['STATUS', 'CAUSE']
        , colWidths: [9, 130]
    });

    table.push(
        [result.status,
            result.cause]
    );

    console.log(table.toString());
}