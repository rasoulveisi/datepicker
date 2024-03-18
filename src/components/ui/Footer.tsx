"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import { FooterBottomBackgroundIcon, FooterTopBackgroundIcon, FacebookIcon, LinkedinIcon, PhoneIcon, TwitterIcon, YoutubeIcon } from "./Icons";

export function Footer({ children }: { children?: ReactNode }) {
  return (
    <>
      <footer className="relative z-10 bg-white pb-10 pt-20 lg:pb-5 lg:pt-20">
        <div className="container mx-auto">
          <div className="mx-4 flex flex-wrap">
            <div className="w-full px-4 sm:w-2/3 lg:w-3/12">
              <div className="mb-10 w-full">
                <a href="/#" className="mb-6 inline-block max-w-[160px] font-bold text-3xl">
                  MYLOGO
                </a>
                <p className="mb-7 text-base">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, iste.</p>
                <p className="flex items-center text-sm font-medium ">
                  <span className="mr-3">
                    <PhoneIcon />
                  </span>
                  <span>+012 (345) 678 99</span>
                </p>
              </div>
            </div>

            <LinkGroup header="Resources">
              <NavLink href="/#">Test</NavLink>
              <NavLink href="/#">Test</NavLink>
            </LinkGroup>
            <LinkGroup header="Company">
              <NavLink href="/#">Test</NavLink>
              <NavLink href="/#">Test</NavLink>
            </LinkGroup>
            <LinkGroup header="Quick Links">
              <NavLink href="/#">Test</NavLink>
              <NavLink href="/#">Test</NavLink>
            </LinkGroup>

            <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
              <div className="mb-10 w-full">
                <h4 className="mb-9 text-lg font-semibold ">Follow Us On</h4>
                <div className="mb-6 flex items-center">
                  <a href="javascript:void(0)" className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke hover:border-primary-400 hover:bg-primary-400 hover:text-white  sm:mr-4 lg:mr-3 xl:mr-4">
                    <FacebookIcon />
                  </a>
                  <a href="javascript:void(0)" className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke hover:border-primary-400 hover:bg-primary-400 hover:text-white  sm:mr-4 lg:mr-3 xl:mr-4">
                    <TwitterIcon />
                  </a>
                  <a href="javascript:void(0)" className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke hover:border-primary-400 hover:bg-primary-400 hover:text-white  sm:mr-4 lg:mr-3 xl:mr-4">
                    <YoutubeIcon />
                  </a>
                  <a href="javascript:void(0)" className="mr-3 flex h-8 w-8 items-center justify-center rounded-full border border-stroke hover:border-primary-400 hover:bg-primary-400 hover:text-white  sm:mr-4 lg:mr-3 xl:mr-4">
                    <LinkedinIcon />
                  </a>
                </div>
                <p className="text-base text-body-color ">&copy; Rasoul Veisi</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span className="absolute bottom-0 left-0 z-[-1]">
            <FooterBottomBackgroundIcon />
          </span>
          <span className="absolute right-10 top-10 z-[-1]">
            <FooterTopBackgroundIcon />
          </span>
        </div>
      </footer>
    </>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return <Link {...props} className={cn("hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground", pathname === props.href && "bg-background text-foreground")} />;
}

const LinkGroup = ({ children, header }: any) => {
  return (
    <>
      <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
        <div className="mb-10 w-full">
          <h4 className="mb-9 text-lg font-semibold ">{header}</h4>
          <ul className="space-y-3 flex flex-col">{children}</ul>
        </div>
      </div>
    </>
  );
};
