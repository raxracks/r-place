Math.clamp = (e, t, n) => (e > n ? n : e < t ? t : e);
const socket = io(),
  canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d');
var image,
  cX = 0,
  cY = 0,
  zoom = 0,
  mousedown = !1,
  panXstart = 0,
  panYstart = 0,
  panX = 0,
  panY = 0,
  drawColor = [0, 0, 0];
function i2xy(e, t) {
  return { x: e % t, y: Math.floor((e - (e % t) + 1) / t) };
}
function hexToRgb(e) {
  return (
    (rgb = []),
    (e = e.substr(1)),
    (rgb[0] = parseInt(e.substr(0, 2), 16)),
    (rgb[1] = parseInt(e.substr(2, 2), 16)),
    (rgb[2] = parseInt(e.substr(4, 2), 16)),
    rgb
  );
}
function modal(e, t) {
  (document.getElementById('Modal').style.display = 'grid'),
    (document.getElementById('ModalTitleText').innerHTML = e),
    (document.getElementById('ModalBodyText').innerHTML = t);
}
function closeModal() {
  document.getElementById('Modal').style.display = 'none';
}
function switchZoom() {
  10 == zoom ? (zoom = 1) : (zoom += 1), resizeCanvas(zoom);
}
function help() {
  modal(
    'Place',
    'There is an empty canvas<br/><br/>You may place a tile upon it but you must wait to place another<br/><br/>Individually you can create something<br/><br/>Together you can create something more',
  );
}
function setupCanvas() {
  (canvas.width = image.width),
    (canvas.height = image.height),
    (zoom = 1),
    (document.getElementById('pixel').style.width = '1px'),
    (document.getElementById('pixel').style.height = '1px'),
    (document.getElementById('pixel').style.left =
      canvas.getBoundingClientRect().x + 'px'),
    (document.getElementById('pixel').style.top =
      canvas.getBoundingClientRect().y + 'px'),
    (canvas.style.left = panX = canvas.getBoundingClientRect().x),
    (canvas.style.top = panY = canvas.getBoundingClientRect().y),
    canvas.addEventListener('click', () => {
      socket.emit('command', 'setPixel', [cY * image.width + cX, drawColor]);
    }),
    canvas.addEventListener('mousemove', (e) => {
      var t = e.target.getBoundingClientRect(),
        n = Math.round(e.clientX - t.left),
        a = Math.round(e.clientY - t.top);
      (cX = Math.clamp(Math.round(n / zoom), 0, image.width - 1)),
        (cY = Math.clamp(Math.round(a / zoom), 0, image.height - 1));
      var o = cX * zoom,
        i = cY * zoom;
      (document.getElementById('pixel').style.left = o + t.x + 'px'),
        (document.getElementById('pixel').style.top = i + t.y + 'px'),
        updateCoords();
    });
}
function refreshCanvas() {
  for (let t = 0; t < image.data.length; t++) {
    var e = i2xy(t, image.width);
    setPixel(e.x, e.y, image.data[t][0], image.data[t][1], image.data[t][2]);
  }
}
function setPixel(e, t, n, a, o) {
  (ctx.fillStyle = 'rgb(' + n + ',' + a + ',' + o + ')'),
    ctx.fillRect(e, t, 1, 1);
}
function resizeCanvas(e) {
  (canvas.width = image.width * e),
    (canvas.height = image.height * e),
    ctx.scale(e, e),
    refreshCanvas(),
    (zoom = e),
    updateCoords(),
    (document.getElementById('pixel').style.width = e + 'px'),
    (document.getElementById('pixel').style.height = e + 'px'),
    (document.getElementById('pixel').style.left =
      canvas.getBoundingClientRect().x + 'px'),
    (document.getElementById('pixel').style.top =
      canvas.getBoundingClientRect().y + 'px');
}
function updateCoords() {
  document.getElementById('coords').innerText = `(${cX},${cY}) ${zoom}x`;
}
document.getElementById('colorPicker').addEventListener('change', () => {
  (document.getElementById('colorPickerButton').style.backgroundColor =
    document.getElementById('colorPicker').value),
    (drawColor = hexToRgb(document.getElementById('colorPicker').value));
}),
  addEventListener('mousemove', (e) => {
    if (mousedown) {
      var t = e.clientX - panXstart,
        n = e.clientY - panYstart;
      (panX += t),
        (panY += n),
        (panX = Math.clamp(panX, -canvas.width, window.innerWidth)),
        (panY = Math.clamp(panY, -canvas.height, window.innerHeight)),
        (panXstart = e.clientX),
        (panYstart = e.clientY),
        (canvas.style.left = panX + 'px'),
        (canvas.style.top = panY + 'px');
      var a = canvas.getBoundingClientRect(),
        o = cX * zoom,
        i = cY * zoom;
      (document.getElementById('pixel').style.left = o + a.x + 'px'),
        (document.getElementById('pixel').style.top = i + a.y + 'px');
    }
  }),
  addEventListener('mouseup', () => {
    mousedown = !1;
  }),
  addEventListener('mousedown', (e) => {
    (panXstart = e.clientX), (panYstart = e.clientY), (mousedown = !0);
  }),
  addEventListener('touchmove', (e) => {
    if (mousedown) {
      var t = e.touches[0].clientX - panXstart,
        n = e.touches[0].clientY - panYstart;
      (panX += t),
        (panY += n),
        (panX = Math.clamp(panX, -canvas.width, window.innerWidth)),
        (panY = Math.clamp(panY, -canvas.height, window.innerHeight)),
        (panXstart = e.touches[0].clientX),
        (panYstart = e.touches[0].clientY),
        (canvas.style.left = panX + 'px'),
        (canvas.style.top = panY + 'px');
      var a = canvas.getBoundingClientRect(),
        o = cX * zoom,
        i = cY * zoom;
      (document.getElementById('pixel').style.left = o + a.x + 'px'),
        (document.getElementById('pixel').style.top = i + a.y + 'px');
    }
  }),
  addEventListener('touchend', () => {
    mousedown = !1;
  }),
  addEventListener('touchstart', (e) => {
    (panXstart = e.touches[0].clientX),
      (panYstart = e.touches[0].clientY),
      (mousedown = !0);
  }),
  socket.on('command', (e, t) => {
    var n = {
      recievePixelUpdate: (e, t) => {
        image.data[e] = t;
        var n = i2xy(e, image.width);
        setPixel(n.x, n.y, t[0], t[1], t[2]);
      },
      recieveImage: (e) => {
        (image = e), setupCanvas(), refreshCanvas(), updateCoords();
      },
    };
    if (!(e in n)) throw new Error('Unkown Socket Command: ' + e);
    n[e].apply(null, t);
  }),
  socket.emit('command', 'getImage');
