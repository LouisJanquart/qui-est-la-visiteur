export let currentStep = 1;
export let currentAction = null;
export let currentVisiteurId = null;

export function setStep(step) {
  currentStep = step;
}

export function setAction(action) {
  currentAction = action;
}

export function setVisiteurId(id) {
  currentVisiteurId = id;
}

export function resetState() {
  currentStep = 1;
  currentAction = null;
  currentVisiteurId = null;
}
