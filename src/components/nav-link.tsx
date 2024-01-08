import Link from "next/link";
import { useRouter } from "next/router";
import type { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  exact?: boolean;
  href: string;
}>;

export const NavLink: FC<Props> = ({ children, exact, href }) => {
  const router = useRouter();

  const isActive = exact
    ? router.pathname === href
    : router.pathname.startsWith(href);

  return (
    <Link
      className={`p-2 text-xl ${
        isActive ? "bg-black text-yellow-300" : "bg-yellow-300"
      }`}
      href={href}>
      {children}
    </Link>
  );
};
