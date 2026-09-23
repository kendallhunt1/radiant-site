const TESTER_APPLICATIONS_STORAGE_KEY = "radiant-tester-applications-v1";
const TESTER_APPLICATION_DRAFT_STORAGE_KEY = "radiant-tester-application-draft-v1";
const TESTER_APPLICATION_SUBMIT_ENDPOINT = "https://formsubmit.co/support@radianthealthapp.com";

function initTesterApplication() {
  const form = document.getElementById("tester-application-form");

  if (!form) {
    return;
  }

  const status = document.getElementById("tester-form-status");
  const submitButton = document.getElementById("tester-submit-button");
  const submitButtonText = submitButton?.querySelector(".tester-submit-button__text");
  const usedOtherAppsInputs = Array.from(form.querySelectorAll('input[name="usedOtherApps"]'));
  const otherAppsField = document.getElementById("tester-other-apps");
  const healthProfessionalCheckbox = document.getElementById("tester-health-professional");
  const professionalPanel = document.getElementById("tester-professional-panel");
  const professionalTypeField = document.getElementById("tester-professional-type");
  const organizationNameField = document.getElementById("tester-organization-name");
  const organizationRoleField = document.getElementById("tester-organization-role");
  const professionalDocumentationField = document.getElementById("tester-professional-documentation");
  const usesClientAppsInputs = Array.from(form.querySelectorAll('input[name="usesClientApps"]'));
  const clientAppsFieldWrapper = document.getElementById("tester-client-apps-field");
  const clientAppsField = document.getElementById("tester-client-apps");
  const infoButton = document.getElementById("health-professional-info-button");
  const dialog = document.getElementById("health-professional-dialog");
  const dialogCloseButton = document.getElementById("health-professional-dialog-close");
  const nativeEmailFields = [];
  let hasAttemptedSubmit = false;

  function setStatus(message, type = "") {
    status.textContent = message;
    status.classList.toggle("is-error", type === "error");
    status.classList.toggle("is-success", type === "success");
  }

  function setSubmitLoading(isLoading) {
    if (!submitButton) {
      return;
    }

    submitButton.disabled = isLoading;
    submitButton.classList.toggle("is-loading", isLoading);
    submitButton.setAttribute("aria-busy", String(isLoading));

    if (submitButtonText) {
      submitButtonText.textContent = isLoading ? "Submitting..." : "Apply to be a tester";
    }
  }

  function getValidatedControls() {
    return Array.from(form.querySelectorAll("input, select, textarea")).filter(
      (control) => !control.disabled,
    );
  }

  function syncInvalidHighlights({ focusFirst = false } = {}) {
    clearInvalidHighlights();

    const invalidControls = getValidatedControls().filter((control) => !control.validity.valid);

    invalidControls.forEach((control) => {
      control.closest(".tester-field")?.classList.add("is-invalid");
    });

    if (focusFirst && invalidControls[0]) {
      invalidControls[0].focus({ preventScroll: false });
    }

    return invalidControls.length === 0;
  }

  function clearInvalidHighlights() {
    form.querySelectorAll(".tester-field.is-invalid").forEach((field) => {
      field.classList.remove("is-invalid");
    });
  }

  function refreshInvalidHighlightsAfterChange() {
    if (hasAttemptedSubmit) {
      syncInvalidHighlights();
    }
  }

  function getDraftControls() {
    return Array.from(form.querySelectorAll("input, select, textarea")).filter((control) => {
      return control.name && control.type !== "file" && control.type !== "hidden";
    });
  }

  function saveDraft() {
    try {
      const draft = {};

      getDraftControls().forEach((control) => {
        if (control.type === "checkbox") {
          draft[control.name] = control.checked;
          return;
        }

        if (control.type === "radio") {
          if (control.checked) {
            draft[control.name] = control.value;
          }
          return;
        }

        draft[control.name] = control.value;
      });

      window.sessionStorage.setItem(TESTER_APPLICATION_DRAFT_STORAGE_KEY, JSON.stringify(draft));
    } catch (error) {
      return;
    }
  }

  function restoreDraft() {
    try {
      const raw = window.sessionStorage.getItem(TESTER_APPLICATION_DRAFT_STORAGE_KEY);
      const draft = raw ? JSON.parse(raw) : {};

      if (!draft || typeof draft !== "object") {
        return;
      }

      getDraftControls().forEach((control) => {
        if (!Object.prototype.hasOwnProperty.call(draft, control.name)) {
          return;
        }

        if (control.type === "checkbox") {
          control.checked = Boolean(draft[control.name]);
          return;
        }

        if (control.type === "radio") {
          control.checked = draft[control.name] === control.value;
          return;
        }

        control.value = String(draft[control.name] || "");
      });
    } catch (error) {
      return;
    }
  }

  function clearDraft() {
    try {
      window.sessionStorage.removeItem(TESTER_APPLICATION_DRAFT_STORAGE_KEY);
    } catch (error) {
      return;
    }
  }

  function clearNativeEmailFields() {
    while (nativeEmailFields.length > 0) {
      nativeEmailFields.pop().remove();
    }
  }

  function appendNativeEmailField(name, value) {
    const input = document.createElement("input");

    input.type = "hidden";
    input.name = name;
    input.value = value;
    input.dataset.nativeEmailField = "true";
    form.prepend(input);
    nativeEmailFields.push(input);
  }

  function getSubmissionReturnUrl() {
    const returnUrl = new URL(window.location.href);

    returnUrl.searchParams.set("testerApplication", "submitted");
    return returnUrl.toString();
  }

  function getApplicantReviewMessage(application) {
    const greetingName = application.firstName || "there";

    return [
      `Hi ${greetingName},`,
      "",
      "Thank you for applying to become a Radiant tester. We are grateful for your application, and it is now in review.",
      "",
      "When a decision has been reached, we will email you again. If you are chosen, that email will include instructions for the next steps.",
      "",
      "Thank you again for your interest in helping shape Radiant.",
      "",
      "The Radiant team",
    ].join("\n");
  }

  function submitWithFormsubmit(application) {
    clearNativeEmailFields();
    appendNativeEmailField("_subject", "Radiant tester application");
    appendNativeEmailField("_template", "table");
    appendNativeEmailField("_replyto", application.email);
    appendNativeEmailField("_url", window.location.href);
    appendNativeEmailField("_next", getSubmissionReturnUrl());
    appendNativeEmailField("_autoresponse", getApplicantReviewMessage(application));
    appendNativeEmailField("form_name", "Radiant Tester Application");
    appendNativeEmailField("application_id", application.id);
    appendNativeEmailField("submitted_at", formatTesterDateTime(application.submittedAt));
    appendNativeEmailField(
      "professional_documentation_file_names",
      application.professionalDocumentation.join(", ") || "N/A",
    );

    form.action = TESTER_APPLICATION_SUBMIT_ENDPOINT;
    form.method = "POST";
    form.enctype = "multipart/form-data";
    HTMLFormElement.prototype.submit.call(form);
  }

  function showReturnedSubmissionStatus() {
    const currentUrl = new URL(window.location.href);

    if (currentUrl.searchParams.get("testerApplication") !== "submitted") {
      return;
    }

    currentUrl.searchParams.delete("testerApplication");
    window.history.replaceState(null, "", `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`);
    clearDraft();
    setStatus("Application submitted! We'll get back with you shortly.", "success");
  }

  function syncOtherAppsRequirement() {
    const selectedValue = form.querySelector('input[name="usedOtherApps"]:checked')?.value;
    const isRequired = selectedValue === "yes";

    otherAppsField.required = isRequired;
    otherAppsField.disabled = !isRequired;

    if (!isRequired) {
      otherAppsField.setCustomValidity("");
    }

    refreshInvalidHighlightsAfterChange();
  }

  usedOtherAppsInputs.forEach((input) => {
    input.addEventListener("change", syncOtherAppsRequirement);
  });

  syncOtherAppsRequirement();

  function syncProfessionalRequirements() {
    const isHealthProfessional = Boolean(healthProfessionalCheckbox?.checked);
    const selectedClientAppsValue = form.querySelector('input[name="usesClientApps"]:checked')?.value;
    const requiresClientAppsDetail = isHealthProfessional && selectedClientAppsValue === "yes";
    const professionalFields = [
      professionalTypeField,
      organizationNameField,
      organizationRoleField,
      professionalDocumentationField,
      clientAppsField,
      ...usesClientAppsInputs,
    ].filter(Boolean);

    professionalPanel.classList.toggle("is-locked", !isHealthProfessional);
    professionalPanel.setAttribute("aria-disabled", String(!isHealthProfessional));
    professionalTypeField.required = isHealthProfessional;
    professionalDocumentationField.required = isHealthProfessional;

    professionalFields.forEach((field) => {
      field.disabled = !isHealthProfessional;
    });

    usesClientAppsInputs.forEach((input) => {
      input.required = isHealthProfessional;
    });

    if (clientAppsFieldWrapper) {
      clientAppsFieldWrapper.hidden = !requiresClientAppsDetail;
    }
    clientAppsField.required = requiresClientAppsDetail;
    clientAppsField.disabled = !isHealthProfessional || !requiresClientAppsDetail;

    if (!requiresClientAppsDetail) {
      clientAppsField.setCustomValidity("");
    }

    if (!isHealthProfessional) {
      professionalDocumentationField.setCustomValidity("");
    }

    refreshInvalidHighlightsAfterChange();
  }

  if (healthProfessionalCheckbox) {
    healthProfessionalCheckbox.addEventListener("change", syncProfessionalRequirements);
  }

  usesClientAppsInputs.forEach((input) => {
    input.addEventListener("change", syncProfessionalRequirements);
  });

  syncProfessionalRequirements();

  if (dialog && infoButton && dialogCloseButton) {
    infoButton.addEventListener("click", () => {
      dialog.showModal();

      if (window.lucide) {
        lucide.createIcons();
      }
    });

    dialogCloseButton.addEventListener("click", () => {
      dialog.close();
    });

    dialog.addEventListener("click", (event) => {
      const dialogRect = dialog.getBoundingClientRect();
      const isInside =
        event.clientX >= dialogRect.left &&
        event.clientX <= dialogRect.right &&
        event.clientY >= dialogRect.top &&
        event.clientY <= dialogRect.bottom;

      if (!isInside) {
        dialog.close();
      }
    });
  }

  restoreDraft();
  syncOtherAppsRequirement();
  syncProfessionalRequirements();
  showReturnedSubmissionStatus();

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    syncOtherAppsRequirement();
    syncProfessionalRequirements();

    hasAttemptedSubmit = true;
    syncInvalidHighlights({ focusFirst: true });

    if (!form.reportValidity()) {
      setStatus("Complete every required field before submitting.", "error");
      return;
    }

    setSubmitLoading(true);
    setStatus("Submitting your application...", "");

    const formData = new FormData(form);
    const professionalDocumentationFiles = Array.from(professionalDocumentationField.files || []);
    const application = {
      id: createTesterApplicationId(),
      submittedAt: new Date().toISOString(),
      firstName: String(formData.get("firstName") || "").trim(),
      lastName: String(formData.get("lastName") || "").trim(),
      age: String(formData.get("age") || "").trim(),
      gender: String(formData.get("gender") || "").trim(),
      activityLevel: String(formData.get("activityLevel") || "").trim(),
      currentlyLogs: String(formData.get("currentlyLogs") || "").trim(),
      usedOtherApps: String(formData.get("usedOtherApps") || "").trim(),
      otherApps: String(formData.get("otherApps") || "").trim(),
      healthAware: String(formData.get("healthAware") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      tiktokProfile: String(formData.get("tiktokProfile") || "").trim(),
      instagramProfile: String(formData.get("instagramProfile") || "").trim(),
      xProfile: String(formData.get("xProfile") || "").trim(),
      youtubeProfile: String(formData.get("youtubeProfile") || "").trim(),
      facebookProfile: String(formData.get("facebookProfile") || "").trim(),
      platform: String(formData.get("platform") || "").trim(),
      isHealthProfessional: formData.get("isHealthProfessional") === "on",
      professionalType: String(formData.get("professionalType") || "").trim(),
      organizationName: String(formData.get("organizationName") || "").trim(),
      organizationRole: String(formData.get("organizationRole") || "").trim(),
      professionalDocumentation: professionalDocumentationFiles.map((file) => file.name),
      usesClientApps: String(formData.get("usesClientApps") || "").trim(),
      clientApps: String(formData.get("clientApps") || "").trim(),
    };

    saveDraft();
    persistTesterApplication(application);
    submitWithFormsubmit(application);
  });

  form.addEventListener("input", () => {
    saveDraft();
    refreshInvalidHighlightsAfterChange();
  });
  form.addEventListener("change", () => {
    saveDraft();
    refreshInvalidHighlightsAfterChange();
  });
}

function persistTesterApplication(application) {
  try {
    const raw = window.localStorage.getItem(TESTER_APPLICATIONS_STORAGE_KEY);
    const applications = raw ? JSON.parse(raw) : [];
    const safeApplications = Array.isArray(applications) ? applications : [];

    safeApplications.push(application);
    window.localStorage.setItem(TESTER_APPLICATIONS_STORAGE_KEY, JSON.stringify(safeApplications));
  } catch (error) {
    return;
  }
}

function createTesterApplicationId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `tester-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function formatTesterDateTime(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

initTesterApplication();
