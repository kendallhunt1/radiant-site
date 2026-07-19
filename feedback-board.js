const FEEDBACK_STORAGE_KEY = "radiant-feedback-board-v1";

const feedbackTypes = [
  {
    id: "feature",
    label: "Feature request",
    description: "Ideas for something new Radiant should build.",
  },
  {
    id: "bug",
    label: "Bug report",
    description: "Something feels broken or inconsistent.",
  },
  {
    id: "ux",
    label: "UX feedback",
    description: "Suggestions about flow, clarity, or design.",
  },
  {
    id: "general",
    label: "General",
    description: "Anything else you want the team to hear.",
  },
];

const feedbackSortOptions = [
  { id: "top", label: "Top" },
  { id: "newest", label: "Newest" },
  { id: "popular", label: "Popular" },
];

function initFeedbackBoard() {
  const shell = document.getElementById("feedback-board-shell");

  if (!shell) {
    return;
  }

  const feedbackForm = document.getElementById("feedback-form");
  const typeGrid = document.getElementById("feedback-type-grid");
  const feedbackList = document.getElementById("feedback-list");
  const sortControls = document.getElementById("feedback-sort-controls");
  const heading = document.getElementById("feedback-heading");
  const subheading = document.getElementById("feedback-subheading");
  const streamNote = document.getElementById("feedback-stream-note");
  const formStatus = document.getElementById("feedback-form-status");

  const state = {
    items: loadFeedbackItems(),
    sort: "top",
    expandedIds: new Set(),
  };

  if (state.items.length > 0) {
    state.expandedIds.add(state.items[0].id);
  }

  renderTypeOptions();
  renderSortControls();
  renderBoard();

  feedbackForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(feedbackForm);
    const type = String(formData.get("type") || feedbackTypes[0].id);
    const description = String(formData.get("description") || "").trim();

    if (!description) {
      formStatus.textContent = "Add a description before posting to the board.";
      const descriptionField = feedbackForm.querySelector("#feedback-description");

      if (descriptionField) {
        descriptionField.focus();
      }

      return;
    }

    const item = {
      id: createId(),
      type,
      description,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      comments: [],
    };

    state.items.unshift(item);
    state.sort = "top";
    state.expandedIds.add(item.id);

    persistFeedbackItems(state.items);

    try {
      await submitSupportEmail({
        subject: "Radiant feedback board submission",
        fields: {
          form_name: "Radiant Feedback Board",
          feedback_type: getTypeLabel(type),
          description,
          submitted_at: formatDateTime(item.createdAt),
          board_item_id: item.id,
        },
      });

      feedbackForm.reset();
      resetDefaultType();
      formStatus.textContent = "Feedback added to the board and emailed to support.";
      renderBoard();
    } catch (error) {
      formStatus.textContent = "Feedback was added to the board, but the support email could not be sent yet.";
      renderBoard();
    }
  });

  sortControls.addEventListener("click", (event) => {
    const button = event.target.closest("[data-sort]");

    if (!button) {
      return;
    }

    state.sort = button.dataset.sort;
    renderBoard();
  });

  feedbackList.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action]");

    if (!actionButton) {
      return;
    }

    const { action, id } = actionButton.dataset;
    const item = state.items.find((entry) => entry.id === id);

    if (!item) {
      return;
    }

    if (action === "toggle") {
      if (state.expandedIds.has(id)) {
        state.expandedIds.delete(id);
      } else {
        state.expandedIds.add(id);
      }

      renderBoard();
      return;
    }

    if (action === "upvote") {
      item.upvotes += 1;
      persistFeedbackItems(state.items);
      renderBoard();
      return;
    }

    if (action === "downvote") {
      item.downvotes += 1;
      persistFeedbackItems(state.items);
      renderBoard();
    }
  });

  feedbackList.addEventListener("submit", (event) => {
    const commentForm = event.target.closest(".feedback-comment-form");

    if (!commentForm) {
      return;
    }

    event.preventDefault();

    const { id } = commentForm.dataset;
    const item = state.items.find((entry) => entry.id === id);
    const input = commentForm.querySelector("textarea");
    const text = input ? input.value.trim() : "";

    if (!item || !input) {
      return;
    }

    if (!text) {
      input.focus();
      return;
    }

    item.comments.push({
      id: createId(),
      text,
      createdAt: new Date().toISOString(),
    });

    state.expandedIds.add(id);
    persistFeedbackItems(state.items);
    renderBoard();
  });

  function renderTypeOptions() {
    typeGrid.innerHTML = feedbackTypes
      .map(
        (type, index) => `
          <label class="feedback-type-option">
            <input type="radio" name="type" value="${type.id}" ${index === 0 ? "checked" : ""} />
            <span class="feedback-type-option__card">
              <strong>${type.label}</strong>
              <span>${type.description}</span>
            </span>
          </label>
        `,
      )
      .join("");
  }

  function renderSortControls() {
    sortControls.innerHTML = feedbackSortOptions
      .map(
        (option) => `
          <button
            class="feedback-sort-button${state.sort === option.id ? " is-active" : ""}"
            type="button"
            data-sort="${option.id}"
          >
            ${option.label}
          </button>
        `,
      )
      .join("");
  }

  function renderBoard() {
    const hasItems = state.items.length > 0;
    const sortedItems = sortFeedbackItems(state.items, state.sort);

    shell.classList.toggle("is-empty", !hasItems);
    shell.classList.toggle("has-items", hasItems);

    heading.textContent = hasItems ? "Get in the conversation." : "Get the conversation started.";
    subheading.textContent = hasItems
      ? "Vote on what matters most, expand posts for context, and keep the discussion moving with comments."
      : "Share feature ideas, bugs, and product feedback. Vote on what matters most and add context with comments.";
    streamNote.textContent = hasItems
      ? `${state.items.length} item${state.items.length === 1 ? "" : "s"} on the board`
      : "";

    if (hasItems && state.expandedIds.size === 0) {
      state.expandedIds.add(sortedItems[0].id);
    }

    renderSortControls();
    feedbackList.innerHTML = hasItems
      ? sortedItems.map((item) => renderFeedbackItem(item, state.expandedIds.has(item.id))).join("")
      : "";

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function renderFeedbackItem(item, isExpanded) {
    const preview = getPreviewText(item.description);
    const commentCount = item.comments.length;

    return `
      <article class="feedback-panel feedback-card">
        <div class="feedback-card__top">
          <button
            class="feedback-card__toggle"
            type="button"
            data-action="toggle"
            data-id="${item.id}"
            aria-expanded="${String(isExpanded)}"
          >
            <div class="feedback-card__meta">
              <span class="feedback-type-pill">${escapeHtml(getTypeLabel(item.type))}</span>
              <span>${formatDate(item.createdAt)}</span>
              <span>${commentCount} comment${commentCount === 1 ? "" : "s"}</span>
            </div>
            <p class="feedback-card__summary">${escapeHtml(preview)}</p>
            <span class="feedback-card__toggle-row">
              ${isExpanded ? "Hide details" : "View details"}
              <i data-lucide="${isExpanded ? "chevron-up" : "chevron-down"}" aria-hidden="true"></i>
            </span>
          </button>

          <div class="feedback-card__votes" aria-label="Vote controls">
            <button class="feedback-vote-button" type="button" data-action="upvote" data-id="${item.id}">
              <strong>${item.upvotes}</strong>
              <i data-lucide="arrow-up" aria-hidden="true"></i>
            </button>
            <button class="feedback-vote-button" type="button" data-action="downvote" data-id="${item.id}">
              <strong>${item.downvotes}</strong>
              <i data-lucide="arrow-down" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div class="feedback-card__body" ${isExpanded ? "" : "hidden"}>
          <section class="feedback-card__description">
            <h3>Description</h3>
            <p>${formatMultiline(item.description)}</p>
          </section>

          <section class="feedback-comments" aria-label="Comments">
            <div class="feedback-comments__header">
              <h3>Comments</h3>
              <span class="feedback-comments__count">${commentCount} total</span>
            </div>

            ${
              commentCount > 0
                ? `
                  <div class="feedback-comments__list">
                    ${item.comments
                      .map(
                        (comment) => `
                          <article class="feedback-comment-item">
                            <span>${formatDate(comment.createdAt)}</span>
                            <p>${formatMultiline(comment.text)}</p>
                          </article>
                        `,
                      )
                      .join("")}
                  </div>
                `
                : '<p class="feedback-empty-note">No comments yet. Be the first to add context.</p>'
            }

            <form class="feedback-comment-form" data-id="${item.id}">
              <label class="sr-only" for="comment-${item.id}">Add a comment</label>
              <textarea
                class="feedback-comment-input"
                id="comment-${item.id}"
                name="comment"
                placeholder="Add a comment"
                required
              ></textarea>
              <button class="button button--nav-outline button--compact" type="submit">Comment</button>
            </form>
          </section>
        </div>
      </article>
    `;
  }

  function resetDefaultType() {
    const defaultTypeInput = feedbackForm.querySelector('input[name="type"]');

    if (defaultTypeInput) {
      defaultTypeInput.checked = true;
    }
  }
}

function loadFeedbackItems() {
  try {
    const raw = window.localStorage.getItem(FEEDBACK_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map(normalizeFeedbackItem).filter(Boolean);
  } catch (error) {
    return [];
  }
}

function normalizeFeedbackItem(item) {
  if (!item || typeof item !== "object") {
    return null;
  }

  const description = typeof item.description === "string" ? item.description.trim() : "";

  if (!description) {
    return null;
  }

  return {
    id: typeof item.id === "string" ? item.id : createId(),
    type: feedbackTypes.some((type) => type.id === item.type) ? item.type : feedbackTypes[0].id,
    description,
    createdAt: typeof item.createdAt === "string" ? item.createdAt : new Date().toISOString(),
    upvotes: Number.isFinite(item.upvotes) ? Math.max(0, item.upvotes) : 0,
    downvotes: Number.isFinite(item.downvotes) ? Math.max(0, item.downvotes) : 0,
    comments: Array.isArray(item.comments)
      ? item.comments
          .map((comment) => normalizeComment(comment))
          .filter(Boolean)
      : [],
  };
}

function normalizeComment(comment) {
  if (!comment || typeof comment !== "object") {
    return null;
  }

  const text = typeof comment.text === "string" ? comment.text.trim() : "";

  if (!text) {
    return null;
  }

  return {
    id: typeof comment.id === "string" ? comment.id : createId(),
    text,
    createdAt: typeof comment.createdAt === "string" ? comment.createdAt : new Date().toISOString(),
  };
}

function persistFeedbackItems(items) {
  try {
    window.localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    return;
  }
}

function sortFeedbackItems(items, sort) {
  const sorted = [...items];

  if (sort === "newest") {
    return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  if (sort === "popular") {
    return sorted.sort((a, b) => {
      const scoreDifference = getPopularityScore(b) - getPopularityScore(a);

      if (scoreDifference !== 0) {
        return scoreDifference;
      }

      return b.upvotes - a.upvotes;
    });
  }

  return sorted.sort((a, b) => {
    if (b.upvotes !== a.upvotes) {
      return b.upvotes - a.upvotes;
    }

    if (a.downvotes !== b.downvotes) {
      return a.downvotes - b.downvotes;
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

function getPopularityScore(item) {
  return item.upvotes * 3 - item.downvotes + item.comments.length * 2;
}

function getTypeLabel(typeId) {
  const match = feedbackTypes.find((type) => type.id === typeId);
  return match ? match.label : "General";
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function getPreviewText(text) {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (normalized.length <= 170) {
    return normalized;
  }

  return `${normalized.slice(0, 167).trimEnd()}...`;
}

function formatMultiline(text) {
  return escapeHtml(text).replace(/\n/g, "<br />");
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `feedback-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

initFeedbackBoard();
