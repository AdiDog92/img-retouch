import { Outlet } from '@tanstack/react-router';
export const AppBody = () => {
    return (
        <main className="flex-1 p-4">
            <Outlet />
        </main>
    );
};