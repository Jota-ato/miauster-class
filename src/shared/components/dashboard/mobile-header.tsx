"use client"
import { Menu } from "lucide-react";
import { Heading } from "../typography/heading";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

export function MobileHeader() {

    const { toggleSidebar } = useSidebar();

    return (
        <header className="md:hidden flex items-center justify-between w-full">
            <Heading className="text-left text-xl! font-bold">Miauster class</Heading>
            <Button
                onClick={toggleSidebar}
                variant="ghost"
                size="icon"
                aria-label="Abrir menú"
            >
                <Menu />
            </Button>
        </header>
    )
}