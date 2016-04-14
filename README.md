# muon-cli

```
sudo npm install -g muon-cli
export MUON_URL=<your muon trasnport url, eg: amqp://muon:microservices@localhost:5672>
muon -d
```

And, if you've got the MUON_URL variable set correctly to a RabbitMQ hosting a muon instance, you should see something like this:


```
user@machine ~ $ export MUON_URL=amqp://muon:microservices@localhost:5672
user@machine ~ $ muon -d
OK: muon cli connected: amqp://muon:microservices@localhost:5672
Thu, 14 Apr 2016 13:03:25 GMT [info] in builder.js:23 Using AMQP
Thu, 14 Apr 2016 13:03:25 GMT [info] in transport.js:9 [*** TRANSPORT:BOOTSTRAP ***] creating new MUON AMQP Transport connection with url=amqp://muon:microservices@localhost:5672
Thu, 14 Apr 2016 13:03:25 GMT [info] in server.js:13 [*** TRANSPORT:SERVER:BOOTSTRAP ***] advertise service on muon discovery 'muon-cli-99040de5-f948-48f3-86f6-ff3869f670ad'
Thu, 14 Apr 2016 13:03:25 GMT [info] in amqp-api.js:83 [*** TRANSPORT:AMQP-API:BOOTSTRAP ***] connecting to amqp amqp://muon:microservices@localhost:5672
Thu, 14 Apr 2016 13:03:25 GMT [info] in amqp-discovery.js:17 AMQP Discovery is ready!!
Thu, 14 Apr 2016 13:03:25 GMT [info] in server.js:24 [*** TRANSPORT:SERVER:HANDSHAKE ***] muon service 'muon-cli-99040de5-f948-48f3-86f6-ff3869f670ad' listening for negotiation messages on amqp queue 'service.muon-cli-99040de5-f948-48f3-86f6-ff3869f670ad'
┌──────────────────────────────┬──────────────────────────────┬──────────────────────────────┐
│ SERVICE NAME                 │ TAGS                         │ CONTENT/TYPE                 │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ muon-dev-tools               │ node,muon-dev-tools          │ application/json             │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ muon-cli-99040de5-f948-48f3… │ node,muon-cli-99040de5-f948… │ application/json             │
└──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
user@machine ~ $
```
