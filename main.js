var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

autoResize();
listenUser();

function listenUser() {
  var using = false;
  var eraserEnable = false;
  var lastPoint = {
    x: undefined,
    y: undefined
  };
  context.strokeStyle = 'black';

  if (document.body.ontouchstart !== undefined) {
    canvas.ontouchstart = function(e) {
      using = true;
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      if (eraserEnable) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        lastPoint = {
          x: x,
          y: y
        };
      }
    };

    canvas.ontouchmove = function(e) {
      if (using) {
        var x = e.touches[0].clientX;
        var y = e.touches[0].clientY;
        if (eraserEnable) {
          context.clearRect(x - 5, y - 5, 10, 10);
        } else {
          var newPoint = {
            x: x,
            y: y
          };
          drawLine(lastPoint, newPoint, 2);
          lastPoint = newPoint;
        }
      }
    };

    canvas.ontouchend = function() {
      using = false;
    };
  } else {
    canvas.onmousedown = function(e) {
      using = true;
      var x = e.clientX;
      var y = e.clientY;
      if (eraserEnable) {
        context.clearRect(x - 5, y - 5, 10, 10);
      } else {
        lastPoint = {
          x: x,
          y: y
        };
      }
    };

    canvas.onmousemove = function(e) {
      if (using) {
        var x = e.clientX;
        var y = e.clientY;
        if (eraserEnable) {
          context.clearRect(x - 5, y - 5, 10, 10);
        } else {
          var newPoint = {
            x: x,
            y: y
          };
          drawLine(lastPoint, newPoint);
          lastPoint = newPoint;
        }
      }
    };

    canvas.onmouseup = function() {
      using = false;
    };
  }

  pen.onclick = function() {
    eraserEnable = false;
    pen.classList.add('active');
    eraser.classList.remove('active');
  };

  eraser.onclick = function() {
    eraserEnable = true;
    eraser.classList.add('active');
    pen.classList.remove('active');
  };

  clear.onclick = function() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  save.onclick = function() {
    var url = canvas.toDataURL('image/png');
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'My Picture';
    a.target = '_blank';
    a.click();
  };

  black.onclick = function() {
    context.strokeStyle = 'black';
    black.classList.add('active');
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.remove('active');
  };

  red.onclick = function() {
    context.strokeStyle = 'red';
    black.classList.remove('active');
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active');
  };

  green.onclick = function() {
    context.strokeStyle = 'green';
    black.classList.remove('active');
    red.classList.remove('active');
    green.classList.add('active');
    blue.classList.remove('active');
  };

  blue.onclick = function() {
    context.strokeStyle = 'blue';
    black.classList.remove('active');
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.add('active');
  };

  thin.onclick = function() {
    context.lineWidth = 2;
    thin.classList.add('active');
    medium.classList.remove('active');
    thick.classList.remove('active');
  };

  medium.onclick = function() {
    context.lineWidth = 3;
    thin.classList.remove('active');
    medium.classList.add('active');
    thick.classList.remove('active');
  };

  thick.onclick = function() {
    context.lineWidth = 6;
    thin.classList.remove('active');
    medium.classList.remove('active');
    thick.classList.add('active');
  };
}

function setCanvasSize() {
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
}

function autoResize() {
  window.onresize = setCanvasSize;
  setCanvasSize();
}

function drawLine(start, end) {
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(end.x, end.y);
  context.stroke();
  context.closePath();
}
