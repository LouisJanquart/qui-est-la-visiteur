export let currentStep = 1;
let history = [];

export function goToStep(step) {
  if (step !== currentStep) history.push(currentStep);
  document.querySelectorAll(".step").forEach((section) => {
    section.classList.toggle("hidden", +section.dataset.step !== step);
  });
  currentStep = step;
}

export function goBack() {
  const prev = history.pop();
  if (prev) goToStep(prev);
}

export function resetWizard() {
  history = [];
  goToStep(1);
}

// Navigation initiale
export function setupNavigation() {
  const actions = {
    entrer: () => goToStep(2),
    sortir: () => goToStep(5),
  };

  document.querySelectorAll("[data-action]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      if (actions[action]) actions[action]();
    });
  });

  document
    .querySelector('[data-deja-venu="oui"]')
    ?.addEventListener("click", () => goToStep(6));
  document
    .querySelector('[data-deja-venu="non"]')
    ?.addEventListener("click", () => goToStep(3));

  document
    .querySelector('[data-type="personnel"]')
    .addEventListener("click", () => {
      document.getElementById("type_visite").value = "personnel";
      document.getElementById("employe-group").classList.remove("hidden");
      document.getElementById("formation-group").classList.add("hidden");
      goToStep(4);
    });

  document
    .querySelector('[data-type="formation"]')
    .addEventListener("click", () => {
      document.getElementById("type_visite").value = "formation";
      document.getElementById("formation-group").classList.remove("hidden");
      document.getElementById("employe-group").classList.add("hidden");
      goToStep(4);
    });
}
