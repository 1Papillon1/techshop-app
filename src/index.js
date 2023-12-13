import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./styles/app.css";

// Store
import Store from './Store/store';

// ROUTES
import Root from './routes/root';
import Shop from './routes/shop';

const techStore = new Store();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "/products",
    element: <Shop store={techStore}/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


