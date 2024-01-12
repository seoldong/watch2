"use client";
import { useRef, useState } from "react";

function Connect() {
  const [iconBtn, setIconBtn] = useState(true);

  return (
    <div
      className="
      2xl:absolute 2xl:right-0 2xl:top-0 2xl:w-2/6 2xl:h-full
      xl:absolute xl:right-0 xl:top-0 xl:w-2/6 xl:h-full
      lg:absolute lg:right-0 lg:top-0 lg:w-2/6 lg:h-full
      md:absolute md:right-0 md:top-0 md:w-2/6
      sm:w-full sm:flex-none sm:bottom-0
      "
    >
      {iconBtn ? (
        <IconOn icon={{ iconBtn, setIconBtn }} />
      ) : (
        <IconOff icon={{ iconBtn, setIconBtn }} />
      )}
    </div>
  );
}

export default Connect;

//

function IconOn({ icon }) {
  return (
    <div className="flex
    2xl:justify-end
    xl:justify-end
    lg:justify-end
    md:justify-end
    sm:w-full sm:justify-center sm:items-center
    ">
      <div
        className="flex order-2
        2xl:mr-10 2xl:text-lg
        xl:mr-10  xl:text-lg
        lg:mr-10 lg:text-lg
        md:mr-10
        sm:m-0 sm:order-1
        "
      >
        <button
          className="my-10 p-2 border-b border-black
          2xl:m-10 2xl:text-lg
          xl:m-10 xl:text-lg
          lg:m-10
          md:m-10 md:ml-0
          hover:border-none hover:bg-slate-400 hover:text-white cursor-pointer
          "
          onClick={() => icon.setIconBtn(!icon.iconBtn)}
        >
          <span>C O N T A C T</span>
        </button>
      </div>
    </div>
  );
}

//

function IconOff({ icon }) {
  const textRef = useRef(null);

  const handleCopy = async () => {
    try {
      if (textRef.current) {
        await navigator.clipboard.writeText(
          textRef.current.attributes[1].nodeValue
        );
        alert('copy e-mail address "spaceBacteria@gmail.com"');
        console.log("Text successfully copied to clipboard");
      }
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
  };

  return (
    <div
      className="flex
         2xl:w-full 2xl:flex-col
         xl:w-full xl:flex-col
         lg:w-full lg:flex-col
         md:w-full md:flex-col
         sm:w-full sm:justify-center sm:items-center
         "
    >

      <div
        className="
          flex justify-end mr-20 order-1
          2xl:mr-10
          xl:mr-10
          lg:mr-10
          md:mr-10
          sm:w-1/3 sm:flex sm:justify-center sm:items-center sm:m-0 sm:order-2
          "
      >
        <button
          className="p-2 border-b border-black bg-gray-300
          2xl:m-10 2xl:mb-0 2xl:text-lg
          xl:m-10 xl:mb-0 xl:text-lg
          lg:m-10 lg:mb-0
          md:m-10 md:mb-0
          sm:m-0
          hover:border-none hover:bg-slate-400 hover:text-white cursor-pointer
          "
          onClick={() => icon.setIconBtn(!icon.iconBtn)}
        >
          <span>C L O S E</span>
        </button>
      </div>

      <div
        className="
        flex justify-end mr-20 order-2
        sm:w-1/3 sm:flex sm:justify-center sm:items-center sm:m-0 sm:order-1
        "
      >
        <button
          className="p-2 border-b border-black bg-gray-300
          2xl:text-lg 2xl:my-5
          xl:text-lg xl:my-5
          lg:my-5
          md:my-3
          hover:border-none hover:bg-slate-400 hover:text-white cursor-pointer
          "
          onClick={handleCopy}
          value={"spaceBacteria@gmail.com"}
          ref={textRef}
        >
          <span>COPY_E-MAIL</span>
        </button>
      </div>

      <div
        className="
        flex justify-end mr-20 order-3
        sm:w-1/3 sm:flex sm:justify-center sm:items-center sm:m-0 sm:order-3
          "
      >
        <a
          className="p-2 border-b border-black bg-gray-300
          2xl:text-lg
          xl:text-lg
          lg:m-0
          md:mb-0
          sm:my-10
          hover:border-none hover:bg-slate-400 hover:text-white cursor-pointer
          "
          href={"https://google.com"}
          target="blank"
        >
          <span>B L O G</span>
        </a>
      </div>

    </div>
  );
}
