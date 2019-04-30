<template>
  <k-field v-bind="$props" class="k-blocks-field" @click.native.stop>

    <div class="k-block" data-type="headline">
      <div class="k-block-info">
        <span class="k-block-type">Heading 1</span>
        <span class="k-block-preview">Hello world</span>
      </div>
      <k-button icon="dots" />
    </div>

    <div class="k-block" data-type="text">
      <div class="k-block-info">
        <span class="k-block-type">Text</span>
        <span class="k-block-preview">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
        magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
        elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
        accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.</span>
      </div>
      <k-button icon="dots" />
    </div>

    <div class="k-block" data-type="image">
      <div class="k-block-info">
        <span class="k-block-type">Image</span>
        <span class="k-block-preview">
          <span class="k-block-gallery">
            <k-image src="http://sandbox.test/media/pages/sandbox/730881891-1556305734/aj-robbie-100x100.jpg" ratio="1/1" back="black" />
          </span>
        </span>
      </div>
      <k-button icon="dots" />
    </div>

    <div class="k-block" data-type="quote">
      <div class="k-block-info">
        <span class="k-block-type">Quote</span>
        <span class="k-block-preview">
          <p>If you love what you do you never have to work for a single day in your life</p>
          <p>– Victor Hugo</p>
        </span>
      </div>
      <k-button icon="dots" />
    </div>

    <div class="k-block" data-type="gallery">
      <div class="k-block-info">
        <span class="k-block-type">Gallery</span>
        <span class="k-block-preview">
          <span class="k-block-gallery">
            <k-image src="http://sandbox.test/media/pages/sandbox/730881891-1556305734/aj-robbie-100x100.jpg" ratio="1/1" back="black" />
            <k-image src="http://sandbox.test/media/pages/sandbox/730881891-1556305734/aj-robbie-100x100.jpg" ratio="1/1" back="black" />
            <k-image src="http://sandbox.test/media/pages/sandbox/730881891-1556305734/aj-robbie-100x100.jpg" ratio="1/1" back="black" />
          </span>
        </span>
      </div>
      <k-button icon="dots" />
    </div>

    <div class="k-block" data-type="cta">
      <div class="k-block-info">
        <span class="k-block-type">CTA</span>
        <span class="k-block-preview">Download now</span>
      </div>
      <k-button icon="dots" />
    </div>

    <div class="k-block" data-type="video">
      <div class="k-block-info">
        <span class="k-block-type">Video</span>
        <span class="k-block-preview">https://youtube.com/watch?v=12dasj</span>
      </div>
      <k-button icon="dots" />
    </div>

  </k-field>
</template>

<script>
import Field from "../Field.vue";

export default {
  inheritAttrs: false,
  props: {
    ...Field.props,
    blocks: Object,
  },
  data() {
    return {
    };
  }
};
</script>

<style lang="scss">

.k-block {
  min-height: 38px;
  margin-bottom: 2px;
  display: flex;
  align-items: flex-start;
  background: #fff;
  box-shadow: $box-shadow-card;
  padding: 0 .75rem;
  font-size: .875rem;
  justify-content: space-between;
}
.k-block .k-button {
  height: 38px;
  line-height: 1;
}
.k-block-info {
  display: flex;
  line-height: 1;
  align-items: flex-start;
}
.k-block-type {
  color: $color-light-grey;
  margin-right: .75rem;
  width: 5rem;
  flex-shrink: 0;
  padding: .5rem 0;
  line-height: 1.5em;
}
.k-block-preview {
  padding: .5rem 1.5rem .5rem 0;
  line-height: 1.5em;
}

.k-block-gallery {
  display: flex;
}
.k-block-gallery .k-image {
  width: 5rem;
  margin-right: .5rem;
}


.k-block[data-type="headline"] .k-block-preview {
  font-weight: 600;
}

.k-block[data-type="quote"] .k-block-preview {
  font-style: italic
}

.k-block[data-type="cta"] .k-block-preview {
  font-weight: 600;
  text-decoration: underline;
}

</style>
