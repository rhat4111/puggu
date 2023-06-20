$(document).ready(function () {
  dots();

  $('#hamburger').click(function () {
    $('body > .header').toggleClass('open');
  });

  $('body > .header .right').click(function () {
    $('body > .header').removeClass('open');
  });

  $(document).scroll(function (e) {
    var scrollTop = $(document).scrollTop();

    if (scrollTop > 20) {
      $('body > .header').addClass('active');
    } else {
      $('body > .header').removeClass('active');
    }
  });

  function dots() {
    var amount = 150;
    var speedMax = 1;
    var line = 100;

    (function () {
      var requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      window.requestAnimationFrame = requestAnimationFrame;
    })();

    container = document.getElementById("cnv");
    container.width = $('#home').width();
    container.height = $('#home').height() + 100;
    var w = container.width;
    var h = container.height;
    context = container.getContext('2d');

    function Dot(w, h, speedMax) {
      this.x = getRandomInt(0, w);
      this.y = getRandomInt(0, h);
      this.speed = Math.random() * speedMax;
      this.dx = getRandomInt(-this.speed, this.speed);
      this.dy = getRandomInt(-this.speed, this.speed);
      this.rad = getRandomInt(1, 3);
    }

    var dots = new Array;

    for (var i = 0; i < amount; i++) {
      dots.push(new Dot(w, h, speedMax));
    }

    function drawline() {
      dots.forEach(function (item, i, arr) {
        dots.forEach(function (item2, i2, arr2) {
          if (item.x > item2.x - line && item.x < item2.x + line && item.y > item2.y - line && item.y < item2.y + line) {
            context.strokeStyle = "#FFFFFF10";
            context.beginPath();
            context.moveTo(item.x, item.y);
            context.lineTo(item2.x, item2.y);
            context.stroke();
          }
        });
      });
    }

    function drawDots() {
      dots.forEach(function (item, i, arr) {
        if (item.x >= w) item.dx = -item.speed;
        if (item.x <= 0) item.dx = item.speed;
        if (item.y >= h) item.dy = -item.speed;
        if (item.y <= 0) item.dy = item.speed;
        item.x += item.dx;
        item.y += item.dy;
        context.fillStyle = "#FFFFFF50";
        context.beginPath();
        context.arc(item.x, item.y, item.rad, 0, Math.PI * 2);
        context.fill();
      });
    }

    function draw() {
      requestAnimationFrame(draw);
      context.clearRect(0, 0, w, h);
      drawDots();
      drawline();
    }

    draw();

    function getRandomInt(min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      return rand;
    }
    window.addEventListener("resize", function () {
      container.width = window.innerWidth;
      container.height = window.innerHeight - 10;
    });
  }
});
