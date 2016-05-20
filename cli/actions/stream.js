
var Table = require('cli-table');
var util = require("../util")

module.exports = function (muon, args) {
    if (! args[1]) args[1] = '';
    var url = args[0];
    var payload = args[1];


    muon.subscribe(url,
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