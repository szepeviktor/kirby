<template>
  <k-field v-bind="$props" class="k-blocks-field" @click.native.stop>

    <!-- Add button -->
    <template slot="options">
      <k-button
        ref="add"
        icon="add"
        @click="add"
      >
        {{ $t("add") }}
      </k-button>
    </template>

    <k-block type="heading" label="Heading 1">
      <strong>Hello world</strong>
    </k-block>

    <k-block type="text" label="Text">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
      magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
      gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
      elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
      accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet.
    </k-block>

    <k-block type="image" label="Image">
      <span class="k-block-gallery">
        <k-image
          src="http://sandbox.test/media/pages/sandbox/730881891-1556305734/aj-robbie-100x100.jpg"
          ratio="1/1"
          back="black"
        />
      </span>
    </k-block>

    <k-block type="heading" label="Heading 2">
      <strong>This is really nice</strong>
    </k-block>

    <k-block type="quote" label="Quote">
      <p>If you love what you do you never have to work for a single day in your life</p>
      <p>– Victor Hugo</p>
    </k-block>

    <k-block type="gallery" label="Gallery">
      <span class="k-block-gallery">
        <k-image src="http://sandbox.test/media/pages/sandbox/730881891-1556305734/aj-robbie-100x100.jpg" ratio="1/1" back="black" />
        <k-image src="http://sandbox.test/media/pages/sandbox/730881891-1556305734/aj-robbie-100x100.jpg" ratio="1/1" back="black" />
        <k-image src="http://sandbox.test/media/pages/sandbox/730881891-1556305734/aj-robbie-100x100.jpg" ratio="1/1" back="black" />
      </span>
    </k-block>

    <k-block type="text" label="Text">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
      magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
      gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
      elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
      et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
      amet.
    </k-block>

    <k-block type="cta" label="CTA">
      Download now
    </k-block>

    <k-block type="video" label="Video">
      https://youtube.com/watch?v=12dasj
    </k-block>

  </k-field>
</template>

<script>
import Field from "../Field.vue";
import Block from "./BlocksField/Block.vue";

export default {
  inheritAttrs: false,
  components: {
    "k-block": Block
  },
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
