import { createStore } from "vuex";
import * as people from "./modules/people";
import * as favorites from "./modules/favorites";

const store = createStore({
  modules: {
    people: people,
    favorites: favorites,
  },
});

export default store;
