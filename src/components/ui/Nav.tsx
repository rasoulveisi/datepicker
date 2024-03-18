"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode, useState } from "react";

export function Nav({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`flex w-full items-center bg-primary-200 dark:bg-primary-700 `}>
      <div className="container mx-auto relative flex items-center justify-between">
        <div className="max-w-full px-4">
          <a href="/#" className="block w-full py-5 dark:text-primary-100 font-bold text-3xl">
            MYLOGO
          </a>
        </div>
        <div className="flex w-full items-center justify-between px-4">
          <div>
            <button onClick={() => setOpen(!open)} id="navbarToggle" className={`absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary-400 focus:ring-2 lg:hidden`}>
              <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
              <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
              <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
            </button>
            <nav
              id="navbarCollapse"
              className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-black lg:static lg:block lg:w-full lg:max-w-full lg:shadow-none lg:dark:bg-transparent ${!open && "hidden"} `}
            >
              <ul className={`flex gap-2 dark:text-primary-100 ${open && "max-lg:flex-col"}`}>
                {children}
                <AuthBtns className="lg:hidden"></AuthBtns>
              </ul>
            </nav>
          </div>
          <div className="hidden justify-end pr-16 lg:flex lg:pr-0 gap-3">
            <AuthBtns></AuthBtns>
          </div>
        </div>
      </div>
    </header>
  );
}

const AuthBtns = ({ className }: { className?: string }) => {
  return (
    <>
      <button className={`rounded-md bg-primary-400 px-6 py-3 text-base font-medium text-white hover:bg-primary-500 ${className}`}>
        <NavLink href="/#">Sign in</NavLink>
      </button>
      <button className={`rounded-md bg-primary-500 px-6 py-3 text-base font-medium text-white hover:bg-primary-600 ${className}`}>
        <NavLink href="/#">Sign Up</NavLink>
      </button>
    </>
  );
};

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return <Link {...props} className={cn("hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground", pathname === props.href && "bg-background text-foreground")} />;
}
