setTimeout(() => {
  console.log(3);
}, 20);

setImmediate(() => {
  console.log(2);
});

Promise.resolve().then(() => {
  console.log(11);
});

process.nextTick(() => {
  console.log(1);
});

console.log(0);
