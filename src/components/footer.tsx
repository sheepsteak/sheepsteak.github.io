import Image from "next/image";
import type { FC } from "react";
import { Content } from "./content";

export const Footer: FC = () => (
  <footer className="bg-yellow-300">
    <Content>
      <div className="flex items-center justify-between">
        <span className="text-sm">© 2024 Chris Shepherd</span>
        <div className="flex gap-2 sm:gap-4 lg:gap-6">
          <a href="https://twitter.com/chrisjshepherd">
            <Image
              alt="Follow me on Twitter"
              src="/images/twitter.svg"
              height={26}
              width={26}
            />
          </a>
          <a href="https://github.com/sheepsteak">
            <Image
              alt="See my GitHub profile"
              src="/images/github.svg"
              height={26}
              width={26}
            />
          </a>
          <a href="http://feeds.feedburner.com/chrisshepherd">
            <Image
              alt="Subscribe to my RSS feed"
              src="/images/rss.svg"
              height={26}
              width={26}
            />
          </a>
        </div>
      </div>
    </Content>
  </footer>
);
