const floorInput = document.querySelector('.floorInput');
const liftInput = document.querySelector('.liftInput');
const errorMsg = document.querySelector('.errorMsg');
const backButton = document.querySelector('.backButton');
const simulateBtn = document.querySelector('.simulateBtn');

function toggleFormVisibility(shouldHide) {
  const mainSection = document.querySelector('.mainSection');
  const formContainer = document.querySelector('.formContainer');
  mainSection.style.display = shouldHide ? 'block' : 'none';
  formContainer.style.display = shouldHide ? 'none' : 'block';
}

function createFloorsAndLifts() {
  const floors = floorInput.value;
  const lifts = liftInput.value;
  if (!validateSubmission(floors, lifts)) return;
  toggleFormVisibility(true);

  // dynamically generate floors
  for (let i = 0; i < floors; i++) {
    const floor = document.createElement('div');
    floor.classList.add('floor');
    floor.textContent = i + 1;
    document.querySelector('.floorsContainer').appendChild(floor);
  }
}

function validateSubmission(floor, lift) {
  errorMsg.textContent = null;
  if (floor <= lift) {
    errorMsg.textContent = 'Floors must be greater than elevators';
    return false;
  }
  return true;
}
backButton.addEventListener('click', () => toggleFormVisibility(false));
simulateBtn.addEventListener('click', createFloorsAndLifts);
