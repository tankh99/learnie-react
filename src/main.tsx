import "./globals.css";

import React from "react";
import ReactDOM from "react-dom/client";
import RootPage from "./root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from './error';
import NotesPage from "./pages/notes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <NotesPage/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);
