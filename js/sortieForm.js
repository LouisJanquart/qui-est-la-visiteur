import { goToStep } from "./navigation.js";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://qui-est-la-api.onrender.com";

export function setupSortieForm() {
  const form = document.getElementById("sortie-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${BASE_URL}/api/visites/sortie`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        document.getElementById("confirmation-message").textContent =
          "Sortie enregistrée. Merci de votre visite.";
        form.reset();
        goToStep(7);
      } else {
        alert("Erreur : " + result.error);
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur lors de la sortie.");
    }
  });
}
