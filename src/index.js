/*
 * heatmap.js v2.0.5 | JavaScript Heatmap Library
 *
 * Copyright 2008-2016 Patrick Wied <heatmapjs@patrick-wied.at> - All rights reserved.
 * Dual licensed under MIT and Beerware license 
 *
 * :: 2016-09-05 01:16
 */
var h337 = function () { var t = { defaultRadius: 40, defaultRenderer: "canvas2d", defaultGradient: { .25: "rgb(0,0,255)", .55: "rgb(0,255,0)", .85: "yellow", 1: "rgb(255,0,0)" }, defaultMaxOpacity: 1, defaultMinOpacity: 0, defaultBlur: .85, defaultXField: "x", defaultYField: "y", defaultValueField: "value", plugins: {} }, a = function () { var a = function (t) { this._coordinator = {}, this._data = [], this._radi = [], this._min = 10, this._max = 1, this._xField = t.xField || t.defaultXField, this._yField = t.yField || t.defaultYField, this._valueField = t.valueField || t.defaultValueField, t.radius && (this._cfgRadius = t.radius) }, e = t.defaultRadius; return a.prototype = { _organiseData: function (t, a) { var i = t[this._xField], r = t[this._yField], n = this._radi, s = this._data, h = this._max, o = this._min, d = t[this._valueField] || 1, u = t.radius || this._cfgRadius || e; s[i] || (s[i] = [], n[i] = []), s[i][r] ? s[i][r] += d : (s[i][r] = d, n[i][r] = u); var l = s[i][r]; return l > h ? (a ? this.setDataMax(l) : this._max = l, !1) : o > l ? (a ? this.setDataMin(l) : this._min = l, !1) : { x: i, y: r, value: d, radius: u, min: o, max: h } }, _unOrganizeData: function () { var t = [], a = this._data, e = this._radi; for (var i in a) for (var r in a[i]) t.push({ x: i, y: r, radius: e[i][r], value: a[i][r] }); return { min: this._min, max: this._max, data: t } }, _onExtremaChange: function () { this._coordinator.emit("extremachange", { min: this._min, max: this._max }) }, addData: function () { if (arguments[0].length > 0) for (var t = arguments[0], a = t.length; a--;)this.addData.call(this, t[a]); else { var e = this._organiseData(arguments[0], !0); e && (0 === this._data.length && (this._min = this._max = e.value), this._coordinator.emit("renderpartial", { min: this._min, max: this._max, data: [e] })) } return this }, setData: function (t) { var a = t.data, e = a.length; this._data = [], this._radi = []; for (var i = 0; e > i; i++)this._organiseData(a[i], !1); return this._max = t.max, this._min = t.min || 0, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this }, removeData: function () { }, setDataMax: function (t) { return this._max = t, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this }, setDataMin: function (t) { return this._min = t, this._onExtremaChange(), this._coordinator.emit("renderall", this._getInternalData()), this }, setCoordinator: function (t) { this._coordinator = t }, _getInternalData: function () { return { max: this._max, min: this._min, data: this._data, radi: this._radi } }, getData: function () { return this._unOrganizeData() } }, a }(), e = function () { function t(t) { var e = t.container, i = this.shadowCanvas = document.createElement("canvas"), r = this.canvas = t.canvas || document.createElement("canvas"), n = (this._renderBoundaries = [1e4, 1e4, 0, 0], getComputedStyle(t.container) || {}); r.className = "heatmap-canvas", this._width = r.width = i.width = t.width || +n.width.replace(/px/, ""), this._height = r.height = i.height = t.height || +n.height.replace(/px/, ""), this.shadowCtx = i.getContext("2d"), this.ctx = r.getContext("2d"), r.style.cssText = i.style.cssText = "position:absolute;left:0;top:0;", e.style.position = "relative", e.appendChild(r), this._palette = a(t), this._templates = {}, this._setStyles(t) } var a = function (t) { var a = t.gradient || t.defaultGradient, e = document.createElement("canvas"), i = e.getContext("2d"); e.width = 256, e.height = 1; var r = i.createLinearGradient(0, 0, 256, 1); for (var n in a) r.addColorStop(n, a[n]); return i.fillStyle = r, i.fillRect(0, 0, 256, 1), i.getImageData(0, 0, 256, 1).data }, e = function (t, a) { var e = document.createElement("canvas"), i = e.getContext("2d"), r = t, n = t; if (e.width = e.height = 2 * t, 1 == a) i.beginPath(), i.arc(r, n, t, 0, 2 * Math.PI, !1), i.fillStyle = "rgba(0,0,0,1)", i.fill(); else { var s = i.createRadialGradient(r, n, t * a, r, n, t); s.addColorStop(0, "rgba(0,0,0,1)"), s.addColorStop(1, "rgba(0,0,0,0)"), i.fillStyle = s, i.fillRect(0, 0, 2 * t, 2 * t) } return e }, i = function (t) { for (var a = [], e = t.min, i = t.max, r = t.radi, t = t.data, n = Object.keys(t), s = n.length; s--;)for (var h = n[s], o = Object.keys(t[h]), d = o.length; d--;) { var u = o[d], l = t[h][u], _ = r[h][u]; a.push({ x: h, y: u, value: l, radius: _ }) } return { min: e, max: i, data: a } }; return t.prototype = { renderPartial: function (t) { t.data.length > 0 && (this._drawAlpha(t), this._colorize()) }, renderAll: function (t) { this._clear(), t.data.length > 0 && (this._drawAlpha(i(t)), this._colorize()) }, _updateGradient: function (t) { this._palette = a(t) }, updateConfig: function (t) { t.gradient && this._updateGradient(t), this._setStyles(t) }, setDimensions: function (t, a) { this._width = t, this._height = a, this.canvas.width = this.shadowCanvas.width = t, this.canvas.height = this.shadowCanvas.height = a }, _clear: function () { this.shadowCtx.clearRect(0, 0, this._width, this._height), this.ctx.clearRect(0, 0, this._width, this._height) }, _setStyles: function (t) { this._blur = 0 == t.blur ? 0 : t.blur || t.defaultBlur, t.backgroundColor && (this.canvas.style.backgroundColor = t.backgroundColor), this._width = this.canvas.width = this.shadowCanvas.width = t.width || this._width, this._height = this.canvas.height = this.shadowCanvas.height = t.height || this._height, this._opacity = 255 * (t.opacity || 0), this._maxOpacity = 255 * (t.maxOpacity || t.defaultMaxOpacity), this._minOpacity = 255 * (t.minOpacity || t.defaultMinOpacity), this._useGradientOpacity = !!t.useGradientOpacity }, _drawAlpha: function (t) { for (var a = this._min = t.min, i = this._max = t.max, t = t.data || [], r = t.length, n = 1 - this._blur; r--;) { var s, h = t[r], o = h.x, d = h.y, u = h.radius, l = Math.min(h.value, i), _ = o - u, c = d - u, g = this.shadowCtx; this._templates[u] ? s = this._templates[u] : this._templates[u] = s = e(u, n); var f = (l - a) / (i - a); g.globalAlpha = .01 > f ? .01 : f, g.drawImage(s, _, c), _ < this._renderBoundaries[0] && (this._renderBoundaries[0] = _), c < this._renderBoundaries[1] && (this._renderBoundaries[1] = c), _ + 2 * u > this._renderBoundaries[2] && (this._renderBoundaries[2] = _ + 2 * u), c + 2 * u > this._renderBoundaries[3] && (this._renderBoundaries[3] = c + 2 * u) } }, _colorize: function () { var t = this._renderBoundaries[0], a = this._renderBoundaries[1], e = this._renderBoundaries[2] - t, i = this._renderBoundaries[3] - a, r = this._width, n = this._height, s = this._opacity, h = this._maxOpacity, o = this._minOpacity, d = this._useGradientOpacity; 0 > t && (t = 0), 0 > a && (a = 0), t + e > r && (e = r - t), a + i > n && (i = n - a); for (var u = this.shadowCtx.getImageData(t, a, e, i), l = u.data, _ = l.length, c = this._palette, g = 3; _ > g; g += 4) { var f = l[g], m = 4 * f; if (m) { var v; v = s > 0 ? s : h > f ? o > f ? o : f : h, l[g - 3] = c[m], l[g - 2] = c[m + 1], l[g - 1] = c[m + 2], l[g] = d ? c[m + 3] : v } } u.data = l, this.ctx.putImageData(u, t, a), this._renderBoundaries = [1e3, 1e3, 0, 0] }, getValueAt: function (t) { var a, e = this.shadowCtx, i = e.getImageData(t.x, t.y, 1, 1), r = i.data[3], n = this._max, s = this._min; return a = Math.abs(n - s) * (r / 255) >> 0 }, getDataURL: function () { return this.canvas.toDataURL() } }, t }(), i = function () { var a = !1; return "canvas2d" === t.defaultRenderer && (a = e), a }(), r = { merge: function () { for (var t = {}, a = arguments.length, e = 0; a > e; e++) { var i = arguments[e]; for (var r in i) t[r] = i[r] } return t } }, n = function () { function e() { var e = this._config = r.merge(t, arguments[0] || {}); if (this._coordinator = new n, e.plugin) { var h = e.plugin; if (!t.plugins[h]) throw new Error("Plugin '" + h + "' not found. Maybe it was not registered."); var o = t.plugins[h]; this._renderer = new o.renderer(e), this._store = new o.store(e) } else this._renderer = new i(e), this._store = new a(e); s(this) } var n = function () { function t() { this.cStore = {} } return t.prototype = { on: function (t, a, e) { var i = this.cStore; i[t] || (i[t] = []), i[t].push(function (t) { return a.call(e, t) }) }, emit: function (t, a) { var e = this.cStore; if (e[t]) for (var i = e[t].length, r = 0; i > r; r++) { var n = e[t][r]; n(a) } } }, t }(), s = function (t) { var a = t._renderer, e = t._coordinator, i = t._store; e.on("renderpartial", a.renderPartial, a), e.on("renderall", a.renderAll, a), e.on("extremachange", function (a) { t._config.onExtremaChange && t._config.onExtremaChange({ min: a.min, max: a.max, gradient: t._config.gradient || t._config.defaultGradient }) }), i.setCoordinator(e) }; return e.prototype = { addData: function () { return this._store.addData.apply(this._store, arguments), this }, removeData: function () { return this._store.removeData && this._store.removeData.apply(this._store, arguments), this }, setData: function () { return this._store.setData.apply(this._store, arguments), this }, setDataMax: function () { return this._store.setDataMax.apply(this._store, arguments), this }, setDataMin: function () { return this._store.setDataMin.apply(this._store, arguments), this }, configure: function (t) { return this._config = r.merge(this._config, t), this._renderer.updateConfig(this._config), this._coordinator.emit("renderall", this._store._getInternalData()), this }, repaint: function () { return this._coordinator.emit("renderall", this._store._getInternalData()), this }, getData: function () { return this._store.getData() }, getDataURL: function () { return this._renderer.getDataURL() }, getValueAt: function (t) { return this._store.getValueAt ? this._store.getValueAt(t) : this._renderer.getValueAt ? this._renderer.getValueAt(t) : null } }, e }(), s = { create: function (t) { return new n(t) }, register: function (a, e) { t.plugins[a] = e } }; return s };

/*
* Leaflet Heatmap Overlay
*
* Copyright (c) 2008-2016, Patrick Wied (https://www.patrick-wied.at)
* Dual-licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and the Beerware (http://en.wikipedia.org/wiki/Beerware) license.
*/
'use strict';

// Leaflet < 0.8 compatibility
if (typeof L.Layer === 'undefined') {
  L.Layer = L.Class;
}

var HeatmapOverlay = L.Layer.extend({

  initialize: function (config) {
    this.cfg = config;
    this._el = L.DomUtil.create('div', '');
    this._data = [];
    this._max = 1;
    this._min = 0;
    this.cfg.container = this._el;
  },

  onAdd: function (map) {
    var size = map.getSize();

    this._map = map;

    this._width = size.x;
    this._height = size.y;

    this._el.style.width = size.x + 'px';
    this._el.style.height = size.y + 'px';
    this._el.style.position = 'absolute';

    this._origin = this._map.layerPointToLatLng(new L.Point(0, 0));

    map.getPanes().overlayPane.appendChild(this._el);

    if (!this._heatmap) {
      this._heatmap = h337().create(this.cfg);
    }

    // this resets the origin and redraws whenever
    // the zoom changed or the map has been moved
    map.on('zoomanim', this._animateZoom, this);
    map.on('moveend', this._reset, this);
    this._draw();
  },
  
  addTo: function (map) {
    map.addLayer(this);
    return this;
  },

  onRemove: function (map) {
    // remove layer's DOM elements and listeners
    map.getPanes().overlayPane.removeChild(this._el);

    map.off('moveend', this._reset, this);
  },
  _draw: function () {
    if (!this._map) { return; }

    var mapPane = this._map.getPanes().mapPane;
    var point = mapPane._leaflet_pos;

    // reposition the layer
    this._el.style[HeatmapOverlay.CSS_TRANSFORM] = 'translate(' +
      -Math.round(point.x) + 'px,' +
      -Math.round(point.y) + 'px)';

    this._update();
  },
  _update: function () {
    var bounds, zoom, scale;
    var generatedData = { max: this._max, min: this._min, data: [] };

    // bounds = this._map.getBounds();
    zoom = this._map.getZoom();
    scale = Math.pow(2, zoom);

    if (this._data.length == 0) {
      if (this._heatmap) {
        this._heatmap.setData(generatedData);
      }
      return;
    }

    var latLngPoints = [];
    var radiusMultiplier = this.cfg.scaleRadius ? scale : 1;
    var localMax = 0;
    var localMin = 0;
    var valueField = this.cfg.valueField;
    var len = this._data.length;
    var radius = (this.cfg.radius || 2) * radiusMultiplier;

    if (radius < 0.5) {
      if (this._heatmap) {
        this._heatmap.setData(generatedData);
      }
      return;
    }

    while (len--) {
      var entry = this._data[len];
      var value = entry[valueField];
      var latlng = entry.latlng;


      // we don't wanna render points that are not even on the map ;-)
      // if (!bounds.contains(latlng)) {
      //   continue;
      // }
      // local max is the maximum within current bounds
      localMax = Math.max(value, localMax);
      localMin = Math.min(value, localMin);

      var point = this._map.latLngToContainerPoint(latlng);
      var latlngPoint = { x: Math.round(point.x), y: Math.round(point.y) };
      latlngPoint[valueField] = value;

      if (entry.radius) {
        radius = entry.radius * radiusMultiplier;
      } else {
        radius = (this.cfg.radius || 2) * radiusMultiplier;
      }
      latlngPoint.radius = radius;
      latLngPoints.push(latlngPoint);
    }
    if (this.cfg.useLocalExtrema) {
      generatedData.max = localMax;
      generatedData.min = localMin;
    }

    generatedData.data = latLngPoints;

    try {
      this._heatmap.setData(generatedData);
    } catch (e) {
      console.error('heatmap.setData() with zoom ' + zoom, e);
    }
  },
  setData: function (data) {
    this._max = data.max || this._max;
    this._min = data.min || this._min;
    var latField = this.cfg.latField || 'lat';
    var lngField = this.cfg.lngField || 'lng';
    var valueField = this.cfg.valueField || 'value';

    // transform data to latlngs
    var data = data.data;
    var len = data.length;
    var d = [];

    while (len--) {
      var entry = data[len];
      var latlng = new L.LatLng(entry[latField], entry[lngField]);
      var dataObj = { latlng: latlng };
      dataObj[valueField] = entry[valueField];
      if (entry.radius) {
        dataObj.radius = entry.radius;
      }
      d.push(dataObj);
    }
    this._data = d;

    this._draw();
  },
  // experimential... not ready.
  addData: function (pointOrArray) {
    if (pointOrArray.length > 0) {
      var len = pointOrArray.length;
      while (len--) {
        this.addData(pointOrArray[len]);
      }
    } else {
      var latField = this.cfg.latField || 'lat';
      var lngField = this.cfg.lngField || 'lng';
      var valueField = this.cfg.valueField || 'value';
      var entry = pointOrArray;
      var latlng = new L.LatLng(entry[latField], entry[lngField]);
      var dataObj = { latlng: latlng };

      dataObj[valueField] = entry[valueField];
      this._max = Math.max(this._max, dataObj[valueField]);
      this._min = Math.min(this._min, dataObj[valueField]);

      if (entry.radius) {
        dataObj.radius = entry.radius;
      }
      this._data.push(dataObj);
      this._draw();
    }
  },
  _reset: function () {
    this._origin = this._map.layerPointToLatLng(new L.Point(0, 0));

    var size = this._map.getSize();
    if (this._width !== size.x || this._height !== size.y) {
      this._width = size.x;
      this._height = size.y;

      this._el.style.width = this._width + 'px';
      this._el.style.height = this._height + 'px';

      this._heatmap._renderer.setDimensions(this._width, this._height);
    }
    this._draw();
  },
  _animateZoom: function (e) {
    var scale = this._map.getZoomScale(e.zoom),
      offset = this._map._getCenterOffset(e.center)._multiplyBy(-scale).subtract(this._map._getMapPanePos());

    if (L.DomUtil.setTransform) {
      L.DomUtil.setTransform(this._el, offset, scale);

    } else {
      this._el.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(offset) + ' scale(' + scale + ')';
    }
  }
});

HeatmapOverlay.CSS_TRANSFORM = (function () {
  var div = document.createElement('div');
  var props = [
    'transform',
    'WebkitTransform',
    'MozTransform',
    'OTransform',
    'msTransform'
  ];

  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    if (div.style[prop] !== undefined) {
      return prop;
    }
  }
  return props[0];
})();

// return HeatmapOverlay;

L.heatmapOverlay = function (options) {
  return new HeatmapOverlay(options);
};