import { goToStep } from "./navigation.js";
import { enregistrerSortie } from "./api.js";
import { afficherConfirmationSortie } from "./ui.js";

export const setupSortieForm = () => {
  const form = document.getElementById("sortie-form-auto");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    console.log("🔍 Données envoyées pour la sortie :", data);

    try {
      await enregistrerSortie(data);
      afficherConfirmationSortie();
      form.reset();
      goToStep(7);
    } catch (error) {
      console.error("Erreur :", error);
      alert(error.message);
    }
  });
};
