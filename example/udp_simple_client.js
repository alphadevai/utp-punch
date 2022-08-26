const udp = require('dgram');

// -------------------- udp client ----------------
// const buffer = require('buffer');

// creating a client socket
const client = udp.createSocket('udp4');
client._mtu = 9217;

client.on('message', function(msg, info) {
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
});

const str = new Array(client._mtu).join('1');
const data = Buffer.from(str);
client.send(data, 2222, 'localhost', function(error) {
  if (error) {
    console.log('ERROR CLIENT!');
    console.error(error);
    client.close();
  } else {
    console.log('Data sent 1 !!!');
  }
});
