const canvas = $('#canvas')[0];
const ctx = canvas.getContext('2d');
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

let mouseDown = false;
let zoom = 1;
let panX = screen.availWidth / 2 - canvas.width / 2;
let panY = 0;
let startPanX = screen.availWidth / 2;
let startPanY = screen.availHeight / 2;
let pixelSize = 2;
let mouseX = 0;
let mouseY = 0;
let mouseXReal = 0;
let mouseYReal = 0;
let startMouseX = 0;
let startMouseY = 0;

let width = 1000;
let height = 1000;

canvas.width = width * pixelSize;
canvas.height = height * pixelSize;

canvas.style.left = panX = canvas.getBoundingClientRect().x;
canvas.style.top = panY = canvas.getBoundingClientRect().y;

window.addEventListener('wheel', (event) => {
  zoom += event.deltaY * -0.005;

  zoom = clamp(zoom, 0.125, 20);

  $('#container')[0].style.transform = `scale(${zoom})`;
  $('#coordinates').text(`(${mouseX}, ${mouseY}) ${zoom}x`);

  // $('#username')[0].style.display = 'none';
});

canvas.addEventListener('mousedown', () => {
  startMouseX = mouseXReal;
  startMouseY = mouseYReal;
});

canvas.addEventListener('mouseup', () => {
  if (
    Math.abs(mouseXReal - startMouseX) < 10 &&
    Math.abs(mouseYReal - startMouseY) < 10
  ) {
    ctx.fillStyle = $('#color')[0].value.slice(1);
    ctx.fillRect(mouseX * pixelSize, mouseY * pixelSize, pixelSize, pixelSize);

    socket.emit('set pixel', {
      x: mouseX,
      y: mouseY,
      color: $('#color')[0].value.slice(1),
      user: localStorage.getItem('name'),
    });
  }
});

// canvas.addEventListener(
//   'contextmenu',
//   function (ev) {
//     ev.preventDefault();

//     socket.emit('get user', {
//       x: mouseX,
//       y: mouseY,
//     });

//     return false;
//   },
//   false,
// );

canvas.addEventListener('mousemove', (event) => {
  mouseXReal = event.clientX;
  mouseYReal = event.clientY;

  var boundingRect = event.target.getBoundingClientRect();
  let xOffset = Math.round(event.clientX - boundingRect.left) / zoom - 1;
  let yOffset = Math.round(event.clientY - boundingRect.top) / zoom - 1.25;

  mouseX = clamp(Math.round(xOffset / pixelSize), 0, width);
  mouseY = clamp(Math.round(yOffset / pixelSize), 0, height);

  $('#coordinates').text(`(${mouseX}, ${mouseY}) ${zoom}x`);
});

window.addEventListener('mousemove', (event) => {
  if (mouseDown) {
    let offsetX = event.clientX - startPanX;
    let offsetY = event.clientY - startPanY;

    panX += offsetX / zoom;
    panY += offsetY / zoom;

    panX = clamp(panX, -canvas.width + 50, window.innerWidth - 50);
    panY = clamp(panY, -canvas.height + 50, window.innerHeight - 50);

    startPanX = event.clientX;
    startPanY = event.clientY;

    canvas.style.left = panX + 'px';
    canvas.style.top = panY + 'px';

    // $('#username')[0].style.display = 'none';
  }
});

window.addEventListener('mouseup', () => {
  mouseDown = false;
});

window.addEventListener('mousedown', (event) => {
  startPanX = event.clientX;
  startPanY = event.clientY;
  mouseDown = true;
});

fetch('/read/board').then((res) => {
  res.json().then((data) => {
    Object.keys(data).forEach((pos) => {
      let [x, y] = pos.split('|');
      ctx.fillStyle = `#${data[pos].color}`;
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    });
  });
});
