import Reveal from 'reveal.js';
import 'sass/main.scss';

document.body.innerHTML = `<div class="reveal">
<div class="slides">
    <!--inject:slides-->
    <section>
      <img data-src="images/logo.webp">
    </section>
    <section>Slide 2</section>
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
