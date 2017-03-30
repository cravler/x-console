'use strict';

var util = require('util');
var colors = require('colors/safe');

module.exports = console;

/**
 * @param type
 * @param color
 * @param args
 * @returns {Function}
 */
function console(type, color, args) {
    if (!type) {
        type = 'log';
    }
    if (Array.isArray(color)) {
        args = color;
        color = null;
    }

    const fn = function() {
        const args = Array.prototype.slice.call(arguments);
        if (color) {
            args.unshift(colors[color](args.shift()));
        }
        global.console[type].apply(global.console, [util.format.apply(null, args)]);
    };

    if (args) {
        fn.apply(null, args);
    }

    return fn;
}

console.log = console('log');
console.info = console('info', 'blue');
console.warn = console('warn', 'yellow');
console.error = console('error', 'red');
