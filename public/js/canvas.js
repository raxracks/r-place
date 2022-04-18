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

let width = 300;
let height = 300;

canvas.width = width * pixelSize;
canvas.height = height * pixelSize;

canvas.style.left = screen.availWidth / 2 - canvas.width / 2 + 'px';
canvas.style.top = screen.availHeight / 2 - canvas.height / 2 + 'px';

ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = '#000000';
ctx.fillRect(0, 0, pixelSize, pixelSize);

document.body.addEventListener('mousemove', (event) => {
  if (mouseDown) {
    let offsetX = event.clientX - startPanX;
    let offsetY = event.clientY - startPanY;

    panX += offsetX;
    panY += offsetY;

    panX = clamp(panX, -canvas.width, window.innerWidth);
    panY = clamp(panY, -canvas.height, window.innerHeight);

    startPanX = event.clientX;
    startPanY = event.clientY;

    canvas.style.left = panX + 'px';
    canvas.style.top = panY + 'px';
  }
});

document.body.addEventListener('mouseup', () => {
  mouseDown = false;
});

document.body.addEventListener('mousedown', (event) => {
  startPanX = event.clientX;
  startPanY = event.clientY;
  mouseDown = true;
});

document.body.addEventListener('wheel', (event) => {
  zoom += event.deltaY * -0.01;

  zoom = clamp(zoom, 0.75, 20);

  canvas.style.width = width * zoom;
  canvas.style.height = height * zoom;
});

function resize() {}
