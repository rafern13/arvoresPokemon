import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    lazy: async () => {
      const module = await import("./paginas/PaginaInicial");
      return { Component: module.default };
    },  
  }
]);

export default router;
