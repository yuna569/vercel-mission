import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home, { CATEGORIES } from "./Home/Home";
import Stores from "./Stores/Stores";
import type { IStore } from "./Stores/Stores";
import Store from "./Store/Store"
import stores from "../models/stores"
import Cart from "./Cart/Cart";

const typedStores = stores.map( (store) =>
  store as IStore
)

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
      ...CATEGORIES.map((category) => ({  // ... 없으면 이중 배열이 됨
        path: `/${category.path}`,
        element: <Stores stores={typedStores} category={category.name} />
      })),
      ...CATEGORIES.map((category) => ({
        path: `/${category.path}/:id`,
        element: <Store stores={typedStores} category={category.name} />
      })),
    {
      path: "/cart",
      element: <Cart />
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;