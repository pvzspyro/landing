import Link from "next/link";

export default function Nav() {
  return (
    <header>
      <Link href="/" className="nav">
        Oregano Flakes
      </Link>
      <nav className="nav">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
      </nav>
    </header>
  );
}
