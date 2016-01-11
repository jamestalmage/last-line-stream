# last-line-stream [![Build Status](https://travis-ci.org/jamestalmage/last-line-stream.svg?branch=master)](https://travis-ci.org/jamestalmage/last-line-stream)

> A PassThrough stream that keeps track of last line written.


## Install

```
$ npm install --save last-line-stream
```


## Usage

```js
const lastLineStream = require('last-line-stream');

const stream = lastLineStream();

stream.write('foo');

assert(stream.lastLine === 'foo');

stream.write('bar');

assert(stream.lastLine === 'foobar');

stream.write('baz\nquz');

assert(stream.lastLine === 'quz');
```


## API

### lastLineStream([pipeTo])

Returns a new instance of the spying PassThrough stream, 

#### pipeTo

Type: `stream`

If supplied, the new instance will automatically be piped to this stream.

### stream.lastLine

Type: `string`

The last line written out to this stream. The `lastLine` value will grow until the stream sees a newline character (`'\n'`).


## License

MIT © [James Talmage](http://github.com/jamestalmage)
