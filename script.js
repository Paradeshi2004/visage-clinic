const body = document.body;

/* =========================================
   ACTIVE NAVIGATION
========================================= */
const currentPage = (() => {
  const name = window.location.pathname.split('/').pop();
  return name && name.length ? name : 'index.html';
})();

document.querySelectorAll('.desktop-nav a, .mobile-nav a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.setAttribute('aria-current', 'page');
    link.classList.add('active');
  }
});


/* =========================================
   MOBILE NAVIGATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (!menu || !mobileNav) {
    console.error("Mobile navigation elements not found.");
    return;
  }

  const closeMobileMenu = () => {
    mobileNav.classList.remove("open");
    body.classList.remove("menu-open");

    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open menu");
    mobileNav.setAttribute("aria-hidden", "true");
  };

  menu.addEventListener("click", () => {
    const isOpen = mobileNav.classList.contains("open");

    if (isOpen) {
      closeMobileMenu();
    } else {
      mobileNav.classList.add("open");
      body.classList.add("menu-open");

      menu.setAttribute("aria-expanded", "true");
      menu.setAttribute("aria-label", "Close menu");
      mobileNav.setAttribute("aria-hidden", "false");
    }
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      closeMobileMenu();
    }
  });
});

// Accordion care content, if present.
document.querySelectorAll('.care-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const detail = trigger.parentElement.querySelector('.care-detail');
    if (!detail) return;

    const isOpen = trigger.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.care-trigger').forEach(other => {
      if (other !== trigger) {
        other.setAttribute('aria-expanded', 'false');
        const otherDetail = other.parentElement.querySelector('.care-detail');
        if (otherDetail) otherDetail.hidden = true;
      }
    });

    trigger.setAttribute('aria-expanded', String(!isOpen));
    detail.hidden = isOpen;
  });
});


// Treatments page: start with the four concern types, then show only the selected concern's treatments.
const treatmentCategorySelect = document.querySelector('#treatmentCategory');
const treatmentCards = [...document.querySelectorAll('.treatment-card[data-category]')];
const activeConcernDescription = document.querySelector('#activeConcernDescription');
const activeConcernNumber = document.querySelector('.treatment-category-number');
const treatmentGrid = document.querySelector('#treatmentGrid');
const concernOverview = document.querySelector('#concernOverview');
const selectedConcernBar = document.querySelector('#selectedConcernBar');
const selectedConcernTitle = document.querySelector('#selectedConcernTitle');
const showAllConcernsButton = document.querySelector('#showAllConcerns');
const concernButtons = [...document.querySelectorAll('[data-select-concern]')];

if (treatmentCategorySelect && treatmentCards.length && treatmentGrid) {
  const concerns = {
    skin: { title: 'Skin', description: 'Acne, pigmentation, marks and other skin-related concerns available at Visage.', number: '01' },
    'hair-scalp': { title: 'Hair & Scalp', description: 'Treatments focused on hair fall, growth concerns and scalp health.', number: '02' },
    'aesthetic-care': { title: 'Aesthetic Care', description: 'Rejuvenation, body and laser-focused aesthetic treatments.', number: '03' },
    'hair-restoration': { title: 'Hair Restoration', description: 'Consultation-led options for suitable hair-restoration concerns.', number: '04' }
  };

  const showConcern = category => {
    const concern = concerns[category];
    if (!concern) return;

    treatmentCards.forEach(card => {
      const matches = card.dataset.category === category;
      // Hide every card that does not belong to the selected concern.
      // Using both the hidden attribute and the class prevents later card CSS
      // from accidentally making filtered cards visible again.
      card.hidden = !matches;
      card.classList.toggle('is-filtered-out', !matches);
      if (matches) {
        card.classList.remove('category-enter');
        void card.offsetWidth;
        card.classList.add('category-enter');
      }
    });

    treatmentGrid.hidden = false;
    if (concernOverview) concernOverview.hidden = true;
    if (selectedConcernBar) selectedConcernBar.hidden = false;
    if (selectedConcernTitle) selectedConcernTitle.textContent = concern.title;
    if (activeConcernDescription) activeConcernDescription.textContent = concern.description;
    if (activeConcernNumber) activeConcernNumber.textContent = concern.number;
  };

  const showAllConcerns = () => {
    treatmentCategorySelect.value = '';
    treatmentCards.forEach(card => {
      card.hidden = false;
      card.classList.remove('is-filtered-out');
    });
    treatmentGrid.hidden = true;
    if (concernOverview) concernOverview.hidden = false;
    if (selectedConcernBar) selectedConcernBar.hidden = true;
    if (activeConcernDescription) activeConcernDescription.textContent = 'Choose one of the four concern types below to see the related treatments.';
    if (activeConcernNumber) activeConcernNumber.textContent = '01';
  };

  treatmentCategorySelect.addEventListener('change', event => {
    const category = event.target.value;
    if (category) showConcern(category);
    else showAllConcerns();
  });

  concernButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.selectConcern;
      treatmentCategorySelect.value = category;
      showConcern(category);
      treatmentGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  if (showAllConcernsButton) showAllConcernsButton.addEventListener('click', showAllConcerns);

  // Initial Treatments landing page: only Skin, Hair & Scalp, Aesthetic Care and Hair Restoration.
  showAllConcerns();
}


/* =========================================
   V10 — APPOINTMENT FORM HANDLER
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("appointmentForm");

  if (!form) return;

  const status = document.getElementById("appointmentStatus");

  const nameField = document.getElementById("appointmentName");
  const phoneField = document.getElementById("appointmentPhone");
  const concernField = document.getElementById("appointmentConcern");
  const treatmentField = document.getElementById("appointmentTreatment");
  const messageField = document.getElementById("appointmentMessage");
  const emailField = document.getElementById("appointmentEmail");
  const doctorField = document.getElementById("appointmentDoctor");
  const dateField = document.getElementById("appointmentDate");
  const timeField = document.getElementById("appointmentTime");

  /* -----------------------------------------
     TREATMENT OF INTEREST — DEPENDENT OPTIONS
     Shows the exact relevant treatments from the
     16 treatment pages after a concern is selected.
  ----------------------------------------- */

  const treatmentOptions = {
    "Skin": [
      "Acne & Acne Scars",
      "Acne Marks",
      "Pigmentation",
      "Skin Peels",
      "Mole Removal",
      "Spot Treatments",
      "Skin Tags & Warts"
    ],
    "Hair & scalp": [
      "Hair Fall & Hair Loss",
      "Hair Growth Therapies",
      "Dandruff Reduction"
    ],
    "Aesthetic care": [
      "Facials & Skin Rejuvenation",
      "Advanced Medi Facials",
      "Body Brightening",
      "Laser Hair Removal",
      "Tattoo Removal"
    ],
    "Hair restoration": [
      "Hair Transplantation"
    ]
  };

  const resetTreatmentField = () => {
    treatmentField.innerHTML = '<option value="" selected>First select a concern</option>';
    treatmentField.value = "";
    treatmentField.disabled = true;
  };

  const updateTreatmentOptions = () => {
    const selectedConcern = concernField.value;
    const options = treatmentOptions[selectedConcern] || [];

    treatmentField.innerHTML = '<option value="" selected>Choose a treatment</option>';

    options.forEach((treatment) => {
      const option = document.createElement("option");
      option.value = treatment;
      option.textContent = treatment;
      treatmentField.appendChild(option);
    });

    treatmentField.disabled = options.length === 0;
    treatmentField.classList.remove("is-invalid");
  };

  resetTreatmentField();
  concernField.addEventListener("change", updateTreatmentOptions);


  /* -----------------------------------------
     REMOVE ERROR STYLE WHILE USER TYPES
  ----------------------------------------- */

  [nameField, phoneField, concernField, treatmentField].forEach((field) => {

    field.addEventListener("input", () => {
      if (field.value.trim()) {
        field.classList.remove("is-invalid");
      }
    });

    field.addEventListener("change", () => {
      if (field.value.trim()) {
        field.classList.remove("is-invalid");
      }
    });

  });


  /* -----------------------------------------
     FORM SUBMISSION
  ----------------------------------------- */

  form.addEventListener("submit", (event) => {

    event.preventDefault();

    let valid = true;


    /* ---------- NAME VALIDATION ---------- */

    const name = nameField.value.trim();

    if (name.length < 2) {

      valid = false;
      nameField.classList.add("is-invalid");

    } else {

      nameField.classList.remove("is-invalid");
      nameField.removeAttribute("aria-invalid");

    }


    /* ---------- PHONE VALIDATION ---------- */

    const phone = phoneField.value.trim();

    const phoneDigits = phone.replace(/\D/g, "");

    if (phoneDigits.length < 10) {

      valid = false;
      phoneField.classList.add("is-invalid");

    } else {

      phoneField.classList.remove("is-invalid");
      phoneField.removeAttribute("aria-invalid");

    }


    /* ---------- CONCERN VALIDATION ---------- */

    const concern = concernField.value;

    if (!concern) {

      valid = false;
      concernField.classList.add("is-invalid");

    } else {

      concernField.classList.remove("is-invalid");
      concernField.removeAttribute("aria-invalid");

    }


    /* ---------- TREATMENT VALIDATION ---------- */

    const selectedTreatment = treatmentField.value;

    if (!selectedTreatment) {

      valid = false;
      treatmentField.classList.add("is-invalid");

    } else {

      treatmentField.classList.remove("is-invalid");
      treatmentField.removeAttribute("aria-invalid");

    }


    /* ---------- INVALID FORM ---------- */

    if (!valid) {

      status.textContent =
        "Please complete your name, valid phone number, concern and treatment.";

      const firstInvalid = [nameField, phoneField, concernField, treatmentField]
        .find(field => field.classList.contains("is-invalid"));

      if (firstInvalid) {
        firstInvalid.setAttribute("aria-invalid", "true");
        firstInvalid.focus();
      }

      return;

    }


    /* -----------------------------------------
       PREPARE WHATSAPP MESSAGE
    ----------------------------------------- */

    const treatment = treatmentField.value;

    const userMessage = messageField.value.trim();


    const lines = [

      "Hello Visage, I would like to book a consultation.",

      "",

      "*Visage Consultation Enquiry*",

      "",

      `Name: ${name}`,

      `Phone: ${phone}`,

      `Concern: ${concern}`

    ];

    const email = emailField ? emailField.value.trim() : "";
    const doctor = doctorField ? doctorField.value : "";
    const preferredDate = dateField ? dateField.value : "";
    const preferredTime = timeField ? timeField.value : "";
    if (email) lines.push(`Email: ${email}`);
    if (doctor) lines.push(`Preferred doctor: ${doctor}`);
    if (preferredDate) lines.push(`Preferred date: ${preferredDate}`);
    if (preferredTime) lines.push(`Preferred time: ${preferredTime}`);


    if (treatment) {

      lines.push(`Treatment of interest: ${treatment}`);

    }


    if (userMessage) {

      lines.push(`Message: ${userMessage}`);

    }


    lines.push("");

    lines.push(
      "Sent from the Visage website."
    );


    /* -----------------------------------------
       OPEN WHATSAPP
    ----------------------------------------- */

    const whatsappNumber = "918142421239";


    const url =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        lines.join("\n")
      )}`;


    status.textContent =
      "Thank you. Your consultation request is ready — opening WhatsApp for you to send it to the clinic…";


    window.open(
      url,
      "_blank",
      "noopener"
    );

  });

});

/* =========================================
   V11 — SITE-WIDE UX POLISH
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector(".site-header");

  const updateHeader = () => {
    if (header) {
      header.classList.toggle(
        "is-scrolled",
        window.scrollY > 16
      );
    }
  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* External links security */

  document
    .querySelectorAll('a[target="_blank"]')
    .forEach((link) => {

      const rel = link.getAttribute("rel") || "";

      if (!rel.includes("noopener")) {
        link.setAttribute(
          "rel",
          `${rel} noopener`.trim()
        );
      }

    });

});

/* =========================================
   ACCESSIBILITY & MOBILE MENU POLISH
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (!menu || !mobileNav) return;

  const firstLink = mobileNav.querySelector("a");

  menu.addEventListener("click", () => {
    if (menu.getAttribute("aria-expanded") === "true" && firstLink) {
      requestAnimationFrame(() => firstLink.focus());
    }
  });

  document.addEventListener("click", (event) => {
    if (menu.getAttribute("aria-expanded") !== "true") return;
    if (!mobileNav.contains(event.target) && !menu.contains(event.target)) {
      mobileNav.classList.remove("open");
      document.body.classList.remove("menu-open");
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "Open menu");
      mobileNav.setAttribute("aria-hidden", "true");
    }
  });
});


/* =========================================
   V27 — DOCTOR PROFILES + SHAREABLE URLS
========================================= */
(() => {
  const selectors = [...document.querySelectorAll('.doctor-selector[data-doctor]')];
  const panel = document.getElementById('doctorProfilePanel');
  const image = document.getElementById('doctorProfileImage');
  if (!selectors.length || !panel || !image) return;

  const doctors = {
    neeraja: {
      image: 'assets/doctor-neeraja-visage.png', imageAlt: 'Dr. Neeraja Naveena at Visage',
      photoName: 'Dr. Neeraja<br>Naveena', eyebrow: 'DR. NEERAJA NAVEENA',
      headline: 'Care,<br><em>guided by listening.</em>', role: 'MAXILLO FACIAL SURGEON',
      bio: 'At Visage, every consultation begins with understanding your concern. The conversation, assessment and next steps are approached with care, clarity and your comfort in mind.',
      style: 'Listening first', note: 'Individual guidance',
      focus: ['Individual concerns', 'Suitability and next steps', 'Consultation-led guidance']
    },
    sravya: {
      image: 'assets/doctor-sravya-placeholder.svg', imageAlt: 'Profile image for Dr. Sravya',
      photoName: 'Dr. Sravya', eyebrow: 'DR. SRAVYA',
      headline: 'Care,<br><em>with clarity and attention.</em>', role: 'VISAGE DOCTOR PROFILE',
      bio: 'Every consultation at Visage is approached with time to listen, understand your concern and discuss the next step with clarity and care.',
      style: 'Clear conversation', note: 'Profile details being finalised by clinic',
      focus: ['Understanding your concern', 'Discussing possible next steps', 'Personalised consultation']
    },
    mounika: {
      image: 'assets/doctor-mounika-placeholder.svg', imageAlt: 'Profile image for Dr. Mounika',
      photoName: 'Dr. Mounika', eyebrow: 'DR. MOUNIKA',
      headline: 'Care,<br><em>centred on you.</em>', role: 'VISAGE DOCTOR PROFILE',
      bio: 'The Visage approach begins with a thoughtful conversation, helping you understand your concern and explore suitable next steps at a comfortable pace.',
      style: 'Thoughtful guidance', note: 'Profile details being finalised by clinic',
      focus: ['Your questions and goals', 'Comfort and clarity', 'Appropriate next-step discussion']
    }
  };

  const setText = (id, value, html = false) => {
    const el = document.getElementById(id); if (!el) return;
    if (html) el.innerHTML = value; else el.textContent = value;
  };

  const selectDoctor = (key, updateUrl = true, focusPanel = false) => {
    const doctor = doctors[key] || doctors.neeraja;
    key = doctors[key] ? key : 'neeraja';
    selectors.forEach(button => {
      const active = button.dataset.doctor === key;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
      const action = button.querySelector('.doctor-selector-action b');
      if (action) action.textContent = active ? 'Viewing' : 'View profile';
    });
    const photo = image.closest('.doctor-team-photo');
    if (photo) photo.classList.add('is-switching');
    window.setTimeout(() => {
      image.src = doctor.image; image.alt = doctor.imageAlt;
      setText('doctorPhotoName', doctor.photoName, true);
      setText('doctorEyebrow', doctor.eyebrow); setText('doctorHeadline', doctor.headline, true);
      setText('doctorRole', doctor.role); setText('doctorBio', doctor.bio);
      setText('doctorStyle', doctor.style); setText('doctorNote', doctor.note);
      const list = document.getElementById('doctorFocusList');
      if (list) list.innerHTML = doctor.focus.map(item => `<li>${item}</li>`).join('');
      document.title = `${doctor.eyebrow.replace('DR. ', 'Dr. ')} | Visage — The Aesthetic Clinic`;
      image.onload = () => photo && photo.classList.remove('is-switching');
      if (image.complete) photo && photo.classList.remove('is-switching');
    }, 140);
    if (updateUrl) history.replaceState({doctor:key}, '', `${location.pathname}#${key}`);
    if (focusPanel && window.innerWidth < 760) panel.scrollIntoView({behavior:'smooth', block:'start'});
  };

  selectors.forEach(button => button.addEventListener('click', () => selectDoctor(button.dataset.doctor, true, true)));
  const initial = location.hash.replace('#','');
  selectDoctor(doctors[initial] ? initial : 'neeraja', false);
  window.addEventListener('popstate', () => {
    const key = location.hash.replace('#',''); selectDoctor(doctors[key] ? key : 'neeraja', false);
  });
})();

/* =========================================
   V27 — APPOINTMENT PREFERENCES
========================================= */
document.addEventListener('DOMContentLoaded', () => {
  const dateField = document.getElementById('appointmentDate');
  if (dateField) dateField.min = new Date().toISOString().split('T')[0];
});
