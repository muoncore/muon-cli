# muon-cli
installs a minimal muon command line to introspect in to muon state and services


# Getting started

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
┌──────────────────────────────┬──────────────────────────────┬──────────────────────────────┐
│ SERVICE NAME                 │ TAGS                         │ CONTENT/TYPE                 │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ muon-dev-tools               │ node,muon-dev-tools          │ application/json             │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────────┤
│ muon-cli-99040de5-f948-48f3… │ node,muon-cli-99040de5-f948… │ application/json             │
└──────────────────────────────┴──────────────────────────────┴──────────────────────────────┘
user@machine ~ $
```
