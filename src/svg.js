const rectangleFactory = require('./rectangle');
const svgConstants = require('../src/svg_constants');

function toViewBoxCoords(width, height, x, y) {
  return {
    x: svgConstants.DIMENSIONS_X * x / width,
    y: svgConstants.DIMENSIONS_Y * y / height,
  };
}

function svgFactory() {
  const svg = document.createElementNS(svgConstants.NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${svgConstants.DIMENSIONS_X} ${svgConstants.DIMENSIONS_Y}`);
  svg.setAttribute('preserveAspectRatio', 'none');

  const rectangles = [
    rectangleFactory(10, 10),
    rectangleFactory(60, 60),
  ];

  let dragging;
  rectangles.forEach((rect) => {
    rect.addEventListener('mousedown', (event) => {
      dragging = rect;
    });
    svg.appendChild(rect);
  });

  svg.addEventListener('mousemove', (event) => {
    if (dragging) {
      const viewBoxCoords = toViewBoxCoords(svg.clientWidth, svg.clientHeight, event.clientX, event.clientY);
      dragging.setAttribute('x', viewBoxCoords.x);
      dragging.setAttribute('y', viewBoxCoords.y);
    }
  });

  svg.addEventListener('mouseup', () => {
    dragging = null;
  });

  return svg;
}

module.exports.toViewBoxCoords = toViewBoxCoords;
module.exports.svgFactory = svgFactory;
