import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/tutorials",
    name: "tutorials",
    component: () => import("./components/TutorialsList")
  },
  {
    path: "/tutorials/:id",
    name: "tutorial-details",
    component: () => import("./components/Tutorial")
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddTutorial")
  },
  {
  path: "/login",
  name: "log-in",
  component: () => import("./components/LogIn")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./components/Register")
    },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;