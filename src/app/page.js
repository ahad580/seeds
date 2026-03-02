"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

function HoverVideo({ webm, mp4, poster, className = "" }) {
  const ref = useRef(null);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      playsInline
      loop
      preload="metadata"
      onMouseEnter={() => {
        const v = ref.current;
        if (!v) return;
        v.currentTime = 0;
        v.play().catch(() => { });
      }}
      onMouseLeave={() => {
        const v = ref.current;
        if (!v) return;
        v.pause();
        v.currentTime = 0;
      }}
    >
      {mp4 ? <source src={mp4} type="video/mp4" /> : null}
      {webm ? <source src={webm} type="video/webm" /> : null}
    </video>
  );
}

function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M4.5 6.2c0-1.2.9-2.1 2.1-2.1h10.1c1.2 0 2.1.9 2.1 2.1v13.4c0 .9-.7 1.6-1.6 1.6H7.2c-.7 0-1.3.2-1.8.7V6.2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M6.6 4.1v15.7c.5-.5 1.1-.7 1.8-.7h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9.2 8h7.2M9.2 11.2h7.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PlayBadge() {
  return (
    <span className="storiesPlay" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M9 7.5v9l8-4.5-8-4.5Z" fill="currentColor" />
      </svg>
    </span>
  );
}

export default function SeedHero() {
  const [isScrolled, setIsScrolled] = useState(false);

  const storiesScrollerRef = useRef(null);

  const dragRef = useRef({
    down: false,
    startX: 0,
    startLeft: 0,
    pid: null,
  });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const products = useMemo(
    () => [
      {
        badge: "Bestseller",
        code: "DS-01®",
        title: "Daily Synbiotic",
        price: "Starting at $49.99 per month",
        webm: "/mov.webm",
        mp4: "/mov.mp4",
        poster: "/ds01.jpg",
      },
      {
        badge: "New",
        code: "DM-02™",
        title: "Daily Multivitamin",
        price: "Starting at $39.99 per month",
        webm: "/mov2.webm",
        mp4: "/mov2.mp4",
        poster: "/dm02.jpg",
      },
      {
        badge: "New",
        code: "AM-02™",
        title: "Energy + Focus",
        price: "Starting at $34.99 per month",
        webm: "/mov3.webm",
        mp4: "/mov3.mp4",
        poster: "/am02.jpg",
      },
      {
        badge: "New",
        code: "PM-02™",
        title: "Sleep + Restore",
        price: "Starting at $34.99 per month",
        webm: "/mov4.webm",
        mp4: "/mov4.mp4",
        poster: "/pm02.jpg",
      },
    ],
    []
  );

  const stories = useMemo(
    () => [
      { type: "circle", src: "/cap3.png" },
      { type: "tall", src: "/cap2.png" },
      { type: "tallPlay", src: "/thumb.webp" },
      { type: "circle", src: "/cap3.png" },
    ],
    []
  );

  const footerCols = useMemo(
    () => [
      { title: "PRODUCTS", links: ["Shop All", "Science", "Sustainability", "BioSproutLabs"] },
      { title: "ABOUT", links: ["BioSprout", "Science", "Sustainability", "BioSproutLabs"] },
      { title: "INQUIRE", links: ["Partner", "Practitioners", "Press", "Join"] },
      { title: "HELP", links: ["Help", "Contact", "My Account", "International"] },
      { title: "SOCIAL", links: ["Instagram", "Twitter", "LinkedIn", "Refer"] },
      { title: "LEGAL", links: ["Terms + Conditions", "Privacy Policy", "Accessibility", "Consent Preferences"] },
    ],
    []
  );

  const onPointerDown = (e) => {
    const scroller = storiesScrollerRef.current;
    if (!scroller) return;
    dragRef.current.down = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startLeft = scroller.scrollLeft;
    dragRef.current.pid = e.pointerId;
    try {
      scroller.setPointerCapture(e.pointerId);
    } catch { }
  };

  const onPointerMove = (e) => {
    const scroller = storiesScrollerRef.current;
    if (!scroller) return;
    if (!dragRef.current.down) return;
    const dx = e.clientX - dragRef.current.startX;
    scroller.scrollLeft = dragRef.current.startLeft - dx;
  };

  const endDrag = () => {
    dragRef.current.down = false;
    dragRef.current.pid = null;
  };

  const onPointerUp = (e) => {
    const scroller = storiesScrollerRef.current;
    if (!scroller) return;
    endDrag();
    try {
      scroller.releasePointerCapture(e.pointerId);
    } catch { }
  };

  const renderStoryMedia = (it, idxKey, forceClass = "") => {
    if (!it) return null;

    if (it.type === "quoteLight") {
      return (
        <div className={`storiesItem storiesQuoteImg ${forceClass}`} key={idxKey}>
          <Image src={it.src} alt="" fill className="storiesImg" />
        </div>
      );
    }

    if (it.type === "quoteDark") {
      return (
        <div className={`storiesItem storiesQuoteDarkImg ${forceClass}`} key={idxKey}>
          <Image src={it.src} alt="" fill className="storiesImg" />
        </div>
      );
    }

    if (it.type === "tallPlay") {
      return (
        <div className={`storiesItem storiesTall storiesPlayCard ${forceClass}`} key={idxKey}>
          <Image src={it.src} alt="" fill className="storiesImg" />
          <PlayBadge />
        </div>
      );
    }

    const cls =
      it.type === "circle"
        ? "storiesCircle"
        : it.type === "ovalSm"
          ? "storiesOvalSm"
          : it.type === "square"
            ? "storiesSquare"
            : "storiesTall";

    return (
      <div className={`storiesItem ${cls} ${forceClass}`} key={idxKey}>
        <Image src={it.src} alt="" fill className="storiesImg" />
      </div>
    );
  };

  const renderStoryNode = (node, idx) => {
    if (node.type === "stack") {
      return (
        <div className="storiesStack" key={idx}>
          {renderStoryMedia(node.top, `${idx}-top`, "storiesNoHoverJump")}
          {renderStoryMedia(node.bottom, `${idx}-bot`, "storiesNoHoverJump")}
        </div>
      );
    }
    return renderStoryMedia(node, idx);
  };

  return (
    <div className="seedPage">
      <header className={`siteHeader ${isScrolled ? "isScrolled" : ""}`}>
        <div className="promoBar">Is DS-01® Daily Synbiotic Right For You? →</div>

        <div className="navFrame">
          <nav className="mainNav">
            <div className="navLeftPill">
              <a className="brand" href="#">
                BioSprout <span className="brandDot" />
              </a>

              <div className="navLinks">
                <a href="#">Shop</a>
                <a href="#">Science</a>
                <a href="#">Learn</a>
              </div>
            </div>

            <div className="navRightPill">
              <a className="navLogin" href="#">
                Login
              </a>
              <a className="navCta" href="#">
                Get Started
              </a>
            </div>
          </nav>
        </div>
      </header>

      <section className="heroCard">
        <main className="heroWrap">
          <section className="heroGrid">
            <div className="heroCopy">
              <div className="heroKicker">
                <span className="pillTag">DS-01®</span>
                <span className="kickerText">Daily Synbiotic</span>
              </div>

              <h1 className="heroTitle">
                A healthy gut can
                <br />
                change your life.
              </h1>

              <p className="heroDesc">
                Our capsule-in-capsule technology delivers the right
                <br />
                probiotic strains to the right places to ease bloating, gas,
                <br />
                and irregularity.
              </p>

              <div className="heroActions">
                <a className="primaryBtn" href="#">
                  Shop DS-01®
                </a>
                <a className="textLink" href="#">
                  Take The Quiz <span className="arrow">→</span>
                </a>
              </div>
            </div>

            <div className="heroVisual">
              <div className="productArt">
                <Image src="/seedsimg.png" alt="Daily Synbiotic" fill priority className="productImg" />
              </div>
            </div>
          </section>
        </main>
      </section>

      <section className="greenBand">
        <div className="greenInner">
          <div className="gutTop">
            <h2 className="gutTitle">
              Whole body health starts
              <br />
              in the gut.
            </h2>

            <div className="gutTopRight">
              <p className="gutDesc">
                Formulations that provide fast-acting and sustained support
                <br />
                using scientifically and clinically studied ingredients.
              </p>

              <a className="gutShopAll" href="#">
                Shop All <span className="arrow">→</span>
              </a>
            </div>
          </div>

          <div className="gutGrid">
            {products.map((p, i) => (
              <article className="gutCard" key={i}>
                <div className="gutBadgeRow">
                  <span className={`gutBadge ${p.badge === "Bestseller" ? "gutBadgeHot" : ""}`}>{p.badge}</span>
                </div>

                <div className="gutCardHead">
                  <span className="gutCode">{p.code}</span>
                  <h3 className="gutCardTitle">{p.title}</h3>
                </div>

                <div className="gutMedia">
                  <HoverVideo className="gutVideo" webm={p.webm} mp4={p.mp4} poster={p.poster} />
                </div>

                <div className="gutBottom">
                  <a className="gutBtn" href="#">
                    Shop Now
                  </a>
                  <div className="gutPrice">{p.price}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="duoSection">
        <div className="duoOuter">
          <div className="duoGrid">
            <div className="duoCopy">
              <span className="duoTag">Bundle + Save 25%</span>
              <h2 className="duoTitle">
                Daily essentials for nutrition and
                <br />
                digestive health.
              </h2>
              <p className="duoDesc">
                Clinically proven daily probiotic and new daily multivitamin that help cover nutrient
                <br />
                gaps, reduce bloating, and promote healthy regularity.*
              </p>
              <a className="duoBtn" href="#">
                Shop Daily Essentials Duo
              </a>
            </div>

            <div className="duoMedia">
              <div className="duoBig">
                <Image src="/frame.png" alt="Daily Essentials Duo" fill className="duoBigImg" />
              </div>

              <div className="duoThumbs">
                <div className="duoThumb">
                  <Image src="/frame2.png" alt="Duo image 1" fill className="duoThumbImg" />
                </div>
                <div className="duoThumb">
                  <Image src="/frame5.png" alt="Duo image 2" fill className="duoThumbImg" />
                </div>
                <div className="duoThumb">
                  <Image src="/frame6.jpeg" alt="Duo image 3" fill className="duoThumbImg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="viaSection">
        <div className="viaBg">
          <Image src="/bg.jpeg" alt="" fill className="viaBgImg" />
        </div>

        <div className="viaWrap">
          <div className="viaCard">
            <div className="viaGrid">
              <div className="viaLeft">
                <div className="viaKicker">
                  <span className="viaDot" />
                  <span className="viaKickerText">VIACAP® TECHNOLOGY</span>
                </div>

                <h2 className="viaTitle">
                  Most probiotics don&apos;t survive
                  <br />
                  digestion—DS-01® does.
                </h2>

                <div className="viaStat">
                  <span className="viaChip">DS-01®</span>
                  <span className="viaStatLabel">Increases healthy bacteria by</span>
                  <span className="viaStatValue">4.6x*</span>
                </div>

                <div className="viaFoot">*in a clinical trial of n=103 individuals with occasional GI challenges</div>
              </div>

              <div className="viaRight">
                <div className="viaCalloutTop">
                  <div className="viaCalloutTitle">OUTER CAPSULE</div>
                  <div className="viaCalloutText">
                    Shields probiotics from stomach
                    <br />
                    acid in the digestive tract, while
                    <br />
                    delivering prebiotics to stimulate
                    <br />
                    the growth of beneficial bacteria.
                  </div>
                </div>

                <div className="viaCapsuleArea">
                  <img className="viaCapsule" src="/fall.gif" alt="Capsule" />
                </div>

                <div className="viaCalloutRight">
                  <div className="viaCalloutTitle">INNER CAPSULE</div>
                  <div className="viaCalloutText">
                    Delivers 24 live strains of
                    <br />
                    probiotics to the colon, where
                    <br />
                    they&apos;re needed most.
                  </div>
                </div>

                <span className="viaLine viaLineLeft" />
                <span className="viaLine viaLineRight" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="microHero">
        <div className="microWrap">
          <div className="microGrid">
            <div className="microLeft">
              <div className="microTop">
                <span className="microBrand">BioSprout</span>
                <span className="microIcon" aria-hidden="true">
                  <BookIcon />
                </span>
              </div>

              <h2 className="microTitle">You are more than human.</h2>

              <p className="microText">
                Your body isn&apos;t yours alone—it&apos;s home to 38 trillion microbes that power your digestion, immunity, and more. Take a few minutes to learn how their health impacts your health—and how to maximize both.
              </p>

              <div className="microActions">
                <a className="microBtn" href="#">
                  <span className="microBtnText">Discover</span>
                  <span className="microBtnDot" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>

              <div className="microFooter">
                <span className="microFootLabel">SCIENCE</span>
                <span className="microSlash">/</span>
                <span className="microFootValue">Microbiome 101</span>
              </div>
            </div>

            <div className="microRight">
              <div className="microMediaCard">
                <video className="microVideo" src="/AN.mp4" autoPlay muted playsInline loop preload="metadata" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="labsSection">
        <div className="labsWrap">
          <div className="labsGrid">
            <div className="labsCard labsPhoto">
              <Image src="/hand.jpeg" alt="BioSprout Labs" fill className="labsBg" />
              <div className="labsOverlay" />
              <div className="labsSideMeta">
                <span className="labsSideLine" />
                <span className="labsSideText">LIPARI, PANAREA — ITALY</span>
              </div>

              <div className="labsCenter">
                <h3 className="labsTitle">
                  BioSprout <span className="labsBrackets">[</span>Labs<span className="labsBrackets">]</span>
                </h3>
                <p className="labsSub">Because health is not just human.</p>
                <span className="labsBtn">Read More</span>
              </div>
            </div>

            <div className="labsCard labsPill">
              <div className="labsPillBg">
                <Image src="/twopillsbg.jpeg" alt="" fill className="labsPillBgImg" priority />
              </div>
              <div className="labsPillShade" />
              <div className="labsPillInner">
                <Image src="/twopills.png" alt="" width={68} height={68} className="labsPillsImg" />
                <h3 className="labsPillTitle">Change your gut health for good.</h3>
                <p className="labsPillSub">Feel lasting relief in one week with DS-01®</p>
                <span className="labsBtn">Shop Now</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="storiesSection">
        <div className="storiesShell">
          <h2 className="storiesHeading">
            Stories from scientists,
            <br />
            innovators, and
            <br />
            members like you.
          </h2>

          <div
            ref={storiesScrollerRef}
            className="storiesScroller"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={() => {
              if (!dragRef.current.down) return;
              endDrag();
            }}
          >
            <div className="storiesTrack">{stories.map((node, idx) => renderStoryNode(node, idx))}</div>
          </div>
        </div>
      </section>

      <section className="awakenSection">
        <div className="awakenMedia">
          <video className="awakenBg" src="/awaken.mp4" autoPlay muted playsInline loop preload="metadata" />
        </div>
        <div className="awakenOverlay" aria-hidden="true" />
        <div className="awakenContent">
          <h2 className="awakenTitle">Awaken Within.</h2>
          <div className="awakenCopy">© 2026 BioSprout (ahad.io)</div>
        </div>
      </section>

      <footer className="seedFooter">
        <div className="seedFooterInner">
          <div className="seedFooterLeft">
            <div className="seedFooterBrand">
              BioSprout <span className="seedFooterDot" />
            </div>

            <div className="seedFooterHeadline">
              Pioneering microbiome science <span className="seedFooterPill">R+D</span> for human and planetary health since 2015.
            </div>

            <div className="seedFooterForm">
              <div className="seedFooterFormLabel">Science with BioSprout—nerdy reads for your inbox.</div>
              <div className="seedFooterFormSub">By signing up you consent to receive BioSprout emails.</div>

              <div className="seedFooterInputRow">
                <input className="seedFooterInput" placeholder="Email address" />
                <button className="seedFooterBtn" type="button" aria-label="Sign up">
                  →
                </button>
              </div>

              <div className="seedFooterFine">
                *These statements have not been evaluated by the Food and Drug Administration.
                <br />
                This product is not intended to diagnose, treat, cure or prevent any disease.
              </div>
            </div>
            <a className="seedFooterSocial" href="https://github.com/ahad580  ">
              coded by ahad.io
            </a>
          </div>

          <div className="seedFooterGrid">
            {footerCols.map((c, i) => (
              <div className="seedFooterCol" key={i}>
                <div className="seedFooterColTitle">{c.title}</div>
                <div className="seedFooterColLinks">
                  {c.links.map((t, idx2) => (
                    <a className="seedFooterLink" href="#" key={idx2}>
                      {t}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
