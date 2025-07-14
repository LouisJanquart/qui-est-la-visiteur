import { setupNavigation, goBack, resetWizard } from "./navigation.js";
import { setupEntreeForm } from "./entreeForm.js";
import { setupSortieForm } from "./sortieForm.js";
import { setupRetourAccueil } from "./confirmation.js";
import { setupRechercheForm } from "./rechercheForm.js";

// Init
setupNavigation();
setupEntreeForm();
setupSortieForm();
setupRetourAccueil();
setupRechercheForm();

document
  .querySelectorAll(".btn-retour")
  .forEach((btn) => btn.addEventListener("click", goBack));

document
  .querySelectorAll(".btn-accueil")
  .forEach((btn) => btn.addEventListener("click", resetWizard));
