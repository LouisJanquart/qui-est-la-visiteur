import { goToStep } from "./navigation.js";

export function setupRechercheForm() {
  const form = document.getElementById("recherche-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const email = formData.get("email");

    try {
      const response = await fetch(
        `http://localhost:3000/api/visiteurs/email/${encodeURIComponent(email)}`
      );
      const result = await response.json();

      if (response.ok) {
        // Pré-remplir les champs du formulaire visiteur
        document.querySelector('input[name="nom"]').value = result.nom;
        document.querySelector('input[name="prenom"]').value = result.prenom;
        document.querySelector('input[name="email"]').value = email;

        goToStep(3); // Prochaine étape : choix du type de visite
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur lors de la recherche.");
    }
  });
}
