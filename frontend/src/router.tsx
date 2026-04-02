import {createBrowserRouter} from 'react-router-dom'
import {RestaurantsPage} from './pages/RestaurantsPage'
import {Layout} from "./App.tsx";
import {CartPage} from "./pages/CartPage.tsx";
import {OrderSuccessPage} from "./pages/OrderSuccessPage.tsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <RestaurantsPage /> },
            { path: '/cart', element: <CartPage />},
            { path: '/orders/success/:orderId', element: <OrderSuccessPage />}
        ]
    }
])