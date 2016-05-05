# muon-cli
installs a minimal muon command line to introspect in to muon state and services


# Getting started

```
sudo npm install -g muon-cli
export MUON_URL=<your muon trasnport url, eg: amqp://muon:microservices@localhost:5672>
muon discover
```

And, if you've got the MUON_URL variable set correctly to a RabbitMQ hosting a muon instance, you should see something like this:


```
user@machine ~ $ export MUON_URL=amqp://muon:microservices@localhost:5672
user@machine ~ $ muon discover     [ or muon d ]
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



# Run a muon RPC request/response from the cli


first, run the muon-node exmaples service. To do this, checkout the muon-node github project:

```
git clone https://github.com/microserviceux/muon-node.git
cd muon-node
./examples/run-dev-tools-server.sh 
```

Now run some rpc commands against the examples service:

```
muon rpc rpc://muon-dev-tools/echo "I LOVE muon"
OK: muon cli connected: amqp://muon:microservices@localhost:5672
┌────────────┬──────────────────────────────┬────────────────────────────────────────────────────────────┐
│ STATUS     │ CONTENT/TYPE                 │ BODY                                                       │
├────────────┼──────────────────────────────┼────────────────────────────────────────────────────────────┤
│ 200        │ application/json             │ I LOVE muon                                                │
└────────────┴──────────────────────────────┴────────────────────────────────────────────────────────────┘
user@machine ~ $
```


```
muon rpc rpc://muon-dev-tools/ping "ping"
OK: muon cli connected: amqp://muon:microservices@localhost:5672
┌────────────┬──────────────────────────────┬────────────────────────────────────────────────────────────┐
│ STATUS     │ CONTENT/TYPE                 │ BODY                                                       │
├────────────┼──────────────────────────────┼────────────────────────────────────────────────────────────┤
│ 200        │ application/json             │ pong                                                       │
└────────────┴──────────────────────────────┴────────────────────────────────────────────────────────────┘
```



```
muon rpc rpc://muon-dev-tools/uuid 
OK: muon cli connected: amqp://muon:microservices@localhost:5672
┌────────────┬──────────────────────────────┬────────────────────────────────────────────────────────────┐
│ STATUS     │ CONTENT/TYPE                 │ BODY                                                       │
├────────────┼──────────────────────────────┼────────────────────────────────────────────────────────────┤
│ 200        │ application/json             │ 1233a532-6216-481b-816b-7fab09802072                       │
└────────────┴──────────────────────────────┴────────────────────────────────────────────────────────────┘
```


```
muon rpc rpc://muon-dev-tools/random
OK: muon cli connected: amqp://muon:microservices@localhost:5672
┌────────────┬──────────────────────────────┬────────────────────────────────────────────────────────────┐
│ STATUS     │ CONTENT/TYPE                 │ BODY                                                       │
├────────────┼──────────────────────────────┼────────────────────────────────────────────────────────────┤
│ 200        │ application/json             │ 61249                                                      │
└────────────┴──────────────────────────────┴────────────────────────────────────────────────────────────┘
```



# Introspection

If you have an instance of photon connected to your muon transport, you can query the photon service like so:

```
 muon i photon
```
