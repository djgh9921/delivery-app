import {createBrowserRouter} from 'react-router-dom'
import {RestaurantsPage} from './pages/RestaurantsPage'
import {Layout} from "./App.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <RestaurantsPage /> },
        ]
    }
])