/**
 * In case you need to customize your slides order
 * you can use this tag - <!--inject:order=0,1,2,3,4,5,-->
 * and specify as many slides as you need to be rendered
 * but becareful with spaces!
 * Put this tag just below your inject tag.
 * More info - https://www.npmjs.com/package/pug-slides-loader
 */

import Reveal from 'reveal.js';
import 'sass/main.scss';

document.body.innerHTML = `<div class="reveal">
<div class="slides">
    <!--inject:slides-->
</div>
</div>`;

Reveal.initialize({
  controls: false,
  touch: true,
  dependencies: [
    { src: 'plugin/highlight/highlight.js', async: true },
    { src: 'plugin/notes/notes.js', async: true },
  ],
});
