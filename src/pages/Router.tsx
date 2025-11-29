import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home/Home";
import Stores from "./Stores/Stores";
import Store from "./Store/Store";
import Cart from "./Cart/Cart";
import { useEffect, useState } from "react";
import useCategoryStore from "./Home/useCategoryStore";

const Router = () => {
  const { fetchCategories } = useCategoryStore();
  const [ ready, setReady ] = useState(false);

  useEffect(() => {
    fetchCategories().finally(() => setReady(true));
  }, [fetchCategories]);

  if (!ready) return <div>로딩 중</div>;

  const router = createBrowserRouter([
    { path: "/", element: <Home />, },

    {
      path: "/:category",
      element: <Stores />,
    },
    {
      path: "/:category/:id",
      element: <Store />,
    },

    {
      path: "/cart",
      element: <Cart />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
