const supportEmail = "support@radianthealthapp.com";

const assetPaths = {
  heroCharacters: "./assets/hero-characters.png",
  sunCharacter: "./assets/talkingSun.png",
  waterCharacter: "./assets/eatingWaterDropDepth.png",
  appleCharacter: "./assets/appleKarateDepth.png",
  foodLogging: "./assets/food-logging.png",
  exerciseRecovery: "./assets/exercise-recovery.png",
  community: "./assets/community.png",
  testerCharacter: "./assets/talkingSun.png",
};

const navItems = [
  {
    label: "Product",
    children: [
      { label: "Overview", href: "#product" },
      { label: "Dashboard", href: "#dashboard" },
      { label: "Mobile Logging", href: "#real-life" },
    ],
  },
  {
    label: "Features",
    children: [
      { label: "Food Logging", href: "#features" },
      { label: "AI Insights", href: "#insights" },
      { label: "Community", href: "#tester-cta" },
    ],
  },
  { label: "For Coaches", href: "#coaches" },
  { label: "Community", href: "#tester-cta" },
  { label: "Pricing", href: "#final-cta" },
  {
    label: "Resources",
    children: [
      { label: "Privacy Policy", href: "privacyPolicy.html" },
      { label: "Support", href: `mailto:${supportEmail}?subject=Radiant%20support` },
      { label: "What to Expect", href: "#features" },
    ],
  },
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
        return `<a class="site-nav__link" href="${item.href}">${item.label}</a>`;
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
        return `<a class="mobile-nav__link" href="${item.href}">${item.label}</a>`;
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
      <a class="button button--ghost" href="mailto:${supportEmail}?subject=Radiant%20log%20in%20help">Log in</a>
      <a class="button button--primary" href="#download">Get Started</a>
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

function mountContent() {
  document.getElementById("desktop-nav").innerHTML = renderDesktopNav(navItems);
  document.getElementById("mobile-nav").innerHTML = renderMobileNav(navItems);
  document.getElementById("value-grid").innerHTML = renderValueProps(valueProps);
  document.getElementById("feature-grid").innerHTML = renderFeatures(features);
  document.getElementById("benefit-list").innerHTML = renderBenefits(benefits);
  document.getElementById("coach-checklist").innerHTML = renderChecklist(coachChecklist);
  document.getElementById("tester-benefits").innerHTML = renderTesterBenefits(testerBenefits);
  document.getElementById("footer-links").innerHTML = renderFooterColumns(footerColumns);
  document.getElementById("social-links").innerHTML = renderSocials(socials);
  document.getElementById("hero-characters").innerHTML = renderHeroCharacters();
  document.getElementById("dashboard-sun").innerHTML = assetFrame({
    key: "sunCharacter",
    label: "Sun character asset",
    tone: "gold",
    className: "tiny-asset",
    alt: "Sun character placeholder",
  });
  document.getElementById("water-peek").innerHTML = assetFrame({
    key: "waterCharacter",
    label: "Water character asset",
    tone: "blue",
    className: "peek-asset",
    alt: "Water character placeholder",
  });
  document.getElementById("tester-character").innerHTML = assetFrame({
    key: "testerCharacter",
    label: "Tester character asset",
    tone: "gold",
    className: "tester-asset",
    alt: "Tester character placeholder",
  });
  document.getElementById("final-cta-character").innerHTML = assetFrame({
    key: "sunCharacter",
    label: "Sun character asset",
    tone: "gold",
    className: "final-asset",
    alt: "Sun character placeholder",
  });
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

function initApp() {
  mountContent();
  initAssetFallbacks();
  initDesktopDropdowns();
  initMobileMenu();
  initNewsletterForm();
  lucide.createIcons();
}

initApp();
