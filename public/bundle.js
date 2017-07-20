/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
  COLOR: 'black',
  COLLISION_COLOR: 'tomato',
  NS: 'http://www.w3.org/2000/svg',
  DIMENSIONS_X: 100,
  DIMENSIONS_Y: 100,
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__svg__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__svg___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__svg__);


document.body.prepend(Object(__WEBPACK_IMPORTED_MODULE_0__svg__["svgFactory"])());


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const rectangleFactory = __webpack_require__(3);
const svgConstants = __webpack_require__(0);

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const svgConstants = __webpack_require__(0);

module.exports = function rectangleFactory(x, y, width, height) {
  const rect = document.createElementNS(svgConstants.NS, 'rect');
  rect.setAttribute('x', x);
  rect.setAttribute('y', y);
  rect.setAttribute('width', width);
  rect.setAttribute('height', height);
  rect.setAttribute('fill', svgConstants.COLOR);

  return rect;
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map