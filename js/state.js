export let currentStep = 1;
export let currentAction = null;
export let currentVisiteurId = null;

export const setStep = (step) => {
  currentStep = step;
};
export const setAction = (action) => {
  currentAction = action;
};
export const setVisiteurId = (id) => {
  currentVisiteurId = id;
};

export const resetState = () => {
  currentStep = 1;
  currentAction = null;
  currentVisiteurId = null;
};
