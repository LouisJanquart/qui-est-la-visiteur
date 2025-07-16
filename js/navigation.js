import {
  currentStep,
  currentAction,
  setStep,
  setAction,
  setVisiteurId,
  resetState,
} from "./state.js";
import { fetchVisiteurById, fetchVisiteurByEmail } from "./api.js";
import {
  afficherEtape,
  preRemplirInfosVisiteur,
  injecterIdVisiteur,
  afficherEmployeGroup,
  afficherFormationGroup,
} from "./ui.js";

const history = [];
let isNavigatingBack = false;

export const goToStep = (step) => {
  console.log(`🔁 goToStep(${step}) from step ${currentStep}`);
  if (!isNavigatingBack && step !== currentStep) {
    history.push(currentStep);
  }
  afficherEtape(step);
  setStep(step);
  console.log("🗭️ Historique :", [...history]);
};

export const goBack = () => {
  const previous = history.pop();
  if (previous != null) {
    console.log(`⬅️ Retour vers l'étape ${previous}`);
    isNavigatingBack = true;
    goToStep(previous);
    isNavigatingBack = false;
  }
};

export const resetWizard = () => {
  history.length = 0;
  resetState();
  injecterIdVisiteur("");
  goToStep(1);
};

export const setupNavigation = () => {
  console.log("📦 Navigation initialisée");

  document.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      setAction(action);
      goToStep(action === "entrer" ? 2 : 3);
    });
  });

  document
    .querySelector('[data-deja-venu="oui"]')
    ?.addEventListener("click", () => goToStep(3));

  document
    .querySelector('[data-deja-venu="non"]')
    ?.addEventListener("click", () => goToStep(5));

  document
    .getElementById("btn-par-email")
    ?.addEventListener("click", () => goToStep(4));

  const idForm = document.getElementById("id-form");
  idForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = idForm.visiteur_id.value.trim();
    if (!id) return alert("Veuillez entrer un ID valide.");

    try {
      const visiteur = await fetchVisiteurById(id);
      setVisiteurId(visiteur.id);
      injecterIdVisiteur(visiteur.id);

      if (currentAction === "entrer") {
        preRemplirInfosVisiteur(visiteur);
        goToStep(5);
      } else {
        goToStep(8);
      }
    } catch (err) {
      console.error("Erreur ID :", err);
      alert(err.message);
    }
  });

  const rechercheForm = document.getElementById("recherche-form");
  rechercheForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    if (!email) return alert("Veuillez entrer un email.");

    try {
      const visiteur = await fetchVisiteurByEmail(email);
      setVisiteurId(visiteur.id);
      injecterIdVisiteur(visiteur.id);

      if (currentAction === "entrer") {
        preRemplirInfosVisiteur(visiteur);
        goToStep(5);
      } else {
        goToStep(8);
      }
    } catch (err) {
      console.error("Erreur email :", err);
      alert(err.message);
    }
  });

  document
    .querySelector('[data-type="personnel"]')
    ?.addEventListener("click", () => {
      document.getElementById("type_visite").value = "personnel";
      afficherEmployeGroup();
      goToStep(6);
    });

  document
    .querySelector('[data-type="formation"]')
    ?.addEventListener("click", () => {
      document.getElementById("type_visite").value = "formation";
      afficherFormationGroup();
      goToStep(6);
    });
};
