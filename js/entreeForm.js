import { goToStep } from "./navigation.js";
import { enregistrerEntree } from "./api.js";
import { afficherEtiquette } from "./ui.js";

export const setupEntreeForm = () => {
  const form = document.getElementById("entree-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.type_visite === "formation") {
      if (!data.formation_id) return alert("Veuillez indiquer l'ID formation.");
      data.employe_id = null;
    } else if (data.type_visite === "personnel") {
      if (!data.employe_id) return alert("Veuillez indiquer l'ID employé.");
      data.formation_id = null;
    } else {
      return alert("Type de visite inconnu.");
    }

    try {
      const result = await enregistrerEntree(data);
      afficherEtiquette(result);
      form.reset();
      goToStep(7);
    } catch (error) {
      console.error("Erreur :", error);
      alert(error.message);
    }
  });
};
