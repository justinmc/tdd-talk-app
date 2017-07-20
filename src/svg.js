const rectangleFactory = require('./rectangle');
const svgConstants = require('./svg_constants');

const RECT_WIDTH = 10;
const RECT_HEIGHT = 10;

/**
 * Convert between DOM coords and SVG viewbox coords
 * @param {Number} width, the total width of the svg in DOM coords
 * @param {Number} height, the total height of the svg in DOM coords
 * @param {Number} x, in DOM coords
 * @param {Number} y, in DOM coords
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
 * @param {{ x: Number, y: Number, width: Number, height: Number }} rectA
 * @param {{ x: Number, y: Number, width: Number, height: Number }} rectB
 * @returns {Boolean}
 */
function isColliding(rectA, rectB) {
  // TODO After implementing getCollisionRectDimensions, can you refactor this
  // method to use the results from that method instead of doing similar
  // math here?
  // Can you write tests to cover this method that mock getCollisionRectDimensions?
  // Try sinon: http://sinonjs.org/
  if (rectA.x > rectB.x + rectB.width || rectA.x + rectA.width < rectB.x) {
    return false;
  }
  if (rectA.y > rectB.y + rectB.height || rectA.y + rectA.height < rectB.y) {
    return false;
  }

  return true;
}

/**
 * Given two rectangles, return the dimensions of their overlapping rectangle
 * @param {{ x: Number, y: Number, width: Number, height: Number }} rectA
 * @param {{ x: Number, y: Number, width: Number, height: Number }} rectB
 * @returns {{ x: Number, y: Number, width: Number, height: Number }}
 */
function getCollisionRectDimensions(rectA, rectB) {
  // TODO Bonus challenge! Use this to change the color of the overlapping
  // portion of the 2 main rectangles.  Pretty.
  return {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
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
 * @returns {Node}
 */
function svgFactory() {
  const svg = document.createElementNS(svgConstants.NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${svgConstants.DIMENSIONS_X} ${svgConstants.DIMENSIONS_Y}`);
  svg.setAttribute('preserveAspectRatio', 'none');

  const rectangles = [
    rectangleFactory(10, 10, RECT_WIDTH, RECT_HEIGHT),
    rectangleFactory(60, 60, RECT_WIDTH, RECT_HEIGHT),
  ];
  const collisionRect = rectangleFactory(0, 0, 0, 0);
  collisionRect.setAttribute('fill', svgConstants.COLOR);

  let dragging;
  rectangles.forEach((rect) => {
    rect.addEventListener('mousedown', () => {
      dragging = rect;
    });
    svg.appendChild(rect);
  });
  svg.appendChild(collisionRect);

  svg.addEventListener('mousemove', (event) => {
    if (dragging) {
      const viewBoxCoords = toViewBoxCoords(svg.clientWidth, svg.clientHeight, event.offsetX, event.offsetY);
      dragging.setAttribute('x', viewBoxCoords.x - RECT_WIDTH / 2);
      dragging.setAttribute('y', viewBoxCoords.y - RECT_HEIGHT / 2);

      const rectADimensions = getRectDimensions(rectangles[0]);
      const rectBDimensions = getRectDimensions(rectangles[1]);
      const collision = isColliding(rectADimensions, rectBDimensions);

      if (collision) {
        rectangles[0].setAttribute('fill', svgConstants.COLLISION_COLOR);
        rectangles[1].setAttribute('fill', svgConstants.COLLISION_COLOR);

        const collisionRectDimensions = getCollisionRectDimensions(
          rectADimensions, rectBDimensions
        );
        collisionRect.setAttribute('x', collisionRectDimensions.x);
        collisionRect.setAttribute('y', collisionRectDimensions.y);
        collisionRect.setAttribute('width', collisionRectDimensions.width);
        collisionRect.setAttribute('height', collisionRectDimensions.height);
      } else {
        rectangles[0].setAttribute('fill', svgConstants.COLOR);
        rectangles[1].setAttribute('fill', svgConstants.COLOR);
        collisionRect.setAttribute('width', 0);
        collisionRect.setAttribute('height', 0);
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
