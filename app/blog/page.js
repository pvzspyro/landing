import { postsByYear } from "../../data/posts";
import Link from "next/link";

export const metadata = {
  title: "Blog | Oregano Flakes",
  description: "Oregano Flakes personal blog"
};

const navClassName =
  "_lttcdf _czphqh _6s0dn4 _145ct6e _1m75h50 _1f6x5sh _78zum5 _1vqtf37 _6esm2n _1a11q2q _dgco2l _1huwfqn _s0hnhe _jat59b _1wj9ous _lbgzzq _14g40p9 _agqw05 _kh2ocl _7wzq59";

const listContainerClassName =
  "_1uz70x1 _amitd3 _1iyjqo2 _h8yej3 _1sjtlrb";

const yearHeadingClassName =
  "_1dvq9vw _1q0q8m5 _so031l _1f6x5sh _ln86er _1ve93yz _1ohvjvq _1hgupqh";

const postRowClassName =
  "_czphqh _1sjv973 _1hl2dhg _1pha0wt _1icol3 _17n77hc _78zum5";

const postDateClassName =
  "_ss6m8b _1f6x5sh _2lah0s _1a11q2q _18vcv9u _ig3uv9 _p4054r";

const postTitleClassName = "_dgco2l _s0hnhe _ci9nys _eq5yr9";

const formatPostDate = (dateString) => {
  const date = new Date(`${dateString}T00:00:00Z`);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC"
  });
};

export default function BlogPage() {
  const years = Object.keys(postsByYear)
    .map((year) => Number(year))
    .sort((a, b) => b - a);

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
        className="_78zum5 _1iyjqo2 _dt5ytf _6s0dn4"
        vt-name="rootContentContainer"
        vt-update="_1mn1rqb"
        vt-share="_1mn1rqb"
      >
        <section className={listContainerClassName}>
          <div className="_1x0kqqy _78zum5 _dt5ytf">
            {years.map((year) => (
              <section key={year} className="_78zum5 _dt5ytf">
                <h2 className={yearHeadingClassName}>{year}</h2>
                <div>
                  {postsByYear[year].map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className={postRowClassName}
                    >
                      <time
                        dateTime={`${post.date}T00:00:00.000Z`}
                        className={postDateClassName}
                      >
                        {formatPostDate(post.date)}
                      </time>
                      <h3
                        className={postTitleClassName}
                        style={{
                          viewTransitionName: `blog-title-${post.slug}`
                        }}
                      >
                        {post.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
