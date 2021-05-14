import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import CreatePost from "../components/CreatePost";

export default function Home() {
  return (
    <div>
      <CreatePost />
    </div>
  );
}
