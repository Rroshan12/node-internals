const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
    console.log('An event occurred!');
});


myEmitter.on('event', () => {
    console.log('An event2 occurred!');
});
myEmitter.emit('event');