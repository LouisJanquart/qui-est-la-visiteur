import { goToStep } from "./navigation.js";

export function setupRetourAccueil() {
  const btn = document.getElementById("retour-accueil");
  if (btn) {
    btn.addEventListener("click", () => {
      goToStep(1);
    });
  }
}
