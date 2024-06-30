import "./globals.css";
import 'quill/dist/quill.snow.css'; // Add css for quill snow themes

import React from "react";
import ReactDOM from "react-dom/client";
import RootPage from "./root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from './error';
import NotesPage, { loader as notesLoader } from "./pages/notes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UpdateNotePage, { loader as noteLoader } from "./pages/notes/update-note-page";
import ReviewPage, { loader as reviewLoader } from "./pages/review-page";
import CreateNotePage from "./pages/notes/create-note-page";
import HomePage from "./pages/home-page";
import LoginPage from "./pages/auth/login-page";
import SignupPage from "./pages/auth/signup-page";


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: "notes",
        children: [
          {
            index: true,
            element: <NotesPage/>,
            loader: notesLoader(queryClient),
          },
          {
            path: "create",
            element: <CreateNotePage/>,
          },
          {
            path: ":id",
            element: <UpdateNotePage/>,
            loader: noteLoader(queryClient),
          }
        ]
      },
      {
        path: "review",
        children: [
          {
            index: true,
            element: <ReviewPage/>,
            loader: reviewLoader(queryClient)
          }
        ]
      },
      {
        path: "login",
        element: <LoginPage/>
      },
      {
        path: "signup",
        element: <SignupPage/>
      },
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
