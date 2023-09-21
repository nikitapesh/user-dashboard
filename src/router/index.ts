import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
    },
    {
      path: "/people",
      component: () => import("../views/PeopleView.vue"),
    },
    {
      path: "/people/:id",
      component: () => import("../views/PeopleDetailView.vue"),
    },
    {
      path: "/favorites",
      component: () => import("../views/FavoritesView.vue"),
    },
  ],
});

export default router;
