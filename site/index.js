var message = function(p) {
  var audioCtx = new AudioContext();
  analyser = audioCtx.createAnalyser();
  var start;
  var width;
  var height;
  var lineHeight;
  var points = [];
  p.setup = function() {
    var messageElement = document.getElementById("message");
    width = messageElement.offsetWidth;
    height = messageElement.offsetHeight;
    p.createCanvas(width, height);
    start = p.createVector(0, height/2);
    lineHeight = (height/2)*0.9;

    var audioPath = messageElement.getAttribute("audiopath");
    fetch(audioPath)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioCtx.decodeAudioData(arrayBuffer))
      .then(audioBuffer => init(audioBuffer));
  }

  function init(buffer) {
    source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);
    source.loop = true;
    source.start();
    analyser.smoothingTimeConstant = 0.5;
    analyser.fftSize = 512;
    source.connect(analyser);
  }

  p.draw = function() {
    p.clear();
    points = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(points);

    setMaxInBands();

    drawAudioLine(1);
    drawAudioLine(-1);
  }

  function setMaxInBands() {
    var SpectrumSize = 512;
    var bandSize = 1.1;
    var crossover = bandSize;
    var viewSpectrum = [];
    var b = 0;
    for (var i = 0; i < SpectrumSize; i++)
    {
        var d = points[i];
        b = p.max(d, b); // find the max as the peak value in that frequency band.
        if (i > crossover - 3 && !isNaN(b))
        {
            crossover *= bandSize; // frequency crossover point for each band.
            viewSpectrum.push(b);
            b = 0;
        }
    }
    var normalizeMax = 255;
    points = viewSpectrum.map(x => x/normalizeMax);
  }

  function drawAudioLine(vertical) {
    var segments = points.length - 1;
    var segmentLength = width / segments;
    for(i = 0; i < segments; i++) {
      var point = points[i];
      var pointX = start.x + i*segmentLength;
      var pointY = start.y;
      var yEnd = point * vertical * lineHeight;
      p.line(pointX, pointY, pointX, pointY + yEnd);
    }
  }
}

var myp5 = new p5(message, "message");