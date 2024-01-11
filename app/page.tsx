import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main
        className="relative flex-grow"
        style={{ minHeight: "-webkit-fill-available" }}
      >
        <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe nde
          inventore expedita omnis alias dolorem ut, vero pariatur sed quod,
          natus odio tempora sunt itaque id repellat soluta. Blanditiis,
          tenetur? Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Illum consectetur reprehenderit voluptatum dicta atque. Amet placeat
          harum quas odio distinctio repellat hic minus, accusantium
          consequuntur fugiat, vitae eius quos iusto.
        </div>
      </main>
    </div>
  );
}
