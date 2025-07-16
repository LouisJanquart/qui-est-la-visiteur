const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://qui-est-la-api.onrender.com";

// 🔍 Recherche visiteur par ID
export const fetchVisiteurById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/visiteurs/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erreur lors de la recherche.");
  return data;
};

// 🔍 Recherche visiteur par email
export const fetchVisiteurByEmail = async (email) => {
  const res = await fetch(
    `${BASE_URL}/api/visiteurs/email/${encodeURIComponent(email)}`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erreur lors de la recherche.");
  return data;
};

// ➕ Enregistrer une entrée
export const enregistrerEntree = async (data) => {
  const res = await fetch(`${BASE_URL}/api/visites/entree`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Erreur lors de l’entrée.");
  return result;
};

// 🚪 Enregistrer une sortie
export const enregistrerSortie = async (data) => {
  const res = await fetch(`${BASE_URL}/api/visites/sortie`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || "Erreur lors de la sortie.");
  return result;
};
