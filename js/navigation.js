// navigation.js
export let currentStep = 1;
export let currentAction = null;
export let currentVisiteurId = null;

const history = [];

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://qui-est-la-api.onrender.com";

// 🔁 Navigation
export const goToStep = (step) => {
  console.log(`🔁 goToStep(${step}) from step ${currentStep}`);

  if (step !== currentStep) {
    history.push(currentStep);
  }

  document.querySelectorAll(".step").forEach((section) => {
    section.classList.toggle("hidden", +section.dataset.step !== step);
  });

  currentStep = step;
  console.log("🧭 Historique :", [...history]);
};

export const goBack = () => {
  const previous = history.pop();
  if (previous != null) {
    console.log(`⬅️ Retour vers l'étape ${previous}`);
    goToStep(previous);
  }
};

export const resetWizard = () => {
  history.length = 0;
  currentStep = 1;
  currentAction = null;
  currentVisiteurId = null;

  document.querySelectorAll('input[name="visiteur_id"]').forEach((input) => {
    input.value = "";
  });

  goToStep(1);
};

// 🧭 Initialisation des événements de navigation
export const setupNavigation = () => {
  console.log("📦 Navigation initialisée");

  // Étape 1 : Choix Entrer / Sortir
  document.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentAction = btn.dataset.action;
      goToStep(currentAction === "entrer" ? 2 : 3);
    });
  });

  // Étape 2 : Déjà venu ?
  document
    .querySelector('[data-deja-venu="oui"]')
    ?.addEventListener("click", () => goToStep(3));

  document
    .querySelector('[data-deja-venu="non"]')
    ?.addEventListener("click", () => goToStep(5));

  // Étape 3 : ID → Email
  document
    .getElementById("btn-par-email")
    ?.addEventListener("click", () => goToStep(4));

  // ID submit
  const idForm = document.getElementById("id-form");
  idForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = idForm.visiteur_id.value.trim();
    if (!id) return alert("Veuillez entrer un ID valide.");

    try {
      const res = await fetch(`${BASE_URL}/api/visiteurs/${id}`);
      const visiteur = await res.json();

      if (!res.ok)
        return alert(visiteur.error || "Erreur lors de la recherche.");

      currentVisiteurId = visiteur.id;
      document
        .querySelectorAll('input[name="visiteur_id"]')
        .forEach((el) => (el.value = visiteur.id));

      if (currentAction === "entrer") {
        document.querySelector(
          'section[data-step="6"] input[name="nom"]'
        ).value = visiteur.nom;
        document.querySelector(
          'section[data-step="6"] input[name="prenom"]'
        ).value = visiteur.prenom;
        document.querySelector(
          'section[data-step="6"] input[name="email"]'
        ).value = visiteur.email;
        goToStep(5);
      } else {
        goToStep(8);
      }
    } catch (err) {
      console.error("Erreur ID :", err);
      alert("Erreur lors de la recherche.");
    }
  });

  // Étape 4 : Email submit
  const rechercheForm = document.getElementById("recherche-form");
  rechercheForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    if (!email) return alert("Veuillez entrer un email.");

    try {
      const res = await fetch(
        `${BASE_URL}/api/visiteurs/email/${encodeURIComponent(email)}`
      );
      const visiteur = await res.json();

      if (!res.ok)
        return alert(visiteur.error || "Erreur lors de la recherche.");

      currentVisiteurId = visiteur.id;
      document
        .querySelectorAll('input[name="visiteur_id"]')
        .forEach((el) => (el.value = visiteur.id));

      if (currentAction === "entrer") {
        document.querySelector(
          'section[data-step="6"] input[name="nom"]'
        ).value = visiteur.nom;
        document.querySelector(
          'section[data-step="6"] input[name="prenom"]'
        ).value = visiteur.prenom;
        document.querySelector(
          'section[data-step="6"] input[name="email"]'
        ).value = visiteur.email;
        goToStep(5);
      } else {
        goToStep(8);
      }
    } catch (err) {
      console.error("Erreur email :", err);
      alert("Erreur lors de la recherche.");
    }
  });

  // Étape 5 : Choix du type de visite
  document
    .querySelector('[data-type="personnel"]')
    ?.addEventListener("click", () => {
      document.getElementById("type_visite").value = "personnel";
      document.getElementById("employe-group").classList.remove("hidden");
      document.getElementById("formation-group").classList.add("hidden");
      goToStep(6);
    });

  document
    .querySelector('[data-type="formation"]')
    ?.addEventListener("click", () => {
      document.getElementById("type_visite").value = "formation";
      document.getElementById("formation-group").classList.remove("hidden");
      document.getElementById("employe-group").classList.add("hidden");
      goToStep(6);
    });
};
