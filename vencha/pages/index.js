import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { getVents } from "../config/vents";

export default function Home() {
  useEffect(() => {
    getVents();
  }, []);

  return <div>Hello</div>;
}
