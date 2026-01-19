import fs from "fs";
import path from "path";
import Link from "next/link";
import { posts } from "../../../data/posts";

const navClassName =
  "_lttcdf _czphqh _6s0dn4 _145ct6e _1m75h50 _1f6x5sh _78zum5 _1vqtf37 _6esm2n _1a11q2q _dgco2l _1huwfqn _s0hnhe _jat59b _1wj9ous _lbgzzq _14g40p9 _agqw05 _kh2ocl _7wzq59";

const articleWrapClassName = "_78zum5 _1iyjqo2 _dt5ytf _6s0dn4";
const articleClassName = "_78zum5 _dt5ytf _1iyjqo2 _1uz70x1 _1sjtlrb wide-article";
const metaClassName = "_ss6m8b _1f6x5sh _2lah0s _1a11q2q _18vcv9u";
const titleClassName = "_nqh3do _1c8ti3v _1ve93yz _iksgxq _1fzhlzt";
const descriptionClassName = "_1f6x5sh _1jchvi3 _1evy7pa _1lv5wty";
const sectionHeadingClassName = "_nqh3do _1c3i2sq _1s688f _1d0ylna";
const paragraphClassName = "_nqh3do _1jchvi3 _1evy7pa _1lv5wty";
const listClassName = "_nqh3do _1jchvi3 _1evy7pa _taz4m5 _1cy9i3i _1lv5wty";
const blockquoteClassName =
  "_nqh3do _1jchvi3 _1evy7pa _1facyvu _1t7ytsu _pilrb4 _1xzmaso _1d0ylna";
const codeBlockClassName =
  "_1m1lls2 _1uz70x1 _1j6x5gx _w2csxc _4w1nh8 _1dcheo9 _1evy7pa _1lv5wty";
const inlineCodeClassName = "_4w1nh8 _1dcheo9";
const linkClassName = "_1bvjpef";

const markdownDir = path.join(process.cwd(), "data", "posts");

const loadMarkdown = (slug) => {
  try {
    return fs.readFileSync(path.join(markdownDir, `${slug}.md`), "utf8");
  } catch (error) {
    return null;
  }
};

const parseInline = (text, keyPrefix) => {
  const inlinePattern = /(\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`)/g;
  const parts = [];
  let lastIndex = 0;
  let inlineIndex = 0;

  for (const match of text.matchAll(inlinePattern)) {
    const matchIndex = match.index ?? 0;
    if (matchIndex > lastIndex) {
      parts.push(text.slice(lastIndex, matchIndex));
    }

    if (match[4]) {
      parts.push(
        <code
          key={`${keyPrefix}-code-${inlineIndex}`}
          className={inlineCodeClassName}
        >
          {match[4]}
        </code>
      );
    } else {
      parts.push(
        <a
          key={`${keyPrefix}-link-${inlineIndex}`}
          href={match[3]}
          className={linkClassName}
          target="_blank"
          rel="noreferrer"
        >
          {match[2]}
        </a>
      );
    }

    inlineIndex += 1;
    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

const renderMarkdown = (markdown) => {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let index = 0;
  let key = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const codeLines = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(
        <pre key={`code-${key}`} className={codeBlockClassName}>
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      key += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      const headingText = line.replace(/^##\s+/, "").trim();
      blocks.push(
        <h2 key={`heading-${key}`} className={sectionHeadingClassName}>
          {parseInline(headingText, `heading-${key}`)}
        </h2>
      );
      index += 1;
      key += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines = [];
      while (index < lines.length && lines[index].startsWith("> ")) {
        quoteLines.push(lines[index].replace(/^>\s?/, "").trim());
        index += 1;
      }
      blocks.push(
        <blockquote key={`quote-${key}`} className={blockquoteClassName}>
          {parseInline(quoteLines.join(" "), `quote-${key}`)}
        </blockquote>
      );
      key += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items = [];
      while (index < lines.length && lines[index].startsWith("- ")) {
        items.push(lines[index].replace(/^- /, "").trim());
        index += 1;
      }
      blocks.push(
        <ul key={`list-${key}`} className={listClassName}>
          {items.map((item, itemIndex) => (
            <li key={`list-${key}-${itemIndex}`}>
              {parseInline(item, `list-${key}-${itemIndex}`)}
            </li>
          ))}
        </ul>
      );
      key += 1;
      continue;
    }

    const paragraphLines = [];
    while (index < lines.length && lines[index].trim()) {
      if (
        lines[index].startsWith("## ") ||
        lines[index].startsWith("- ") ||
        lines[index].startsWith("> ") ||
        lines[index].startsWith("```")
      ) {
        break;
      }
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    blocks.push(
      <p key={`paragraph-${key}`} className={paragraphClassName}>
        {parseInline(paragraphLines.join(" "), `paragraph-${key}`)}
      </p>
    );
    key += 1;
  }

  return blocks;
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default function PostPage({ params }) {
  const post = posts.find((item) => item.slug === params.slug);
  const markdown = post ? loadMarkdown(post.slug) : null;

  if (!post) {
    return (
      <main className="_78zum5 _1iyjqo2 _pjyfc _ygnhl5 blog-shell">
        <nav className={navClassName}>
          <span
            aria-label="Home"
            className="_1lliihq"
            vt-name="site-logo"
            vt-update="_1mn1rqb"
            vt-share="_1mn1rqb"
          >
            <Link href="/" aria-label="Home" className="_1lliihq">
              <img
                className="_117rol3 _flga3k _5ii8vk _1q839t6 _j8txqj _1cw056v _18htf0m"
                src="/images/oregano.png"
                alt="Oregano"
                decoding="async"
              />
            </Link>
          </span>
          <div></div>
          <ul className="_jp7ctv">
            <li className="_jp7ctv">
              <Link
                href="/blog"
                className="_vmahel _1s58lsb _1f6x5sh _1h83x41 _vxrtwt _vruv2t _87ps6o _4furqs"
              >
                Blog
              </Link>
            </li>
          </ul>
        </nav>
        <div className={articleWrapClassName}>
          <div className={articleClassName}>
          <h1>Post not found</h1>
          <p>
            This archive entry does not have content yet. Return to the blog
            index.
          </p>
          <Link href="/blog">Back to blog</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="_78zum5 _1iyjqo2 _pjyfc _ygnhl5 blog-shell">
      <nav className={navClassName}>
        <span
          aria-label="Home"
          className="_1lliihq"
          vt-name="site-logo"
          vt-update="_1mn1rqb"
          vt-share="_1mn1rqb"
        >
          <Link href="/" aria-label="Home" className="_1lliihq">
            <img
              className="_117rol3 _flga3k _5ii8vk _1q839t6 _j8txqj _1cw056v _18htf0m"
              src="/images/oregano.png"
              alt="Oregano"
              decoding="async"
            />
          </Link>
        </span>
        <div></div>
        <ul className="_jp7ctv">
          <li className="_jp7ctv">
            <Link
              href="/blog"
              className="_vmahel _1s58lsb _1f6x5sh _1h83x41 _vxrtwt _vruv2t _87ps6o _4furqs"
            >
              Blog
            </Link>
          </li>
        </ul>
      </nav>
      <div
        className={articleWrapClassName}
        vt-name="rootContentContainer"
        vt-update="_1mn1rqb"
        vt-share="_1mn1rqb"
      >
        <article className={articleClassName}>
          <p className={metaClassName}>{post.date}</p>
          <h1
            className={titleClassName}
            style={{ viewTransitionName: `blog-title-${post.slug}` }}
          >
            {post.title}
          </h1>
          {post.description ? (
            <p className={descriptionClassName}>{post.description}</p>
          ) : null}
          {markdown
            ? renderMarkdown(markdown)
            : post.body
              ? post.body.map((paragraph, paragraphIndex) => (
                  <p
                    key={`fallback-${paragraphIndex}`}
                    className={paragraphClassName}
                  >
                    {paragraph}
                  </p>
                ))
              : null}
          <Link href="/blog" className={linkClassName}>
            Back to blog
          </Link>
        </article>
      </div>
    </main>
  );
}
