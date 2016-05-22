
var Table = require('cli-table');
var util = require("../util")

module.exports.stream = function (muon, args) {
    if (! args[1]) args[1] = '{}';
    var url = args[0];
    var params = JSON.parse(args[1]);

    muon.subscribe(url,
        params,
        function(data) {
            console.dir(data)
        },
        function(error) {
            logger.error("Error reported in the stream: " + JSON.stringify(error))
            util.exit()
        },
        function() {
            logger.debug("Stream is completed by the remote")
            util.exit()
        }
    )
}

module.exports.replay = function (muon, args) {
    if (! args[1]) args[1] = '{}';
    var stream = args[0];
    var payload = JSON.parse(args[1]);
    //todo, joi parse the config 
    muon.replay(stream,
        payload,
        function(data) {
            console.dir(data)
        },
        function(error) {
            logger.error("Error reported in the stream: " + JSON.stringify(error))
            util.exit()
        },
        function() {
            logger.debug("Stream is completed by the remote")
            util.exit()
        }
    )
}