import { atob } from 'buffer';
import { io } from 'https://cdn.socket.io/4.8.0/socket.io.esm.min.js';

const bedRequestButton = document.getElementById('bed-request-button');
const bedNoInput = document.getElementById('bed-no');

const socket = io('http://localhost:3000/beds', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log(socket.id);

  socket.on(`bed-no-accepted-${socket.id}`, (bedNo) => {
    console.log(`Your bed no is accepted. Bed No. ${bedNo}`);
    alert(`Your bed no is accepted. Bed No. ${bedNo}`);
  });
});

bedRequestButton.onclick = (e) => {
  if (socket.connected) {
    const bedNo = bedNoInput.value;
    socket.emit('requst-bed', bedNo);
  } else {
    console.log('Socket is not connected');
  }
};
