"use strict";

class Counter {
  #value = 1;
  incr() {
    this.#value++;
  }
  getValue() {
    return this.#value;
  }
  get value() {
    return this.#value;
  }
}

const o = new Counter();

/*
function Counter() {
  this.value = 1;
}
Counter.prototype.incr = function () {
  this.value++;
};

const o = new Counter();
*/

const o = {
  value: 1,
  incr: function () {
    console.log("THIS", this);
    this.value++;
  },
  incrAsync: function () {
    setImmediate(() => this.incr());
  },
};

o.incrAsync();
setTimeout(function () {
  console.log(o.value);
  console.log(global.value);
}, 100);

/*
const foo = o.incr;

const bar = foo.bind(o);

const baz = bar.bind({ value: 33 });

o.incr();
bar();
baz();

console.log(o.value);
console.log(global.value);
*/
