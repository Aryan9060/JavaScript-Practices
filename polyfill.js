const arr = [1, 2, 3, 4, 5, 6, 7, , , , 8, 9];

// ------------------------------------------Polyfill for forEach---------------------------------------
Array.prototype.myForEach = function (cd) {
  if (this == null) {
    throw new TypeError(
      "Array.prototype.myForEach called on null or undefined",
    );
  }

  if (typeof cd !== "function") {
    throw new TypeError(cd + " is not a function");
  }

  const newArray = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) cd(this[i], i, newArray);
  }
};

// arr.myForEach();

// ------------------------------------------Polyfill for map---------------------------------------
Array.prototype.myMap = function (cd) {
  if (this == null) {
    throw new TypeError("Array.prototype.myMap called on null or undefineed");
  }

  if (!cd || typeof cd !== "function") {
    throw new TypeError(cd, "is not a function.");
  }

  const newArray = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      const currentElement = cd(this[i], i, newArray);
      newArray[i] = currentElement;
    }
  }
  return newArray;
};
console.log(arr.myMap((e) => e));

// ------------------------------------------Polyfill for filter---------------------------------------
Array.prototype.myFilter = function (cd, thisArg) {
  const newArray = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      if (cd.call(thisArg, this[i], i, newArray)) {
        newArray.push(this[i]);
      }
    }
  }
  return newArray;
};
console.log(arr.myFilter((e) => e >= 5));

// ------------------------------------------Polyfill for reduce---------------------------------------
Array.prototype.myReduce = function (cd, initialvalue) {
  let acc = initialvalue;

  let startingIndex = 0;

  if (acc === undefined) {
    acc = this[0];
    startingIndex = 1;
  }

  for (let i = startingIndex; i < this.length; i++) {
    if (i in this) acc = cd(acc, this[i], i, this);
  }
  return acc;
};

console.log(arr.myReduce((sum, e) => sum + e, 0));
