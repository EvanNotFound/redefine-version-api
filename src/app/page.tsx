import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className={
        "flex justify-center items-center flex-col h-screen px-6 text-center"
      }
    >
      <h1 className={"font-bold"}>
        This is hexo-theme-redefine version info api.
      </h1>
      <Link href={"https://github.com/EvanNotFound/hexo-theme-redefine"}>
        Github:{" "}
        <span className={"underline underline-offset-2"}>
          https://github.com/EvanNotFound/hexo-theme-redefine
        </span>
      </Link>
    </main>
  );
}
