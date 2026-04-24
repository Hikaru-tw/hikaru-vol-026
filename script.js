/* ============================================================
   Visual Index № 026
   ============================================================ */

(() => {
  "use strict";

  // ----- Data --------------------------------------------------
  // Each image's natural pixel dimensions inform both the cell's aspect-ratio
  // and the row pairings in LAYOUT, so heights balance within each row.
  const IMAGES = [
    {
      src: "1776941915852-019db9fd-8a1e-7b3c-a134-67eeb762310a.png",
      w: 2688,
      h: 1536,
    }, // WIDE 16:9
    { src: "179bc3af-b867-4525-9af2-6440e74ef36c.png", w: 1122, h: 1402 }, // TALL 4:5
    { src: "1f1aae0e-750c-4b7a-8f20-314c9adb3082.png", w: 1122, h: 1402 }, // TALL
    { src: "22e13e69-a8a0-49b7-9cc9-a845c76f76f7.png", w: 1448, h: 1086 }, // 4:3
    { src: "261656c2-6ac0-4d58-a23d-995e3187ee5c.png", w: 1254, h: 1254 }, // SQUARE
    { src: "2624b8da-dbfd-4726-9a97-9cd58efb82ff.png", w: 1122, h: 1402 }, // TALL
    { src: "2a8404fd-2148-42f0-a21c-17e05bf66ea4.png", w: 1254, h: 1254 }, // SQUARE
    { src: "328d16d5-8d5d-4875-b252-f8f1c31b067a.png", w: 1122, h: 1402 }, // TALL
    { src: "364bac18-a98c-407e-b601-2718f73e7938.png", w: 1122, h: 1402 }, // TALL
    { src: "51a0aa2b-302a-4876-9f11-8ab791c2e471.png", w: 1122, h: 1402 }, // TALL
    { src: "614673ab-ab0a-4788-a9fb-3b0bca8c604f.png", w: 1254, h: 1254 }, // SQUARE
    { src: "6d4ca1f4-4373-46f9-beaa-9367b7a2f1a8.png", w: 1114, h: 1412 }, // TALL
    { src: "71d18146-40a9-4b91-8801-46ccaa4dcd2b.png", w: 1672, h: 941 }, // WIDE
    { src: "74777c8e-6141-43f6-a7fc-e921cac24f48.png", w: 1122, h: 1402 }, // TALL
    { src: "7535558e-c3a4-48c1-9fa4-ad9669dc0a3b.png", w: 1536, h: 1024 }, // 3:2
    { src: "76939db2-1b2e-41b8-96d6-7f6faeb31614.png", w: 1122, h: 1402 }, // TALL
    { src: "7ed1c418-6739-4dc3-8cf1-aa6500ea4b84.png", w: 1122, h: 1402 }, // TALL
    { src: "99faae2d-5528-4e0f-bf37-1fb8b9f7c607.png", w: 1536, h: 1024 }, // 3:2
    { src: "9cc57ba1-18b0-45ba-9101-5a26348c9702.png", w: 1672, h: 941 }, // WIDE
    { src: "a0d5be72-1abb-404a-9470-91c4f383decb.png", w: 1672, h: 941 }, // WIDE
    { src: "b5df21e7-6c81-4841-9d10-001b36c978af.png", w: 1086, h: 1448 }, // 3:4 EXTRA-TALL
    { src: "c52163d1-12b3-443f-90b4-715e9f1684d9.png", w: 1254, h: 1254 }, // SQUARE
    { src: "cc62d857-94af-4f14-bdbd-1225af5afb75.png", w: 1122, h: 1402 }, // TALL
    { src: "ce4f7ccf-3475-4d2a-9fbd-3a5428fb08f7.png", w: 1122, h: 1402 }, // TALL
    { src: "e782cb9b-83fd-48d2-a17d-c0a99e474932.png", w: 1536, h: 1024 }, // 3:2
  ];

  const TITLES = [
    "Aperture I",
    "Quiet Hours",
    "Soft Geometry",
    "Ember",
    "Field Notes",
    "Marrow",
    "Halcyon",
    "Vellum",
    "Northing",
    "Drift",
    "Slow Light",
    "Stoneware",
    "Linen",
    "Ink Study",
    "Salt",
    "Ash & Bone",
    "Cumulus",
    "Threshold",
    "Folio",
    "Latitude",
    "Pale Sun",
    "Atrium",
    "Margin",
    "Tide",
    "Vespers",
  ];

  // Curated layout: [imageIndex, gridColumnSpan]
  // Reading top-to-bottom, every row sums to 12. Spans are chosen so each
  // pair's rendered HEIGHT balances (e.g. TALL-4 ≈ WIDE-8, SQUARE-6 + SQUARE-6).
  // Three full-bleed feature rows act as cinematic punctuation.
  const LAYOUT = [
    [0, 12], // Row 1  · WIDE 16:9 — cinematic opener
    [1, 4],
    [12, 8], // Row 2  · TALL + WIDE
    [4, 6],
    [6, 6], // Row 3  · SQUARE + SQUARE
    [2, 4],
    [14, 8], // Row 4  · TALL + LANDSCAPE 3:2
    [5, 4],
    [7, 4],
    [8, 4], // Row 5  · three TALLs
    [18, 8],
    [9, 4], // Row 6  · WIDE + TALL
    [3, 12], // Row 7  · 4:3 mid-feature
    [10, 6],
    [21, 6], // Row 8  · SQUARE + SQUARE
    [11, 4],
    [17, 8], // Row 9  · TALL + LANDSCAPE
    [19, 8],
    [13, 4], // Row 10 · WIDE + TALL
    [15, 4],
    [16, 4],
    [22, 4], // Row 11 · three TALLs
    [24, 8],
    [23, 4], // Row 12 · LANDSCAPE + TALL
    [20, 12], // Row 13 · 3:4 EXTRA-TALL — closing feature
  ];

  // ----- Helpers -----------------------------------------------
  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => Array.from(p.querySelectorAll(s));
  const lerp = (a, b, n) => (1 - n) * a + n * b;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = matchMedia("(hover: none)").matches;

  // ----- Build grid --------------------------------------------
  // Cells are placed in LAYOUT order so the priority/lazy split lines up
  // with what's actually visible above the fold.
  const PRIORITY_COUNT = 5;

  const grid = $("#grid");
  LAYOUT.forEach(([imgIdx, span], slotIdx) => {
    const img = IMAGES[imgIdx];
    const title =
      TITLES[imgIdx] || `Study ${String(imgIdx + 1).padStart(2, "0")}`;
    const num = String(slotIdx + 1).padStart(2, "0");
    const priority = slotIdx < PRIORITY_COUNT;

    const cell = document.createElement("article");
    cell.className = "cell" + (span === 12 ? " cell--full" : "");
    cell.style.gridColumn = `span ${span}`;
    cell.style.aspectRatio = `${img.w} / ${img.h}`;
    cell.dataset.index = imgIdx;
    cell.dataset.title = title;
    cell.innerHTML = `
      <span class="cell__index">F.${num}</span>
      <div class="cell__media">
        <img class="cell__img"
             ${priority ? 'fetchpriority="high"' : 'loading="lazy"'}
             decoding="async"
             data-priority="${priority ? "1" : "0"}"
             width="${img.w}" height="${img.h}"
             src="image/${img.src}" alt="Study ${num} — ${title}" />
      </div>
      <div class="cell__meta">
        <span class="cell__num">№ ${num}</span>
        <span class="cell__title"><span>${title}</span></span>
        <span class="cell__year">GPT image 2</span>
      </div>
    `;
    grid.appendChild(cell);
  });

  // ----- Loader -------------------------------------------------
  // Progress model:
  //   - `realRatio`  = actual loaded/total, capped at .92 until fully done
  //   - `floor`      = a slowly-rising minimum so the bar feels alive
  //                    even before any image finishes (asymptote ~.7)
  //   - `target`     = max(realRatio, floor)
  //   - `displayed`  = lerp(displayed, target, k)  — what the user sees
  // When all images report in, target snaps to 1 and we ease through
  // the final stretch before fading the loader out.

  const loader = $(".loader");
  const loaderN = $(".loader__num");
  const loaderBI = $(".loader__bar i");

  // Gate only on priority images so we don't block on lazy-loaded frames
  // far down the page.
  const allImgs = $$('.cell__img[data-priority="1"]');
  let loaded = 0;
  const total = allImgs.length;
  const minLoadMs = 900;
  const startedAt = performance.now();

  let displayed = 0;
  let allDone = false;
  let finished = false;

  function tickLoader() {
    const elapsed = performance.now() - startedAt;
    const realRatio = total ? loaded / total : 1;

    // Faux progress: rises quickly at first, then asymptotes — feels organic
    // even on connections that load every image instantly.
    const floor = 0.7 * (1 - Math.exp(-elapsed / 900));

    let target;
    if (allDone && elapsed >= minLoadMs) {
      target = 1;
    } else {
      target = Math.max(Math.min(realRatio, 0.92), floor);
    }

    // Lerp toward target — a touch quicker once we're committed to 1
    const k = target === 1 ? 0.12 : 0.06;
    displayed = lerp(displayed, target, k);
    if (target === 1 && Math.abs(1 - displayed) < 0.0015) displayed = 1;

    const pct = Math.floor(displayed * 100);
    loaderN.textContent = String(pct).padStart(3, "0");
    loaderBI.style.transform = `scaleX(${displayed.toFixed(4)})`;

    if (displayed >= 1 && allDone && !finished) {
      finished = true;
      finishLoading();
      return;
    }
    requestAnimationFrame(tickLoader);
  }

  function finishLoading() {
    loaderN.textContent = "100";
    loaderBI.style.transform = "scaleX(1)";
    loader.classList.add("is-ready");
    setTimeout(() => {
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-revealed");
      initScroll();
      observeReveals();
    }, 700);
  }

  allImgs.forEach((img) => {
    const done = () => {
      loaded++;
      if (loaded >= total) allDone = true;
    };
    if (img.complete && img.naturalWidth) {
      done();
    } else {
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
    }
  });
  if (loaded >= total) allDone = true;

  requestAnimationFrame(tickLoader);

  // Safety net — if priority images are still in flight after 5s,
  // release the loader anyway so we never strand the page behind it.
  setTimeout(() => {
    if (!finished) {
      allDone = true;
    }
  }, 5000);

  // ----- Smooth scroll (transform-based inertia) ---------------
  const wrap = $("#scroll");
  const inner = $("#scrollInner");
  let target = 0;
  let current = 0;
  let docHeight = 0;
  let raf = null;

  function setHeights() {
    docHeight = inner.getBoundingClientRect().height;
    document.body.style.height = docHeight + "px";
  }

  function tick() {
    current = lerp(current, target, prefersReduced ? 1 : 0.085);
    if (Math.abs(target - current) < 0.1) current = target;
    inner.style.transform = `translate3d(0, ${-current}px, 0)`;
    raf = requestAnimationFrame(tick);
  }

  function onScroll() {
    target = window.scrollY;
  }

  function initScroll() {
    if (isTouch || prefersReduced) {
      // Fall back to native scroll
      document.documentElement.classList.add("no-smooth");
      return;
    }
    setHeights();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", setHeights);
    // Recalculate after images settle
    setTimeout(setHeights, 200);
    setTimeout(setHeights, 1200);
    raf = requestAnimationFrame(tick);
  }

  // ----- Anchor link smooth scroll -----------------------------
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      const top = t.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top, behavior: prefersReduced ? "auto" : "smooth" });
    });
  });

  // ----- Reveal-on-scroll --------------------------------------
  function observeReveals() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    $$(".cell").forEach((c) => io.observe(c));
  }

  // ----- Custom cursor -----------------------------------------
  const cursor = $(".cursor");
  const cDot = $(".cursor__dot");
  const cRing = $(".cursor__ring");
  const cLabelEl = $(".cursor__label");
  const cLabel = $(".cursor__label span");
  let mx = window.innerWidth / 2,
    my = window.innerHeight / 2;
  let dx = mx,
    dy = my,
    rx = mx,
    ry = my;
  let cursorVisible = false;

  if (!isTouch) {
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!cursorVisible) {
        cursorVisible = true;
        cursor.style.opacity = "1";
        // Snap on first appearance to avoid an initial sweep across the screen
        dx = rx = mx;
        dy = ry = my;
      }
    });
    window.addEventListener("mousedown", () => cursor.classList.add("is-down"));
    window.addEventListener("mouseup", () =>
      cursor.classList.remove("is-down"),
    );
    window.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0";
      cursorVisible = false;
    });
    window.addEventListener("mouseenter", () => {
      cursor.style.opacity = "1";
      cursorVisible = true;
    });

    cursor.style.opacity = "0";
    cursor.style.transition = "opacity .25s";

    function cursorTick() {
      dx = lerp(dx, mx, 0.9);
      dy = lerp(dy, my, 0.9);
      rx = lerp(rx, mx, 0.18);
      ry = lerp(ry, my, 0.18);
      cDot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%,-50%)`;
      cRing.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%)`;
      cLabelEl.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%,-50%)`;
      requestAnimationFrame(cursorTick);
    }
    cursorTick();

    // Hover states
    const setHover = (el, label = "view", linkLike = false) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("is-hover");
        if (linkLike) cursor.classList.add("is-link");
        cLabel.textContent = label;
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("is-hover");
        cursor.classList.remove("is-link");
      });
    };

    $$(".cell").forEach((c) => setHover(c, "open"));
    $$("a, button").forEach((a) => setHover(a, "", true));
  }

  // ----- Lightbox ----------------------------------------------
  const lb = $("#lb");
  const lbImg = $("#lbImg");
  const lbClose = $("#lbClose");
  const lbPrev = $("#lbPrev");
  const lbNext = $("#lbNext");
  const lbNum = $("#lbNum");
  const lbTitle = $("#lbTitle");
  const lbCount = $("#lbCount");
  let lbIndex = 0;
  let lbOpen = false;

  function openLB(i) {
    lbIndex = (i + IMAGES.length) % IMAGES.length;
    const img = IMAGES[lbIndex];
    const title = TITLES[lbIndex] || `Frame ${lbIndex + 1}`;
    const num = String(lbIndex + 1).padStart(2, "0");

    // Crossfade
    lbImg.style.opacity = "0";
    const next = new Image();
    next.onload = () => {
      lbImg.src = next.src;
      lbImg.alt = `Frame ${num} — ${title}`;
      lbImg.style.transition = "opacity .35s ease";
      requestAnimationFrame(() => {
        lbImg.style.opacity = "1";
      });
    };
    next.src = `image/${img.src}`;

    lbNum.textContent = `F.${num}`;
    lbTitle.textContent = title;
    lbCount.textContent = `${num} / ${String(IMAGES.length).padStart(2, "0")}`;

    if (!lbOpen) {
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      lbOpen = true;
    }
  }

  function closeLB() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lbOpen = false;
  }

  grid.addEventListener("click", (e) => {
    const cell = e.target.closest(".cell");
    if (!cell) return;
    openLB(parseInt(cell.dataset.index, 10));
  });
  lbClose.addEventListener("click", closeLB);
  lbPrev.addEventListener("click", () => openLB(lbIndex - 1));
  lbNext.addEventListener("click", () => openLB(lbIndex + 1));
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLB();
  });

  document.addEventListener("keydown", (e) => {
    if (!lbOpen) return;
    if (e.key === "Escape") closeLB();
    if (e.key === "ArrowLeft") openLB(lbIndex - 1);
    if (e.key === "ArrowRight") openLB(lbIndex + 1);
  });

  // ----- Clock --------------------------------------------------
  const navTime = $("#navTime");
  function updateClock() {
    const d = new Date();
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    if (navTime) navTime.textContent = `${h}:${m} LOC`;
  }
  updateClock();
  setInterval(updateClock, 30000);
})();
