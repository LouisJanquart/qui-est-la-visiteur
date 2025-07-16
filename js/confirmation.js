import { resetWizard } from "./navigation.js";

export const setupRetourAccueil = () => {
  const boutonsRetour = [
    document.getElementById("retour-accueil"),
    document.getElementById("retour-accueil-2"),
  ];

  boutonsRetour.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", resetWizard);
    }
  });
};
