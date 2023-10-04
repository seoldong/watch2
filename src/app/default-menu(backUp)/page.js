"use client";

import Link from "next/link";
import styles from "../../../styles/styles.module.css";
import { TimeState } from "../../../context/timeContext";

export default function DefaultMenuPage() {
  return (
    <>
      <TimeState.Provider value={""}>
        <LinkMenu pathValue={"/default-menu/meal"} linkName={"식사"} />
        <LinkMenu pathValue={"/default-menu/sleep"} linkName={"수면"} />
        <LinkMenu pathValue={"/default-menu/work"} linkName={"일과"} />
      </TimeState.Provider>
    </>
  );
}

function LinkMenu({ pathValue, linkName }) {
  const hrefValue = pathValue;
  return (
    <>
      <Link href={hrefValue}>
        <div className={styles.test}>{linkName}</div>
      </Link>
    </>
  );
}
