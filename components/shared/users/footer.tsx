import { H3, H4, Para } from "@/components/ui/textui";
import { Facebook, Instagram, Youtube } from "lucide-react";
import React from "react";
import NewsLetter from "../newsletter";

const Footer = () => {
  return (
    <section>
      <footer className="mx-auto mt-16 flex h-full w-full flex-col gap-4 md:px-8 2xl:px-16">
        <NewsLetter />
        <div className="mx-4 grid grid-cols-1 gap-5 md:gap-9 lg:mx-0 lg:grid-cols-4 xl:gap-5">
          <div className="col-span-2 flex flex-col gap-4">
            <H4 className="text-base md:text-xl">We are</H4>
            <Para className="pr-0 text-sm text-muted-foreground md:pr-32 md:text-base">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consequatur neque commodi at vero repellat quos assumenda
              reprehenderit facere necessitatibus,
            </Para>
          </div>
          <div className="col-span-2 grid grid-cols-2">
            <div className="flex flex-col gap-4">
              <H4 className="text-base md:text-xl">Contact</H4>
              <ul className="flex flex-col space-y-3 text-sm text-muted-foreground md:text-base lg:space-y-3.5">
                <li>ouremail@email.com</li>
                <li>Call us: +91 0000000000</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <H4 className="text-base md:text-xl">Social</H4>
              <ul className="flex flex-col space-y-3 text-sm text-muted-foreground md:text-base lg:space-y-3.5">
                <li className="flex items-center gap-2">
                  <Instagram
                    strokeWidth={2}
                    size={18}
                    absoluteStrokeWidth={false}
                    className="p-0 text-primary"
                  />
                  <span>Instagram</span>
                </li>
                <li className="flex items-center gap-2">
                  <Facebook
                    strokeWidth={2}
                    size={18}
                    absoluteStrokeWidth={false}
                    className="p-0 text-primary"
                  />
                  <span>Facebook</span>
                </li>
                <li className="flex items-center gap-2">
                  <Youtube
                    strokeWidth={2}
                    size={18}
                    absoluteStrokeWidth={false}
                    className="p-0 text-primary"
                  />
                  <span>Youtube</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="mx-auto mt-24 border-t py-5 text-center">
        <span className="text-muted-foreground">
          Copyright &copy; {new Date().getFullYear().toString()} All rights
          reserved
        </span>
      </div>
    </section>
  );
};

export default Footer;
