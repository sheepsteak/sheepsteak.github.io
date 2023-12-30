import type { FC, PropsWithChildren } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

type Props = PropsWithChildren<{
  subtitle?: React.ReactNode;
  title: React.ReactNode;
}>;

export const Layout: FC<Props> = ({ children, subtitle, title }) => (
  <div className="flex h-full flex-col">
    <div>
      <Header subtitle={subtitle} title={title} />
    </div>
    <main className="grow">{children}</main>
    <div>
      <Footer></Footer>
    </div>
  </div>
);
