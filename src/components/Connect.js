"use client";
import { useRef, useState } from "react";

function Connect() {
  const [iconBtn, setIconBtn] = useState(true);

  return (
    <div
      className="static
      sm:h-44 sm:flex sm:justify-center sm:items-center sm:items-end sm:flex
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
    <div
      className="
      p-2 flex text-black border-b border-black
      hover:border-none hover:bg-slate-400 hover:text-white cursor-pointer
      xl:mr-16
      lg:mr-16
      md:mr-16
      "
      onClick={() => icon.setIconBtn(!icon.iconBtn)}
    >
      <p>{`C O N T A C T`}</p>
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
      className="w-full flex
         xl:w-[15rem] xl:flex-col xl:absolute xl:right-0 xl:top-10
         lg:w-[15rem] lg:flex-col lg:absolute lg:right-0 lg:top-10
         md:w-[15rem] md:flex-col md:absolute md:right-0 md:top-10
         "
    >
      <div
        className="
            xl:h-1/3 xl:my-5 xl:flex xl:justify-end xl:order-2
            lg:h-1/3 lg:my-5 lg:flex lg:justify-end lg:order-2
            md:h-1/3 md:my-5 md:flex md:justify-end md:order-2
            sm:w-1/3 sm:flex sm:justify-center sm:items-center"
      >
        <button
          className="p-2 border-b border-black
          hover:border-none hover:bg-slate-400 hover:text-white cursor-pointer
          xl:mr-20 xl:bg-gray-100
          lg:mr-20 lg:bg-gray-100
          md:mr-20 md:bg-gray-100
          "
          onClick={handleCopy}
          value={"spaceBacteria@gmail.com"}
          ref={textRef}
        >
          COPY_E-MAIL
        </button>
      </div>

      <div
        className="
            xl:h-1/3 xl:flex xl:justify-end xl:mr-20 xl:order-1
            lg:h-1/3 lg:flex lg:justify-end lg:mr-20 lg:order-1
            md:h-1/3 md:flex md:justify-end md:mr-20 md:order-1
            sm:w-1/3 sm:flex sm:justify-center sm:items-center"
      >
        <button
          className="p-2 border-b border-black
             hover:border-none hover:bg-slate-400 hover:text-white cursor-pointer
             xl:bg-gray-100
             lg:bg-gray-100
             md:bg-gray-100
             "
          onClick={() => icon.setIconBtn(!icon.iconBtn)}
        >
          <p>{`C L O S E`}</p>
        </button>
      </div>

      <div
        className="
            xl:h-1/3 xl:flex xl:justify-end xl:mr-20 xl:order-3
            lg:h-1/3 lg:flex lg:justify-end lg:mr-20 lg:order-3
            md:h-1/3 md:flex md:justify-end md:mr-20 md:order-3
            sm:w-1/3 sm:flex sm:justify-center sm:items-center"
      >
        <a
          className="p-2 border-b border-black
          hover:border-none hover:bg-slate-400 hover:text-white cursor-pointer
          xl:bg-gray-100
          lg:bg-gray-100
          md:bg-gray-100
          "
          href={"https://google.com"}
          target="blank"
        >
          <p>B L O G</p>
        </a>
      </div>

    </div>
  );
}
