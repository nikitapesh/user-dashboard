import { type PeopleItemType } from "../../type/PeopleItemType";
export const namespaced = true;

export const state = {
  localStorageKey: "peopleData",
  peopleInLocalStorage: {},
};

type MutationPayload = {
  name: string;
  exists: boolean;
};

export const mutations = {
  SET_IS_PERSON_IN_LOCAL_STORAGE(state: any, payload: MutationPayload) {
    state.peopleInLocalStorage[payload.name] = payload.exists;
  },
};

export const actions = {
  checkLocalStorage({ commit, state }: any, personName: string) {
    const currentData = JSON.parse(
      localStorage.getItem(state.localStorageKey) || "[]"
    );
    const exists = currentData.some(
      (person: any) => person.name === personName
    );
    commit("SET_IS_PERSON_IN_LOCAL_STORAGE", { name: personName, exists });
  },

  addToLocalStorage({ dispatch, state }: any, person: any) {
    const currentData = JSON.parse(
      localStorage.getItem(state.localStorageKey) || "[]"
    );
    currentData.push(person);
    localStorage.setItem(state.localStorageKey, JSON.stringify(currentData));
    dispatch("checkLocalStorage", person.name);
  },

  removeFromLocalStorage({ dispatch, state }: any, personName: string) {
    const currentData = JSON.parse(
      localStorage.getItem(state.localStorageKey) || "[]"
    );
    const indexToRemove = currentData.findIndex(
      (person: any) => person.name === personName
    );
    if (indexToRemove !== -1) {
      currentData.splice(indexToRemove, 1);
    }
    localStorage.setItem(state.localStorageKey, JSON.stringify(currentData));
    dispatch("checkLocalStorage", personName);
  },
  checkMultipleInLocalStorage({ dispatch }: any, peopleList: PeopleItemType[]) {
    for (let person of peopleList) {
      dispatch("checkLocalStorage", person.name);
    }
  },
};
