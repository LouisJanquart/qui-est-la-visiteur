import { goToStep } from "./navigation.js";
import { enregistrerSortie } from "./api.js";

export const setupSortieForm = () => {
  const form = document.getElementById("sortie-form-auto");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log("🔍 Données envoyées pour la sortie :", data);

    try {
      await enregistrerSortie(data);

      document.getElementById("confirmation-message").textContent =
        "Sortie enregistrée. Merci de votre visite.";

      form.reset();
      goToStep(7);
    } catch (err) {
      console.error("Erreur :", err);
      alert(err.message || "Erreur lors de la sortie.");
    }
  });
};
