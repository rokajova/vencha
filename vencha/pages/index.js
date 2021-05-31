import { useEffect, useState } from "react";
import firebase from "../config/firebase";
import Head from "next/head";

export default function Main() {
  return (
    <div>
      <Head>
        <title>Vencha</title>
      </Head>
      <h1>Blog</h1>
    </div>
  );
}
