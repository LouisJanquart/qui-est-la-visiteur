export let currentStep = 1;
let history = [];

export let currentAction = null;
export let currentVisiteurId = null;

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://qui-est-la-api.onrender.com";

export function goToStep(step) {
  console.log(`🔁 goToStep(${step}) from step ${currentStep}`);

  if (step !== currentStep) {
    history.push(currentStep);
  }

  document.querySelectorAll(".step").forEach((section) => {
    section.classList.toggle("hidden", +section.dataset.step !== step);
  });

  currentStep = step;
  console.log("🧭 Historique :", [...history]);
}

export function goBack() {
  if (history.length === 0) return;

  const previousStep = history.pop();
  console.log(`⬅️ Retour vers l'étape ${previousStep}`);

  // Ne pas rajouter dans l’historique !
  document.querySelectorAll(".step").forEach((section) => {
    section.classList.toggle("hidden", +section.dataset.step !== previousStep);
  });

  currentStep = previousStep;
  console.log("🧭 Historique :", [...history]);
}

export function resetWizard() {
  history = [];
  currentAction = null;
  currentVisiteurId = null;

  document.querySelectorAll('input[name="visiteur_id"]').forEach((input) => {
    input.value = "";
  });

  goToStep(1);
}

export function setupNavigation() {
  // Étape 1 : Choix Entrer / Sortir
  document.querySelectorAll("[data-action]").forEach((btn) => {
    const action = btn.dataset.action;
    btn.addEventListener("click", () => {
      currentAction = action;
      if (action === "entrer") {
        goToStep(2);
      } else {
        goToStep(3);
      }
    });
  });

  // Étape 2 : Déjà venu ?
  document
    .querySelector('[data-deja-venu="oui"]')
    ?.addEventListener("click", () => goToStep(3));

  document
    .querySelector('[data-deja-venu="non"]')
    ?.addEventListener("click", () => goToStep(5));

  // Étape 3 : Identification par ID → bouton vers email
  document.getElementById("btn-par-email")?.addEventListener("click", () => {
    goToStep(4);
  });

  const idForm = document.getElementById("id-form");
  if (idForm) {
    idForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = idForm.visiteur_id.value.trim();

      if (!id) {
        alert("Veuillez entrer un ID valide.");
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/visiteurs/${id}`);
        const visiteur = await response.json();

        if (!response.ok) {
          alert(visiteur.error || "Erreur lors de la recherche.");
          return;
        }

        currentVisiteurId = visiteur.id;

        document.querySelectorAll('input[name="visiteur_id"]').forEach((el) => {
          el.value = visiteur.id;
        });

        if (currentAction === "entrer" && currentStep !== 5) {
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
        } else if (currentAction === "sortir") {
          goToStep(8);
        }
      } catch (err) {
        console.error("Erreur lors de la recherche par ID :", err);
        alert("Erreur lors de la recherche.");
      }
    });
  }

  // Étape 4 : Identification par email
  const rechercheForm = document.getElementById("recherche-form");
  if (rechercheForm) {
    rechercheForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = e.target.email.value.trim();

      if (!email) {
        alert("Veuillez entrer un email.");
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/api/visiteurs/email/${encodeURIComponent(email)}`
        );
        const visiteur = await response.json();

        if (!response.ok) {
          alert(visiteur.error || "Erreur lors de la recherche.");
          return;
        }

        currentVisiteurId = visiteur.id;

        document.querySelectorAll('input[name="visiteur_id"]').forEach((el) => {
          el.value = visiteur.id;
        });

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
        console.error("Erreur recherche email :", err);
        alert("Erreur lors de la recherche.");
      }
    });
  }

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

  // Boutons ← Retour
  document.querySelectorAll(".btn-retour").forEach((btn) => {
    btn.addEventListener("click", () => {
      goBack();
    });
  });

  // Boutons 🏠 Accueil
  document.querySelectorAll(".btn-accueil").forEach((btn) => {
    btn.addEventListener("click", () => {
      resetWizard();
    });
  });

  document.getElementById("retour-accueil")?.addEventListener("click", () => {
    resetWizard();
  });

  document.getElementById("retour-accueil-2")?.addEventListener("click", () => {
    resetWizard();
  });

  console.log("📦 Navigation initialisée");
}
