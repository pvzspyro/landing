import Link from "next/link";
import Nav from "../components/Nav";

export default function NotFound() {
  return (
    <main>
      <Nav />
      <div className="article">
        <h1>404</h1>
        <p>This page could not be found.</p>
        <Link href="/">Go home</Link>
      </div>
    </main>
  );
}
