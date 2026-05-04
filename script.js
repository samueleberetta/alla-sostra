/* =============================================================
   Alla Sostra — interazioni del sito
   - Sticky header con cambio stato allo scroll
   - Mobile menu
   - Reveal on scroll (IntersectionObserver)
   - Switch lingua IT / EN (data-i18n)
   - Anno corrente nel footer
   ============================================================= */

(() => {
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Anno footer ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Header allo scroll ---------- */
  const header = $(".site-header");
  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    header?.setAttribute("data-state", scrolled ? "scrolled" : "top");
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const toggle = $(".nav__toggle");
  const mobile = $("#mobile-menu");
  const setMobile = (open) => {
    if (!toggle || !mobile) return;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Chiudi menù" : "Apri menù");
    mobile.hidden = !open;
    header?.setAttribute("data-mobile-open", String(open));
    document.documentElement.style.overflow = open ? "hidden" : "";
  };
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    setMobile(open);
  });
  $$("#mobile-menu a").forEach(a => a.addEventListener("click", () => setMobile(false)));

  /* ---------- Reveal on scroll ---------- */
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          // micro-stagger per gruppi vicini
          e.target.style.transitionDelay = `${Math.min(i * 60, 240)}ms`;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("is-visible"));
  }

  /* ---------- Lingua IT / EN ---------- */
  const dict = {
    en: {
      "nav.story": "About",
      "nav.menu":  "Menu",
      "nav.experience": "How it works",
      "nav.hours": "Hours",
      "nav.contact": "Contact",
      "nav.cta": "Call us",
      "nav.callus": "Call 366 742 4992",

      "hero.eyebrow": "Take away · lake fish",
      "hero.title1": "Lake fish,",
      "hero.title2": "in Dervio.",
      "hero.lead": "A family-run takeaway on the dock of Dervio, on the eastern arm of Lake Como. You order and pay at the till; when your dish is ready, we'll call your number.",
      "hero.ctaMenu": "See the menu",
      "hero.ctaWhere": "Find us",
      "hero.chipPlace": "Via alla Darsena, Dervio (LC)",
      "hero.chipHours": "Fri evening · Sat-Sun lunch and dinner",
      "hero.chipPhone": "Tel. +39 366 742 4992",

      "story.eyebrow": "About us",
      "story.title": "A small,<br/>family-run takeaway.",
      "story.p1": "Alla Sostra is a small lake-fish takeaway in Dervio (LC), on the eastern shore of Lake Como. A short menu of traditional Lario dishes, to enjoy at the outdoor tables on the dock or to take away.",
      "story.p2": "No table service and no bookings: you order and pay at the till, take a number and, when your dish is ready, we'll call you from the counter.",
      "story.v1.t": "Lake fish",
      "story.v1.p": "Lario fish-based cooking.",
      "story.v2.t": "Takeaway",
      "story.v2.p": "Eat at the table or take it home.",
      "story.v3.t": "On the dock",
      "story.v3.p": "Outdoor tables, facing the lake.",

      "menu.eyebrow": "The menu",
      "menu.title": "Some of the dishes<br/>we usually serve.",
      "menu.lead": "A small selection of our lake cooking. For today's menu and availability, please call us or stop by the till.",
      "menu.c1.t": "First courses",
      "menu.c1.i1.n": "Lasagne with lake-fish ragù",
      "menu.c1.i2.n": "Risotto with perch",
      "menu.c1.i3.n": "Tagliatelle with lake-fish ragù",
      "menu.c1.i4.n": "Pizzoccheri",
      "menu.c2.t": "Mains and bites",
      "menu.c2.i1.n": "Mixed lake-fish grill",
      "menu.c2.i2.n": "Mixed fish fry",
      "menu.c2.i3.n": "Piadine",
      "menu.note": "The menu may vary. For allergens, intolerances or daily availability, please ask at the till.",

      "exp.eyebrow": "How it works",
      "exp.title": "Three steps, nothing more.",
      "exp.s1.t": "Order at the till",
      "exp.s1.p": "Choose at the counter, pay, and take a number.",
      "exp.s2.t": "Sit at a table",
      "exp.s2.p": "Outdoor tables on the dock. Or take it away.",
      "exp.s3.t": "We'll call you",
      "exp.s3.p": "When your dish is ready, we'll call you from the counter.",

      "hours.eyebrow": "Hours",
      "hours.title": "When we're open.",
      "hours.lead": "Open Friday evening, Saturday and Sunday for lunch and dinner. Hours may change: a quick phone call is always the best way to confirm.",
      "hours.mon": "Monday", "hours.tue": "Tuesday", "hours.wed": "Wednesday",
      "hours.thu": "Thursday", "hours.fri": "Friday", "hours.sat": "Saturday", "hours.sun": "Sunday",
      "hours.closed": "Closed",
      "hours.note": "If in doubt about today's hours, please call us on +39 366 742 4992.",

      "contact.eyebrow": "Contact",
      "contact.title": "Where we are.",
      "contact.lead": "Via alla Darsena, Lungo Lago — 23824 Dervio (LC).",
      "contact.addrT": "Address",
      "contact.addrA": "Open in Maps →",
      "contact.phoneT": "Phone",
      "contact.phoneA": "Call now →",
      "contact.igT": "Instagram",
      "contact.igA": "Follow us →",
      "contact.fbT": "Facebook",
      "contact.fbA": "Visit the page →",

      "footer.tag": "Lake-fish takeaway",
      "footer.about": "Lake-fish takeaway in Dervio, on Lake Como. Open Friday evening, Saturday and Sunday.",
      "footer.h1": "Address",
      "footer.h2": "Contact"
    }
  };

  // Salva i testi originali (italiano) la prima volta
  const originals = new WeakMap();
  $$("[data-i18n]").forEach(el => originals.set(el, el.innerHTML));

  const setLang = (lang) => {
    const isEN = lang === "en";
    document.documentElement.setAttribute("lang", isEN ? "en" : "it");
    $$("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (isEN && dict.en[key]) {
        el.innerHTML = dict.en[key];
      } else {
        el.innerHTML = originals.get(el);
      }
    });
    $$(".lang-switch button").forEach(b => {
      b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    });
    try { localStorage.setItem("lang", lang); } catch (e) { /* noop */ }
  };

  $$(".lang-switch button").forEach(b => {
    b.addEventListener("click", () => setLang(b.dataset.lang));
  });

  let initial = "it";
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "it") initial = saved;
  } catch (e) { /* noop */ }
  if (initial !== "it") setLang(initial);

  /* ---------- Smooth-scroll offset (header sticky) ---------- */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
