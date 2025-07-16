// ui.js

// 🔄 Afficher une étape du wizard
export const afficherEtape = (etape) => {
  document.querySelectorAll(".step").forEach((section) => {
    section.classList.toggle("hidden", +section.dataset.step !== etape);
  });
};

// 🧾 Remplir les champs d’un visiteur
export const preRemplirInfosVisiteur = ({ nom, prenom, email }) => {
  document.querySelector('section[data-step="6"] input[name="nom"]').value =
    nom;
  document.querySelector('section[data-step="6"] input[name="prenom"]').value =
    prenom;
  document.querySelector('section[data-step="6"] input[name="email"]').value =
    email;
};

// 🧾 Injecter l’ID visiteur dans tous les inputs cachés
export const injecterIdVisiteur = (id) => {
  document.querySelectorAll('input[name="visiteur_id"]').forEach((input) => {
    input.value = id;
  });
};

// 🧷 Afficher l’étiquette de confirmation d’entrée
export const afficherEtiquette = (data) => {
  const etiquette = document.getElementById("etiquette");
  etiquette.innerHTML = `
    <div class="carte-etiquette">
      <h3>Étiquette visiteur</h3>
      <p><strong>Nom :</strong> ${data.nom}</p>
      <p><strong>Prénom :</strong> ${data.prenom}</p>
      <p><strong>Local :</strong> ${data.local}</p>
      <p><strong>${
        data.a_visiter?.includes("Formation") ? "Formation" : "À visiter"
      } :</strong> ${data.a_visiter || "—"}</p>
      <p><strong>ID visiteur :</strong> ${data.visiteur_id}</p>
    </div>
  `;
};

// 🙋‍♂️ Afficher message de confirmation de sortie
export const afficherConfirmationSortie = () => {
  document.getElementById("confirmation-message").textContent =
    "Sortie enregistrée. Merci de votre visite.";
};

// 👤 Afficher uniquement le groupe employé
export const afficherEmployeGroup = () => {
  document.getElementById("employe-group").classList.remove("hidden");
  document.getElementById("formation-group").classList.add("hidden");
};

// 🎓 Afficher uniquement le groupe formation
export const afficherFormationGroup = () => {
  document.getElementById("formation-group").classList.remove("hidden");
  document.getElementById("employe-group").classList.add("hidden");
};
