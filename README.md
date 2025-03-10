BellaJS
========

Lightweight util for handling data type, string... in your Node.js and browser apps.

[![NPM](https://badge.fury.io/js/bellajs.svg)](https://badge.fury.io/js/bellajs)[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fndaidong%2Fbellajs.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fndaidong%2Fbellajs?ref=badge_shield)

[![Build Status](https://travis-ci.org/ndaidong/bellajs.svg?branch=master)](https://travis-ci.org/ndaidong/bellajs)
[![Coverage Status](https://coveralls.io/repos/github/ndaidong/bellajs/badge.svg?branch=master)](https://coveralls.io/github/ndaidong/bellajs?branch=master)

You may be interested in [BellaPy](https://github.com/ndaidong/bellapy) too.

# Contents

* [Setup](#setup)

* [APIs](#apis)
  
  * [DataType detection](#datatype-detection)
  * [String manipulation](#string-manipulation)
  * [Date format](#date-format)
  * [Other utils](#other-utils)
    * [clone](#clone)
    * [compose](#compose)
    * [copies](#copies)
    * [curry](#curryfn)
    * [equals](#equals)
    * [genid](#genid)
    * [md5](#md5)
    * [pick](#pick)
    * [pipe](#pipe)
    * [randint](#randint)
    * [sort](#sort)
    * [sortBy](#sortBy)
    * [shuffle](#shuffle)
    * [unique](#unique)

* [Test](#test)

* [License](#license)

## Setup

- Node.js
  
  ```
  npm i bellajs
  ```

- CDN
  
  - [bella.js](https://cdn.rawgit.com/ndaidong/bellajs/master/dist/bella.js)
  - [bella.min.js](https://cdn.rawgit.com/ndaidong/bellajs/master/dist/bella.min.js)
  - [bella.min.map](https://cdn.rawgit.com/ndaidong/bellajs/master/dist/bella.min.map)

- Load with ESM, CommonJS, AMD or UMD style

### Usage

```js
const bella = require('bellajs');

// few methods only:
const {
  isArray,
  isString,
} = require('bellajs');

// es6 syntax:
import bella from 'bellajs';

// with tree shacking
import {
  isArray,
  isString,
} from 'bellajs';
```

## APIs

### DataType detection

- .isArray(Anything val)
- .isBoolean(Anything val)
- .isDate(Anything val)
- .isElement(Anything val)
- .isEmail(Anything val)
- .isEmpty(Anything val)
- .isFunction(Anything val)
- .isInteger(Anything val)
- .isLetter(Anything val)
- .isNull(Anything val)
- .isNumber(Anything val)
- .isObject(Anything val)
- .isString(Anything val)
- .isUndefined(Anything val)

### String manipulation

- .ucfirst(String s)
- .ucwords(String s)
- .escapeHTML(String s)
- .unescapeHTML(String s)
- .slugify(String s)
- .stripTags(String s)
- .stripAccent(String s)
- .truncate(String s, Number limit)
- .replaceAll(String s, String|Array search, String|Array replace)

### Date format

- `relativize([Date | Timestamp])`
- `format([Date | Timestamp] [, String pattern])`
- `local([Date | Timestamp])`
- `utc([Date | Timestamp])`

Default pattern for `format()` method is `D, M d, Y  H:i:s A`.

Pattern for `local()` and `utc()` is `D, j M Y h:i:s O`.

Here are the available characters:

```
  - Y: full year, ex: 2050
  - y: short year, ex: 50
  - F: full month name, ex: August
  - M: short month name, ex: Aug
  - m: month index with zero, ex: 08 (in 08/24/2050)
  - n: short month name with no zero, ex: 8 (in 8/24/2050)
  - S: the ordering subfix for date, ext: 1st, 2nd, 3rd, 4th
  - j: day of the month, with no zero, ex: 3 (in 18/3/2050)
  - d: day of the month, with zero, ex: 03 (in 18/03/2050)
  - t: date in year
  - w: weekday in number
  - l: long name of weekday, ex: Sunday
  - D: short name of weekday, ex: Sun
  - G: hour, with no zero: 0 - 24
  - g: hour, with no zero: 0 - 12
  - h: hour, with zero:  00 - 24
  - i: minute:  00 - 59
  - s: second:  00 - 59
  - a: am, pm
  - A: AM, PM
  - O: timezone
```
t s
Example:

```js
import {
  relativize,
  format,
  local,
  utc
} from 'bellajs';

let t = 1509628030108;

relativize(t); //=> 2 seconds ago
format(t, 'Y/m/d h:i:s'); //=> 2017/11/02 20:07:10
local(t); //=> Thu, 2 Nov 2017 20:07:10 GMT+0007
utc(t); //=> Thu, 2 Nov 2017 13:07:10 GMT+0000
```

### Other utils

#### clone

```js
clone(Anything val)
```

Return a copy of val.

```js
let b = [
  1, 5, 0, 'a', -10, '-10', '',
  {
    a: 1,
    b: 'Awesome'
  }
];

let cb = bella.clone(b);
console.log(cb);
```

*cb* now has the same values as *b*, while the properties are standalone, not reference. So that:

```js
cb[7].a = 2;
cb[7].b = 'Noop';

console.log(b[7]);
```

What you get is still:

```js
{
  a: 1,
  b: 'Awesome'
}
```

#### compose

Performs right-to-left function composition.

```js
compose(f1, f2, ...fN)
```

Examples:

```js
import {compose} from 'bellajs';

let f1 = (name) => {
  return `f1 ${name}`;
};
let f2 = (name) => {
  return `f2 ${name}`;
};
let f3 = (name) => {
  return `f3 ${name}`;
};

let addF = compose(f1, f2, f3);

addF('Hello') // => 'f1 f2 f3 Hello'

let add1 = (num) => {
  return num + 1;
};

let mult2 = (num) => {
  return num * 2;
};

let add1AndMult2 = compose(add1, mult2);
add1AndMult2(3) // => 7
// because multiple to 2 first, then add 1 late => 3 * 2 + 1
```

#### copies

Copy the properties from *source* to *target*.

```js
copies(Object source, Object target[[, Boolean requireMatching], Array excepts])
```

- *requireMatching*: if true, BellaJS only copies the properties that are already exist in *target*.
- *excepts*: array of the properties properties in *source* that you don't want to copy.

Example:

```js
let a = {
  name: 'Toto',
  age: 30,
  level: 8,
  nationality: {
    name: 'America'
  }
};
let b = {
  level: 4,
  IQ: 140,
  epouse: {
    name: 'Alice',
    age: 27
  },
  nationality: {
    long: '18123.123123.12312',
    lat: '98984771.134231.1234'
  }
};

bella.copies(a, b);
console.log(b);
```

Output:

```js
{
  level: 8,
  IQ: 140,
  epouse: {
    name: 'Alice',
    age: 27
  },
  nationality: {
    long: '18123.123123.12312',
    lat: '98984771.134231.1234',
    name: 'America'
  },
  name: 'Toto',
  age: 30
}
```

#### curry

```js
curry(fn)
```

Examples:

```js
import {curry} from 'bellajs';

let sum = curry((a, b, c) => {
  return a + b + c;
});

sum(3)(2)(1) // => 6
sum(1)(2)(3) // => 6
sum(1, 2)(3) // => 6
sum(1)(2, 3) // => 6
sum(1, 2, 3) // => 6
```

#### equals

```js
equals(Anything a, Anything b)
```

Examples:

```js
import {equals} from 'bellajs';

equals({}, {}); // => true
equals(0, 1); // => false
```

#### genid

```js
genid([Number length [, String prefix]])
```

Examples:

```js
import {genid} from 'bellajs';

genid(); // => random 32 chars
genid(16); // => random 16 chars
genid(5); // => random 5 chars
genid(5, 'X_'); // => X_{random 3 chars}
```

#### md5

```js
md5(String s)
```

Examples:

```js
import {md5} from 'bellajs';

md5('abc'); // => 900150983cd24fb0d6963f7d28e17f72
```

#### pick

Randomly choose N  elements from array.

```js
pick(Integer count, Array arr)
```

Examples:

```js
import {pick} from 'bellajs';

const arr = [1, 3, 8, 2, 5, 7]
pick(arr, 2);  // --> [3, 5]
pick(arr, 2);  // --> [8, 1]
```

#### pipe

Performs left-to-right function composition.

```js
pipe(f1, f2, ...fN)
```

Examples:

```js
import {pipe} from 'bellajs';

let f1 = (name) => {
  return `f1 ${name}`;
};
let f2 = (name) => {
  return `f2 ${name}`;
};
let f3 = (name) => {
  return `f3 ${name}`;
};

let addF = pipe(f1, f2, f3);

addF('Hello') // => 'f3 f2 f1 Hello'

let add1 = (num) => {
  return num + 1;
};

let mult2 = (num) => {
  return num * 2;
};

let add1AndMult2 = pipe(add1, mult2);
add1AndMult2(3) // => 8
// because add 1 first, then multiple to 2 late => (3 + 1) * 2
```

#### randint

```js
randint([Number min [, Number max]])
```

Examples:

```js
import {randint} from 'bellajs';

randint(); // => a random integer
randint(1, 5); // => a random integer between 3 and 5, including 1 and 5
```

#### sort

```js
sort(Array a, Number order)
```

Examples:

```js
import {sort} from 'bellajs';

sort([3, 1, 5, 2], 1); // => [ 1, 2, 3, 5 ]
sort([3, 1, 5, 2], -1); // => [ 5, 3, 2, 1 ]
```

#### sortBy

```js
sortBy(Array a, String property, Number order)
```

Examples:

```js

import {sortBy} from 'bellajs';

const players = [
  {
    name: 'Jerome Nash',
    age: 24
  },
  {
    name: 'Jackson Valdez',
    age: 21
  },
  {
    name: 'Benjamin Cole',
    age: 23
  },
  {
    name: 'Manuel Delgado',
    age: 33
  },
  {
    name: 'Caleb McKinney',
    age: 28
  }
];

const result = sortBy('age', -1, players);
console.log(result_)
```

#### shuffle

Shuffle an array.

```js
shuffle(Array arr)
```

Examples:

```js
import {shuffle} from 'bellajs';

shuffle([1, 3, 8, 2, 5, 7]);
```

#### unique

```js
unique(Array a)
```

Examples:

```js
import {unique} from 'bellajs';

unique([1, 2, 3, 2, 3, 1, 5]); // => [ 1, 2, 3, 5 ]
```

## Test

```bash
git clone https://github.com/ndaidong/bellajs.git
cd bellajs
npm install
npm test
```

# License

The MIT License (MIT)


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fndaidong%2Fbellajs.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fndaidong%2Fbellajs?ref=badge_large)