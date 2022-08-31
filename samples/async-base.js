console.log(1);

// sometimes 1, 5, 2, 3, 4
// sometimes 1, 5, 3, 4, 2
setTimeout(() => console.log(2), 101);
setTimeout(() => console.log(3), 100);
setTimeout(() => console.log(4), 100);

console.log(5);

// idle
