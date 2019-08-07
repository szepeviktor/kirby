import Vue from "vue";
import Api from "@/api/api.js";
import clone from "@/helpers/clone.js";

export default {
  namespaced: true,
  state: {
    current: null,
    // Key: type/slug/language => pages/blog+a-blog-post/de
    // Object:
    //  - api: API endpoint
    //  - originals: values as they are in the content file
    //  - changes: unsaved changes
    models: {},
    status: {
      enabled: true,
      lock: null,
      unlock: null
    }
  },
  getters: {
    // status getters
    exists: state => id => {
      return state.models.hasOwnProperty(id);
    },
    hasChanges: (state, getters) => id => {
      const changes = getters.model(id).changes;
      return Object.keys(changes).length > 0;
    },
    isCurrent: (state) => id => {
      return state.current === id;
    },

    // data getters
    id: (state, getters, rootState) => id => {
      if (rootState.languages.current) {
        return id + "/" + rootState.languages.current.code;
      } else {
        return id;
      }
    },
    model: (state, getters) => id => {
      id = id || state.current;

      if (getters.exists(id) === true) {
        return state.models[id];
      }

      return {
        api: null,
        originals: {},
        values: {},
        changes: {},
      };
    },
    originals: (state, getters) => id => {
      return clone(getters.model(id).originals);
    },
    values: (state, getters) => id => {
      return {
        ...getters.originals(id),
        ...getters.changes(id)
      };
    },
    changes: (state, getters) => id => {
      return clone(getters.model(id).changes);
    }
  },
  mutations: {
    CREATE(state, [id, model]) {
      let changes = state.models[id] ? state.models[id].changes : model.changes ;

      Vue.set(state.models, id, {
        api: model.api,
        originals: model.originals,
        changes: changes || {}
      });
    },
    CURRENT(state, id) {
      state.current = id;
    },
    LOCK(state, lock) {
      Vue.set(state.status, "lock", lock);
    },
    MOVE(state, [from, to]) {
      // move state
      const model = clone(state.models[from]);
      Vue.delete(state.models, from);
      Vue.set(state.models, to, model);

      // move local storage
      const storage = localStorage.getItem("kirby$content$" + from);
      localStorage.removeItem("kirby$content$" + from);
      localStorage.setItem("kirby$content$" + to, storage);
    },
    REMOVE(state, id) {
      Vue.delete(state.models, id);
      localStorage.removeItem("kirby$content$" + id);
    },
    REVERT(state, id) {
      Vue.set(state.models[id], "changes", {});
      localStorage.removeItem("kirby$content$" + id);
    },
    STATUS(state, enabled) {
      Vue.set(state.status, "status", enabled);
    },
    UNLOCK(state, unlock) {
      if (unlock) {
        Vue.set(state.models[state.current], "changes", {});
      }

      Vue.set(state.status, "unlock", unlock);
    },
    UPDATE(state, [id, field, value]) {
      // avoid updating without a valid model
      if (!state.models[id]) {
        return false;
      }

      value = clone(value);

      const original = JSON.stringify(state.models[id].originals[field]);
      const current = JSON.stringify(value);

      if (original === current) {
        Vue.delete(state.models[id].changes, field);
      } else {
        Vue.set(state.models[id].changes, field, value);
      }

      localStorage.setItem(
        "kirby$content$" + id,
        JSON.stringify({
          api: state.models[id].api,
          originals: state.models[id].originals,
          changes: state.models[id].changes
        })
      );
    }
  },
  actions: {
    init(context) {
      Object.keys(localStorage)
            .filter(key => key.startsWith("kirby$content$"))
            .map(key => key.split("kirby$content$")[1])
            .forEach(id => {
              const data = localStorage.getItem("kirby$content$" + id);
              context.commit("CREATE", [id, JSON.parse(data)]);
            });
    },
    create(context, model) {
      // attach the language to the id
      model.id = context.getters.id(model.id);

      // remove title from model content
      if (model.id.startsWith("pages/") || model.id.startsWith("site")) {
        delete model.content.title;
      }

      const data = {
        api: model.api,
        originals: clone(model.content),
        changes: {}
      };

      // check if content was previously unlocked
      Api.get(model.api + "/unlock").then(response => {
        if (
          response.supported === true &&
          response.unlocked === true
        ) {
          context.commit("UNLOCK", context.state.models[model.id].changes);
        }
      });

      context.commit("CREATE", [model.id, data]);
      context.commit("CURRENT", model.id);
    },
    lock(context, lock) {
      context.commit("LOCK", lock);
    },
    move(context, [from, to]) {
      context.commit("MOVE", [from, to]);
    },
    remove(context, id) {
      context.commit("REMOVE", id);
    },
    reset(context) {
      context.commit("CURRENT", null);
      context.commit("LOCK", null);
      context.commit("UNLOCK", null);
    },
    revert(context, id) {
      id = id || context.state.current;
      context.commit("REVERT", id);
    },
    save(context, id) {
      id = id || context.state.current;

      const model = context.getters.model(id);

      if (
        context.getters.isCurrent(id) &&
        context.state.status.enabled === false
      ) {
        return false;
      }

      context.dispatch("status", false);

      // Send to api
      return Api
        .patch(model.api, {...model.originals, ...model.changes})
        .then(() => {
          context.dispatch("revert", id);
          context.dispatch("status", true);
        })
        .catch(error => {
          context.dispatch("status", true);
          throw error;
        });
    },
    status(context, enabled = true) {
      context.commit("STATUS", enabled);
    },
    unlock(context, unlock) {
      context.commit("UNLOCK", unlock);
    },
    update(context, [field, value, id]) {
      id = id || context.state.current;
      context.commit("UPDATE", [id, field, value]);
    }
  }
};
