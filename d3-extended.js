(function() {

var extend = function(d3) {

if(typeof d3 === 'undefined' && typeof d3 !== 'object') {
  console.log('D3 not found.');
  return false;
}

d3.selection.prototype.addClass = function(className) {
    return this.classed(className, true);
}

d3.selection.prototype.after = function(tagName) {
  var elements = [];

  this.each(function() {
    var element = document.createElement(tagName);
    this.parentNode.insertBefore(element, this.nextSibling);
    elements.push(element);
  });

  return d3.selectAll(elements);
}
d3.selection.prototype.appendTo = function(selector) {
  var targets = d3.selectAll(selector),
      targetCount = targets.size(),
      _this = this,
      clones = [];

  targets.each(function() {
    var currTarget = this;
    _this.each(function() {
      if(targetCount > 1) {
        var clone = this.cloneNode(true);
        currTarget.appendChild(clone);
        clones.push(clone);
      }
      else {
        currTarget.appendChild(this);
      }
    });
  });

  if(targetCount > 1) {
    this.remove();
  }

  return clones.length > 0 ? d3.selectAll(clones) : this;
}

d3.selection.prototype.before = function(tagName) {
  var elements = [];

  this.each(function() {
    var element = document.createElement(tagName);
    this.parentNode.insertBefore(element, this);
    elements.push(element);
  });

  return d3.selectAll(elements);
}
d3.selection.prototype.clear = function() {
  this.selectAll('*').remove();
  return this;
}
d3.selection.prototype.css = d3.selection.prototype.style;
d3.selection.prototype.eq = function(findI, findJ) {
  findJ = findJ || 0;
  return this.filter(function(d,i,j){return i == findI && j == findJ})
}

d3.selection.prototype.first = function() {
    // adapted from https://github.com/mbostock/d3/blob/master/src/selection/each.js
    for (var j = 0, m = this.length; j < m; j++) {
        for (var group = this[j], i = 0, n = group.length, node; i < n; i++) {
              if (node = group[i]) return d3.select(node);
        }
    }
}

d3.selection.prototype.hasClass = function(className) {
  return this.classed(className);
}
d3.selection.prototype.hide = function() {
  this.style('display', 'none');
  return this;
}
d3.selection.prototype.last = function() {
  // adapted from https://github.com/mbostock/d3/blob/master/src/selection/each.js
  for (var j = this.length - 1; j >= 0; j--) {
      for (var group = this[j], i = group.length - 1, node; i >= 0; i--) {
            if (node = group[i]) return d3.select(node);
      }
  }
}

d3.selection.prototype.moveToBack = function() { 
    return this.each(function() { 
        var firstChild = this.parentNode.firstChild; 
        if (firstChild) { 
            this.parentNode.insertBefore(this, firstChild); 
        } 
    });
}
d3.selection.prototype.moveToFront = function() {
  return this.each(function(){
    this.parentNode.appendChild(this);
  });
}
d3.selection.prototype.removeClass = function(className) {
    return this.classed(className, false);
}

d3.selection.prototype.show = function() {
  this.style('display', 'initial');
  return this;
}
d3.selection.prototype.toggle = function() {
  var isHidden = this.style('display') == 'none';
  return this.style('display', isHidden ? 'inherit' : 'none');
}
d3.selection.prototype.toggleClass = function(className) {
    this.classed(className, !this.classed(className));
    return this;
}
d3.selection.prototype.trigger = function(evtName, data) {
  this.on(evtName)(data);
  return this;
}
}

if(typeof module === 'object' && module.exports) {
  module.exports = extend;
}
else if(typeof define === 'function' && define.amd) {
  define(['d3'], extend);
}
else {
  extend(d3);
}

})();