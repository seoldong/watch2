"use client";

import { useState } from "react";

export function DefaultMenu() {
  const [selectMenu, setSelectMenu] = useState("home");
  console.log(selectMenu);

  return (
    <>
      {selectMenu === "home" ? (
        <MenuList setState={setSelectMenu} />
      ) : (
        <Test state={selectMenu} />
      )}
      {/* <MenuList setState={setSelectMenu} /> */}
      {/* <Test state={selectMenu} /> */}
    </>
  );
}

function MenuList({ state, setState }) {
  return (
    <>
      <button onClick={(e) => setState(e.target.value)} value={"meal"}>
        add meal
      </button>
      <button onClick={(e) => setState(e.target.value)} value={"sleep"}>
        add sleep
      </button>
      <button onClick={(e) => setState(e.target.value)} value={"work"}>
        add work
      </button>
    </>
  );
}

function Test({ state }) {
  console.log(state);
  if (state === "meal") {
    return <div>this is meal</div>;
  } else if (state === "sleep") {
    return <div>this is sleep</div>;
  } else if (state === "work") {
    return <div>this is work</div>;
  }
}
