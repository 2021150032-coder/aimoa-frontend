import { Outlet } from "react-router-dom";
import Header from "./Header.tsx";

const Layout = () => {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-zinc-50">
                <Outlet />
            </main>
        </>
    );
};

export default Layout;