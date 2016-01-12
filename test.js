import test from 'ava';
import lastLineStream from './';
import createTracker from './tracker';
import through2 from 'through2';

function concatStream() {
	var stream = through2(function (chunk, enc, cb) {
		stream.value += chunk.toString();
		cb(null, chunk);
	});
	stream.value = '';

	return stream;
}

test('basic operation', t => {
	var stream = lastLineStream();
	stream.write('foo');
	t.is(stream.lastLine, 'foo');
	stream.write('bar');
	t.is(stream.lastLine, 'foobar');
	stream.write('\nbaz');
	t.is(stream.lastLine, 'baz');
	stream.write('more\nfoo');
	t.is(stream.lastLine, 'foo');
	stream.write('bar\n');
	t.is(stream.lastLine, '');
});

test('tracker', t => {
	var tracker = createTracker();
	tracker.update('foo');
	t.is(tracker.lastLine(), 'foo');
	tracker.update('bar');
	t.is(tracker.lastLine(), 'foobar');
	tracker.update('\nbaz');
	t.is(tracker.lastLine(), 'baz');
	tracker.update('more\nfoo');
	t.is(tracker.lastLine(), 'foo');
	tracker.update('bar\n');
	t.is(tracker.lastLine(), '');
});

test('pipes through to the first argument if supplied', t => {
	var concat = concatStream();
	var stream = lastLineStream(concat);

	stream.write('foo');
	stream.write('bar');
	stream.write('\nbaz');

	t.is(stream.lastLine, 'baz');
	t.is(concat.value, 'foobar\nbaz');
});
