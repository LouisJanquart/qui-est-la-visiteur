import { goToStep } from "./navigation.js";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://qui-est-la-api.onrender.com";

export const setupEntreeForm = () => {
  const form = document.getElementById("entree-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = prepareFormData(form);
    if (!data) return; // validation échouée

    try {
      const res = await fetch(`${BASE_URL}/api/visites/entree`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(`Erreur : ${result.error || "Enregistrement impossible."}`);
        return;
      }

      afficherEtiquette(result);
      form.reset();
      goToStep(7);
    } catch (err) {
      console.error("Erreur réseau :", err);
      alert("Erreur réseau lors de l’enregistrement.");
    }
  });
};

const prepareFormData = (form) => {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  switch (data.type_visite) {
    case "formation":
      if (!data.formation_id) {
        alert("Veuillez indiquer l'ID de la formation.");
        return null;
      }
      data.employe_id = null;
      break;

    case "personnel":
      if (!data.employe_id) {
        alert("Veuillez indiquer l'ID du membre du personnel.");
        return null;
      }
      data.formation_id = null;
      break;

    default:
      alert("Type de visite inconnu.");
      return null;
  }

  return data;
};

const afficherEtiquette = (visiteur) => {
  const etiquette = document.getElementById("etiquette");
  if (!etiquette) return;

  etiquette.innerHTML = `
    <div class="carte-etiquette">
      <h3>Étiquette visiteur</h3>
      <p><strong>Nom :</strong> ${visiteur.nom}</p>
      <p><strong>Prénom :</strong> ${visiteur.prenom}</p>
      <p><strong>Local :</strong> ${visiteur.local}</p>
      <p><strong>${
        visiteur.a_visiter?.includes("Formation") ? "Formation" : "À visiter"
      } :</strong> ${visiteur.a_visiter || "—"}</p>
      <p><strong>ID visiteur :</strong> ${visiteur.visiteur_id}</p>
    </div>
  `;
};
