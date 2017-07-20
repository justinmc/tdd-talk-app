const rectangleFactory = require('./rectangle');
const svgConstants = require('./svg_constants');

const RECT_WIDTH = 10;
const RECT_HEIGHT = 10;

/**
 * Convert between DOM coords and SVG viewbox coords
 * @param {Number} width
 * @param {Number} height
 * @param {Number} x
 * @param {Number} y
 * @returns {{ x: Number, y: Number }}
 */
function toViewBoxCoords(width, height, x, y) {
  return {
    x: svgConstants.DIMENSIONS_X * x / width,
    y: svgConstants.DIMENSIONS_Y * y / height,
  };
}

/**
 * Given two rectangles, returns true if they're overlapping, false otherwise
 * @param {{ x: Number, y: Number, width: Number, height: Number }} boxA
 * @param {{ x: Number, y: Number, width: Number, height: Number }} boxB
 * @returns {Boolean}
 */
function isColliding(rectA, rectB) {
  if (rectA.x > rectB.x + rectB.width || rectA.x + rectA.width < rectB.x) {
    return false;
  }
  if (rectA.y > rectB.y + rectB.height || rectA.y + rectA.height < rectB.y) {
    return false;
  }

  return true;
}

/**
 * Get the dimensions from the given SVG <rect/>
 * @param {Node} rect
 * @returns {{ x: Number, y: Number, width: Number, height: Number }}
 */
function getRectDimensions(rect) {
  return {
    x: parseFloat(rect.getAttribute('x')),
    y: parseFloat(rect.getAttribute('y')),
    width: parseFloat(rect.getAttribute('width')),
    height: parseFloat(rect.getAttribute('height')),
  };
}

/**
 * Create the main app SVG
 */
function svgFactory() {
  const svg = document.createElementNS(svgConstants.NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${svgConstants.DIMENSIONS_X} ${svgConstants.DIMENSIONS_Y}`);
  svg.setAttribute('preserveAspectRatio', 'none');

  const rectangles = [
    rectangleFactory(10, 10, RECT_WIDTH, RECT_HEIGHT),
    rectangleFactory(60, 60, RECT_WIDTH, RECT_HEIGHT),
  ];

  let dragging;
  rectangles.forEach((rect) => {
    rect.addEventListener('mousedown', () => {
      dragging = rect;
    });
    svg.appendChild(rect);
  });

  svg.addEventListener('mousemove', (event) => {
    if (dragging) {
      const viewBoxCoords = toViewBoxCoords(svg.clientWidth, svg.clientHeight, event.offsetX, event.offsetY);
      dragging.setAttribute('x', viewBoxCoords.x - RECT_WIDTH / 2);
      dragging.setAttribute('y', viewBoxCoords.y - RECT_HEIGHT / 2);

      const collision = isColliding(
        getRectDimensions(rectangles[0]), getRectDimensions(rectangles[1])
      );

      if (collision) {
        rectangles[0].setAttribute('fill', svgConstants.COLLISION_COLOR);
        rectangles[1].setAttribute('fill', svgConstants.COLLISION_COLOR);
      } else {
        rectangles[0].setAttribute('fill', svgConstants.COLOR);
        rectangles[1].setAttribute('fill', svgConstants.COLOR);
      }
    }
  });

  svg.addEventListener('mouseup', () => {
    dragging = null;
  });

  return svg;
}

module.exports.isColliding = isColliding;
module.exports.toViewBoxCoords = toViewBoxCoords;
module.exports.svgFactory = svgFactory;
