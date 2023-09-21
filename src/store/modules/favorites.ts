import { type PeopleItemType } from "../../type/PeopleItemType";

export const state = () => ({
  favoritePeople: [],
});

export const mutations = {
  SET_FAVORITE_PEOPLE(state: any, payload: PeopleItemType[]) {
    state.favoritePeople = payload;
  },
};

export const actions = {
  loadFavoritePeopleFromLocalStorage({ commit }: any) {
    const localStorageKey = "peopleData";
    const people = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    commit("SET_FAVORITE_PEOPLE", people);
  },
};
