import "./globals.css";

import React from "react";
import ReactDOM from "react-dom/client";
import RootPage from "./root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from './error';
import NotesPage, { loader as notesLoader } from "./pages/notes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <NotesPage/>,
        loader: notesLoader(queryClient),
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>,
);
