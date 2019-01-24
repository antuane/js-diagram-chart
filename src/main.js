"use strict";

/*global window*/
/*global document*/

import { getObjById, roundRect, trackTransforms, wrapText } from "./helper";

function JsDiagramChart(data) {
  this.init = function(data) {
    let _this = this;
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
    data.config.moveY = 0;

    //this.data = data;
    this.config = data.config;
    this.update(data);
    this.draw();

    if (_this.config.mouseEvents) {
      this.events();
    }
  };

  this.addZoom = function(size) {
    let _this = this;
    _this.config.zoomScale += size;
    let pt = _this.context.transformedPoint(
      _this.canvas.width / 2,
      _this.canvas.height / 2
    );
    this.context.translate(pt.x, pt.y);
    let factor = Math.pow(_this.config.scaleFactor, size);
    _this.context.scale(factor, factor);
    _this.context.translate(-pt.x, -pt.y);
    this.draw();
  };

  this.resetZoom = function() {
    let _this = this;
    _this.addZoom(-_this.config.zoomScale);
    _this.context.translate(-_this.config.moveX, -_this.config.moveY);
    _this.config.zoomScale = 0;
    _this.config.moveX = 0;
    _this.config.moveY = 0;
  };

  this.events = function() {
    let _this = this;

    let lastX = _this.canvas.width / 2;
    let lastY = _this.canvas.height / 2;
    let dragStart = false;
    let dragged = false;

    _this.canvas.addEventListener(
      "mousedown",
      function(evt) {
        document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect =
          "none";
        _this.canvas.style.cursor = "move";
        lastX = evt.offsetX || evt.pageX - _this.canvas.offsetLeft;
        lastY = evt.offsetY || evt.pageY - _this.canvas.offsetTop;
        dragStart = _this.context.transformedPoint(lastX, lastY);
        dragged = false;
        evt.returnValue = false;
      },
      false
    );

    _this.canvas.addEventListener(
      "mousemove",
      function(evt) {
        lastX = evt.offsetX || evt.pageX - _this.canvas.offsetLeft;
        lastY = evt.offsetY || evt.pageY - _this.canvas.offsetTop;

        dragged = true;
        if (dragStart) {
          let pt = _this.context.transformedPoint(lastX, lastY);
          _this.context.translate(pt.x - dragStart.x, pt.y - dragStart.y);
          _this.draw();
          _this.config.moveX += pt.x - dragStart.x;
          _this.config.moveY += pt.y - dragStart.y;
        }
      },
      false
    );

    _this.canvas.addEventListener(
      "mouseup",
      function(evt) {
        dragStart = null;
        _this.canvas.style.cursor = "default";
        //if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
      },
      false
    );

    let handleScroll = function(evt) {
      let delta = evt.wheelDelta
        ? evt.wheelDelta / 300
        : evt.detail
        ? -evt.detail
        : 0;
      _this.addZoom(delta);
      return evt.preventDefault() && false;
    };

    _this.canvas.addEventListener("DOMMouseScroll", handleScroll, false);
    _this.canvas.addEventListener("mousewheel", handleScroll, false);
  };

  this.update = function(data) {
    // if(data){
    //   data = this.data;
    // }

    let _this = this;
    //_this.data = data;

    let diagramList = [];
    let diagramLinesCount = [];
    let diagramColumnsCount = 0;
    let diagramColumnLower = 0;

    for (let i = 0; i < data.diagrams.length; i++) {
      let objectDiagram = {
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

      for (let j = 0; j < data.links.length; j++) {
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

    let getLinesObjects = function getLinesObjects(object, hierarchy) {
      if (object.virgin) {
        object.virgin = false;
        object.y = hierarchy;

        if (hierarchy < diagramColumnLower) {
          diagramColumnLower = hierarchy;
        }

        for (let i = 0; i < object.children.length; i++) {
          let tmpObj = getObjById(diagramList, object.children[i]);
          getLinesObjects(tmpObj, hierarchy + 1);
        }

        for (let i = 0; i < object.parents.length; i++) {
          let tmpObj = getObjById(diagramList, object.parents[i]);
          getLinesObjects(tmpObj, hierarchy - 1);
        }
      }
    };

    for (let i = 0; i < diagramList.length; i++) {
      getLinesObjects(diagramList[i], 0);
    }

    for (let i = 0; i < diagramList.length; i++) {
      let countObjTmp = getObjById(diagramLinesCount, diagramList[i].y);
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
          diagramLinesCount.push({ id: diagramList[i].y, count: 1 });
          diagramList[i].x = 1;
        }
      }
    }

    this.config.linesCount = diagramLinesCount;
    this.config.columnsCount = diagramColumnsCount;
    this.config.columnLower = diagramColumnLower;
    this.diagrams = diagramList;
  };

  this.draw = function() {
    let _this = this;

    if (_this.context.transformedPoint) {
      let p1 = _this.context.transformedPoint(0, 0);
      let p2 = _this.context.transformedPoint(
        _this.canvas.width,
        _this.canvas.height
      );
      _this.context.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    } else {
      _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
    }

    let diagramWithMargin = _this.config.width + 2 * _this.config.margin;

    if (_this.config.columnsCount == 0) {
      _this.config.columnsCount = parseInt(
        _this.canvas.width / diagramWithMargin
      );
    }

    let maxWidth = _this.config.columnsCount * diagramWithMargin;
    let marginScreen = parseInt(_this.canvas.width) / 2 - maxWidth / 2;

    _this.context.rotate(2 * Math.PI);

    let countOrphanDemand = 0;
    for (let i = 0; i < _this.diagrams.length; i++) {
      if (_this.diagrams[i].orphan) {
        let positionX =
          marginScreen +
          _this.config.margin +
          parseInt(countOrphanDemand % _this.config.columnsCount) *
            (_this.config.width + 2 * _this.config.margin);
        let positionY =
          _this.config.margin +
          parseInt(countOrphanDemand / _this.config.columnsCount) *
            (_this.config.height + 2 * _this.config.margin);
        _this.context.fillStyle = _this.diagrams[i].bgColor;
        _this.context.strokeStyle = _this.diagrams[i].bgColor;
        roundRect(
          _this.context,
          positionX,
          positionY,
          _this.config.width,
          _this.config.height,
          _this.config.radius,
          _this.config.hiddenBg
        );
        //
        let nodeText = _this.context;
        nodeText.fillStyle = _this.diagrams[i].color;
        nodeText.font = _this.config.fontSize + "px " + _this.config.fontFamily;
        wrapText(
          _this.context,
          _this.diagrams[i].text,
          positionX + _this.config.padding,
          positionY,
          _this.config.width - _this.config.padding * 2,
          _this.config.height,
          _this.config.fontSize + _this.config.fontSize * 0.2
        );

        countOrphanDemand++;
      }
    }

    //CALCULATE X Y NOT ORPHANS DIAGRAMS

    let marginTopNotOrphans =
      _this.config.height +
      3 * _this.config.margin +
      parseInt((countOrphanDemand - 1) / _this.config.columnsCount) *
        (_this.config.height + 2 * _this.config.margin);

    if (isNaN(marginTopNotOrphans)) {
      marginTopNotOrphans = _this.config.margin;
    }

    for (let i = 0; i < _this.diagrams.length; i++) {
      if (!_this.diagrams[i].orphan) {
        let maxColumnsInLine = getObjById(
          _this.config.linesCount,
          _this.diagrams[i].y
        ).count;
        let ratio = maxWidth / maxColumnsInLine;
        let positionX =
          marginScreen +
          ratio * _this.diagrams[i].x +
          (ratio / 2 - _this.config.width / 2) -
          ratio;
        let positionY =
          marginTopNotOrphans +
          Math.abs(_this.config.columnLower) *
            (_this.config.height + 2 * _this.config.margin) +
          _this.diagrams[i].y * (_this.config.height + 2 * _this.config.margin);
        _this.diagrams[i].left = positionX;
        _this.diagrams[i].top = positionY;
      }
    }

    //DRAW LINES

    for (let i = 0; i < _this.diagrams.length; i++) {
      if (!_this.diagrams[i].orphan) {
        for (let j = 0; j < _this.diagrams[i].parents.length; j++) {
          let tmpObj = getObjById(_this.diagrams, _this.diagrams[i].parents[j]);
          let invertParent = false;
          let isDistant = false;
          let autoRef = false;
          let countDistant = 0;
          let countInvertParent = 0;

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

          _this.context.strokeStyle =
            _this.config.lineColor || _this.diagrams[i].bgColor;
          _this.context.fillStyle =
            _this.config.lineColor || _this.diagrams[i].bgColor;

          let difference = 0;

          if (autoRef) {
            difference =
              _this.config.margin / 2 -
              (_this.config.margin / _this.config.columnsCount) *
                _this.diagrams[i].x;

            if (!isFinite(difference)) {
              difference = 0;
            }

            _this.context.beginPath();
            _this.context.moveTo(
              tmpObj.left +
                _this.config.width / 2 +
                difference * -1 -
                difference,
              tmpObj.top + _this.config.height
            );
            _this.context.lineTo(
              tmpObj.left +
                _this.config.width / 2 +
                difference * -1 -
                difference,
              tmpObj.top + _this.config.height + _this.config.margin / 2.5
            );
            _this.context.lineTo(
              tmpObj.left +
                _this.config.width / 2 +
                difference * -1 +
                difference,
              tmpObj.top + _this.config.height + _this.config.margin / 2.5
            );
            _this.context.lineTo(
              tmpObj.left +
                _this.config.width / 2 +
                difference * -1 +
                difference,
              tmpObj.top + _this.config.height + _this.config.arrowWidth / 2
            );
            _this.context.stroke();

            _this.context.beginPath();
            _this.context.moveTo(
              tmpObj.left +
                _this.config.width / 2 +
                difference * -1 +
                difference,
              tmpObj.top + _this.config.height
            );
            _this.context.lineTo(
              tmpObj.left +
                _this.config.width / 2 -
                _this.config.arrowWidth / 2 +
                difference * -1 +
                difference,
              tmpObj.top + _this.config.height + _this.config.arrowWidth
            );
            _this.context.lineTo(
              tmpObj.left +
                _this.config.width / 2 +
                _this.config.arrowWidth / 2 +
                difference * -1 +
                difference,
              tmpObj.top + _this.config.height + _this.config.arrowWidth
            );
            _this.context.fill();
          } else if (invertParent) {
            if (_this.config.lineDiff) {
              difference =
                _this.config.margin / 2 -
                (_this.config.margin / _this.config.columnsCount) *
                  _this.diagrams[i].x +
                (_this.config.margin -
                  (_this.config.arrowWidth +
                    _this.config.lineWidth * 2 * countInvertParent));
            }

            if (_this.context.setLineDash) {
              _this.context.setLineDash([
                _this.config.lineWidth,
                _this.config.lineWidth
              ]);
            }

            _this.context.beginPath();
            _this.context.moveTo(
              _this.diagrams[i].left + _this.config.width / 2 + difference,
              _this.diagrams[i].top + _this.config.height / 2 + difference
            );
            _this.context.lineTo(
              _this.diagrams[i].left +
                _this.config.width +
                _this.config.margin +
                difference,
              _this.diagrams[i].top + _this.config.height / 2 + difference
            );
            _this.context.lineTo(
              _this.diagrams[i].left +
                _this.config.width +
                _this.config.margin +
                difference,
              tmpObj.top - _this.config.margin + difference
            );
            _this.context.lineTo(
              tmpObj.left + _this.config.width / 2 + difference,
              tmpObj.top - _this.config.margin + difference
            );
            _this.context.lineTo(
              tmpObj.left + _this.config.width / 2 + difference,
              tmpObj.top - _this.config.arrowWidth + difference
            );
            _this.context.lineWidth = _this.config.lineWidth;
            _this.context.stroke();

            _this.context.beginPath();
            _this.context.moveTo(
              tmpObj.left + _this.config.width / 2 + difference,
              tmpObj.top
            );
            _this.context.lineTo(
              tmpObj.left +
                _this.config.width / 2 -
                _this.config.arrowWidth / 2 +
                difference,
              tmpObj.top - _this.config.arrowWidth
            );
            _this.context.lineTo(
              tmpObj.left +
                _this.config.width / 2 +
                _this.config.arrowWidth / 2 +
                difference,
              tmpObj.top - _this.config.arrowWidth
            );
            _this.context.fill();
          } else if (isDistant) {
            if (_this.config.lineDiff) {
              difference =
                _this.config.margin / 2 -
                (_this.config.margin / _this.config.columnsCount) *
                  _this.diagrams[i].x +
                (_this.config.margin -
                  (_this.config.arrowWidth +
                    _this.config.lineWidth * 2 * countDistant));
            }

            countDistant++;

            if (!isFinite(difference)) {
              difference = 0;
            }

            if (_this.context.setLineDash) {
              _this.context.setLineDash([
                _this.config.lineWidth,
                _this.config.lineWidth
              ]);
            }

            _this.context.beginPath();
            _this.context.moveTo(
              _this.diagrams[i].left + _this.config.width / 2 + difference * -1,
              _this.diagrams[i].top
            );
            _this.context.lineTo(
              _this.diagrams[i].left + _this.config.width / 2 + difference * -1,
              _this.diagrams[i].top - _this.config.margin + difference
            );
            _this.context.lineTo(
              tmpObj.left + _this.config.width / 2 + difference * -1,
              _this.diagrams[i].top - _this.config.margin + difference
            );
            _this.context.lineTo(
              tmpObj.left + _this.config.width / 2 + difference * -1,
              tmpObj.top +
                _this.config.height +
                _this.config.margin +
                difference
            );
            _this.context.lineTo(
              tmpObj.left + _this.config.width / 2 + difference * -1,
              tmpObj.top + _this.config.height + _this.config.arrowWidth / 2
            );
            _this.context.lineWidth = _this.config.lineWidth;
            _this.context.stroke();

            _this.context.beginPath();
            _this.context.moveTo(
              tmpObj.left + _this.config.width / 2 + difference * -1,
              tmpObj.top + _this.config.height
            );
            _this.context.lineTo(
              tmpObj.left +
                _this.config.width / 2 -
                _this.config.arrowWidth / 2 +
                difference * -1,
              tmpObj.top + _this.config.height + _this.config.arrowWidth
            );
            _this.context.lineTo(
              tmpObj.left +
                _this.config.width / 2 +
                _this.config.arrowWidth / 2 +
                difference * -1,
              tmpObj.top + _this.config.height + _this.config.arrowWidth
            );
            _this.context.fill();
          } else {
            //var
            if (_this.config.lineDiff) {
              difference =
                _this.config.margin / 2 -
                (_this.config.margin / _this.config.columnsCount) *
                  _this.diagrams[i].x;
            }

            if (!isFinite(difference)) {
              difference = 0;
            }

            _this.context.beginPath();
            _this.context.moveTo(
              _this.diagrams[i].left + _this.config.width / 2 + difference * -1,
              _this.diagrams[i].top
            );
            _this.context.lineTo(
              _this.diagrams[i].left + _this.config.width / 2 + difference * -1,
              _this.diagrams[i].top - _this.config.margin + difference
            );
            _this.context.lineTo(
              tmpObj.left + _this.config.width / 2 + difference * -1,
              tmpObj.top +
                _this.config.height +
                _this.config.margin +
                difference
            );
            _this.context.lineTo(
              tmpObj.left + _this.config.width / 2 + difference * -1,
              tmpObj.top + _this.config.height + _this.config.arrowWidth / 2
            );
            _this.context.lineWidth = _this.config.lineWidth;
            _this.context.stroke();

            _this.context.beginPath();
            _this.context.moveTo(
              tmpObj.left + _this.config.width / 2 + difference * -1,
              tmpObj.top + _this.config.height
            );
            _this.context.lineTo(
              tmpObj.left +
                _this.config.width / 2 -
                _this.config.arrowWidth / 2 +
                difference * -1,
              tmpObj.top + _this.config.height + _this.config.arrowWidth
            );
            _this.context.lineTo(
              tmpObj.left +
                _this.config.width / 2 +
                _this.config.arrowWidth / 2 +
                difference * -1,
              tmpObj.top + _this.config.height + _this.config.arrowWidth
            );
            _this.context.fill();
          }
        }
      }
    }

    //DRAW NOT ORPHANS DIAGRAMS

    for (let i = 0; i < _this.diagrams.length; i++) {
      if (!_this.diagrams[i].orphan) {
        let positionX = _this.diagrams[i].left;
        let positionY = _this.diagrams[i].top;
        _this.context.fillStyle = _this.diagrams[i].bgColor;
        _this.context.strokeStyle = _this.diagrams[i].bgColor;
        roundRect(
          _this.context,
          positionX,
          positionY,
          _this.config.width,
          _this.config.height,
          _this.config.radius,
          _this.config.hiddenBg
        );

        let nodeText = _this.context;
        nodeText.fillStyle = _this.diagrams[i].color;
        nodeText.font = _this.config.fontSize + "px " + _this.config.fontFamily;
        wrapText(
          _this.context,
          _this.diagrams[i].text,
          positionX + _this.config.padding,
          positionY,
          _this.config.width - _this.config.padding * 2,
          _this.config.height,
          _this.config.fontSize + _this.config.fontSize * 0.2
        );
      }
    }
  };

  this.init(data);
}

window.JsDiagramChart = JsDiagramChart;

export default JsDiagramChart;
