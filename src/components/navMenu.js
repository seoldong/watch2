"use client";
import CurrentTime from "../components/CurrentTime";
import { useState } from "react";
import SignState from "./signState";
import { ShowMenuContext } from "../lib/showMenuContext";
import Connect from "./Connect";

function NavMenu() {
  const [showMenu, setShowMenu] = useState(true);

  return (
    <nav
      className={`absolute top-0 w-screen flex justify-between
        ${
          showMenu
            ? `sm:h-[15%] sm:justify-center`
            : `sm:h-screen sm:justify-start sm:item-center sm:bg-gray-300`
        }
        2xl:flex 2xl:text-2xl
        xl:flex xl:text-2xl
        lg:flex lg:text-2xl
        mdLflex md:text-xl
        sm:text-2xl sm:flex-col
        `}
    >
      <div
        className={`bg-gray-300
          ${showMenu ? `h-full` : `h-32`}
          2xl:hidden
          xl:hidden
          lg:hidden
          md:hidden
          sm:flex sm:justify-center sm:items-center
          `}
      >
        <a
          className="p-2 m-10 flex justify-center items-center border-b border-black font-medium cursor-pointer
          hover:border-none hover:bg-slate-400 hover:text-white
          "
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <p>M E N U</p> : <p>C L O S E</p>}
        </a>
      </div>

      <div
        className={`
        ${showMenu ? `sm:hidden` : `sm:flex`}
        xl:w-4/5 xl:flex xl:justify-start xl:items-center
        lg:w-4/6 lg:flex lg:justify-start lg:items-center
        md:w-4/6 md:flex md:justify-between md:items-center
        sm:h-full sm:w-full sm:flex-col sm:justify-start
        `}
      >
        <div
          className={`flex items-center
          sm:flex-col-reverse
          `}
        >
          <div
            className={`ml-10
              hover:border-none hover:bg-slate-400 hover:text-white
              sm:my-10
              `}
          >
            <a
              className="p-2 flex justify-center items-center cursor-pointer border-b border-black
              xl:m-3
              "
              href="/"
              onClick={() => setShowMenu(false)}
            >
              <p>H O M E</p>
            </a>
          </div>

          <div
            className={`my-10
            hover:border-none hover:bg-slate-400 hover:text-white
            lg:hidden
            md:hidden
            `}
          >
            <CurrentTime />
          </div>
        </div>

        <ShowMenuContext.Provider value={{ showMenu, setShowMenu }}>
          <SignState />
        </ShowMenuContext.Provider>
      </div>

      <div
        className={`
        ${showMenu ? `sm:hidden` : `sm:flex`}
        xl:w-1/5 xl:flex xl:justify-end xl:items-center
        lg:w-2/6 lg:flex lg:justify-end lg:items-center
        md:w-2/6 md:flex md:justify-end md:items-center
        sm:h-full sm:w-full sm:flex-col sm:justify-end
        `}
      >
        <Connect />
      </div>
    </nav>
  );
}

export default NavMenu;
