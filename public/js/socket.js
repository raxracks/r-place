const socket = io();

socket.on('update pixel', (msg) => {
  ctx.fillStyle = `#${msg.color}`;
  ctx.fillRect(msg.x * pixelSize, msg.y * pixelSize, pixelSize, pixelSize);
});

// socket.on('user info', (msg) => {
//   $('#username').text(msg);
//   $('#username')[0].style.display = 'block';
// });
