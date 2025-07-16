import { goToStep } from "./navigation.js";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://qui-est-la-api.onrender.com";

export const setupSortieForm = () => {
  const form = document.getElementById("sortie-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch(`${BASE_URL}/api/visites/sortie`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        alert("Erreur : " + result.error);
        return;
      }

      document.getElementById("confirmation-message").textContent =
        "Sortie enregistrée. Merci de votre visite.";

      form.reset();
      goToStep(7);
    } catch (err) {
      console.error("Erreur :", err);
      alert("Erreur lors de la sortie.");
    }
  });
};
