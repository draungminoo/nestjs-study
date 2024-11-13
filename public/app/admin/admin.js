import { io } from 'https://cdn.socket.io/4.8.0/socket.io.esm.min.js';

const checkConnectionButton = document.getElementById('check-connection');

const adminSocket = io('http://localhost:3000/beds-admin', {
  transports: ['websocket'],
  query: { token: '123' },
});

adminSocket.on('connect', () => {
  console.log(adminSocket.id);
});

adminSocket.on('disconnect', () => {
  console.log('Scoket is disconnected');
});

adminSocket.on('incoming-bed-request', ({ clientId, bedNo }) => {
  console.log(`Do you want to accept ${bedNo} requested by ${clientId}`);
  // const ask = confirm(
  //   `Do you want to accept ${bedNo} requested by ${clientId}`,
  // );

  // if (ask) {
  //   adminSocket.emit('accept-bed-no', { clientId, bedNo });
  // }
});

checkConnectionButton.onclick = (e) => {
  console.log('Socket is connected or not: ', adminSocket.connected);
};
