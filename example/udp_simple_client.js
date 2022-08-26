const udp = require('dgram');

const serverIp = 'localhost';
const serverPort = 42000;

// creating a client socket
const client = udp.createSocket('udp4');
client._mtu = 9216;

client.on('message', function(msg, info) {
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
});

const str = new Array(client._mtu).join('1');
const data = Buffer.from(str);
client.send(data, serverPort, serverIp, function(error) {
  if (error) {
    console.log('ERROR CLIENT!');
    console.error(error);
    client.close();
  } else {
    console.log('Data sent 1 !!!');
  }
});
