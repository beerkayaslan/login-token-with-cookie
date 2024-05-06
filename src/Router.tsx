import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Private from "./pages/Private";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const publicRouter = createBrowserRouter([
    {
        path: "/",
        Component: Login,
    },
]);

const privateRouter = createBrowserRouter([
    {
        path: "/",
        Component: Private,
    },
]);

export default function Router() {

    const AUTH_STATUS = useSelector((state: RootState) => state.auth.AUTH_STATUS);

    if (AUTH_STATUS === "LOADING") {
        return <div style={{ background: 'red' }}>Loading...</div>;
    }

    return <RouterProvider router={
        AUTH_STATUS === "LOGGED_IN" ? privateRouter : publicRouter
    } />;
}