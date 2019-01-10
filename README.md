# Turn Down For What

[![npm](https://img.shields.io/npm/v/turn-down-for-what.svg)]()
[![npm](https://img.shields.io/npm/dt/turn-down-for-what.svg)]()

Fire up that loud, Another round of shots

![Turn Down For What Video Thumbnail](./assets/banner.jpg)

Make your website wait for that epic beat drop.

## Install

[![NPM](https://nodei.co/npm/turn-down-for-what.png)](https://www.npmjs.com/package/turn-down-for-what)

```bash
npm i turn-down-for-what -S
```

## Usage

Babel

```js
import turnDownForWhat from 'turn-down-for-what';

turnDownForWhat();
```

ES6

```js
const turnDownForWhat = require('turn-down-for-what');

turnDownForWhat();
```

## Arguments

The `turnDownForWhat` function takes two arguments.

```js
const affectedNodes = ['img', 'svg', 'p'];
const options = { noDelay: true };

turnDownForWhat(affectedNodes, options);
```

* `affectedNodes`: An array with the HTML tags that are supposed to be affected by the CSS animation. The code uses `document.querySelectorAll` to retrieve the nodes, so the syntax must be the same. The default is `['*']`, meaning all tags will be matched.

> Example
> ```js
> // Animates only divs matching the class 'animate' and the tag <p id="banner">
> turnDownForWhat(['div.animate', 'p#banner']);
> ```

* `options`: The second argument is an object that can configure some parameters:
  * `noDelay [default: false]`: By default the animation creates a random delay for the intro, making it look that each node is joining the party one at a time. If you are animating a single node, or you just want to have them all jump at the same time, pass `true`  to disable the delay and avoid weird behaviours.

    > Example
    > ```js
    > // Everything will start the animation at the same time
    > turnDownForWhat(['*'], { noDelay: true });
    > ```

  * `numKeyframes [default: 10]`: By default 10 random keyframes are generated. You can define how many you want with this property.

  * `numTurntAnimations [default: 10]`: After the drop your page will **Turn Down For What**. Define how many animations (keyframes) you want for this part (does not affect the intro). The default is 10.

    > Example
    > ```js
    > // Increase the number of animations
    > turnDownForWhat(['*'], {
    >   numKeyframes: 20,
    >   numTurntAnimations: 20,
    > });
    > ```

  * `maxNodes [default: 1000]`: For performance reasons only the first 1000 nodes will be animated. If you wish to override, pass another value.

## Live Example
* <a href="https://vmarches.in" target="_blank">My personal webpage</a>

This example makes use of another one of my packages: <a href="https://github.com/vmarchesin/react-konami-code" target="_blank">React Konami Code</a>.

To Turn Down For What on my website input the Konami Code using a keyboard: `↑ ↑ ↓ ↓ ← → ← → B A`

## License

[MIT](https://github.com/vmarchesin/turn-down-for-what/blob/master/LICENSE)

## Contact

You can reach me on my [Github](https://github.com/vmarchesin) or send an email to [dev@vmarches.in](mailto:dev@vmarches.in).

---
This code has been ~~copied~~ inspired by: https://github.com/nthitz/turndownforwhatjs