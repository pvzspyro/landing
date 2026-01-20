import SiteNav from "../../components/SiteNav";

export const metadata = {
  title: "Zork | Oregano Flakes",
  description: "Play Zork right in the browser."
};

const mainClassName = "_78zum5 _1iyjqo2 _pjyfc _ygnhl5";
const contentWrapClassName = "_78zum5 _1iyjqo2 _dt5ytf _6s0dn4";
const frameSectionClassName =
  "_1uz70x1 _amitd3 _1iyjqo2 _h8yej3 _1sjtlrb";

export default function ZorkPage() {
  return (
    <main
      className={mainClassName}
      style={{
        height: "100vh",
        background: "#000",
        color: "#fff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <SiteNav />
      <div
        className={contentWrapClassName}
        vt-name="rootContentContainer"
        vt-update="_1mn1rqb"
        vt-share="_1mn1rqb"
        style={{ flex: "1", width: "100%", minHeight: 0, display: "flex" }}
      >
        <section
          className={frameSectionClassName}
          style={{
            flex: "1",
            width: "100%",
            minHeight: 0,
            display: "flex",
            flexDirection: "column"
          }}
        >
          <img
            src="/images/zork_sketchy_mono.png"
            alt="Zork"
            style={{
              width: "260px",
              height: "auto",
              margin: "0 auto 16px",
              display: "block"
            }}
          />
          <iframe
            src="/visizork/index-game.html"
            title="Zork 1"
            className="zork-iframe"
            style={{
              width: "calc(100% + 100px)",
              height: "100%",
              border: "0",
              borderRadius: "12px",
              marginLeft: "-50px",
              background: "transparent",
              display: "block"
            }}
            allow="fullscreen"
          />
        </section>
      </div>
    </main>
  );
}
