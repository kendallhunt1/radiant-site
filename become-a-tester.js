const TESTER_APPLICATIONS_STORAGE_KEY = "radiant-tester-applications-v1";

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

  function syncOtherAppsRequirement() {
    const selectedValue = form.querySelector('input[name="usedOtherApps"]:checked')?.value;
    const isRequired = selectedValue === "yes";

    otherAppsField.required = isRequired;
    otherAppsField.disabled = !isRequired;

    if (!isRequired) {
      otherAppsField.value = "";
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
      clientAppsField.value = "";
      clientAppsField.setCustomValidity("");
    }

    if (!isHealthProfessional) {
      professionalTypeField.value = "";
      organizationNameField.value = "";
      organizationRoleField.value = "";
      professionalDocumentationField.value = "";
      professionalDocumentationField.setCustomValidity("");
      usesClientAppsInputs.forEach((input) => {
        input.checked = false;
      });
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

    persistTesterApplication(application);

    try {
      await submitSupportEmail({
        subject: "Radiant tester application",
        replyTo: application.email,
        fields: {
          form_name: "Radiant Tester Application",
          application_id: application.id,
          submitted_at: formatTesterDateTime(application.submittedAt),
          first_name: application.firstName,
          last_name: application.lastName,
          age: application.age,
          activity_level: application.activityLevel,
          currently_logs_health: application.currentlyLogs,
          used_other_apps: application.usedOtherApps,
          other_apps: application.otherApps || "N/A",
          health_aware: application.healthAware,
          email: application.email,
          phone: application.phone,
          tiktok_profile: application.tiktokProfile || "N/A",
          instagram_profile: application.instagramProfile || "N/A",
          x_profile: application.xProfile || "N/A",
          youtube_profile: application.youtubeProfile || "N/A",
          facebook_profile: application.facebookProfile || "N/A",
          platform: application.platform,
          health_professional: application.isHealthProfessional ? "Yes" : "No",
          professional_type: application.professionalType || "N/A",
          organization_name: application.organizationName || "N/A",
          organization_role: application.organizationRole || "N/A",
          professional_documentation: application.professionalDocumentation.join(", ") || "N/A",
          uses_client_apps: application.usesClientApps || "N/A",
          client_apps: application.clientApps || "N/A",
        },
        files: professionalDocumentationFiles,
      });

      hasAttemptedSubmit = false;
      form.reset();
      syncOtherAppsRequirement();
      syncProfessionalRequirements();
      clearInvalidHighlights();
      setStatus("Application submitted! We'll get back with you shortly.", "success");
      setSubmitLoading(false);
    } catch (error) {
      setStatus("Your application was saved locally but could not be submitted. Please try again.", "error");
      setSubmitLoading(false);
    }
  });

  form.addEventListener("input", refreshInvalidHighlightsAfterChange);
  form.addEventListener("change", refreshInvalidHighlightsAfterChange);
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
