<template>
  <div class="k-block" :data-type="type">
    <div class="k-block-info">
      <span class="k-block-type">{{ label }}</span>
      <span class="k-block-preview"><slot /></span>
    </div>
    <k-dropdown class="k-block-options">
      <k-button icon="dots" @click="$refs.options.toggle()" />
      <k-dropdown-content ref="options" align="right">
        <k-dropdown-item icon="edit">Edit</k-dropdown-item>
        <k-dropdown-item icon="add">Insert</k-dropdown-item>
        <k-dropdown-item icon="trash" @click="$refs.delete.open()">Delete</k-dropdown-item>
      </k-dropdown-content>
    </k-dropdown>

    <k-dialog ref="delete" theme="negative">
      Do you really want to delete this block?
    </k-dialog>


  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String
    },
    type: {
      type: String
    }
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
  padding: 0;
  font-size: .875rem;
  justify-content: space-between;
}
.k-block-options {
  height: 38px;
}
.k-block-options > .k-button {
  line-height: 1;
  height: 100%;
  padding: 0 .75rem;
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
  padding: .5rem 0 .5rem .75rem;
  line-height: 1.5em;
}
.k-block-preview {
  padding: .5rem 1.5rem .5rem 0;
  line-height: 1.5em;
}
</style>
