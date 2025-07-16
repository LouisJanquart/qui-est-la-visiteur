import { goToStep } from "./navigation.js";
import { enregistrerEntree, fetchFormations, fetchEmployes } from "./api.js";
import { afficherEtiquette } from "./ui.js";

let formations = [];
let employes = [];

const remplirSelect = (selectEl, items, labelFn) => {
  selectEl.innerHTML = ""; // Réinitialise
  const placeholder = document.createElement("option");
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.textContent = "-- Choisir --";
  selectEl.appendChild(placeholder);

  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = labelFn(item);
    selectEl.appendChild(option);
  });
};

export const setupEntreeForm = async () => {
  const form = document.getElementById("entree-form");
  if (!form) return;

  const formationSelect = form.querySelector('select[name="formation_id"]');
  const employeSelect = form.querySelector('select[name="employe_id"]');

  // Charger les listes depuis l'API
  try {
    [formations, employes] = await Promise.all([
      fetchFormations(),
      fetchEmployes(),
    ]);
  } catch (error) {
    console.error("❌ Erreur chargement listes :", error);
  }

  // Lors du choix du type de visite
  document
    .querySelector('[data-type="formation"]')
    ?.addEventListener("click", () => {
      // Affiche le bon groupe
      document.getElementById("formation-group").classList.remove("hidden");
      document.getElementById("employe-group").classList.add("hidden");

      // Met à jour les attributs required
      formationSelect.required = true;
      employeSelect.required = false;

      // Remplit les options
      remplirSelect(formationSelect, formations, (f) => f.intitule);
    });

  document
    .querySelector('[data-type="personnel"]')
    ?.addEventListener("click", () => {
      // Affiche le bon groupe
      document.getElementById("employe-group").classList.remove("hidden");
      document.getElementById("formation-group").classList.add("hidden");

      // Met à jour les attributs required
      employeSelect.required = true;
      formationSelect.required = false;

      // Remplit les options
      remplirSelect(
        employeSelect,
        employes,
        (e) => `${e.prenom} ${e.nom} (${e.fonction})`
      );
    });

  // Envoi du formulaire
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.type_visite === "formation") {
      if (!data.formation_id)
        return alert("Veuillez sélectionner une formation.");
      data.employe_id = null;
    } else if (data.type_visite === "personnel") {
      if (!data.employe_id)
        return alert("Veuillez sélectionner un membre du personnel.");
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
      console.error("❌ Erreur lors de l’enregistrement :", error);
      alert(error.message);
    }
  });
};
