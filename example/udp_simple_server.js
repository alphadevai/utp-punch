const udp = require('dgram');

const server = udp.createSocket('udp4');
server._mtu = 10000;

// emits when any error occurs
server.on('error', function(error) {
  console.log('Error: ' + error);
  server.close();
});

// emits on new datagram msg
server.on('message', function(msg, info) {
  console.log('Data received from client : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);

  server.send(msg, info.port, info.address, function(error) {
    if (error) {
      console.log('ERROR!!!');
      console.error(error);
    } else {
      console.log('Data sent !!!');
    }
  });
});

// emits when socket is ready and listening for datagram msgs
server.on('listening', function() {
  const address = server.address();
  const port = address.port;
  const family = address.family;
  const ipaddr = address.address;
  console.log('Server is listening at port' + port);
  console.log('Server ip :' + ipaddr);
  console.log('Server is IP4/IP6 : ' + family);
});

// emits after the socket is closed using socket.close();
server.on('close', function() {
  console.log('Socket is closed !');
});

server.bind(42000);
