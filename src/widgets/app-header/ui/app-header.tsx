import { SidebarTrigger } from "@/shared/ui/shadcn/sidebar";
import { ModeToggle } from "@/shared/ui/mode-toggle";

export const AppHeader = () => {
    return (
        <header className="flex h-14 items-center justify-between border-b px-4">
            <SidebarTrigger />
            <ModeToggle />
        </header>
    );
};