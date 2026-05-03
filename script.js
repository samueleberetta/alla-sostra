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
      "nav.story": "Story",
      "nav.menu":  "Menu",
      "nav.experience": "Experience",
      "nav.hours": "Hours",
      "nav.contact": "Contact",
      "nav.cta": "Call us",
      "nav.callus": "Call 366 742 4992",

      "hero.eyebrow": "Lake-fish takeaway · since 2020",
      "hero.title1": "The taste of the lake,",
      "hero.title2": "right by the lake.",
      "hero.lead": "In Dervio, on the eastern shore of Lake Como, simple and generous cooking: lake fish, traditional ragù and a view that is part of the menu.",
      "hero.ctaMenu": "Discover the menu",
      "hero.ctaWhere": "How to find us",
      "hero.chipReviews": "on Tripadvisor",
      "hero.chipPlace": "Via alla Darsena · facing the lake",
      "hero.chipHours": "Fri evening · Sat-Sun lunch & dinner",

      "story.eyebrow": "Our story",
      "story.title": "A stop on the lake,<br/>the way it used to be.",
      "story.p1": "<em>Sostra</em>, in the Como dialect, is the fishermen's shelter on the shore. That's where our name comes from — and the habit of treating lake fish with the care it deserves: family recipes, local ingredients, no fuss.",
      "story.p2": "You order at the till, sit at the tables overlooking the water and, when it's ready, we call your name. A few dishes, made well, to be enjoyed almost with your feet in the lake.",
      "story.v1.t": "Lake fish",
      "story.v1.p": "Perch, whitefish, bleak. From the lake to the plate.",
      "story.v2.t": "Simple cooking",
      "story.v2.p": "Traditional recipes, careful gestures, honest prices.",
      "story.v3.t": "Lake view",
      "story.v3.p": "Outdoor tables on the dock, facing Mount Legnone.",

      "menu.eyebrow": "The menu",
      "menu.title": "What we cook,<br/>most of the time.",
      "menu.lead": "The menu changes with the season and the catch. These are the dishes you'll most often find.",
      "menu.c1.t": "Lake firsts",
      "menu.c1.i1.n": "Lake-ragù lasagne",
      "menu.c1.i1.d": "Egg pasta sheets, white lake-fish ragù, light béchamel.",
      "menu.c1.i2.n": "Perch risotto",
      "menu.c1.i2.d": "Carnaroli rice, perch fillets browned in butter and sage.",
      "menu.c1.i3.n": "Tagliatelle with lake ragù",
      "menu.c1.i3.d": "Fresh pasta, white ragù, Lario lemon zest.",
      "menu.c1.i4.n": "Valtellina pizzoccheri",
      "menu.c1.i4.d": "Buckwheat pasta, potato, savoy cabbage, Casera cheese, melted butter.",
      "menu.c2.t": "From the lake, to the grill",
      "menu.c2.i1.n": "Mixed lake-fish grill",
      "menu.c2.i1.d": "Whitefish, trout and perch grilled, EVO oil and herbs.",
      "menu.c2.i2.n": "Mixed lake-fish fry",
      "menu.c2.i2.d": "Bleak and missoltini in crisp batter, lemon.",
      "menu.c2.i3.n": "Whitefish in carpione",
      "menu.c2.i3.d": "Marinated with vinegar, onion and bay. Served cold.",
      "menu.c2.i4.n": "Trout fillet with butter",
      "menu.c2.i4.d": "Lake trout, brown butter, toasted almonds.",
      "menu.c3.t": "Quick & tasty",
      "menu.c3.i1.n": "Perch piadina",
      "menu.c3.i1.d": "Fried perch, salad, lemon sauce.",
      "menu.c3.i2.n": "Smoked-trout piadina",
      "menu.c3.i2.d": "Lake-smoked trout, fresh cheese, rocket.",
      "menu.c3.i3.n": "Fish-fry cone",
      "menu.c3.i3.d": "Bleak in a paper cone, to walk along the dock.",
      "menu.c3.i4.n": "Lario board",
      "menu.c3.i4.d": "Local cured meats and cheeses, mostarda, rye bread.",
      "menu.c4.t": "Desserts & cellar",
      "menu.c4.i1.n": "Grandma's apple cake",
      "menu.c4.i1.d": "Renette apples, cinnamon, lightly whipped cream.",
      "menu.c4.i2.n": "House tiramisù",
      "menu.c4.i2.d": "Mascarpone, ladyfingers, espresso.",
      "menu.c4.i3.n": "Glass of Lario white",
      "menu.c4.i3.d": "A selection of local white wines.",
      "menu.c4.i4.n": "Craft beer",
      "menu.c4.i4.d": "Selection from Lario microbreweries.",
      "menu.note": "Prices are indicative and may change with the season. For allergens and intolerances ask at the till.",

      "exp.eyebrow": "The experience",
      "exp.title": "Three steps, one plate, the lake.",
      "exp.s1.t": "Order at the till",
      "exp.s1.p": "No waiters. Pick at the counter, pay and take your number. Quick service, even in summer.",
      "exp.s2.t": "Sit on the lake",
      "exp.s2.p": "Outdoor tables on the dock, view of Mount Legnone. Takeaway too, if you prefer.",
      "exp.s3.t": "We'll call you",
      "exp.s3.p": "The plate arrives steaming when it's ready. You just enjoy the sunset over the Lario.",
      "exp.quoteText": "«An enchanted place to enjoy excellent lake-fish dishes and the best view of Dervio.»",
      "exp.quoteAuthor": "— Review, Tripadvisor",

      "hours.eyebrow": "When we're open",
      "hours.title": "Only on the right days<br/>to be by the lake.",
      "hours.lead": "We open Friday evening through Sunday, season permitting. For groups and special bookings, give us a call at the number below.",
      "hours.mon": "Monday", "hours.tue": "Tuesday", "hours.wed": "Wednesday",
      "hours.thu": "Thursday", "hours.fri": "Friday", "hours.sat": "Saturday", "hours.sun": "Sunday",
      "hours.closed": "Closed",
      "hours.note": "★ Seasonal openings · Always call before a long walk.",

      "contact.eyebrow": "Come and see us",
      "contact.title": "On the Dervio dock.",
      "contact.lead": "On the eastern shore of Lake Como, a few steps from the station and the harbour.",
      "contact.addrT": "Address",
      "contact.addrA": "Open in Maps →",
      "contact.phoneT": "Phone",
      "contact.phoneA": "Call now →",
      "contact.igT": "Instagram",
      "contact.igA": "Follow us →",
      "contact.fbT": "Facebook",
      "contact.fbA": "Visit the page →",

      "footer.tag": "Lake-fish takeaway",
      "footer.about": "Lake cooking and lake view, on the Dervio dock. Open Friday evening and weekends.",
      "footer.h1": "Visit us",
      "footer.h2": "Contact",
      "footer.made": "Site made with care, by the lake."
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
