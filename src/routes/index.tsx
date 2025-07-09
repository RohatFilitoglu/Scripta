import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import PostDetailPage from "../pages/post-detail.page";
import "../routes/index.css";
import NewPostPage from "../pages/new-post.page";

// Lazy yüklenen bileşen
const AppPage = React.lazy(() => import("../App"));
const HomePage = React.lazy(() => import("../pages/home.page"));
const SignInPage = React.lazy(() => import("../pages/sign-in.page"));
const UserDetailPage = React.lazy(() => import("../pages/user-detail.page"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <AppPage />
      </Suspense>
    ),
    children: [
      {
        index: true,
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "post/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PostDetailPage />
          </Suspense>
        ),
      },
      {
        path: "/signin",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SignInPage />
          </Suspense>
        ),
      },
      {
        path: "users/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserDetailPage />
          </Suspense>
        ),
      },
      {
        path: "/new-post",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NewPostPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default routes;
