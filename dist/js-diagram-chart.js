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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/helper/index.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function roundRect(context, x, y, width, height, radius, hiddenBg) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
  context.stroke();

  if (!hiddenBg) {
    context.fill();
  }
}
function wrapText(context, text, x, y, width, height, lineHeight) {
  context.textAlign = "center";
  context.textBaseline = "middle";
  x = x + width / 2;
  y = y + height / 2;
  var cars = text.split("\n");

  for (var ii = 0; ii < cars.length; ii++) {
    var line = "";
    var words = cars[ii].split(" ");

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;

      if (testWidth > width) {
        line = words[n] + " ";
        y -= lineHeight / 2;
      } else {
        line = testLine;
      }
    }

    line = "";

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;

      if (testWidth > width) {
        context.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    context.fillText(line, x, y);
    y += lineHeight;
  }
}
function colorLuminance(hex, lum) {
  hex = String(hex).replace(/[^0-9a-f]/gi, "");

  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  lum = lum || 0;
  var rgb = "#",
      c,
      i;

  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
}
function cloneObj(obj) {
  if (obj == null || _typeof(obj) != "object") return obj;
  var temp = obj.constructor();

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      temp[key] = cloneObj(obj[key]);
    }
  }

  return temp;
}
function trackTransforms(ctx) {
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var xform = svg.createSVGMatrix();

  ctx.getTransform = function () {
    return xform;
  };

  var savedTransforms = [];
  var save = ctx.save;

  ctx.save = function () {
    savedTransforms.push(xform.translate(0, 0));
    return save.call(ctx);
  };

  var restore = ctx.restore;

  ctx.restore = function () {
    xform = savedTransforms.pop();
    return restore.call(ctx);
  };

  var scale = ctx.scale;

  ctx.scale = function (sx, sy) {
    xform = xform.scaleNonUniform(sx, sy);
    return scale.call(ctx, sx, sy);
  };

  var rotate = ctx.rotate;

  ctx.rotate = function (radians) {
    xform = xform.rotate(radians * 180 / Math.PI);
    return rotate.call(ctx, radians);
  };

  var translate = ctx.translate;

  ctx.translate = function (dx, dy) {
    xform = xform.translate(dx, dy);
    return translate.call(ctx, dx, dy);
  };

  var transform = ctx.transform;

  ctx.transform = function (a, b, c, d, e, f) {
    var m2 = svg.createSVGMatrix();
    m2.a = a;
    m2.b = b;
    m2.c = c;
    m2.d = d;
    m2.e = e;
    m2.f = f;
    xform = xform.multiply(m2);
    return transform.call(ctx, a, b, c, d, e, f);
  };

  var setTransform = ctx.setTransform;

  ctx.setTransform = function (a, b, c, d, e, f) {
    xform.a = a;
    xform.b = b;
    xform.c = c;
    xform.d = d;
    xform.e = e;
    xform.f = f;
    return setTransform.call(ctx, a, b, c, d, e, f);
  };

  var pt = svg.createSVGPoint();

  ctx.transformedPoint = function (x, y) {
    pt.x = x;
    pt.y = y;
    return pt.matrixTransform(xform.inverse());
  };
}
function getObjById(listObj, idObj) {
  for (var i = 0; i < listObj.length; i++) {
    if (listObj[i].id == idObj) {
      return listObj[i];
    }
  }

  return null;
}
// CONCATENATED MODULE: ./src/main.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return JsDiagramChart; });



function JsDiagramChart(data) {
  this.init = function (data) {
    var _this = this;

    _this.canvas = document.getElementById(data.config.element);

    if (_this.canvas) {
      _this.context = _this.canvas.getContext("2d");
    } else {
      throw "Element not found";
    }

    _this.context = this.canvas.getContext("2d");
    _this.context.lineWidth = data.config.lineWidth;

    if (data.config.autoSize) {
      this.canvas.width = this.canvas.parentNode.clientWidth;
      this.canvas.height = this.canvas.parentNode.clientHeight;
    }

    trackTransforms(this.context);
    data.config.scaleFactor = 1.1;
    data.config.zoomScale = 0;
    data.config.moveX = 0;
    data.config.moveY = 0; //this.data = data;

    this.config = data.config;
    this.update(data);
    this.draw();

    if (_this.config.mouseEvents) {
      this.events();
    }
  };

  this.addZoom = function (size) {
    var _this = this;

    _this.config.zoomScale += size;

    var pt = _this.context.transformedPoint(_this.canvas.width / 2, _this.canvas.height / 2);

    this.context.translate(pt.x, pt.y);
    var factor = Math.pow(_this.config.scaleFactor, size);

    _this.context.scale(factor, factor);

    _this.context.translate(-pt.x, -pt.y);

    this.draw();
  };

  this.resetZoom = function () {
    var _this = this;

    _this.addZoom(-_this.config.zoomScale);

    _this.context.translate(-_this.config.moveX, -_this.config.moveY);

    _this.config.zoomScale = 0;
    _this.config.moveX = 0;
    _this.config.moveY = 0;
  };

  this.events = function () {
    var _this = this;

    var lastX = _this.canvas.width / 2;
    var lastY = _this.canvas.height / 2;
    var dragStart = false;
    var dragged = false;

    _this.canvas.addEventListener("mousedown", function (evt) {
      document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = "none";
      _this.canvas.style.cursor = "move";
      lastX = evt.offsetX || evt.pageX - _this.canvas.offsetLeft;
      lastY = evt.offsetY || evt.pageY - _this.canvas.offsetTop;
      dragStart = _this.context.transformedPoint(lastX, lastY);
      dragged = false;
      evt.returnValue = false;
    }, false);

    _this.canvas.addEventListener("mousemove", function (evt) {
      lastX = evt.offsetX || evt.pageX - _this.canvas.offsetLeft;
      lastY = evt.offsetY || evt.pageY - _this.canvas.offsetTop;
      dragged = true;

      if (dragStart) {
        var pt = _this.context.transformedPoint(lastX, lastY);

        _this.context.translate(pt.x - dragStart.x, pt.y - dragStart.y);

        _this.draw();

        _this.config.moveX += pt.x - dragStart.x;
        _this.config.moveY += pt.y - dragStart.y;
      }
    }, false);

    _this.canvas.addEventListener("mouseup", function (evt) {
      dragStart = null;
      _this.canvas.style.cursor = "default"; //if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
    }, false);

    var handleScroll = function handleScroll(evt) {
      var delta = evt.wheelDelta ? evt.wheelDelta / 300 : evt.detail ? -evt.detail : 0;

      _this.addZoom(delta);

      return evt.preventDefault() && false;
    };

    _this.canvas.addEventListener("DOMMouseScroll", handleScroll, false);

    _this.canvas.addEventListener("mousewheel", handleScroll, false);
  };

  this.update = function (data) {
    // if(data){
    //   data = this.data;
    // }
    var _this = this; //_this.data = data;


    var diagramList = [];
    var diagramLinesCount = [];
    var diagramColumnsCount = 0;
    var diagramColumnLower = 0;

    for (var i = 0; i < data.diagrams.length; i++) {
      var objectDiagram = {
        id: data.diagrams[i].id,
        x: 0,
        y: 0,
        cx: 0,
        cy: 0,
        text: data.diagrams[i].text,
        color: data.diagrams[i].color,
        bgColor: data.diagrams[i].bgColor,
        parents: [],
        children: [],
        virgin: true,
        orphan: true
      };

      for (var j = 0; j < data.links.length; j++) {
        if (data.links[j].source == objectDiagram.id) {
          objectDiagram.parents.push(data.links[j].parent);
          objectDiagram.orphan = false;
        }

        if (data.links[j].parent == objectDiagram.id) {
          objectDiagram.children.push(data.links[j].source);
          objectDiagram.orphan = false;
        }
      }

      diagramList.push(objectDiagram);
    }

    var getLinesObjects = function getLinesObjects(object, hierarchy) {
      if (object.virgin) {
        object.virgin = false;
        object.y = hierarchy;

        if (hierarchy < diagramColumnLower) {
          diagramColumnLower = hierarchy;
        }

        for (var i = 0; i < object.children.length; i++) {
          var tmpObj = getObjById(diagramList, object.children[i]);
          getLinesObjects(tmpObj, hierarchy + 1);
        }

        for (var i = 0; i < object.parents.length; i++) {
          var tmpObj = getObjById(diagramList, object.parents[i]);
          getLinesObjects(tmpObj, hierarchy - 1);
        }
      }
    };

    for (var i = 0; i < diagramList.length; i++) {
      getLinesObjects(diagramList[i], 0);
    }

    for (var i = 0; i < diagramList.length; i++) {
      var countObjTmp = getObjById(diagramLinesCount, diagramList[i].y);

      if (countObjTmp != null) {
        if (!diagramList[i].orphan) {
          countObjTmp.count++;
          diagramList[i].x = countObjTmp.count;

          if (countObjTmp.count > diagramColumnsCount) {
            diagramColumnsCount = countObjTmp.count;
          }
        }
      } else {
        if (!diagramList[i].orphan) {
          diagramLinesCount.push({
            id: diagramList[i].y,
            count: 1
          });
          diagramList[i].x = 1;
        }
      }
    }

    this.config.linesCount = diagramLinesCount;
    this.config.columnsCount = diagramColumnsCount;
    this.config.columnLower = diagramColumnLower;
    this.diagrams = diagramList;
  };

  this.draw = function () {
    var _this = this;

    if (_this.context.transformedPoint) {
      var p1 = _this.context.transformedPoint(0, 0);

      var p2 = _this.context.transformedPoint(_this.canvas.width, _this.canvas.height);

      _this.context.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    } else {
      _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
    }

    var diagramWithMargin = _this.config.width + 2 * _this.config.margin;

    if (_this.config.columnsCount == 0) {
      _this.config.columnsCount = parseInt(_this.canvas.width / diagramWithMargin);
    }

    var maxWidth = _this.config.columnsCount * diagramWithMargin;
    var marginScreen = parseInt(_this.canvas.width) / 2 - maxWidth / 2;

    _this.context.rotate(2 * Math.PI);

    var countOrphanDemand = 0;

    for (var i = 0; i < _this.diagrams.length; i++) {
      if (_this.diagrams[i].orphan) {
        var positionX = marginScreen + _this.config.margin + parseInt(countOrphanDemand % _this.config.columnsCount) * (_this.config.width + 2 * _this.config.margin);

        var positionY = _this.config.margin + parseInt(countOrphanDemand / _this.config.columnsCount) * (_this.config.height + 2 * _this.config.margin);

        _this.context.fillStyle = _this.diagrams[i].bgColor;
        _this.context.strokeStyle = _this.diagrams[i].bgColor;
        roundRect(_this.context, positionX, positionY, _this.config.width, _this.config.height, _this.config.radius, _this.config.hiddenBg); //

        var nodeText = _this.context;
        nodeText.fillStyle = _this.diagrams[i].color;
        nodeText.font = _this.config.fontSize + "px " + _this.config.fontFamily;
        wrapText(_this.context, _this.diagrams[i].text, positionX + _this.config.padding, positionY, _this.config.width - _this.config.padding * 2, _this.config.height, _this.config.fontSize + _this.config.fontSize * 0.2);
        countOrphanDemand++;
      }
    } //CALCULATE X Y NOT ORPHANS DIAGRAMS


    var marginTopNotOrphans = _this.config.height + 3 * _this.config.margin + parseInt((countOrphanDemand - 1) / _this.config.columnsCount) * (_this.config.height + 2 * _this.config.margin);

    if (isNaN(marginTopNotOrphans)) {
      marginTopNotOrphans = _this.config.margin;
    }

    for (var i = 0; i < _this.diagrams.length; i++) {
      if (!_this.diagrams[i].orphan) {
        var maxColumnsInLine = getObjById(_this.config.linesCount, _this.diagrams[i].y).count;
        var ratio = maxWidth / maxColumnsInLine;
        var positionX = marginScreen + ratio * _this.diagrams[i].x + (ratio / 2 - _this.config.width / 2) - ratio;

        var positionY = marginTopNotOrphans + Math.abs(_this.config.columnLower) * (_this.config.height + 2 * _this.config.margin) + _this.diagrams[i].y * (_this.config.height + 2 * _this.config.margin);

        _this.diagrams[i].left = positionX;
        _this.diagrams[i].top = positionY;
      }
    } //DRAW LINES


    for (var i = 0; i < _this.diagrams.length; i++) {
      if (!_this.diagrams[i].orphan) {
        for (var j = 0; j < _this.diagrams[i].parents.length; j++) {
          var tmpObj = getObjById(_this.diagrams, _this.diagrams[i].parents[j]);
          var invertParent = false;
          var isDistant = false;
          var autoRef = false;
          var countDistant = 0;
          var countInvertParent = 0;

          if (_this.diagrams[i].id == tmpObj.id) {
            autoRef = true;
          } else if (_this.diagrams[i].y < tmpObj.y) {
            invertParent = true;
          } else if (_this.diagrams[i].y - tmpObj.y > 1) {
            isDistant = true;
          }

          if (_this.context.setLineDash) {
            _this.context.setLineDash([_this.config.lineWidth, 0]);
          }

          _this.context.strokeStyle = _this.config.lineColor || _this.diagrams[i].bgColor;
          _this.context.fillStyle = _this.config.lineColor || _this.diagrams[i].bgColor;
          var difference = 0;

          if (autoRef) {
            difference = _this.config.margin / 2 - _this.config.margin / _this.config.columnsCount * _this.diagrams[i].x;

            if (!isFinite(difference)) {
              difference = 0;
            }

            _this.context.beginPath();

            _this.context.moveTo(tmpObj.left + _this.config.width / 2 + difference * -1 - difference, tmpObj.top + _this.config.height);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 + difference * -1 - difference, tmpObj.top + _this.config.height + _this.config.margin / 2.5);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 + difference * -1 + difference, tmpObj.top + _this.config.height + _this.config.margin / 2.5);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 + difference * -1 + difference, tmpObj.top + _this.config.height + _this.config.arrowWidth / 2);

            _this.context.stroke();

            _this.context.beginPath();

            _this.context.moveTo(tmpObj.left + _this.config.width / 2 + difference * -1 + difference, tmpObj.top + _this.config.height);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 - _this.config.arrowWidth / 2 + difference * -1 + difference, tmpObj.top + _this.config.height + _this.config.arrowWidth);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 + _this.config.arrowWidth / 2 + difference * -1 + difference, tmpObj.top + _this.config.height + _this.config.arrowWidth);

            _this.context.fill();
          } else if (invertParent) {
            if (_this.config.lineDiff) {
              difference = _this.config.margin / 2 - _this.config.margin / _this.config.columnsCount * _this.diagrams[i].x + (_this.config.margin - (_this.config.arrowWidth + _this.config.lineWidth * 2 * countInvertParent));
            }

            if (_this.context.setLineDash) {
              _this.context.setLineDash([_this.config.lineWidth, _this.config.lineWidth]);
            }

            _this.context.beginPath();

            _this.context.moveTo(_this.diagrams[i].left + _this.config.width / 2 + difference, _this.diagrams[i].top + _this.config.height / 2 + difference);

            _this.context.lineTo(_this.diagrams[i].left + _this.config.width + _this.config.margin + difference, _this.diagrams[i].top + _this.config.height / 2 + difference);

            _this.context.lineTo(_this.diagrams[i].left + _this.config.width + _this.config.margin + difference, tmpObj.top - _this.config.margin + difference);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 + difference, tmpObj.top - _this.config.margin + difference);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 + difference, tmpObj.top - _this.config.arrowWidth + difference);

            _this.context.lineWidth = _this.config.lineWidth;

            _this.context.stroke();

            _this.context.beginPath();

            _this.context.moveTo(tmpObj.left + _this.config.width / 2 + difference, tmpObj.top);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 - _this.config.arrowWidth / 2 + difference, tmpObj.top - _this.config.arrowWidth);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 + _this.config.arrowWidth / 2 + difference, tmpObj.top - _this.config.arrowWidth);

            _this.context.fill();
          } else if (isDistant) {
            if (_this.config.lineDiff) {
              difference = _this.config.margin / 2 - _this.config.margin / _this.config.columnsCount * _this.diagrams[i].x + (_this.config.margin - (_this.config.arrowWidth + _this.config.lineWidth * 2 * countDistant));
            }

            countDistant++;

            if (!isFinite(difference)) {
              difference = 0;
            }

            if (_this.context.setLineDash) {
              _this.context.setLineDash([_this.config.lineWidth, _this.config.lineWidth]);
            }

            _this.context.beginPath();

            _this.context.moveTo(_this.diagrams[i].left + _this.config.width / 2 + difference * -1, _this.diagrams[i].top);

            _this.context.lineTo(_this.diagrams[i].left + _this.config.width / 2 + difference * -1, _this.diagrams[i].top - _this.config.margin + difference);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 + difference * -1, _this.diagrams[i].top - _this.config.margin + difference);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 + difference * -1, tmpObj.top + _this.config.height + _this.config.margin + difference);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 + difference * -1, tmpObj.top + _this.config.height + _this.config.arrowWidth / 2);

            _this.context.lineWidth = _this.config.lineWidth;

            _this.context.stroke();

            _this.context.beginPath();

            _this.context.moveTo(tmpObj.left + _this.config.width / 2 + difference * -1, tmpObj.top + _this.config.height);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 - _this.config.arrowWidth / 2 + difference * -1, tmpObj.top + _this.config.height + _this.config.arrowWidth);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 + _this.config.arrowWidth / 2 + difference * -1, tmpObj.top + _this.config.height + _this.config.arrowWidth);

            _this.context.fill();
          } else {
            //var
            if (_this.config.lineDiff) {
              difference = _this.config.margin / 2 - _this.config.margin / _this.config.columnsCount * _this.diagrams[i].x;
            }

            if (!isFinite(difference)) {
              difference = 0;
            }

            _this.context.beginPath();

            _this.context.moveTo(_this.diagrams[i].left + _this.config.width / 2 + difference * -1, _this.diagrams[i].top);

            _this.context.lineTo(_this.diagrams[i].left + _this.config.width / 2 + difference * -1, _this.diagrams[i].top - _this.config.margin + difference);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 + difference * -1, tmpObj.top + _this.config.height + _this.config.margin + difference);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 + difference * -1, tmpObj.top + _this.config.height + _this.config.arrowWidth / 2);

            _this.context.lineWidth = _this.config.lineWidth;

            _this.context.stroke();

            _this.context.beginPath();

            _this.context.moveTo(tmpObj.left + _this.config.width / 2 + difference * -1, tmpObj.top + _this.config.height);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 - _this.config.arrowWidth / 2 + difference * -1, tmpObj.top + _this.config.height + _this.config.arrowWidth);

            _this.context.lineTo(tmpObj.left + _this.config.width / 2 + _this.config.arrowWidth / 2 + difference * -1, tmpObj.top + _this.config.height + _this.config.arrowWidth);

            _this.context.fill();
          }
        }
      }
    } //DRAW NOT ORPHANS DIAGRAMS


    for (var i = 0; i < _this.diagrams.length; i++) {
      if (!_this.diagrams[i].orphan) {
        var positionX = _this.diagrams[i].left;
        var positionY = _this.diagrams[i].top;
        _this.context.fillStyle = _this.diagrams[i].bgColor;
        _this.context.strokeStyle = _this.diagrams[i].bgColor;
        roundRect(_this.context, positionX, positionY, _this.config.width, _this.config.height, _this.config.radius, _this.config.hiddenBg);
        var nodeText = _this.context;
        nodeText.fillStyle = _this.diagrams[i].color;
        nodeText.font = _this.config.fontSize + "px " + _this.config.fontFamily;
        wrapText(_this.context, _this.diagrams[i].text, positionX + _this.config.padding, positionY, _this.config.width - _this.config.padding * 2, _this.config.height, _this.config.fontSize + _this.config.fontSize * 0.2);
      }
    }
  };

  this.init(data);
}
;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hlbHBlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWFpbi5qcyJdLCJuYW1lcyI6WyJnZXRSYW5kb21JbnQiLCJtaW4iLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJyb3VuZFJlY3QiLCJjb250ZXh0IiwieCIsInkiLCJ3aWR0aCIsImhlaWdodCIsInJhZGl1cyIsImhpZGRlbkJnIiwiYmVnaW5QYXRoIiwibW92ZVRvIiwibGluZVRvIiwicXVhZHJhdGljQ3VydmVUbyIsImNsb3NlUGF0aCIsInN0cm9rZSIsImZpbGwiLCJ3cmFwVGV4dCIsInRleHQiLCJsaW5lSGVpZ2h0IiwidGV4dEFsaWduIiwidGV4dEJhc2VsaW5lIiwiY2FycyIsInNwbGl0IiwiaWkiLCJsZW5ndGgiLCJsaW5lIiwid29yZHMiLCJuIiwidGVzdExpbmUiLCJtZXRyaWNzIiwibWVhc3VyZVRleHQiLCJ0ZXN0V2lkdGgiLCJmaWxsVGV4dCIsImNvbG9yTHVtaW5hbmNlIiwiaGV4IiwibHVtIiwiU3RyaW5nIiwicmVwbGFjZSIsInJnYiIsImMiLCJpIiwicGFyc2VJbnQiLCJzdWJzdHIiLCJyb3VuZCIsInRvU3RyaW5nIiwiY2xvbmVPYmoiLCJvYmoiLCJ0ZW1wIiwiY29uc3RydWN0b3IiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsInRyYWNrVHJhbnNmb3JtcyIsImN0eCIsInN2ZyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudE5TIiwieGZvcm0iLCJjcmVhdGVTVkdNYXRyaXgiLCJnZXRUcmFuc2Zvcm0iLCJzYXZlZFRyYW5zZm9ybXMiLCJzYXZlIiwicHVzaCIsInRyYW5zbGF0ZSIsImNhbGwiLCJyZXN0b3JlIiwicG9wIiwic2NhbGUiLCJzeCIsInN5Iiwic2NhbGVOb25Vbmlmb3JtIiwicm90YXRlIiwicmFkaWFucyIsIlBJIiwiZHgiLCJkeSIsInRyYW5zZm9ybSIsImEiLCJiIiwiZCIsImUiLCJmIiwibTIiLCJtdWx0aXBseSIsInNldFRyYW5zZm9ybSIsInB0IiwiY3JlYXRlU1ZHUG9pbnQiLCJ0cmFuc2Zvcm1lZFBvaW50IiwibWF0cml4VHJhbnNmb3JtIiwiaW52ZXJzZSIsImdldE9iakJ5SWQiLCJsaXN0T2JqIiwiaWRPYmoiLCJpZCIsIkpzRGlhZ3JhbUNoYXJ0IiwiZGF0YSIsImluaXQiLCJfdGhpcyIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiY29uZmlnIiwiZWxlbWVudCIsImdldENvbnRleHQiLCJsaW5lV2lkdGgiLCJhdXRvU2l6ZSIsInBhcmVudE5vZGUiLCJjbGllbnRXaWR0aCIsImNsaWVudEhlaWdodCIsInNjYWxlRmFjdG9yIiwiem9vbVNjYWxlIiwibW92ZVgiLCJtb3ZlWSIsInVwZGF0ZSIsImRyYXciLCJtb3VzZUV2ZW50cyIsImV2ZW50cyIsImFkZFpvb20iLCJzaXplIiwiZmFjdG9yIiwicG93IiwicmVzZXRab29tIiwibGFzdFgiLCJsYXN0WSIsImRyYWdTdGFydCIsImRyYWdnZWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZ0IiwiYm9keSIsInN0eWxlIiwibW96VXNlclNlbGVjdCIsIndlYmtpdFVzZXJTZWxlY3QiLCJ1c2VyU2VsZWN0IiwiY3Vyc29yIiwib2Zmc2V0WCIsInBhZ2VYIiwib2Zmc2V0TGVmdCIsIm9mZnNldFkiLCJwYWdlWSIsIm9mZnNldFRvcCIsInJldHVyblZhbHVlIiwiaGFuZGxlU2Nyb2xsIiwiZGVsdGEiLCJ3aGVlbERlbHRhIiwiZGV0YWlsIiwicHJldmVudERlZmF1bHQiLCJkaWFncmFtTGlzdCIsImRpYWdyYW1MaW5lc0NvdW50IiwiZGlhZ3JhbUNvbHVtbnNDb3VudCIsImRpYWdyYW1Db2x1bW5Mb3dlciIsImRpYWdyYW1zIiwib2JqZWN0RGlhZ3JhbSIsImN4IiwiY3kiLCJjb2xvciIsImJnQ29sb3IiLCJwYXJlbnRzIiwiY2hpbGRyZW4iLCJ2aXJnaW4iLCJvcnBoYW4iLCJqIiwibGlua3MiLCJzb3VyY2UiLCJwYXJlbnQiLCJnZXRMaW5lc09iamVjdHMiLCJvYmplY3QiLCJoaWVyYXJjaHkiLCJ0bXBPYmoiLCJjb3VudE9ialRtcCIsImNvdW50IiwibGluZXNDb3VudCIsImNvbHVtbnNDb3VudCIsImNvbHVtbkxvd2VyIiwicDEiLCJwMiIsImNsZWFyUmVjdCIsImRpYWdyYW1XaXRoTWFyZ2luIiwibWFyZ2luIiwibWF4V2lkdGgiLCJtYXJnaW5TY3JlZW4iLCJjb3VudE9ycGhhbkRlbWFuZCIsInBvc2l0aW9uWCIsInBvc2l0aW9uWSIsImZpbGxTdHlsZSIsInN0cm9rZVN0eWxlIiwibm9kZVRleHQiLCJmb250IiwiZm9udFNpemUiLCJmb250RmFtaWx5IiwicGFkZGluZyIsIm1hcmdpblRvcE5vdE9ycGhhbnMiLCJpc05hTiIsIm1heENvbHVtbnNJbkxpbmUiLCJyYXRpbyIsImFicyIsImxlZnQiLCJ0b3AiLCJpbnZlcnRQYXJlbnQiLCJpc0Rpc3RhbnQiLCJhdXRvUmVmIiwiY291bnREaXN0YW50IiwiY291bnRJbnZlcnRQYXJlbnQiLCJzZXRMaW5lRGFzaCIsImxpbmVDb2xvciIsImRpZmZlcmVuY2UiLCJpc0Zpbml0ZSIsImFycm93V2lkdGgiLCJsaW5lRGlmZiJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVB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R3ZGLEtBQUssQ0FBQzlGLE9BQXJCO0FBQ0FxTCxnQkFBUSxDQUFDRixTQUFULEdBQXFCckYsS0FBSyxDQUFDb0QsUUFBTixDQUFlNUcsQ0FBZixFQUFrQmdILEtBQXZDO0FBQ0ErQixnQkFBUSxDQUFDQyxJQUFULEdBQWdCeEYsS0FBSyxDQUFDRyxNQUFOLENBQWFzRixRQUFiLEdBQXdCLEtBQXhCLEdBQWdDekYsS0FBSyxDQUFDRyxNQUFOLENBQWF1RixVQUE3RDtBQUNBMUssZ0JBQVEsQ0FDVGdGLEtBQUssQ0FBQzlGLE9BREcsRUFFVDhGLEtBQUssQ0FBQ29ELFFBQU4sQ0FBZTVHLENBQWYsRUFBa0J2QixJQUZULEVBR1RrSyxTQUFTLEdBQUduRixLQUFLLENBQUNHLE1BQU4sQ0FBYXdGLE9BSGhCLEVBSVRQLFNBSlMsRUFLVHBGLEtBQUssQ0FBQ0csTUFBTixDQUFhOUYsS0FBYixHQUFxQjJGLEtBQUssQ0FBQ0csTUFBTixDQUFhd0YsT0FBYixHQUF1QixDQUxuQyxFQU1UM0YsS0FBSyxDQUFDRyxNQUFOLENBQWE3RixNQU5KLEVBT1QwRixLQUFLLENBQUNHLE1BQU4sQ0FBYXNGLFFBQWIsR0FBd0J6RixLQUFLLENBQUNHLE1BQU4sQ0FBYXNGLFFBQWIsR0FBd0IsR0FQdkMsQ0FBUjtBQVNEO0FBQ0M7QUFDRixHQWxiRDs7QUFxYkEsT0FBSzFGLElBQUwsQ0FBVUQsSUFBVjtBQUNFO0FBQUEsQyIsImZpbGUiOiJqcy1kaWFncmFtLWNoYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbUludChtaW4sIG1heCkge1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcm91bmRSZWN0KGNvbnRleHQsIHgsIHksIHdpZHRoLCBoZWlnaHQsIHJhZGl1cywgaGlkZGVuQmcpIHtcbiAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgY29udGV4dC5tb3ZlVG8oeCArIHJhZGl1cywgeSk7XG4gIGNvbnRleHQubGluZVRvKHggKyB3aWR0aCAtIHJhZGl1cywgeSk7XG4gIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyh4ICsgd2lkdGgsIHksIHggKyB3aWR0aCwgeSArIHJhZGl1cyk7XG4gIGNvbnRleHQubGluZVRvKHggKyB3aWR0aCwgeSArIGhlaWdodCAtIHJhZGl1cyk7XG4gIGNvbnRleHQucXVhZHJhdGljQ3VydmVUbyhcbiAgICB4ICsgd2lkdGgsXG4gICAgeSArIGhlaWdodCxcbiAgICB4ICsgd2lkdGggLSByYWRpdXMsXG4gICAgeSArIGhlaWdodFxuICApO1xuICBjb250ZXh0LmxpbmVUbyh4ICsgcmFkaXVzLCB5ICsgaGVpZ2h0KTtcbiAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHkgKyBoZWlnaHQsIHgsIHkgKyBoZWlnaHQgLSByYWRpdXMpO1xuICBjb250ZXh0LmxpbmVUbyh4LCB5ICsgcmFkaXVzKTtcbiAgY29udGV4dC5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHksIHggKyByYWRpdXMsIHkpO1xuICBjb250ZXh0LmNsb3NlUGF0aCgpO1xuICBjb250ZXh0LnN0cm9rZSgpO1xuICBpZiAoIWhpZGRlbkJnKSB7XG4gICAgY29udGV4dC5maWxsKCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBUZXh0KGNvbnRleHQsIHRleHQsIHgsIHksIHdpZHRoLCBoZWlnaHQsIGxpbmVIZWlnaHQpIHtcbiAgY29udGV4dC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuICBjb250ZXh0LnRleHRCYXNlbGluZSA9IFwibWlkZGxlXCI7XG4gIHggPSB4ICsgd2lkdGggLyAyO1xuICB5ID0geSArIGhlaWdodCAvIDI7XG5cbiAgdmFyIGNhcnMgPSB0ZXh0LnNwbGl0KFwiXFxuXCIpO1xuXG4gIGZvciAodmFyIGlpID0gMDsgaWkgPCBjYXJzLmxlbmd0aDsgaWkrKykge1xuICAgIHZhciBsaW5lID0gXCJcIjtcbiAgICB2YXIgd29yZHMgPSBjYXJzW2lpXS5zcGxpdChcIiBcIik7XG5cbiAgICBmb3IgKHZhciBuID0gMDsgbiA8IHdvcmRzLmxlbmd0aDsgbisrKSB7XG4gICAgICB2YXIgdGVzdExpbmUgPSBsaW5lICsgd29yZHNbbl0gKyBcIiBcIjtcbiAgICAgIHZhciBtZXRyaWNzID0gY29udGV4dC5tZWFzdXJlVGV4dCh0ZXN0TGluZSk7XG4gICAgICB2YXIgdGVzdFdpZHRoID0gbWV0cmljcy53aWR0aDtcblxuICAgICAgaWYgKHRlc3RXaWR0aCA+IHdpZHRoKSB7XG4gICAgICAgIGxpbmUgPSB3b3Jkc1tuXSArIFwiIFwiO1xuICAgICAgICB5IC09IGxpbmVIZWlnaHQgLyAyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGluZSA9IHRlc3RMaW5lO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxpbmUgPSBcIlwiO1xuXG4gICAgZm9yICh2YXIgbiA9IDA7IG4gPCB3b3Jkcy5sZW5ndGg7IG4rKykge1xuICAgICAgdmFyIHRlc3RMaW5lID0gbGluZSArIHdvcmRzW25dICsgXCIgXCI7XG4gICAgICB2YXIgbWV0cmljcyA9IGNvbnRleHQubWVhc3VyZVRleHQodGVzdExpbmUpO1xuICAgICAgdmFyIHRlc3RXaWR0aCA9IG1ldHJpY3Mud2lkdGg7XG5cbiAgICAgIGlmICh0ZXN0V2lkdGggPiB3aWR0aCkge1xuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KGxpbmUsIHgsIHkpO1xuICAgICAgICBsaW5lID0gd29yZHNbbl0gKyBcIiBcIjtcbiAgICAgICAgeSArPSBsaW5lSGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGluZSA9IHRlc3RMaW5lO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnRleHQuZmlsbFRleHQobGluZSwgeCwgeSk7XG4gICAgeSArPSBsaW5lSGVpZ2h0O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xvckx1bWluYW5jZShoZXgsIGx1bSkge1xuICBoZXggPSBTdHJpbmcoaGV4KS5yZXBsYWNlKC9bXjAtOWEtZl0vZ2ksIFwiXCIpO1xuICBpZiAoaGV4Lmxlbmd0aCA8IDYpIHtcbiAgICBoZXggPSBoZXhbMF0gKyBoZXhbMF0gKyBoZXhbMV0gKyBoZXhbMV0gKyBoZXhbMl0gKyBoZXhbMl07XG4gIH1cbiAgbHVtID0gbHVtIHx8IDA7XG4gIHZhciByZ2IgPSBcIiNcIixcbiAgICBjLFxuICAgIGk7XG4gIGZvciAoaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICBjID0gcGFyc2VJbnQoaGV4LnN1YnN0cihpICogMiwgMiksIDE2KTtcbiAgICBjID0gTWF0aC5yb3VuZChNYXRoLm1pbihNYXRoLm1heCgwLCBjICsgYyAqIGx1bSksIDI1NSkpLnRvU3RyaW5nKDE2KTtcbiAgICByZ2IgKz0gKFwiMDBcIiArIGMpLnN1YnN0cihjLmxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIHJnYjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lT2JqKG9iaikge1xuICBpZiAob2JqID09IG51bGwgfHwgdHlwZW9mIG9iaiAhPSBcIm9iamVjdFwiKSByZXR1cm4gb2JqO1xuXG4gIHZhciB0ZW1wID0gb2JqLmNvbnN0cnVjdG9yKCk7XG5cbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgdGVtcFtrZXldID0gY2xvbmVPYmoob2JqW2tleV0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGVtcDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYWNrVHJhbnNmb3JtcyhjdHgpIHtcbiAgdmFyIHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsIFwic3ZnXCIpO1xuICB2YXIgeGZvcm0gPSBzdmcuY3JlYXRlU1ZHTWF0cml4KCk7XG4gIGN0eC5nZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geGZvcm07XG4gIH07XG5cbiAgdmFyIHNhdmVkVHJhbnNmb3JtcyA9IFtdO1xuICB2YXIgc2F2ZSA9IGN0eC5zYXZlO1xuICBjdHguc2F2ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHNhdmVkVHJhbnNmb3Jtcy5wdXNoKHhmb3JtLnRyYW5zbGF0ZSgwLCAwKSk7XG4gICAgcmV0dXJuIHNhdmUuY2FsbChjdHgpO1xuICB9O1xuICB2YXIgcmVzdG9yZSA9IGN0eC5yZXN0b3JlO1xuICBjdHgucmVzdG9yZSA9IGZ1bmN0aW9uKCkge1xuICAgIHhmb3JtID0gc2F2ZWRUcmFuc2Zvcm1zLnBvcCgpO1xuICAgIHJldHVybiByZXN0b3JlLmNhbGwoY3R4KTtcbiAgfTtcblxuICB2YXIgc2NhbGUgPSBjdHguc2NhbGU7XG4gIGN0eC5zY2FsZSA9IGZ1bmN0aW9uKHN4LCBzeSkge1xuICAgIHhmb3JtID0geGZvcm0uc2NhbGVOb25Vbmlmb3JtKHN4LCBzeSk7XG4gICAgcmV0dXJuIHNjYWxlLmNhbGwoY3R4LCBzeCwgc3kpO1xuICB9O1xuICB2YXIgcm90YXRlID0gY3R4LnJvdGF0ZTtcbiAgY3R4LnJvdGF0ZSA9IGZ1bmN0aW9uKHJhZGlhbnMpIHtcbiAgICB4Zm9ybSA9IHhmb3JtLnJvdGF0ZSgocmFkaWFucyAqIDE4MCkgLyBNYXRoLlBJKTtcbiAgICByZXR1cm4gcm90YXRlLmNhbGwoY3R4LCByYWRpYW5zKTtcbiAgfTtcbiAgdmFyIHRyYW5zbGF0ZSA9IGN0eC50cmFuc2xhdGU7XG4gIGN0eC50cmFuc2xhdGUgPSBmdW5jdGlvbihkeCwgZHkpIHtcbiAgICB4Zm9ybSA9IHhmb3JtLnRyYW5zbGF0ZShkeCwgZHkpO1xuICAgIHJldHVybiB0cmFuc2xhdGUuY2FsbChjdHgsIGR4LCBkeSk7XG4gIH07XG4gIHZhciB0cmFuc2Zvcm0gPSBjdHgudHJhbnNmb3JtO1xuICBjdHgudHJhbnNmb3JtID0gZnVuY3Rpb24oYSwgYiwgYywgZCwgZSwgZikge1xuICAgIHZhciBtMiA9IHN2Zy5jcmVhdGVTVkdNYXRyaXgoKTtcbiAgICBtMi5hID0gYTtcbiAgICBtMi5iID0gYjtcbiAgICBtMi5jID0gYztcbiAgICBtMi5kID0gZDtcbiAgICBtMi5lID0gZTtcbiAgICBtMi5mID0gZjtcbiAgICB4Zm9ybSA9IHhmb3JtLm11bHRpcGx5KG0yKTtcbiAgICByZXR1cm4gdHJhbnNmb3JtLmNhbGwoY3R4LCBhLCBiLCBjLCBkLCBlLCBmKTtcbiAgfTtcbiAgdmFyIHNldFRyYW5zZm9ybSA9IGN0eC5zZXRUcmFuc2Zvcm07XG4gIGN0eC5zZXRUcmFuc2Zvcm0gPSBmdW5jdGlvbihhLCBiLCBjLCBkLCBlLCBmKSB7XG4gICAgeGZvcm0uYSA9IGE7XG4gICAgeGZvcm0uYiA9IGI7XG4gICAgeGZvcm0uYyA9IGM7XG4gICAgeGZvcm0uZCA9IGQ7XG4gICAgeGZvcm0uZSA9IGU7XG4gICAgeGZvcm0uZiA9IGY7XG4gICAgcmV0dXJuIHNldFRyYW5zZm9ybS5jYWxsKGN0eCwgYSwgYiwgYywgZCwgZSwgZik7XG4gIH07XG4gIHZhciBwdCA9IHN2Zy5jcmVhdGVTVkdQb2ludCgpO1xuICBjdHgudHJhbnNmb3JtZWRQb2ludCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICBwdC54ID0geDtcbiAgICBwdC55ID0geTtcbiAgICByZXR1cm4gcHQubWF0cml4VHJhbnNmb3JtKHhmb3JtLmludmVyc2UoKSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRPYmpCeUlkKGxpc3RPYmosIGlkT2JqKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdE9iai5sZW5ndGg7IGkrKykge1xuICAgIGlmIChsaXN0T2JqW2ldLmlkID09IGlkT2JqKSB7XG4gICAgICByZXR1cm4gbGlzdE9ialtpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgZ2V0T2JqQnlJZCwgcm91bmRSZWN0LCB0cmFja1RyYW5zZm9ybXMsIHdyYXBUZXh0IH0gZnJvbSBcIi4vaGVscGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEpzRGlhZ3JhbUNoYXJ0KGRhdGEpIHtcblx0dGhpcy5pbml0ID0gZnVuY3Rpb24oZGF0YSkge1xuXHQgIHZhciBfdGhpcyA9IHRoaXM7XG5cdCAgX3RoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YS5jb25maWcuZWxlbWVudCk7XG4gIFxuXHQgIGlmIChfdGhpcy5jYW52YXMpIHtcblx0XHRfdGhpcy5jb250ZXh0ID0gX3RoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblx0ICB9IGVsc2Uge1xuXHRcdHRocm93IFwiRWxlbWVudCBub3QgZm91bmRcIjtcblx0ICB9XG4gIFxuXHQgIF90aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cdCAgX3RoaXMuY29udGV4dC5saW5lV2lkdGggPSBkYXRhLmNvbmZpZy5saW5lV2lkdGg7XG4gIFxuXHQgIGlmIChkYXRhLmNvbmZpZy5hdXRvU2l6ZSkge1xuXHRcdHRoaXMuY2FudmFzLndpZHRoID0gdGhpcy5jYW52YXMucGFyZW50Tm9kZS5jbGllbnRXaWR0aDtcblx0XHR0aGlzLmNhbnZhcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5wYXJlbnROb2RlLmNsaWVudEhlaWdodDtcblx0ICB9XG4gIFxuXHQgIHRyYWNrVHJhbnNmb3Jtcyh0aGlzLmNvbnRleHQpO1xuICBcblx0ICBkYXRhLmNvbmZpZy5zY2FsZUZhY3RvciA9IDEuMTtcblx0ICBkYXRhLmNvbmZpZy56b29tU2NhbGUgPSAwO1xuXHQgIGRhdGEuY29uZmlnLm1vdmVYID0gMDtcblx0ICBkYXRhLmNvbmZpZy5tb3ZlWSA9IDA7XG4gIFxuXHQgIC8vdGhpcy5kYXRhID0gZGF0YTtcblx0ICB0aGlzLmNvbmZpZyA9IGRhdGEuY29uZmlnO1xuXHQgIHRoaXMudXBkYXRlKGRhdGEpO1xuXHQgIHRoaXMuZHJhdygpO1xuICBcblx0ICBpZiAoX3RoaXMuY29uZmlnLm1vdXNlRXZlbnRzKSB7XG5cdFx0dGhpcy5ldmVudHMoKTtcblx0ICB9XG5cdH07XG4gIFxuXHR0aGlzLmFkZFpvb20gPSBmdW5jdGlvbihzaXplKSB7XG5cdCAgdmFyIF90aGlzID0gdGhpcztcblx0ICBfdGhpcy5jb25maWcuem9vbVNjYWxlICs9IHNpemU7XG5cdCAgdmFyIHB0ID0gX3RoaXMuY29udGV4dC50cmFuc2Zvcm1lZFBvaW50KFxuXHRcdF90aGlzLmNhbnZhcy53aWR0aCAvIDIsXG5cdFx0X3RoaXMuY2FudmFzLmhlaWdodCAvIDJcblx0ICApO1xuXHQgIHRoaXMuY29udGV4dC50cmFuc2xhdGUocHQueCwgcHQueSk7XG5cdCAgdmFyIGZhY3RvciA9IE1hdGgucG93KF90aGlzLmNvbmZpZy5zY2FsZUZhY3Rvciwgc2l6ZSk7XG5cdCAgX3RoaXMuY29udGV4dC5zY2FsZShmYWN0b3IsIGZhY3Rvcik7XG5cdCAgX3RoaXMuY29udGV4dC50cmFuc2xhdGUoLXB0LngsIC1wdC55KTtcblx0ICB0aGlzLmRyYXcoKTtcblx0fTtcbiAgXG5cdHRoaXMucmVzZXRab29tID0gZnVuY3Rpb24oKSB7XG5cdCAgdmFyIF90aGlzID0gdGhpcztcblx0ICBfdGhpcy5hZGRab29tKC1fdGhpcy5jb25maWcuem9vbVNjYWxlKTtcblx0ICBfdGhpcy5jb250ZXh0LnRyYW5zbGF0ZSgtX3RoaXMuY29uZmlnLm1vdmVYLCAtX3RoaXMuY29uZmlnLm1vdmVZKTtcblx0ICBfdGhpcy5jb25maWcuem9vbVNjYWxlID0gMDtcblx0ICBfdGhpcy5jb25maWcubW92ZVggPSAwO1xuXHQgIF90aGlzLmNvbmZpZy5tb3ZlWSA9IDA7XG5cdH07XG4gIFxuXHR0aGlzLmV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXHQgIHZhciBfdGhpcyA9IHRoaXM7XG4gIFxuXHQgIHZhciBsYXN0WCA9IF90aGlzLmNhbnZhcy53aWR0aCAvIDI7XG5cdCAgdmFyIGxhc3RZID0gX3RoaXMuY2FudmFzLmhlaWdodCAvIDI7XG5cdCAgdmFyIGRyYWdTdGFydCA9IGZhbHNlO1xuXHQgIHZhciBkcmFnZ2VkID0gZmFsc2U7XG4gIFxuXHQgIF90aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFxuXHRcdFwibW91c2Vkb3duXCIsXG5cdFx0ZnVuY3Rpb24oZXZ0KSB7XG5cdFx0ICBkb2N1bWVudC5ib2R5LnN0eWxlLm1velVzZXJTZWxlY3QgPSBkb2N1bWVudC5ib2R5LnN0eWxlLndlYmtpdFVzZXJTZWxlY3QgPSBkb2N1bWVudC5ib2R5LnN0eWxlLnVzZXJTZWxlY3QgPVxuXHRcdFx0XCJub25lXCI7XG5cdFx0ICBfdGhpcy5jYW52YXMuc3R5bGUuY3Vyc29yID0gXCJtb3ZlXCI7XG5cdFx0ICBsYXN0WCA9IGV2dC5vZmZzZXRYIHx8IGV2dC5wYWdlWCAtIF90aGlzLmNhbnZhcy5vZmZzZXRMZWZ0O1xuXHRcdCAgbGFzdFkgPSBldnQub2Zmc2V0WSB8fCBldnQucGFnZVkgLSBfdGhpcy5jYW52YXMub2Zmc2V0VG9wO1xuXHRcdCAgZHJhZ1N0YXJ0ID0gX3RoaXMuY29udGV4dC50cmFuc2Zvcm1lZFBvaW50KGxhc3RYLCBsYXN0WSk7XG5cdFx0ICBkcmFnZ2VkID0gZmFsc2U7XG5cdFx0ICBldnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcblx0XHR9LFxuXHRcdGZhbHNlXG5cdCAgKTtcbiAgXG5cdCAgX3RoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXG5cdFx0XCJtb3VzZW1vdmVcIixcblx0XHRmdW5jdGlvbihldnQpIHtcblx0XHQgIGxhc3RYID0gZXZ0Lm9mZnNldFggfHwgZXZ0LnBhZ2VYIC0gX3RoaXMuY2FudmFzLm9mZnNldExlZnQ7XG5cdFx0ICBsYXN0WSA9IGV2dC5vZmZzZXRZIHx8IGV2dC5wYWdlWSAtIF90aGlzLmNhbnZhcy5vZmZzZXRUb3A7XG4gIFxuXHRcdCAgZHJhZ2dlZCA9IHRydWU7XG5cdFx0ICBpZiAoZHJhZ1N0YXJ0KSB7XG5cdFx0XHR2YXIgcHQgPSBfdGhpcy5jb250ZXh0LnRyYW5zZm9ybWVkUG9pbnQobGFzdFgsIGxhc3RZKTtcblx0XHRcdF90aGlzLmNvbnRleHQudHJhbnNsYXRlKHB0LnggLSBkcmFnU3RhcnQueCwgcHQueSAtIGRyYWdTdGFydC55KTtcblx0XHRcdF90aGlzLmRyYXcoKTtcblx0XHRcdF90aGlzLmNvbmZpZy5tb3ZlWCArPSBwdC54IC0gZHJhZ1N0YXJ0Lng7XG5cdFx0XHRfdGhpcy5jb25maWcubW92ZVkgKz0gcHQueSAtIGRyYWdTdGFydC55O1xuXHRcdCAgfVxuXHRcdH0sXG5cdFx0ZmFsc2Vcblx0ICApO1xuICBcblx0ICBfdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcblx0XHRcIm1vdXNldXBcIixcblx0XHRmdW5jdGlvbihldnQpIHtcblx0XHQgIGRyYWdTdGFydCA9IG51bGw7XG5cdFx0ICBfdGhpcy5jYW52YXMuc3R5bGUuY3Vyc29yID0gXCJkZWZhdWx0XCI7XG5cdFx0ICAvL2lmICghZHJhZ2dlZCkgem9vbShldnQuc2hpZnRLZXkgPyAtMSA6IDEgKTtcblx0XHR9LFxuXHRcdGZhbHNlXG5cdCAgKTtcbiAgXG5cdCAgdmFyIGhhbmRsZVNjcm9sbCA9IGZ1bmN0aW9uKGV2dCkge1xuXHRcdHZhciBkZWx0YSA9IGV2dC53aGVlbERlbHRhXG5cdFx0ICA/IGV2dC53aGVlbERlbHRhIC8gMzAwXG5cdFx0ICA6IGV2dC5kZXRhaWxcblx0XHQgID8gLWV2dC5kZXRhaWxcblx0XHQgIDogMDtcblx0XHRfdGhpcy5hZGRab29tKGRlbHRhKTtcblx0XHRyZXR1cm4gZXZ0LnByZXZlbnREZWZhdWx0KCkgJiYgZmFsc2U7XG5cdCAgfTtcbiAgXG5cdCAgX3RoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Nb3VzZVNjcm9sbFwiLCBoYW5kbGVTY3JvbGwsIGZhbHNlKTtcblx0ICBfdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNld2hlZWxcIiwgaGFuZGxlU2Nyb2xsLCBmYWxzZSk7XG5cdH07XG4gIFxuXHR0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcblx0ICAvLyBpZihkYXRhKXtcblx0ICAvLyAgIGRhdGEgPSB0aGlzLmRhdGE7XG5cdCAgLy8gfVxuICBcblx0ICB2YXIgX3RoaXMgPSB0aGlzO1xuXHQgIC8vX3RoaXMuZGF0YSA9IGRhdGE7XG4gIFxuXHQgIHZhciBkaWFncmFtTGlzdCA9IFtdO1xuXHQgIHZhciBkaWFncmFtTGluZXNDb3VudCA9IFtdO1xuXHQgIHZhciBkaWFncmFtQ29sdW1uc0NvdW50ID0gMDtcblx0ICB2YXIgZGlhZ3JhbUNvbHVtbkxvd2VyID0gMDtcbiAgXG5cdCAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmRpYWdyYW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIG9iamVjdERpYWdyYW0gPSB7XG5cdFx0ICBpZDogZGF0YS5kaWFncmFtc1tpXS5pZCxcblx0XHQgIHg6IDAsXG5cdFx0ICB5OiAwLFxuXHRcdCAgY3g6IDAsXG5cdFx0ICBjeTogMCxcblx0XHQgIHRleHQ6IGRhdGEuZGlhZ3JhbXNbaV0udGV4dCxcblx0XHQgIGNvbG9yOiBkYXRhLmRpYWdyYW1zW2ldLmNvbG9yLFxuXHRcdCAgYmdDb2xvcjogZGF0YS5kaWFncmFtc1tpXS5iZ0NvbG9yLFxuXHRcdCAgcGFyZW50czogW10sXG5cdFx0ICBjaGlsZHJlbjogW10sXG5cdFx0ICB2aXJnaW46IHRydWUsXG5cdFx0ICBvcnBoYW46IHRydWVcblx0XHR9O1xuICBcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRhdGEubGlua3MubGVuZ3RoOyBqKyspIHtcblx0XHQgIGlmIChkYXRhLmxpbmtzW2pdLnNvdXJjZSA9PSBvYmplY3REaWFncmFtLmlkKSB7XG5cdFx0XHRvYmplY3REaWFncmFtLnBhcmVudHMucHVzaChkYXRhLmxpbmtzW2pdLnBhcmVudCk7XG5cdFx0XHRvYmplY3REaWFncmFtLm9ycGhhbiA9IGZhbHNlO1xuXHRcdCAgfVxuICBcblx0XHQgIGlmIChkYXRhLmxpbmtzW2pdLnBhcmVudCA9PSBvYmplY3REaWFncmFtLmlkKSB7XG5cdFx0XHRvYmplY3REaWFncmFtLmNoaWxkcmVuLnB1c2goZGF0YS5saW5rc1tqXS5zb3VyY2UpO1xuXHRcdFx0b2JqZWN0RGlhZ3JhbS5vcnBoYW4gPSBmYWxzZTtcblx0XHQgIH1cblx0XHR9XG4gIFxuXHRcdGRpYWdyYW1MaXN0LnB1c2gob2JqZWN0RGlhZ3JhbSk7XG5cdCAgfVxuICBcblx0ICB2YXIgZ2V0TGluZXNPYmplY3RzID0gZnVuY3Rpb24gZ2V0TGluZXNPYmplY3RzKG9iamVjdCwgaGllcmFyY2h5KSB7XG5cdFx0aWYgKG9iamVjdC52aXJnaW4pIHtcblx0XHQgIG9iamVjdC52aXJnaW4gPSBmYWxzZTtcblx0XHQgIG9iamVjdC55ID0gaGllcmFyY2h5O1xuICBcblx0XHQgIGlmIChoaWVyYXJjaHkgPCBkaWFncmFtQ29sdW1uTG93ZXIpIHtcblx0XHRcdGRpYWdyYW1Db2x1bW5Mb3dlciA9IGhpZXJhcmNoeTtcblx0XHQgIH1cbiAgXG5cdFx0ICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHRtcE9iaiA9IGdldE9iakJ5SWQoZGlhZ3JhbUxpc3QsIG9iamVjdC5jaGlsZHJlbltpXSk7XG5cdFx0XHRnZXRMaW5lc09iamVjdHModG1wT2JqLCBoaWVyYXJjaHkgKyAxKTtcblx0XHQgIH1cbiAgXG5cdFx0ICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgdG1wT2JqID0gZ2V0T2JqQnlJZChkaWFncmFtTGlzdCwgb2JqZWN0LnBhcmVudHNbaV0pO1xuXHRcdFx0Z2V0TGluZXNPYmplY3RzKHRtcE9iaiwgaGllcmFyY2h5IC0gMSk7XG5cdFx0ICB9XG5cdFx0fVxuXHQgIH07XG4gIFxuXHQgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlhZ3JhbUxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRnZXRMaW5lc09iamVjdHMoZGlhZ3JhbUxpc3RbaV0sIDApO1xuXHQgIH1cbiAgXG5cdCAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaWFncmFtTGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBjb3VudE9ialRtcCA9IGdldE9iakJ5SWQoXG5cdFx0ICBkaWFncmFtTGluZXNDb3VudCxcblx0XHQgIGRpYWdyYW1MaXN0W2ldLnlcblx0XHQpO1xuXHRcdGlmIChjb3VudE9ialRtcCAhPSBudWxsKSB7XG5cdFx0ICBpZiAoIWRpYWdyYW1MaXN0W2ldLm9ycGhhbikge1xuXHRcdFx0Y291bnRPYmpUbXAuY291bnQrKztcblx0XHRcdGRpYWdyYW1MaXN0W2ldLnggPSBjb3VudE9ialRtcC5jb3VudDtcblx0XHRcdGlmIChjb3VudE9ialRtcC5jb3VudCA+IGRpYWdyYW1Db2x1bW5zQ291bnQpIHtcblx0XHRcdCAgZGlhZ3JhbUNvbHVtbnNDb3VudCA9IGNvdW50T2JqVG1wLmNvdW50O1xuXHRcdFx0fVxuXHRcdCAgfVxuXHRcdH0gZWxzZSB7XG5cdFx0ICBpZiAoIWRpYWdyYW1MaXN0W2ldLm9ycGhhbikge1xuXHRcdFx0ZGlhZ3JhbUxpbmVzQ291bnQucHVzaCh7IGlkOiBkaWFncmFtTGlzdFtpXS55LCBjb3VudDogMSB9KTtcblx0XHRcdGRpYWdyYW1MaXN0W2ldLnggPSAxO1xuXHRcdCAgfVxuXHRcdH1cblx0ICB9XG4gIFxuXHQgIHRoaXMuY29uZmlnLmxpbmVzQ291bnQgPSBkaWFncmFtTGluZXNDb3VudDtcblx0ICB0aGlzLmNvbmZpZy5jb2x1bW5zQ291bnQgPSBkaWFncmFtQ29sdW1uc0NvdW50O1xuXHQgIHRoaXMuY29uZmlnLmNvbHVtbkxvd2VyID0gZGlhZ3JhbUNvbHVtbkxvd2VyO1xuXHQgIHRoaXMuZGlhZ3JhbXMgPSBkaWFncmFtTGlzdDtcblx0fTtcbiAgXG5cdHRoaXMuZHJhdyA9IGZ1bmN0aW9uKCkge1xuXHQgIHZhciBfdGhpcyA9IHRoaXM7XG4gIFxuXHQgIGlmIChfdGhpcy5jb250ZXh0LnRyYW5zZm9ybWVkUG9pbnQpIHtcblx0XHR2YXIgcDEgPSBfdGhpcy5jb250ZXh0LnRyYW5zZm9ybWVkUG9pbnQoMCwgMCk7XG5cdFx0dmFyIHAyID0gX3RoaXMuY29udGV4dC50cmFuc2Zvcm1lZFBvaW50KFxuXHRcdCAgX3RoaXMuY2FudmFzLndpZHRoLFxuXHRcdCAgX3RoaXMuY2FudmFzLmhlaWdodFxuXHRcdCk7XG5cdFx0X3RoaXMuY29udGV4dC5jbGVhclJlY3QocDEueCwgcDEueSwgcDIueCAtIHAxLngsIHAyLnkgLSBwMS55KTtcblx0ICB9IGVsc2Uge1xuXHRcdF90aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIF90aGlzLmNhbnZhcy53aWR0aCwgX3RoaXMuY2FudmFzLmhlaWdodCk7XG5cdCAgfVxuICBcblx0ICB2YXIgZGlhZ3JhbVdpdGhNYXJnaW4gPSBfdGhpcy5jb25maWcud2lkdGggKyAyICogX3RoaXMuY29uZmlnLm1hcmdpbjtcbiAgXG5cdCAgaWYgKF90aGlzLmNvbmZpZy5jb2x1bW5zQ291bnQgPT0gMCkge1xuXHRcdF90aGlzLmNvbmZpZy5jb2x1bW5zQ291bnQgPSBwYXJzZUludChcblx0XHQgIF90aGlzLmNhbnZhcy53aWR0aCAvIGRpYWdyYW1XaXRoTWFyZ2luXG5cdFx0KTtcblx0ICB9XG4gIFxuXHQgIHZhciBtYXhXaWR0aCA9IF90aGlzLmNvbmZpZy5jb2x1bW5zQ291bnQgKiBkaWFncmFtV2l0aE1hcmdpbjtcblx0ICB2YXIgbWFyZ2luU2NyZWVuID0gcGFyc2VJbnQoX3RoaXMuY2FudmFzLndpZHRoKSAvIDIgLSBtYXhXaWR0aCAvIDI7XG4gIFxuXHQgIF90aGlzLmNvbnRleHQucm90YXRlKDIgKiBNYXRoLlBJKTtcbiAgXG5cdCAgdmFyIGNvdW50T3JwaGFuRGVtYW5kID0gMDtcblx0ICBmb3IgKHZhciBpID0gMDsgaSA8IF90aGlzLmRpYWdyYW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKF90aGlzLmRpYWdyYW1zW2ldLm9ycGhhbikge1xuXHRcdCAgdmFyIHBvc2l0aW9uWCA9XG5cdFx0XHRtYXJnaW5TY3JlZW4gK1xuXHRcdFx0X3RoaXMuY29uZmlnLm1hcmdpbiArXG5cdFx0XHRwYXJzZUludChjb3VudE9ycGhhbkRlbWFuZCAlIF90aGlzLmNvbmZpZy5jb2x1bW5zQ291bnQpICpcblx0XHRcdCAgKF90aGlzLmNvbmZpZy53aWR0aCArIDIgKiBfdGhpcy5jb25maWcubWFyZ2luKTtcblx0XHQgIHZhciBwb3NpdGlvblkgPVxuXHRcdFx0X3RoaXMuY29uZmlnLm1hcmdpbiArXG5cdFx0XHRwYXJzZUludChjb3VudE9ycGhhbkRlbWFuZCAvIF90aGlzLmNvbmZpZy5jb2x1bW5zQ291bnQpICpcblx0XHRcdCAgKF90aGlzLmNvbmZpZy5oZWlnaHQgKyAyICogX3RoaXMuY29uZmlnLm1hcmdpbik7XG5cdFx0ICBfdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IF90aGlzLmRpYWdyYW1zW2ldLmJnQ29sb3I7XG5cdFx0ICBfdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gX3RoaXMuZGlhZ3JhbXNbaV0uYmdDb2xvcjtcblx0XHQgIHJvdW5kUmVjdChcblx0XHRcdF90aGlzLmNvbnRleHQsXG5cdFx0XHRwb3NpdGlvblgsXG5cdFx0XHRwb3NpdGlvblksXG5cdFx0XHRfdGhpcy5jb25maWcud2lkdGgsXG5cdFx0XHRfdGhpcy5jb25maWcuaGVpZ2h0LFxuXHRcdFx0X3RoaXMuY29uZmlnLnJhZGl1cyxcblx0XHRcdF90aGlzLmNvbmZpZy5oaWRkZW5CZ1xuXHRcdCAgKTtcblx0XHQgIC8vXG5cdFx0ICB2YXIgbm9kZVRleHQgPSBfdGhpcy5jb250ZXh0O1xuXHRcdCAgbm9kZVRleHQuZmlsbFN0eWxlID0gX3RoaXMuZGlhZ3JhbXNbaV0uY29sb3I7XG5cdFx0ICBub2RlVGV4dC5mb250ID0gX3RoaXMuY29uZmlnLmZvbnRTaXplICsgXCJweCBcIiArIF90aGlzLmNvbmZpZy5mb250RmFtaWx5O1xuXHRcdCAgd3JhcFRleHQoXG5cdFx0XHRfdGhpcy5jb250ZXh0LFxuXHRcdFx0X3RoaXMuZGlhZ3JhbXNbaV0udGV4dCxcblx0XHRcdHBvc2l0aW9uWCArIF90aGlzLmNvbmZpZy5wYWRkaW5nLFxuXHRcdFx0cG9zaXRpb25ZLFxuXHRcdFx0X3RoaXMuY29uZmlnLndpZHRoIC0gX3RoaXMuY29uZmlnLnBhZGRpbmcgKiAyLFxuXHRcdFx0X3RoaXMuY29uZmlnLmhlaWdodCxcblx0XHRcdF90aGlzLmNvbmZpZy5mb250U2l6ZSArIF90aGlzLmNvbmZpZy5mb250U2l6ZSAqIDAuMlxuXHRcdCAgKTtcbiAgXG5cdFx0ICBjb3VudE9ycGhhbkRlbWFuZCsrO1xuXHRcdH1cblx0ICB9XG4gIFxuXHQgIC8vQ0FMQ1VMQVRFIFggWSBOT1QgT1JQSEFOUyBESUFHUkFNU1xuICBcblx0ICB2YXIgbWFyZ2luVG9wTm90T3JwaGFucyA9XG5cdFx0X3RoaXMuY29uZmlnLmhlaWdodCArXG5cdFx0MyAqIF90aGlzLmNvbmZpZy5tYXJnaW4gK1xuXHRcdHBhcnNlSW50KChjb3VudE9ycGhhbkRlbWFuZCAtIDEpIC8gX3RoaXMuY29uZmlnLmNvbHVtbnNDb3VudCkgKlxuXHRcdCAgKF90aGlzLmNvbmZpZy5oZWlnaHQgKyAyICogX3RoaXMuY29uZmlnLm1hcmdpbik7XG4gIFxuXHQgIGlmIChpc05hTihtYXJnaW5Ub3BOb3RPcnBoYW5zKSkge1xuXHRcdG1hcmdpblRvcE5vdE9ycGhhbnMgPSBfdGhpcy5jb25maWcubWFyZ2luO1xuXHQgIH1cbiAgXG5cdCAgZm9yICh2YXIgaSA9IDA7IGkgPCBfdGhpcy5kaWFncmFtcy5sZW5ndGg7IGkrKykge1xuXHRcdGlmICghX3RoaXMuZGlhZ3JhbXNbaV0ub3JwaGFuKSB7XG5cdFx0ICB2YXIgbWF4Q29sdW1uc0luTGluZSA9IGdldE9iakJ5SWQoXG5cdFx0XHRfdGhpcy5jb25maWcubGluZXNDb3VudCxcblx0XHRcdF90aGlzLmRpYWdyYW1zW2ldLnlcblx0XHQgICkuY291bnQ7XG5cdFx0ICB2YXIgcmF0aW8gPSBtYXhXaWR0aCAvIG1heENvbHVtbnNJbkxpbmU7XG5cdFx0ICB2YXIgcG9zaXRpb25YID1cblx0XHRcdG1hcmdpblNjcmVlbiArXG5cdFx0XHRyYXRpbyAqIF90aGlzLmRpYWdyYW1zW2ldLnggK1xuXHRcdFx0KHJhdGlvIC8gMiAtIF90aGlzLmNvbmZpZy53aWR0aCAvIDIpIC1cblx0XHRcdHJhdGlvO1xuXHRcdCAgdmFyIHBvc2l0aW9uWSA9XG5cdFx0XHRtYXJnaW5Ub3BOb3RPcnBoYW5zICtcblx0XHRcdE1hdGguYWJzKF90aGlzLmNvbmZpZy5jb2x1bW5Mb3dlcikgKlxuXHRcdFx0ICAoX3RoaXMuY29uZmlnLmhlaWdodCArIDIgKiBfdGhpcy5jb25maWcubWFyZ2luKSArXG5cdFx0XHRfdGhpcy5kaWFncmFtc1tpXS55ICogKF90aGlzLmNvbmZpZy5oZWlnaHQgKyAyICogX3RoaXMuY29uZmlnLm1hcmdpbik7XG5cdFx0ICBfdGhpcy5kaWFncmFtc1tpXS5sZWZ0ID0gcG9zaXRpb25YO1xuXHRcdCAgX3RoaXMuZGlhZ3JhbXNbaV0udG9wID0gcG9zaXRpb25ZO1xuXHRcdH1cblx0ICB9XG4gIFxuXHQgIC8vRFJBVyBMSU5FU1xuICBcblx0ICBmb3IgKHZhciBpID0gMDsgaSA8IF90aGlzLmRpYWdyYW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKCFfdGhpcy5kaWFncmFtc1tpXS5vcnBoYW4pIHtcblx0XHQgIGZvciAodmFyIGogPSAwOyBqIDwgX3RoaXMuZGlhZ3JhbXNbaV0ucGFyZW50cy5sZW5ndGg7IGorKykge1xuXHRcdFx0dmFyIHRtcE9iaiA9IGdldE9iakJ5SWQoXG5cdFx0XHQgIF90aGlzLmRpYWdyYW1zLFxuXHRcdFx0ICBfdGhpcy5kaWFncmFtc1tpXS5wYXJlbnRzW2pdXG5cdFx0XHQpO1xuXHRcdFx0dmFyIGludmVydFBhcmVudCA9IGZhbHNlO1xuXHRcdFx0dmFyIGlzRGlzdGFudCA9IGZhbHNlO1xuXHRcdFx0dmFyIGF1dG9SZWYgPSBmYWxzZTtcblx0XHRcdHZhciBjb3VudERpc3RhbnQgPSAwO1xuXHRcdFx0dmFyIGNvdW50SW52ZXJ0UGFyZW50ID0gMDtcbiAgXG5cdFx0XHRpZiAoX3RoaXMuZGlhZ3JhbXNbaV0uaWQgPT0gdG1wT2JqLmlkKSB7XG5cdFx0XHQgIGF1dG9SZWYgPSB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmIChfdGhpcy5kaWFncmFtc1tpXS55IDwgdG1wT2JqLnkpIHtcblx0XHRcdCAgaW52ZXJ0UGFyZW50ID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSBpZiAoX3RoaXMuZGlhZ3JhbXNbaV0ueSAtIHRtcE9iai55ID4gMSkge1xuXHRcdFx0ICBpc0Rpc3RhbnQgPSB0cnVlO1xuXHRcdFx0fVxuICBcblx0XHRcdGlmIChfdGhpcy5jb250ZXh0LnNldExpbmVEYXNoKSB7XG5cdFx0XHQgIF90aGlzLmNvbnRleHQuc2V0TGluZURhc2goW190aGlzLmNvbmZpZy5saW5lV2lkdGgsIDBdKTtcblx0XHRcdH1cbiAgXG5cdFx0XHRfdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID1cblx0XHRcdCAgX3RoaXMuY29uZmlnLmxpbmVDb2xvciB8fCBfdGhpcy5kaWFncmFtc1tpXS5iZ0NvbG9yO1xuXHRcdFx0X3RoaXMuY29udGV4dC5maWxsU3R5bGUgPVxuXHRcdFx0ICBfdGhpcy5jb25maWcubGluZUNvbG9yIHx8IF90aGlzLmRpYWdyYW1zW2ldLmJnQ29sb3I7XG4gIFxuXHRcdFx0dmFyIGRpZmZlcmVuY2UgPSAwO1xuICBcblx0XHRcdGlmIChhdXRvUmVmKSB7XG5cdFx0XHQgIGRpZmZlcmVuY2UgPVxuXHRcdFx0XHRfdGhpcy5jb25maWcubWFyZ2luIC8gMiAtXG5cdFx0XHRcdChfdGhpcy5jb25maWcubWFyZ2luIC8gX3RoaXMuY29uZmlnLmNvbHVtbnNDb3VudCkgKlxuXHRcdFx0XHQgIF90aGlzLmRpYWdyYW1zW2ldLng7XG4gIFxuXHRcdFx0ICBpZiAoIWlzRmluaXRlKGRpZmZlcmVuY2UpKSB7XG5cdFx0XHRcdGRpZmZlcmVuY2UgPSAwO1xuXHRcdFx0ICB9XG4gIFxuXHRcdFx0ICBfdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuXHRcdFx0ICBfdGhpcy5jb250ZXh0Lm1vdmVUbyhcblx0XHRcdFx0dG1wT2JqLmxlZnQgK1xuXHRcdFx0XHQgIF90aGlzLmNvbmZpZy53aWR0aCAvIDIgK1xuXHRcdFx0XHQgIGRpZmZlcmVuY2UgKiAtMSAtXG5cdFx0XHRcdCAgZGlmZmVyZW5jZSxcblx0XHRcdFx0dG1wT2JqLnRvcCArIF90aGlzLmNvbmZpZy5oZWlnaHRcblx0XHRcdCAgKTtcblx0XHRcdCAgX3RoaXMuY29udGV4dC5saW5lVG8oXG5cdFx0XHRcdHRtcE9iai5sZWZ0ICtcblx0XHRcdFx0ICBfdGhpcy5jb25maWcud2lkdGggLyAyICtcblx0XHRcdFx0ICBkaWZmZXJlbmNlICogLTEgLVxuXHRcdFx0XHQgIGRpZmZlcmVuY2UsXG5cdFx0XHRcdHRtcE9iai50b3AgKyBfdGhpcy5jb25maWcuaGVpZ2h0ICsgX3RoaXMuY29uZmlnLm1hcmdpbiAvIDIuNVxuXHRcdFx0ICApO1xuXHRcdFx0ICBfdGhpcy5jb250ZXh0LmxpbmVUbyhcblx0XHRcdFx0dG1wT2JqLmxlZnQgK1xuXHRcdFx0XHQgIF90aGlzLmNvbmZpZy53aWR0aCAvIDIgK1xuXHRcdFx0XHQgIGRpZmZlcmVuY2UgKiAtMSArXG5cdFx0XHRcdCAgZGlmZmVyZW5jZSxcblx0XHRcdFx0dG1wT2JqLnRvcCArIF90aGlzLmNvbmZpZy5oZWlnaHQgKyBfdGhpcy5jb25maWcubWFyZ2luIC8gMi41XG5cdFx0XHQgICk7XG5cdFx0XHQgIF90aGlzLmNvbnRleHQubGluZVRvKFxuXHRcdFx0XHR0bXBPYmoubGVmdCArXG5cdFx0XHRcdCAgX3RoaXMuY29uZmlnLndpZHRoIC8gMiArXG5cdFx0XHRcdCAgZGlmZmVyZW5jZSAqIC0xICtcblx0XHRcdFx0ICBkaWZmZXJlbmNlLFxuXHRcdFx0XHR0bXBPYmoudG9wICsgX3RoaXMuY29uZmlnLmhlaWdodCArIF90aGlzLmNvbmZpZy5hcnJvd1dpZHRoIC8gMlxuXHRcdFx0ICApO1xuXHRcdFx0ICBfdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICBcblx0XHRcdCAgX3RoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcblx0XHRcdCAgX3RoaXMuY29udGV4dC5tb3ZlVG8oXG5cdFx0XHRcdHRtcE9iai5sZWZ0ICtcblx0XHRcdFx0ICBfdGhpcy5jb25maWcud2lkdGggLyAyICtcblx0XHRcdFx0ICBkaWZmZXJlbmNlICogLTEgK1xuXHRcdFx0XHQgIGRpZmZlcmVuY2UsXG5cdFx0XHRcdHRtcE9iai50b3AgKyBfdGhpcy5jb25maWcuaGVpZ2h0XG5cdFx0XHQgICk7XG5cdFx0XHQgIF90aGlzLmNvbnRleHQubGluZVRvKFxuXHRcdFx0XHR0bXBPYmoubGVmdCArXG5cdFx0XHRcdCAgX3RoaXMuY29uZmlnLndpZHRoIC8gMiAtXG5cdFx0XHRcdCAgX3RoaXMuY29uZmlnLmFycm93V2lkdGggLyAyICtcblx0XHRcdFx0ICBkaWZmZXJlbmNlICogLTEgK1xuXHRcdFx0XHQgIGRpZmZlcmVuY2UsXG5cdFx0XHRcdHRtcE9iai50b3AgKyBfdGhpcy5jb25maWcuaGVpZ2h0ICsgX3RoaXMuY29uZmlnLmFycm93V2lkdGhcblx0XHRcdCAgKTtcblx0XHRcdCAgX3RoaXMuY29udGV4dC5saW5lVG8oXG5cdFx0XHRcdHRtcE9iai5sZWZ0ICtcblx0XHRcdFx0ICBfdGhpcy5jb25maWcud2lkdGggLyAyICtcblx0XHRcdFx0ICBfdGhpcy5jb25maWcuYXJyb3dXaWR0aCAvIDIgK1xuXHRcdFx0XHQgIGRpZmZlcmVuY2UgKiAtMSArXG5cdFx0XHRcdCAgZGlmZmVyZW5jZSxcblx0XHRcdFx0dG1wT2JqLnRvcCArIF90aGlzLmNvbmZpZy5oZWlnaHQgKyBfdGhpcy5jb25maWcuYXJyb3dXaWR0aFxuXHRcdFx0ICApO1xuXHRcdFx0ICBfdGhpcy5jb250ZXh0LmZpbGwoKTtcblx0XHRcdH0gZWxzZSBpZiAoaW52ZXJ0UGFyZW50KSB7XG5cdFx0XHQgIGlmIChfdGhpcy5jb25maWcubGluZURpZmYpIHtcblx0XHRcdFx0ZGlmZmVyZW5jZSA9XG5cdFx0XHRcdCAgX3RoaXMuY29uZmlnLm1hcmdpbiAvIDIgLVxuXHRcdFx0XHQgIChfdGhpcy5jb25maWcubWFyZ2luIC8gX3RoaXMuY29uZmlnLmNvbHVtbnNDb3VudCkgKlxuXHRcdFx0XHRcdF90aGlzLmRpYWdyYW1zW2ldLnggK1xuXHRcdFx0XHQgIChfdGhpcy5jb25maWcubWFyZ2luIC1cblx0XHRcdFx0XHQoX3RoaXMuY29uZmlnLmFycm93V2lkdGggK1xuXHRcdFx0XHRcdCAgX3RoaXMuY29uZmlnLmxpbmVXaWR0aCAqIDIgKiBjb3VudEludmVydFBhcmVudCkpO1xuXHRcdFx0ICB9XG4gIFxuXHRcdFx0ICBpZiAoX3RoaXMuY29udGV4dC5zZXRMaW5lRGFzaCkge1xuXHRcdFx0XHRfdGhpcy5jb250ZXh0LnNldExpbmVEYXNoKFtcblx0XHRcdFx0ICBfdGhpcy5jb25maWcubGluZVdpZHRoLFxuXHRcdFx0XHQgIF90aGlzLmNvbmZpZy5saW5lV2lkdGhcblx0XHRcdFx0XSk7XG5cdFx0XHQgIH1cbiAgXG5cdFx0XHQgIF90aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG5cdFx0XHQgIF90aGlzLmNvbnRleHQubW92ZVRvKFxuXHRcdFx0XHRfdGhpcy5kaWFncmFtc1tpXS5sZWZ0ICsgX3RoaXMuY29uZmlnLndpZHRoIC8gMiArIGRpZmZlcmVuY2UsXG5cdFx0XHRcdF90aGlzLmRpYWdyYW1zW2ldLnRvcCArIF90aGlzLmNvbmZpZy5oZWlnaHQgLyAyICsgZGlmZmVyZW5jZVxuXHRcdFx0ICApO1xuXHRcdFx0ICBfdGhpcy5jb250ZXh0LmxpbmVUbyhcblx0XHRcdFx0X3RoaXMuZGlhZ3JhbXNbaV0ubGVmdCArXG5cdFx0XHRcdCAgX3RoaXMuY29uZmlnLndpZHRoICtcblx0XHRcdFx0ICBfdGhpcy5jb25maWcubWFyZ2luICtcblx0XHRcdFx0ICBkaWZmZXJlbmNlLFxuXHRcdFx0XHRfdGhpcy5kaWFncmFtc1tpXS50b3AgKyBfdGhpcy5jb25maWcuaGVpZ2h0IC8gMiArIGRpZmZlcmVuY2Vcblx0XHRcdCAgKTtcblx0XHRcdCAgX3RoaXMuY29udGV4dC5saW5lVG8oXG5cdFx0XHRcdF90aGlzLmRpYWdyYW1zW2ldLmxlZnQgK1xuXHRcdFx0XHQgIF90aGlzLmNvbmZpZy53aWR0aCArXG5cdFx0XHRcdCAgX3RoaXMuY29uZmlnLm1hcmdpbiArXG5cdFx0XHRcdCAgZGlmZmVyZW5jZSxcblx0XHRcdFx0dG1wT2JqLnRvcCAtIF90aGlzLmNvbmZpZy5tYXJnaW4gKyBkaWZmZXJlbmNlXG5cdFx0XHQgICk7XG5cdFx0XHQgIF90aGlzLmNvbnRleHQubGluZVRvKFxuXHRcdFx0XHR0bXBPYmoubGVmdCArIF90aGlzLmNvbmZpZy53aWR0aCAvIDIgKyBkaWZmZXJlbmNlLFxuXHRcdFx0XHR0bXBPYmoudG9wIC0gX3RoaXMuY29uZmlnLm1hcmdpbiArIGRpZmZlcmVuY2Vcblx0XHRcdCAgKTtcblx0XHRcdCAgX3RoaXMuY29udGV4dC5saW5lVG8oXG5cdFx0XHRcdHRtcE9iai5sZWZ0ICsgX3RoaXMuY29uZmlnLndpZHRoIC8gMiArIGRpZmZlcmVuY2UsXG5cdFx0XHRcdHRtcE9iai50b3AgLSBfdGhpcy5jb25maWcuYXJyb3dXaWR0aCArIGRpZmZlcmVuY2Vcblx0XHRcdCAgKTtcblx0XHRcdCAgX3RoaXMuY29udGV4dC5saW5lV2lkdGggPSBfdGhpcy5jb25maWcubGluZVdpZHRoO1xuXHRcdFx0ICBfdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICBcblx0XHRcdCAgX3RoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcblx0XHRcdCAgX3RoaXMuY29udGV4dC5tb3ZlVG8oXG5cdFx0XHRcdHRtcE9iai5sZWZ0ICsgX3RoaXMuY29uZmlnLndpZHRoIC8gMiArIGRpZmZlcmVuY2UsXG5cdFx0XHRcdHRtcE9iai50b3Bcblx0XHRcdCAgKTtcblx0XHRcdCAgX3RoaXMuY29udGV4dC5saW5lVG8oXG5cdFx0XHRcdHRtcE9iai5sZWZ0ICtcblx0XHRcdFx0ICBfdGhpcy5jb25maWcud2lkdGggLyAyIC1cblx0XHRcdFx0ICBfdGhpcy5jb25maWcuYXJyb3dXaWR0aCAvIDIgK1xuXHRcdFx0XHQgIGRpZmZlcmVuY2UsXG5cdFx0XHRcdHRtcE9iai50b3AgLSBfdGhpcy5jb25maWcuYXJyb3dXaWR0aFxuXHRcdFx0ICApO1xuXHRcdFx0ICBfdGhpcy5jb250ZXh0LmxpbmVUbyhcblx0XHRcdFx0dG1wT2JqLmxlZnQgK1xuXHRcdFx0XHQgIF90aGlzLmNvbmZpZy53aWR0aCAvIDIgK1xuXHRcdFx0XHQgIF90aGlzLmNvbmZpZy5hcnJvd1dpZHRoIC8gMiArXG5cdFx0XHRcdCAgZGlmZmVyZW5jZSxcblx0XHRcdFx0dG1wT2JqLnRvcCAtIF90aGlzLmNvbmZpZy5hcnJvd1dpZHRoXG5cdFx0XHQgICk7XG5cdFx0XHQgIF90aGlzLmNvbnRleHQuZmlsbCgpO1xuXHRcdFx0fSBlbHNlIGlmIChpc0Rpc3RhbnQpIHtcblx0XHRcdCAgaWYgKF90aGlzLmNvbmZpZy5saW5lRGlmZikge1xuXHRcdFx0XHRkaWZmZXJlbmNlID1cblx0XHRcdFx0ICBfdGhpcy5jb25maWcubWFyZ2luIC8gMiAtXG5cdFx0XHRcdCAgKF90aGlzLmNvbmZpZy5tYXJnaW4gLyBfdGhpcy5jb25maWcuY29sdW1uc0NvdW50KSAqXG5cdFx0XHRcdFx0X3RoaXMuZGlhZ3JhbXNbaV0ueCArXG5cdFx0XHRcdCAgKF90aGlzLmNvbmZpZy5tYXJnaW4gLVxuXHRcdFx0XHRcdChfdGhpcy5jb25maWcuYXJyb3dXaWR0aCArXG5cdFx0XHRcdFx0ICBfdGhpcy5jb25maWcubGluZVdpZHRoICogMiAqIGNvdW50RGlzdGFudCkpO1xuXHRcdFx0ICB9XG4gIFxuXHRcdFx0ICBjb3VudERpc3RhbnQrKztcbiAgXG5cdFx0XHQgIGlmICghaXNGaW5pdGUoZGlmZmVyZW5jZSkpIHtcblx0XHRcdFx0ZGlmZmVyZW5jZSA9IDA7XG5cdFx0XHQgIH1cbiAgXG5cdFx0XHQgIGlmIChfdGhpcy5jb250ZXh0LnNldExpbmVEYXNoKSB7XG5cdFx0XHRcdF90aGlzLmNvbnRleHQuc2V0TGluZURhc2goW1xuXHRcdFx0XHQgIF90aGlzLmNvbmZpZy5saW5lV2lkdGgsXG5cdFx0XHRcdCAgX3RoaXMuY29uZmlnLmxpbmVXaWR0aFxuXHRcdFx0XHRdKTtcblx0XHRcdCAgfVxuICBcblx0XHRcdCAgX3RoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcblx0XHRcdCAgX3RoaXMuY29udGV4dC5tb3ZlVG8oXG5cdFx0XHRcdF90aGlzLmRpYWdyYW1zW2ldLmxlZnQgKyBfdGhpcy5jb25maWcud2lkdGggLyAyICsgZGlmZmVyZW5jZSAqIC0xLFxuXHRcdFx0XHRfdGhpcy5kaWFncmFtc1tpXS50b3Bcblx0XHRcdCAgKTtcblx0XHRcdCAgX3RoaXMuY29udGV4dC5saW5lVG8oXG5cdFx0XHRcdF90aGlzLmRpYWdyYW1zW2ldLmxlZnQgKyBfdGhpcy5jb25maWcud2lkdGggLyAyICsgZGlmZmVyZW5jZSAqIC0xLFxuXHRcdFx0XHRfdGhpcy5kaWFncmFtc1tpXS50b3AgLSBfdGhpcy5jb25maWcubWFyZ2luICsgZGlmZmVyZW5jZVxuXHRcdFx0ICApO1xuXHRcdFx0ICBfdGhpcy5jb250ZXh0LmxpbmVUbyhcblx0XHRcdFx0dG1wT2JqLmxlZnQgKyBfdGhpcy5jb25maWcud2lkdGggLyAyICsgZGlmZmVyZW5jZSAqIC0xLFxuXHRcdFx0XHRfdGhpcy5kaWFncmFtc1tpXS50b3AgLSBfdGhpcy5jb25maWcubWFyZ2luICsgZGlmZmVyZW5jZVxuXHRcdFx0ICApO1xuXHRcdFx0ICBfdGhpcy5jb250ZXh0LmxpbmVUbyhcblx0XHRcdFx0dG1wT2JqLmxlZnQgKyBfdGhpcy5jb25maWcud2lkdGggLyAyICsgZGlmZmVyZW5jZSAqIC0xLFxuXHRcdFx0XHR0bXBPYmoudG9wICtcblx0XHRcdFx0ICBfdGhpcy5jb25maWcuaGVpZ2h0ICtcblx0XHRcdFx0ICBfdGhpcy5jb25maWcubWFyZ2luICtcblx0XHRcdFx0ICBkaWZmZXJlbmNlXG5cdFx0XHQgICk7XG5cdFx0XHQgIF90aGlzLmNvbnRleHQubGluZVRvKFxuXHRcdFx0XHR0bXBPYmoubGVmdCArIF90aGlzLmNvbmZpZy53aWR0aCAvIDIgKyBkaWZmZXJlbmNlICogLTEsXG5cdFx0XHRcdHRtcE9iai50b3AgKyBfdGhpcy5jb25maWcuaGVpZ2h0ICsgX3RoaXMuY29uZmlnLmFycm93V2lkdGggLyAyXG5cdFx0XHQgICk7XG5cdFx0XHQgIF90aGlzLmNvbnRleHQubGluZVdpZHRoID0gX3RoaXMuY29uZmlnLmxpbmVXaWR0aDtcblx0XHRcdCAgX3RoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgXG5cdFx0XHQgIF90aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG5cdFx0XHQgIF90aGlzLmNvbnRleHQubW92ZVRvKFxuXHRcdFx0XHR0bXBPYmoubGVmdCArIF90aGlzLmNvbmZpZy53aWR0aCAvIDIgKyBkaWZmZXJlbmNlICogLTEsXG5cdFx0XHRcdHRtcE9iai50b3AgKyBfdGhpcy5jb25maWcuaGVpZ2h0XG5cdFx0XHQgICk7XG5cdFx0XHQgIF90aGlzLmNvbnRleHQubGluZVRvKFxuXHRcdFx0XHR0bXBPYmoubGVmdCArXG5cdFx0XHRcdCAgX3RoaXMuY29uZmlnLndpZHRoIC8gMiAtXG5cdFx0XHRcdCAgX3RoaXMuY29uZmlnLmFycm93V2lkdGggLyAyICtcblx0XHRcdFx0ICBkaWZmZXJlbmNlICogLTEsXG5cdFx0XHRcdHRtcE9iai50b3AgKyBfdGhpcy5jb25maWcuaGVpZ2h0ICsgX3RoaXMuY29uZmlnLmFycm93V2lkdGhcblx0XHRcdCAgKTtcblx0XHRcdCAgX3RoaXMuY29udGV4dC5saW5lVG8oXG5cdFx0XHRcdHRtcE9iai5sZWZ0ICtcblx0XHRcdFx0ICBfdGhpcy5jb25maWcud2lkdGggLyAyICtcblx0XHRcdFx0ICBfdGhpcy5jb25maWcuYXJyb3dXaWR0aCAvIDIgK1xuXHRcdFx0XHQgIGRpZmZlcmVuY2UgKiAtMSxcblx0XHRcdFx0dG1wT2JqLnRvcCArIF90aGlzLmNvbmZpZy5oZWlnaHQgKyBfdGhpcy5jb25maWcuYXJyb3dXaWR0aFxuXHRcdFx0ICApO1xuXHRcdFx0ICBfdGhpcy5jb250ZXh0LmZpbGwoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHQgIC8vdmFyXG5cdFx0XHQgIGlmIChfdGhpcy5jb25maWcubGluZURpZmYpIHtcblx0XHRcdFx0ZGlmZmVyZW5jZSA9XG5cdFx0XHRcdCAgX3RoaXMuY29uZmlnLm1hcmdpbiAvIDIgLVxuXHRcdFx0XHQgIChfdGhpcy5jb25maWcubWFyZ2luIC8gX3RoaXMuY29uZmlnLmNvbHVtbnNDb3VudCkgKlxuXHRcdFx0XHRcdF90aGlzLmRpYWdyYW1zW2ldLng7XG5cdFx0XHQgIH1cbiAgXG5cdFx0XHQgIGlmICghaXNGaW5pdGUoZGlmZmVyZW5jZSkpIHtcblx0XHRcdFx0ZGlmZmVyZW5jZSA9IDA7XG5cdFx0XHQgIH1cbiAgXG5cdFx0XHQgIF90aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG5cdFx0XHQgIF90aGlzLmNvbnRleHQubW92ZVRvKFxuXHRcdFx0XHRfdGhpcy5kaWFncmFtc1tpXS5sZWZ0ICsgX3RoaXMuY29uZmlnLndpZHRoIC8gMiArIGRpZmZlcmVuY2UgKiAtMSxcblx0XHRcdFx0X3RoaXMuZGlhZ3JhbXNbaV0udG9wXG5cdFx0XHQgICk7XG5cdFx0XHQgIF90aGlzLmNvbnRleHQubGluZVRvKFxuXHRcdFx0XHRfdGhpcy5kaWFncmFtc1tpXS5sZWZ0ICsgX3RoaXMuY29uZmlnLndpZHRoIC8gMiArIGRpZmZlcmVuY2UgKiAtMSxcblx0XHRcdFx0X3RoaXMuZGlhZ3JhbXNbaV0udG9wIC0gX3RoaXMuY29uZmlnLm1hcmdpbiArIGRpZmZlcmVuY2Vcblx0XHRcdCAgKTtcblx0XHRcdCAgX3RoaXMuY29udGV4dC5saW5lVG8oXG5cdFx0XHRcdHRtcE9iai5sZWZ0ICsgX3RoaXMuY29uZmlnLndpZHRoIC8gMiArIGRpZmZlcmVuY2UgKiAtMSxcblx0XHRcdFx0dG1wT2JqLnRvcCArXG5cdFx0XHRcdCAgX3RoaXMuY29uZmlnLmhlaWdodCArXG5cdFx0XHRcdCAgX3RoaXMuY29uZmlnLm1hcmdpbiArXG5cdFx0XHRcdCAgZGlmZmVyZW5jZVxuXHRcdFx0ICApO1xuXHRcdFx0ICBfdGhpcy5jb250ZXh0LmxpbmVUbyhcblx0XHRcdFx0dG1wT2JqLmxlZnQgKyBfdGhpcy5jb25maWcud2lkdGggLyAyICsgZGlmZmVyZW5jZSAqIC0xLFxuXHRcdFx0XHR0bXBPYmoudG9wICsgX3RoaXMuY29uZmlnLmhlaWdodCArIF90aGlzLmNvbmZpZy5hcnJvd1dpZHRoIC8gMlxuXHRcdFx0ICApO1xuXHRcdFx0ICBfdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9IF90aGlzLmNvbmZpZy5saW5lV2lkdGg7XG5cdFx0XHQgIF90aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gIFxuXHRcdFx0ICBfdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuXHRcdFx0ICBfdGhpcy5jb250ZXh0Lm1vdmVUbyhcblx0XHRcdFx0dG1wT2JqLmxlZnQgKyBfdGhpcy5jb25maWcud2lkdGggLyAyICsgZGlmZmVyZW5jZSAqIC0xLFxuXHRcdFx0XHR0bXBPYmoudG9wICsgX3RoaXMuY29uZmlnLmhlaWdodFxuXHRcdFx0ICApO1xuXHRcdFx0ICBfdGhpcy5jb250ZXh0LmxpbmVUbyhcblx0XHRcdFx0dG1wT2JqLmxlZnQgK1xuXHRcdFx0XHQgIF90aGlzLmNvbmZpZy53aWR0aCAvIDIgLVxuXHRcdFx0XHQgIF90aGlzLmNvbmZpZy5hcnJvd1dpZHRoIC8gMiArXG5cdFx0XHRcdCAgZGlmZmVyZW5jZSAqIC0xLFxuXHRcdFx0XHR0bXBPYmoudG9wICsgX3RoaXMuY29uZmlnLmhlaWdodCArIF90aGlzLmNvbmZpZy5hcnJvd1dpZHRoXG5cdFx0XHQgICk7XG5cdFx0XHQgIF90aGlzLmNvbnRleHQubGluZVRvKFxuXHRcdFx0XHR0bXBPYmoubGVmdCArXG5cdFx0XHRcdCAgX3RoaXMuY29uZmlnLndpZHRoIC8gMiArXG5cdFx0XHRcdCAgX3RoaXMuY29uZmlnLmFycm93V2lkdGggLyAyICtcblx0XHRcdFx0ICBkaWZmZXJlbmNlICogLTEsXG5cdFx0XHRcdHRtcE9iai50b3AgKyBfdGhpcy5jb25maWcuaGVpZ2h0ICsgX3RoaXMuY29uZmlnLmFycm93V2lkdGhcblx0XHRcdCAgKTtcblx0XHRcdCAgX3RoaXMuY29udGV4dC5maWxsKCk7XG5cdFx0XHR9XG5cdFx0ICB9XG5cdFx0fVxuXHQgIH1cbiAgXG5cdCAgLy9EUkFXIE5PVCBPUlBIQU5TIERJQUdSQU1TXG4gIFxuXHQgIGZvciAodmFyIGkgPSAwOyBpIDwgX3RoaXMuZGlhZ3JhbXMubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoIV90aGlzLmRpYWdyYW1zW2ldLm9ycGhhbikge1xuXHRcdCAgdmFyIHBvc2l0aW9uWCA9IF90aGlzLmRpYWdyYW1zW2ldLmxlZnQ7XG5cdFx0ICB2YXIgcG9zaXRpb25ZID0gX3RoaXMuZGlhZ3JhbXNbaV0udG9wO1xuXHRcdCAgX3RoaXMuY29udGV4dC5maWxsU3R5bGUgPSBfdGhpcy5kaWFncmFtc1tpXS5iZ0NvbG9yO1xuXHRcdCAgX3RoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IF90aGlzLmRpYWdyYW1zW2ldLmJnQ29sb3I7XG5cdFx0ICByb3VuZFJlY3QoXG5cdFx0XHRfdGhpcy5jb250ZXh0LFxuXHRcdFx0cG9zaXRpb25YLFxuXHRcdFx0cG9zaXRpb25ZLFxuXHRcdFx0X3RoaXMuY29uZmlnLndpZHRoLFxuXHRcdFx0X3RoaXMuY29uZmlnLmhlaWdodCxcblx0XHRcdF90aGlzLmNvbmZpZy5yYWRpdXMsXG5cdFx0XHRfdGhpcy5jb25maWcuaGlkZGVuQmdcblx0XHQgICk7XG4gIFxuXHRcdCAgdmFyIG5vZGVUZXh0ID0gX3RoaXMuY29udGV4dDtcblx0XHQgIG5vZGVUZXh0LmZpbGxTdHlsZSA9IF90aGlzLmRpYWdyYW1zW2ldLmNvbG9yO1xuXHRcdCAgbm9kZVRleHQuZm9udCA9IF90aGlzLmNvbmZpZy5mb250U2l6ZSArIFwicHggXCIgKyBfdGhpcy5jb25maWcuZm9udEZhbWlseTtcblx0XHQgIHdyYXBUZXh0KFxuXHRcdFx0X3RoaXMuY29udGV4dCxcblx0XHRcdF90aGlzLmRpYWdyYW1zW2ldLnRleHQsXG5cdFx0XHRwb3NpdGlvblggKyBfdGhpcy5jb25maWcucGFkZGluZyxcblx0XHRcdHBvc2l0aW9uWSxcblx0XHRcdF90aGlzLmNvbmZpZy53aWR0aCAtIF90aGlzLmNvbmZpZy5wYWRkaW5nICogMixcblx0XHRcdF90aGlzLmNvbmZpZy5oZWlnaHQsXG5cdFx0XHRfdGhpcy5jb25maWcuZm9udFNpemUgKyBfdGhpcy5jb25maWcuZm9udFNpemUgKiAwLjJcblx0XHQgICk7XG5cdFx0fVxuXHQgIH1cblx0fTtcbiAgXG4gIFxuXHR0aGlzLmluaXQoZGF0YSk7XG4gIH07Il0sInNvdXJjZVJvb3QiOiIifQ==