import { goToStep } from "./navigation.js";
import { enregistrerEntree } from "./api.js";

export const setupEntreeForm = () => {
  const form = document.getElementById("entree-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validation + désactivation du champ inutile
    if (data.type_visite === "formation") {
      if (!data.formation_id) {
        alert("Veuillez indiquer l'ID de la formation.");
        return;
      }
      data.employe_id = null;
    } else if (data.type_visite === "personnel") {
      if (!data.employe_id) {
        alert("Veuillez indiquer l'ID du membre du personnel.");
        return;
      }
      data.formation_id = null;
    } else {
      alert("Type de visite inconnu.");
      return;
    }

    try {
      const result = await enregistrerEntree(data);

      document.getElementById("etiquette").innerHTML = `
        <div class="carte-etiquette">
          <h3>Étiquette visiteur</h3>
          <p><strong>Nom :</strong> ${result.nom}</p>
          <p><strong>Prénom :</strong> ${result.prenom}</p>
          <p><strong>Local :</strong> ${result.local}</p>
          <p><strong>${
            result.a_visiter?.includes("Formation") ? "Formation" : "À visiter"
          } :</strong> ${result.a_visiter || "—"}</p>
          <p><strong>ID visiteur :</strong> ${result.visiteur_id}</p>
        </div>
      `;

      form.reset();
      goToStep(7);
    } catch (err) {
      console.error("Erreur :", err);
      alert(err.message || "Erreur lors de l’enregistrement.");
    }
  });
};
