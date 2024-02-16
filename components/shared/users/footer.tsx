import { H3, H4, Para } from "@/components/ui/textui";
import { Facebook, Instagram, Youtube } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <section>
      <footer className="container md:px-8 2xl:px-16 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 md:gap-9 xl:gap-5">
          <div className="col-span-2 flex flex-col gap-4">
            <H4 className="text-base md:text-xl">We are</H4>
            <Para className="pr-0 md:pr-32 text-sm md:text-base text-muted-foreground">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Consequatur neque commodi at vero repellat quos assumenda
              reprehenderit facere necessitatibus,
            </Para>
          </div>
          <div className="grid grid-cols-2 col-span-2">
            <div className="flex flex-col gap-4">
              <H4 className="text-base md:text-xl">Contact</H4>
              <ul className="text-sm md:text-base flex flex-col space-y-3 lg:space-y-3.5 text-muted-foreground">
                <li>ouremail@email.com</li>
                <li>Call us: +91 0000000000</li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <H4 className="text-base md:text-xl">Social</H4>
              <ul className="text-sm md:text-base flex flex-col space-y-3 lg:space-y-3.5 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Instagram
                    strokeWidth={2}
                    size={18}
                    absoluteStrokeWidth={false}
                    className="p-0"
                  />
                  <span>Instagram</span>
                </li>
                <li className="flex items-center gap-2">
                  <Facebook
                    strokeWidth={2}
                    size={18}
                    absoluteStrokeWidth={false}
                    className="p-0"
                  />
                  <span>Facebook</span>
                </li>
                <li className="flex items-center gap-2">
                  <Youtube
                    strokeWidth={2}
                    size={18}
                    absoluteStrokeWidth={false}
                    className="p-0"
                  />
                  <span>Youtube</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div className="border-t mx-auto text-center py-5 mt-24">
        <span className="text-muted-foreground">
          Copyright &copy; {new Date().getFullYear().toString()} All rights
          reserved
        </span>
      </div>
    </section>
  );
};

export default Footer;
