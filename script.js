const supportEmail = "support@radianthealthapp.com";
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navCtaHref = currentPage === "index.html" ? "#final-cta" : "index.html#final-cta";
const supportFormEndpoint = `https://formsubmit.co/ajax/${supportEmail}`;

const assetPaths = {
  sunCharacter: "./assets/talkingSun.png",
  waterCharacter: "./assets/eatingWaterDropDepth.png",
  appleCharacter: "./assets/appleKarateDepth.png",
  globeCharacters: "./assets/globeCharacters.png",
  foodLogging: "./assets/food-logging.png",
  exerciseRecovery: "./assets/exercise-recovery.png",
  community: "./assets/community.png",
  testerCharacter: "./assets/talkingSun.png",
  widgetSleep: "./assets/globeWidgetSleep.png",
  widgetWater: "./assets/globeWidgetWater.png",
  widgetNutrition: "./assets/globeWidgetNutrition.png",
  widgetScore: "./assets/globeWidgetScore.png",
  widgetMood: "./assets/globeWidgetMood.png",
  widgetMovement: "./assets/globeWidgetMovement.png",
  widgetMindfulness: "./assets/globeWidgetMindfulness.png",
  widgetHeart: "./assets/globeWidgetHeart.png",
  widgetInsights: "./assets/globeWidgetInsights.png",
  widgetEnergy: "./assets/globeWidgetEnergy.png",
};

const navItems = [
  { label: "Product", href: "#" },
  { label: "Science", href: "#" },
  { label: "About", href: "#" },
  { label: "Feedback board", href: "feedback-board.html" },
  { label: "Become a Tester", href: "become-a-tester.html" },
];

function getNavLinkAttributes(item) {
  const isCurrentPage = item.href !== "#" && item.href === currentPage;

  return isCurrentPage
    ? ' class="site-nav__link site-nav__link--active" aria-current="page"'
    : ' class="site-nav__link"';
}

const orbitalWidgets = [
  { title: "Sleep", assetKey: "widgetSleep", tone: "lavender", x: "6px", y: "-164px", width: "138px", rotate: "-4deg" },
  { title: "Water", assetKey: "widgetWater", tone: "blue", x: "167px", y: "-112px", width: "118px", rotate: "-5deg" },
  { title: "Nutrition", assetKey: "widgetNutrition", tone: "sage", x: "-162px", y: "-92px", width: "104px", rotate: "-7deg" },
  { title: "Wellness Score", assetKey: "widgetScore", tone: "gold", x: "0px", y: "-2px", width: "116px", rotate: "-1deg" },
  { title: "Mood", assetKey: "widgetMood", tone: "sage", x: "-154px", y: "30px", width: "110px", rotate: "2deg" },
  { title: "Movement", assetKey: "widgetMovement", tone: "blue", x: "126px", y: "22px", width: "128px", rotate: "3deg" },
  { title: "Mindfulness", assetKey: "widgetMindfulness", tone: "lavender", x: "112px", y: "132px", width: "96px", rotate: "-2deg" },
  { title: "Heart Rate", assetKey: "widgetHeart", tone: "warm", x: "8px", y: "148px", width: "132px", rotate: "-5deg" },
  { title: "Insights", assetKey: "widgetInsights", tone: "warm", x: "-114px", y: "132px", width: "106px", rotate: "4deg" },
  { title: "Energy", assetKey: "widgetEnergy", tone: "gold", x: "194px", y: "72px", width: "82px", rotate: "4deg" },
];

const valueProps = [
  {
    icon: "shield-check",
    title: "Privacy First",
    description: "Your data stays yours. Always encrypted. Never sold.",
  },
  {
    icon: "gift",
    title: "Free Core Tracking",
    description: "Nutrition, activity, sleep, water, and more. Free forever.",
  },
  {
    icon: "sparkles",
    title: "AI Insights",
    description: "Personalized coaching and insights that help you improve every day.",
  },
  {
    icon: "heart",
    title: "Community Support",
    description: "Join groups, share wins, and stay motivated together.",
  },
];

const features = [
  {
    title: "Food Logging",
    description: "Log meals in seconds with our scanner, AI guide, and smart suggestions.",
    href: "#real-life",
    visual: "asset",
    assetKey: "foodLogging",
    assetLabel: "Food logging asset",
    tone: "warm",
  },
  {
    title: "Exercise & Recovery",
    description: "Track workouts, calories burned, and recovery to build consistency.",
    href: "#features",
    visual: "asset",
    assetKey: "exerciseRecovery",
    assetLabel: "Exercise and recovery asset",
    tone: "gold",
  },
  {
    title: "AI Coach",
    description: "Get personalized tips, habit nudges, and daily encouragement.",
    href: "#insights",
    visual: "asset",
    assetKey: "sunCharacter",
    assetLabel: "Sun character asset",
    tone: "lavender",
  },
  {
    title: "Insights & Trends",
    description: "Beautiful analytics that turn your data into actionable progress.",
    href: "#insights",
    visual: "chart",
  },
  {
    title: "Community",
    description: "Join groups, share meals, celebrate wins, and stay accountable.",
    href: "#tester-cta",
    visual: "asset",
    assetKey: "community",
    assetLabel: "Community asset",
    tone: "sage",
  },
];

const benefits = [
  {
    icon: "shield-check",
    title: "Quick logging",
    description: "Add meals, water, or workouts in seconds.",
  },
  {
    icon: "wand-sparkles",
    title: "Smart automation",
    description: "We learn your patterns and save time.",
  },
  {
    icon: "smartphone",
    title: "Works everywhere",
    description: "Web, iOS, and Android, always in sync.",
  },
];

const coachChecklist = [
  "Track key metrics over time.",
  "Identify trends and patterns.",
  "Share insights securely.",
  "Empower your clients.",
];

const testerBenefits = [
  "Early feature access",
  "Direct product feedback",
  "Help improve Radiant",
];

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#final-cta" },
      { label: "What’s New", href: "#tester-cta" },
      { label: "Roadmap", href: "#coaches" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#top" },
      { label: "Careers", href: `mailto:${supportEmail}?subject=Radiant%20careers` },
      { label: "Contact", href: `mailto:${supportEmail}?subject=Radiant%20contact` },
      { label: "Press Kit", href: `mailto:${supportEmail}?subject=Radiant%20press%20kit` },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", href: `mailto:${supportEmail}?subject=Radiant%20help%20center` },
      { label: "Blog", href: "#insights" },
      { label: "Guides", href: "#real-life" },
      { label: "Privacy", href: "privacyPolicy.html" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: `mailto:${supportEmail}?subject=Radiant%20terms` },
      { label: "Privacy Policy", href: "privacyPolicy.html" },
      { label: "Security", href: "privacyPolicy.html" },
      { label: "Cookies", href: `mailto:${supportEmail}?subject=Radiant%20cookies` },
    ],
  },
];

const socials = [
  { icon: "camera", label: "Instagram", href: `mailto:${supportEmail}?subject=Radiant%20Instagram` },
  { icon: "music-2", label: "TikTok", href: `mailto:${supportEmail}?subject=Radiant%20TikTok` },
  { icon: "send", label: "X", href: `mailto:${supportEmail}?subject=Radiant%20X` },
  { icon: "play", label: "YouTube", href: `mailto:${supportEmail}?subject=Radiant%20YouTube` },
];

function renderDesktopNav(items) {
  return items
    .map((item) => {
      if (!item.children) {
        return `<a${getNavLinkAttributes(item)} href="${item.href}">${item.label}</a>`;
      }

      const childLinks = item.children
        .map(
          (child) => `
            <a class="dropdown-menu__link" href="${child.href}">
              ${child.label}
            </a>
          `,
        )
        .join("");

      return `
        <details class="nav-dropdown">
          <summary class="site-nav__link">
            ${item.label}
            <i data-lucide="chevron-down"></i>
          </summary>
          <div class="dropdown-menu">
            ${childLinks}
          </div>
        </details>
      `;
    })
    .join("");
}

function renderMobileNav(items) {
  const navList = items
    .map((item) => {
      if (!item.children) {
        const currentPageAttributes =
          item.href !== "#" && item.href === currentPage ? ' aria-current="page"' : "";

        return `<a class="mobile-nav__link" href="${item.href}"${currentPageAttributes}>${item.label}</a>`;
      }

      const childLinks = item.children
        .map(
          (child) => `
            <a class="mobile-nav__sublink" href="${child.href}">
              ${child.label}
            </a>
          `,
        )
        .join("");

      return `
        <details class="mobile-nav__group">
          <summary class="mobile-nav__link">
            ${item.label}
            <i data-lucide="chevron-down"></i>
          </summary>
          <div class="mobile-nav__subgroup">
            ${childLinks}
          </div>
        </details>
      `;
    })
    .join("");

  return `
    ${navList}
    <div class="mobile-nav__actions">
      <a class="button button--nav-outline" href="${navCtaHref}">Get Started</a>
    </div>
  `;
}

function assetFrame({ key, label, tone, className = "", alt = label }) {
  const src = assetPaths[key];

  return `
    <span
      class="asset-fallback ${className}"
      data-asset-key="${key}"
      data-tone="${tone}"
      data-label="${label}"
    >
      <img src="${src}" alt="${alt}" loading="lazy" decoding="async" />
      <span class="asset-placeholder">
        <span class="asset-placeholder__swatch"></span>
        <span class="asset-placeholder__label">${label}</span>
      </span>
    </span>
  `;
}

function renderValueProps(items) {
  return items
    .map(
      (item, index) => `
        <article class="value-prop${index < items.length - 1 ? " value-prop--divided" : ""}">
          <span class="value-prop__icon" aria-hidden="true">
            <i data-lucide="${item.icon}"></i>
          </span>
          <div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderFeatureVisual(feature) {
  if (feature.visual === "asset") {
    return assetFrame({
      key: feature.assetKey,
      label: feature.assetLabel,
      tone: feature.tone,
      className: "feature-asset",
      alt: feature.assetLabel,
    });
  }

  return `
    <div class="feature-chart" aria-hidden="true">
      <span class="feature-chart__dot feature-chart__dot--one"></span>
      <span class="feature-chart__dot feature-chart__dot--two"></span>
      <svg viewBox="0 0 220 90">
        <path d="M10 60 C38 16, 68 18, 96 44 S144 78, 168 52 S194 14, 210 20" />
      </svg>
    </div>
  `;
}

function renderFeatures(items) {
  return items
    .map(
      (feature) => `
        <article class="feature-card">
          <div class="feature-card__media">
            ${renderFeatureVisual(feature)}
          </div>
          <div class="feature-card__body">
            <h3>${feature.title}</h3>
            <p>${feature.description}</p>
            <a class="text-link" href="${feature.href}">Learn more</a>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderBenefits(items) {
  return items
    .map(
      (item) => `
        <article class="benefit-row">
          <span class="benefit-row__icon" aria-hidden="true">
            <i data-lucide="${item.icon}"></i>
          </span>
          <div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderChecklist(items) {
  return items
    .map(
      (item) => `
        <div class="check-row">
          <span aria-hidden="true">
            <i data-lucide="check"></i>
          </span>
          <p>${item}</p>
        </div>
      `,
    )
    .join("");
}

function renderTesterBenefits(items) {
  return items
    .map(
      (item) => `
        <span class="tester-benefit-pill">
          <i data-lucide="sparkles" aria-hidden="true"></i>
          ${item}
        </span>
      `,
    )
    .join("");
}

function renderFooterColumns(columns) {
  return columns
    .map(
      (column) => `
        <div class="footer-column">
          <h3>${column.title}</h3>
          ${column.links
            .map((link) => `<a href="${link.href}">${link.label}</a>`)
            .join("")}
        </div>
      `,
    )
    .join("");
}

function renderSocials(items) {
  return items
    .map(
      (item) => `
        <a class="social-link" href="${item.href}" aria-label="${item.label}">
          <i data-lucide="${item.icon}"></i>
        </a>
      `,
    )
    .join("");
}

function renderHeroCharacters() {
  return `
    <div class="character-row">
      ${assetFrame({
        key: "appleCharacter",
        label: "Apple character asset",
        tone: "sage",
        className: "character-badge character-badge--apple",
        alt: "Apple character placeholder",
      })}
      ${assetFrame({
        key: "sunCharacter",
        label: "Sun character asset",
        tone: "gold",
        className: "character-badge character-badge--sun",
        alt: "Sun character placeholder",
      })}
      ${assetFrame({
        key: "waterCharacter",
        label: "Water character asset",
        tone: "blue",
        className: "character-badge character-badge--water",
        alt: "Water character placeholder",
      })}
    </div>
  `;
}

function renderHeroCast() {
  return assetFrame({
    key: "globeCharacters",
    label: "Globe characters asset",
    tone: "warm",
    className: "hero-cast__asset",
    alt: "Radiant characters looking at the wellness globe",
  });
}

function renderOrbitalWidgets(items) {
  return items
    .map(
      (item) => `
        <article
          class="orbital-widget"
          style="--widget-x: ${item.x}; --widget-y: ${item.y}; --widget-width: ${item.width}; --widget-rotate: ${item.rotate};"
        >
          <p class="orbital-widget__title">${item.title}</p>
          ${assetFrame({
            key: item.assetKey,
            label: `${item.title} widget asset`,
            tone: item.tone,
            className: "orbital-widget__asset",
            alt: `${item.title} widget placeholder`,
          })}
        </article>
      `,
    )
    .join("");
}

function mountContent() {
  const setHTML = (id, html) => {
    const element = document.getElementById(id);

    if (element) {
      element.innerHTML = html;
    }
  };

  setHTML("desktop-nav", renderDesktopNav(navItems));
  setHTML("mobile-nav", renderMobileNav(navItems));
  setHTML("value-grid", renderValueProps(valueProps));
  setHTML("feature-grid", renderFeatures(features));
  setHTML("benefit-list", renderBenefits(benefits));
  setHTML("coach-checklist", renderChecklist(coachChecklist));
  setHTML("tester-benefits", renderTesterBenefits(testerBenefits));
  setHTML("footer-links", renderFooterColumns(footerColumns));
  setHTML("social-links", renderSocials(socials));
  setHTML("hero-cast", renderHeroCast());
  setHTML("orbital-widgets", renderOrbitalWidgets(orbitalWidgets));
  setHTML(
    "dashboard-sun",
    assetFrame({
      key: "sunCharacter",
      label: "Sun character asset",
      tone: "gold",
      className: "tiny-asset",
      alt: "Sun character placeholder",
    }),
  );
  setHTML(
    "water-peek",
    assetFrame({
      key: "waterCharacter",
      label: "Water character asset",
      tone: "blue",
      className: "peek-asset",
      alt: "Water character placeholder",
    }),
  );
  setHTML(
    "tester-character",
    assetFrame({
      key: "testerCharacter",
      label: "Tester character asset",
      tone: "gold",
      className: "tester-asset",
      alt: "Tester character placeholder",
    }),
  );
  setHTML(
    "final-cta-character",
    assetFrame({
      key: "sunCharacter",
      label: "Sun character asset",
      tone: "gold",
      className: "final-asset",
      alt: "Sun character placeholder",
    }),
  );
}

function initAssetFallbacks() {
  document.querySelectorAll(".asset-fallback").forEach((frame) => {
    const img = frame.querySelector("img");

    const showImage = () => {
      frame.classList.add("is-loaded");
    };

    const showPlaceholder = () => {
      frame.classList.remove("is-loaded");
    };

    img.addEventListener("load", showImage, { once: true });
    img.addEventListener("error", showPlaceholder, { once: true });

    if (img.complete && img.naturalWidth > 0) {
      showImage();
    } else {
      showPlaceholder();
    }
  });
}

function initDesktopDropdowns() {
  const dropdowns = Array.from(document.querySelectorAll(".nav-dropdown"));

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("toggle", () => {
      if (!dropdown.open) {
        return;
      }

      dropdowns.forEach((other) => {
        if (other !== dropdown) {
          other.open = false;
        }
      });
    });
  });

  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.open = false;
      }
    });
  });
}

function initMobileMenu() {
  const menuButton = document.querySelector(".menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (!menuButton || !mobileMenu) {
    return;
  }

  function setMenuState(isOpen) {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.hidden = !isOpen;
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.innerHTML = isOpen
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';
    lucide.createIcons();
  }

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuState(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
      document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
        dropdown.open = false;
      });
    }
  });
}

function initNewsletterForm() {
  const form = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("newsletter-email");
  const status = document.getElementById("newsletter-status");

  if (!form || !emailInput || !status) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!emailInput.checkValidity()) {
      status.textContent = "Enter a valid email address to continue.";
      emailInput.focus();
      return;
    }

    const email = encodeURIComponent(emailInput.value.trim());
    status.textContent = "Opening your email app to finish the request.";
    window.location.href = `mailto:${supportEmail}?subject=Radiant%20newsletter&body=Please%20add%20${email}%20to%20the%20Radiant%20newsletter.`;
  });
}

async function submitSupportEmail({ subject, fields, replyTo }) {
  const payload = {
    _subject: subject,
    _template: "table",
    _url: window.location.href,
    ...fields,
  };

  if (replyTo) {
    payload._replyto = replyTo;
  }

  const response = await fetch(supportFormEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      typeof data?.message === "string"
        ? data.message
        : "Unable to deliver the submission email right now.";

    throw new Error(message);
  }

  return data;
}

function initApp() {
  mountContent();
  initAssetFallbacks();
  initDesktopDropdowns();
  initMobileMenu();
  initNewsletterForm();
  if (window.lucide) {
    lucide.createIcons();
  }
}

initApp();
