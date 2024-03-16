import Link from "next/link";

export default function Home() {
  return (
    <section className="container mx-auto flex justify-center">
      <span>This is the root path please go to </span>&nbsp;
      <Link className="mouse-pointer" href="/home">
        Home
      </Link>
    </section>
  );
}
