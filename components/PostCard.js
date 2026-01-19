import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card">
      <span className="post-meta">{post.date}</span>
      <span className="post-title">{post.title}</span>
      {post.description ? <span>{post.description}</span> : null}
    </Link>
  );
}
