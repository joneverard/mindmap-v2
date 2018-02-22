export function randomPosition(max, min) {
    return [(Math.random()*max+min).toString() + 'px', (Math.random()*max+min).toString() + 'px'];
}

export function getCylindricalCoords(origin, point) {
    var vector = {x: (point.x - origin.x), y: (origin.y - point.y)}
    var radius = Math.sqrt(vector.x**2 + vector.y**2);
    var angle = Math.asin(vector.y / radius);
    return {radius, angle}
}

export function getCartesianCoords(origin, radius, angle) {
    var dx = Math.cos(angle)*radius;
    var dy = Math.sin(angle)*radius;
    return {x: origin.x + dx, y: origin.y + dy}
}

export function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

export function getHalfWayPoint(connection) {
    if (connection) {
        return {
            x: (connection.end.position.x + connection.start.position.x) / 2.0,
            y: (connection.end.position.y + connection.start.position.y) / 2.0
        };
    }
}

// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.
export function throttle(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : Date.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = Date.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };