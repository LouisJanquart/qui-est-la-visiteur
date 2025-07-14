document.getElementById("entree-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  // Conversion des ID en nombre ou null
  data.employe_id = data.employe_id || null;
  data.formation_id = data.formation_id || null;

  try {
    const response = await fetch("http://localhost:3000/api/visites/entree", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    alert("Visite enregistrée avec ID : " + result.visite_id);
  } catch (error) {
    console.error("Erreur :", error);
    alert("Erreur lors de l’enregistrement.");
  }
});
