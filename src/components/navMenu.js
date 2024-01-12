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
      className={`absolute top-0 w-full flex
      2xl:bg-blue-300
      xl:bg-green-300
      lg:bg-yellow-300
      md:bg-orange-300
      sm:bg-red-300
      ${showMenu ? `` : `sm:h-screen`}
      sm:absolute sm:w-full sm:flex sm:flex-col sm:justify-start sm:text-2xl sm:bg-gray-300
      `}
    >
      <div
        className={`hidden
          sm:flex sm:justify-center sm:items-center
          `}
      >
        <a
          className="m-10 p-2 flex justify-center items-center border-b border-black font-medium cursor-pointer
          hover:border-none hover:bg-slate-400 hover:text-white
          "
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <p>M E N U</p> : <p>C L O S E</p>}
        </a>
      </div>

      <div
        className={`
        2xl:w-4/6 2xl:flex 2xl:justify-start 2xl:items-center
        xl:w-4/6 xl:flex xl:justify-start xl:items-center
        lg:w-4/6 lg:flex lg:justify-start lg:items-center
        md:w-4/6 md:flex md:justify-start md:items-center
        ${showMenu ? `sm:hidden` : `sm:flex`}
        sm:w-full sm:flex-col sm:justify-start
        `}
      >
        <div className={`flex items-center
            sm:flex-col-reverse
            `}
        >
          <div
            className={`
            2xl:ml-10
            xl:ml-10
            lg:ml-10
            md:ml-10
            sm:m-0
            `}
          >
            <a
              className="m-10 p-2 flex justify-center items-center cursor-pointer border-b border-black
              2xl:text-lg
              xl:text-lg
              lg:text-lg
              hover:border-none hover:bg-slate-400 hover:text-white
              "
              href="/"
              onClick={() => setShowMenu(false)}
            >
              <span>H O M E</span>
            </a>
          </div>

          <div
            className={`
            lg:hidden
            md:hidden
            sm:m-10
            hover:border-none hover:bg-slate-400 hover:text-white
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
        className={`flex justify-end items-center
        ${showMenu ? `sm:hidden` : ``}
        2xl:w-2/6
        xl:w-2/6
        lg:w-2/6 
        md:w-2/6
        sm:w-full sm:bottom-0 sm:absolute
        `}
      >
        <Connect />
      </div>
    </nav>
  );
}

export default NavMenu;
