import { resetWizard } from "./navigation.js";

export const setupRetourAccueil = () => {
  const boutonsRetour = [
    document.getElementById("retour-accueil"),
    document.getElementById("retour-accueil-2"),
  ];

  boutonsRetour.forEach((btn) => {
    btn?.addEventListener("click", resetWizard);
  });

  document
    .getElementById("btn-imprimer-etiquette")
    ?.addEventListener("click", () => {
      window.print();
    });
};
