import { useEffect, useState } from "react";
import Head from "next/head";
import CreatePost from "../components/CreatePost";

export default function Main() {
  return (
    <div>
      <Head>
        <title>Vencha</title>
      </Head>
      <h1>Blog</h1>
      <CreatePost />
    </div>
  );
}
