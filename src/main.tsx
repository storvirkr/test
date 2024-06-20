import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import App from "./App.tsx";
import ErrorPage from "./error-page.tsx";
import Catalogue from "./routes/Catalogue.tsx";
import Favorites from "./routes/Favorites.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Catalogue />,
            },
            {
                path: 'favorites',
                element: <Favorites />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
