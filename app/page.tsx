import { Hero } from "@/components/home";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-between">
      <main
        className="relative flex-grow"
        style={{ minHeight: "-webkit-fill-available" }}
      >
        <div className="container md:px-8 2xl:px-16">
          {/* <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16"> */}
          <Hero />
        </div>
      </main>
    </div>
  );
}
