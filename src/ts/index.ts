import Reveal from 'reveal.js';
import '../sass/main.scss';

import slide1 from 'slides/slide-1.pug';

document.body.innerHTML = `<div class="reveal">
<div class="slides">
    ${slide1}
    <section>
      <img data-src="images/logo.webp">
    </section>
    <section>Slide 2</section>
</div>
</div>`;

Reveal.initialize();