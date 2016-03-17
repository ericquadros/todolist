;(function(context) {

  'use strict';

  function $( selector, scope ) {
    return $.qsa( selector, scope, true );
  }

  $['qsa'] = function( selector, scope, first ) {
    var e = ( scope || document).querySelectorAll( selector );
    return first ? e[0] : e;
  };

  $['noop'] = function() {};

  $['each'] = function( array, cb ) {
    var len = array.length;
    var idx = -1;
    while( ++idx < len ) {
      cb.call(array, array[idx], idx, array);
    }
  };

  $['pluralization'] = function( value ) {
    return +value === 1 ? "" : "s";
  };

  $['on'] = function (target, type, callback, useCapture) {
    target.addEventListener(type, callback, !!useCapture);
  };

  $['delegate'] = function (target, selector, type, handler) {
    function dispatchEvent(event) {
      var targetElement = event.target;
      var potentialElements = $.qsa(selector, target);
      var hasMatch = Array.prototype.indexOf.call(potentialElements, targetElement) >= 0;
      if (hasMatch) {
        handler.call(targetElement, event);
      }
    }
    // https://developer.mozilla.org/en-US/docs/Web/Events/blur
    var useCapture = type === 'blur' || type === 'focus';

    $.on(target, type, dispatchEvent, useCapture);
  };

  $['parent'] = function (element, tagName) {
    if (!element.parentNode) {
      return;
    }
    if (element.parentNode.tagName.toLowerCase() === tagName.toLowerCase()) {
      return element.parentNode;
    }
    return $.parent(element.parentNode, tagName);
  };


  // classes
  function splitStringToArray(className) {
    return className.trim().split(/\s{1,}/g);
  }

  $['hasClass'] = function( e, c ) {
    return splitStringToArray(e.className).indexOf(c) !== -1;
  };

  $['addClass'] = function( e, c ) {
    if( false === $.hasClass(e, c) ) {
      var a = e.className;
      a += " " + c;
      e.className = a.trim();
      return true;
    }
  };

  $['removeClass'] = function( e, c ) {
    var classes = splitStringToArray( e.className );
    var idx = classes.indexOf(c);
    if( idx === -1 ) {
      return false;
    }
    classes.splice(idx,1);
    e.className = classes.join(' ');
  };

  $['toggleClass'] = function( e, c ) {
    if ( true !== $.addClass( e, c ) ) {
      $.removeClass( e, c );
    }
  };

  context.$ = $;

})(this);

// Prototype
NodeList.prototype.each = function( fn ) {
  var len = this.length;
  var idx = -1;
  while( ++idx < len ) {
    fn.call(this, this[idx], idx, this);
  }
}

Array.prototype.some = function( fn ) {

  var len = this.length;
  var idx = -1;
  while( ++idx < len ) {
    if( fn( this[idx], idx, this ) ) {
      return true;
    }
  }
  return false;

};
