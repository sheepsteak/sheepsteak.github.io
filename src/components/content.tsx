import type { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

export const Content: FC<Props> = ({ children }) => (
  <div className="mx-auto max-w-lg px-3 py-6 md:max-w-3xl md:px-6">
    {children}
  </div>
);
