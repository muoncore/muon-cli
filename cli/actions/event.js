
var Table = require('cli-table');
var _ = require('underscore');
var util = require("../util")

module.exports.emit = function (muon, args) {

    if (process.stdin.isTTY) {
        processCommand(muon, args, function(data) {
            render([data])
        })
    } else {
        processStreamInput(muon, args)
    }
}

function render(data) {
    var table = new Table({
        head: ['STATUS', 'ORDER ID', 'EVENT TIME', 'DESCRIPTION']
        , colWidths: [12, 25, 25, 50]
    });

    for (var k in data) {
        table.push(data[k])
    }
    console.log(table.toString())
    util.exit()
}

function processStreamInput(muon, args) {

    var streamCompleted = false;

    process.stdin.pipe(require('split')()).on('data', processLine).on("end", function() {
        streamCompleted = true;
    });

    var commandsOutstanding = 0;

    var data = []

    function processLine (line) {
        if (line != null && line.length > 0) {
            commandsOutstanding++;
            processCommand(muon, [line], function(funcdata){
                commandsOutstanding--;
                data.push(funcdata)
                if (commandsOutstanding == 0 && streamCompleted) {
                    render(data)
                }
            });
        }
    }
}

function processCommand(muon, args, done) {
    if (! args[0]) args[0] = '{}';
    var payload = JSON.parse(args[0]);

    payload["service-id"] = "cli"

    muon.emit(payload).then(function(result) {
        logger.trace("EVENT RESPONSE: \n" + JSON.stringify(result));
        done([result.status,
            result.orderId,
            result.eventTime, result.cause])
    }).catch(function(error) {
        console.log("ERROR IS " + error)
        done(["","","",error])
    })
}