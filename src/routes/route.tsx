import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "../pages/home";
import { HomeLayout } from "../pages/_layout/home-layout";
import { MDRDetails } from "../pages/MDR-details";
import { SubmitData } from "../pages/submit-data";
import { ErrorPage } from "../pages/error/error";

export function Routes() {
  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      element: <HomeLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/details/:id',
          element: <MDRDetails />
        }
      ]
    },
    {
      path: 'submit-data',
      element: <SubmitData />
    }
  ])

  return <RouterProvider router={router} />
}