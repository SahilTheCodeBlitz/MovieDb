import './index.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";

// Importing pages
import { Home } from './pages/Home.jsx';
import { Popular } from './pages/Popular.jsx';
import { TopRated } from './pages/TopRated.jsx';
import { Upcomming } from './pages/Upcomming.jsx';
import Layout from './Components/Layout.jsx';
import SingleeMovie from './pages/SingleeMovie';


const router = createBrowserRouter([
  {
    path: "/", // Use "/" for the root (Home) path
    element: <Layout />,
    children: [
      {
        index: true,  // Home route should explicitly be "/"
        element: <Home />,
      },
      {
        path: "popular",
        element: <Popular />,
      },
      {
        path: "toprated",
        element: <TopRated/>,
      },
      {
        path: "upcomming",
        element: <Upcomming />,
      },
      {
        path: "singlemovie",
        element: <SingleeMovie />,
      },
      {
        path: "movie/:id",  // Dynamic route for a single movie
        element: <SingleeMovie />,  // Correct component name here
      },
      {
        path: "search",  // Add a search route
        element: <Home />, // Reuse Home component to display search results
      },
      {
        path: '/movie/:id', // Route for single movie
        element: <SingleeMovie />, // SingleMovie component
      },


    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  // You can remove StrictMode to see if it resolves any issues
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>
);
