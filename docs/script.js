const header = document.querySelector("[data-header]");
const nav = document.querySelector(".nav");
const toggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const form = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

const CREDENTIALS = {
  degree: {
    title: "DPT Degree (HEC)",
    file: "assets/credentials/DPT_Degree_HEC.pdf",
    downloadName: "Maliha_Masud_DPT_Degree_HEC.pdf",
  },
  transcript: {
    title: "DPT Transcript (HEC)",
    file: "assets/credentials/DPT_Transcript_HEC.pdf",
    downloadName: "Maliha_Masud_DPT_Transcript_HEC.pdf",
  },
  membership: {
    title: "PPTA Membership",
    file: "assets/credentials/PPTA_Membership.pdf",
    downloadName: "Maliha_Masud_PPTA_Membership.pdf",
  },
  "good-standing": {
    title: "PPTA Certificate of Good Standing",
    file: "assets/credentials/PPTA_Certificate_of_Good_Standing.pdf",
    downloadName: "Maliha_Masud_PPTA_Certificate_of_Good_Standing.pdf",
  },
  intermediate: {
    title: "Intermediate Certificate (HSSC)",
    file: "assets/credentials/HSSC_Intermediate_Certificate.pdf",
    downloadName: "Maliha_Masud_HSSC_Intermediate_Certificate.pdf",
  },
  matric: {
    title: "Matriculation Certificate (SSC)",
    file: "assets/credentials/SSC_Matriculation_Certificate.pdf",
    downloadName: "Maliha_Masud_SSC_Matriculation_Certificate.pdf",
  },
};

const REQUEST_EMAIL = "malihamasud128@gmail.com";

if (year) {
  year.textContent = String(new Date().getFullYear());
}

window.addEventListener(
  "scroll",
  () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  },
  { passive: true }
);

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-label", "Open menu");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-label", "Open menu");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("is-visible"));
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const organisation = String(data.get("organisation") || "").trim();
    const country = String(data.get("country") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = `Portfolio enquiry from ${name}`;
    const body = `Name: ${name}\nOrganisation: ${organisation}\nCountry: ${country}\n\n${message}`;
    const mailto = `mailto:${REQUEST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (formNote) {
      formNote.hidden = false;
    }
    window.location.href = mailto;
    form.reset();
  });
}

const viewModal = document.querySelector("[data-view-modal]");
const downloadModal = document.querySelector("[data-download-modal]");
const viewFrame = document.querySelector("[data-view-frame]");
const viewTitle = document.querySelector("#credential-view-title");
const downloadForm = document.querySelector("[data-download-form]");
const downloadDocumentInput = document.querySelector("[data-download-document]");
const downloadNote = document.querySelector("[data-download-note]");
const downloadTitle = document.querySelector("#credential-download-title");

function openModal(modal) {
  if (!modal) return;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModals() {
  if (viewModal) viewModal.hidden = true;
  if (downloadModal) downloadModal.hidden = true;
  if (viewFrame) viewFrame.src = "about:blank";
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-close-modal]").forEach((el) => {
  el.addEventListener("click", closeModals);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModals();
});

document.querySelectorAll("[data-view-credential]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-view-credential");
    const doc = CREDENTIALS[key];
    if (!doc || !viewFrame) return;
    if (viewTitle) viewTitle.textContent = doc.title;
    viewFrame.src = `${doc.file}#toolbar=0&navpanes=0&scrollbar=1`;
    openModal(viewModal);
  });
});

document.querySelectorAll("[data-request-download]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.getAttribute("data-request-download");
    const doc = CREDENTIALS[key];
    if (!doc || !downloadDocumentInput) return;
    downloadDocumentInput.value = key;
    if (downloadTitle) downloadTitle.textContent = `Request download · ${doc.title}`;
    if (downloadNote) {
      downloadNote.hidden = true;
      downloadNote.textContent = "";
    }
    if (downloadForm) downloadForm.reset();
    downloadDocumentInput.value = key;
    openModal(downloadModal);
  });
});

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function triggerDownload(doc) {
  const link = document.createElement("a");
  link.href = doc.file;
  link.download = doc.downloadName;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function rememberRequest(payload) {
  try {
    const existing = JSON.parse(sessionStorage.getItem("credentialRequests") || "[]");
    existing.push({ ...payload, requestedAt: new Date().toISOString() });
    sessionStorage.setItem("credentialRequests", JSON.stringify(existing));
  } catch {
    /* ignore storage errors */
  }
}

async function notifyRequest(payload) {
  const subject = `Credential download request: ${payload.documentTitle}`;
  const bodyLines = [
    "A credential download was requested from the portfolio site.",
    "",
    `Document: ${payload.documentTitle}`,
    `Full name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Contact number: ${payload.phone}`,
    `Institution / organisation: ${payload.organisation}`,
    `Purpose: ${payload.purpose}`,
    `Submitted at: ${payload.requestedAt}`,
    `Page: ${window.location.href}`,
  ];

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${REQUEST_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: subject,
        document: payload.documentTitle,
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        organisation: payload.organisation,
        purpose: payload.purpose,
        submittedAt: payload.requestedAt,
        page: window.location.href,
        _template: "table",
      }),
    });
    if (response.ok) return "notified";
  } catch {
    /* fall through to mailto */
  }

  const mailto = `mailto:${REQUEST_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  window.location.href = mailto;
  return "mailto";
}

if (downloadForm) {
  downloadForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(downloadForm);
    const key = String(data.get("document") || "").trim();
    const doc = CREDENTIALS[key];
    const fullName = String(data.get("fullName") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const organisation = String(data.get("organisation") || "").trim();
    const purpose = String(data.get("purpose") || "").trim();

    if (!doc || !fullName || !email || !phone || !organisation || !purpose) {
      if (downloadNote) {
        downloadNote.hidden = false;
        downloadNote.textContent = "Please complete every required field with accurate details.";
      }
      return;
    }

    if (!isValidEmail(email)) {
      if (downloadNote) {
        downloadNote.hidden = false;
        downloadNote.textContent = "Enter a valid email address.";
      }
      return;
    }

    if (!isValidPhone(phone)) {
      if (downloadNote) {
        downloadNote.hidden = false;
        downloadNote.textContent = "Enter a valid contact number (7–15 digits).";
      }
      return;
    }

    const submitButton = downloadForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Submitting…";
    }

    const payload = {
      documentKey: key,
      documentTitle: doc.title,
      fullName,
      email,
      phone,
      organisation,
      purpose,
      requestedAt: new Date().toISOString(),
    };

    rememberRequest(payload);
    const notifyResult = await notifyRequest(payload);
    triggerDownload(doc);
    closeModals();

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Submit and download";
    }

    if (downloadNote) {
      downloadNote.hidden = false;
      downloadNote.textContent =
        notifyResult === "notified"
          ? "Request recorded. Your download should begin shortly."
          : "Request prepared via email. Your download should begin shortly.";
    }
  });
}
