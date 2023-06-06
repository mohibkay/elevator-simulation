const floorInput = document.querySelector('.floorInput');
const liftInput = document.querySelector('.liftInput');
const errorMsg = document.querySelector('.errorMsg');
const simulateBtn = document.querySelector('.simulateBtn');

function hideFormShowLift(shouldHide) {
  const mainSection = document.querySelector('.mainSection');
  const formContainer = document.querySelector('.formContainer');
  mainSection.style.display = shouldHide ? 'block' : 'none';
  formContainer.style.display = shouldHide ? 'none' : 'block';
}

function createFloorsAndLifts() {
  const floors = floorInput.value;
  const lifts = liftInput.value;
  if (!validateSubmission(floors, lifts)) return;
  hideFormShowLift(true);
}

function calculateDistance(floor, lift) {
  return Math.abs(floor - lift);
}

function validateSubmission(floor, lift) {
  errorMsg.textContent = null;
  if (floor <= lift) {
    errorMsg.textContent = 'Floors must be greater than elevators';
    return false;
  }
  return true;
}

simulateBtn.addEventListener('click', createFloorsAndLifts);
