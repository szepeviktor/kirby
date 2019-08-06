<template>
  <k-dropdown v-if="hasChanges" class="k-form-indicator">
    <k-button class="k-topbar-button" @click="toggle">
      <k-icon type="edit" class="k-form-indicator-icon" />
    </k-button>

    <k-dropdown-content ref="list" align="right">
      <p class="k-form-indicator-info">
        {{ $t("lock.unsaved") }}:
      </p>
      <hr>
      <k-dropdown-item
        v-for="entry in entries"
        :key="entry.id"
        :icon="entry.icon"
        @click.native.stop="go(entry.target)"
      >
        {{ entry.label }}
      </k-dropdown-item>
    </k-dropdown-content>
  </k-dropdown>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      entries: []
    }
  },
  computed: {
    store() {
      return this.$store.state.content.models;
    },
    models() {
      let ids = Object.keys(this.store);
      let models = ids.map(id => ({ id: id, ...this.store[id] }));
      return models.filter(model => Object.keys(model.changes).length > 0);
    },
    hasChanges() {
      return this.models.length > 0;
    }
  },
  methods: {
    go(target) {
      // if a target language is set, switch to it
      if (target.language) {
        if (this.$store.state.languages.current.code !== target.language) {
          const language = this.$store.state.languages.all.filter(l => l.code === target.language)[0];
          this.$store.dispatch("languages/current", language);
        }
      }

      this.$router.push(target.link);
    },
    load() {
      const promises = this.models.map(model => {
        return this.$api.get(model.api, { view: "compact" }, null, true).then(response => {
          let entry;

          if (model.id.startsWith("pages/")) {
            entry = {
              icon: "page",
              label: response.title,
              target: {
                link: this.$api.pages.link(response.id)
              }
            };
          }

          if (model.id.startsWith("files/")) {
            entry = {
              icon: "image",
              label: response.filename,
              target: {
                link: response.link
              }
            };
          }

          if (model.id.startsWith("users/")) {
            entry = {
              icon: "user",
              label: response.email,
              target: {
                link: this.$api.users.link(response.id),
              }
            };
          }

          if (this.$store.state.languages.current) {
            const language = model.id.split("/").pop();
            entry.label = entry.label + " (" + language + ")";
            entry.target.language = language;
          }

          return entry;
        });
      });

      return Promise.all(promises).then(entries => {
        this.entries = entries;
      });
    },
    toggle() {
      this.isOpen = !this.isOpen;

      if (this.isOpen === true) {
        this.load().then(() => {
          this.$refs.list.toggle();
        });
      } else {
        this.$refs.list.toggle();
      }
    }
  }
};
</script>

<style lang="scss">

.k-form-indicator-icon {
  color: $color-notice-on-dark;
}

.k-form-indicator-info {
  font-size: $font-size-small;
  font-weight: $font-weight-bold;
  padding: .75rem 1rem .25rem;
  line-height: 1.25em;
  width: 15rem;
}

</style>
