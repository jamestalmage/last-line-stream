'use strict';
var through2 = require('through2');
var StringDecoder = require('string_decoder').StringDecoder;

module.exports = function (pipeDestination) {
	var decoder = new StringDecoder();

	var lastLine = [''];

	var stream = through2(function (chunk, enc, cb) {
		var str = decoder.write(chunk);
		var idx = str.lastIndexOf('\n');
		if (idx === -1) {
			lastLine.push(str);
		} else {
			lastLine = [str.substring(idx + 1)];
		}
		cb(null, chunk);
	});

	Object.defineProperty(stream, 'lastLine', {
		get: function () {
			if (lastLine.length > 1) {
				lastLine = [lastLine.join('')];
			}
			return lastLine[0];
		}
	});

	if (pipeDestination) {
		stream.pipe(pipeDestination);
	}

	return stream;
};
