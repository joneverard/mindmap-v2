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