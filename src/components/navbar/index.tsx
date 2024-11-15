"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@src/lib/utilities";

const NavItem = ({ text, route }: { text: string; route: string }) => {
  const pathname = usePathname();
  const isActive = pathname === route;
  return (
    <Link
      className={cn(
        isActive ? "text-indigo-600 font-semibold" : "hover:border-b border-b-indigo-700"
      )}
      href={route}
    >
      {text}
    </Link>
  );
};

export default function Navbar() {
  return (
    <div className="w-screen h-[60px] bg-white border-b flex items-center justify-between p-4">
      <Link href="/">
        <Image
          height={50}
          width={200}
          src={`/images/logo-mk2.jpeg`}
          alt="logo"
        />
      </Link>
      <div className="flex gap-4">
        <NavItem text="Discover" route="/discover" />
        <NavItem text="Create" route="/create" />
        <NavItem text="Browse" route="/browse" />
      </div>
    </div>
  );
}
