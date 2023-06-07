const floorInput = document.querySelector('.floorInput');
const liftInput = document.querySelector('.liftInput');
const errorMsg = document.querySelector('.errorMsg');
const backButton = document.querySelector('.backButton');
const simulateBtn = document.querySelector('.simulateBtn');
const simulationContainer = document.querySelector('.simulationContainer');

function toggleFormVisibility(shouldHide) {
  const mainSection = document.querySelector('.mainSection');
  const formContainer = document.querySelector('.formContainer');
  mainSection.style.display = shouldHide ? 'block' : 'none';
  formContainer.style.display = shouldHide ? 'none' : 'block';
}

function createFloors() {
  const floors = floorInput.value;
  const lifts = liftInput.value;
  if (!validateSubmission(floors, lifts)) return;
  toggleFormVisibility(true);

  const floorContainer = document.querySelector('.floorContainer');
  simulationContainer.innerHTML = ''; // Clear the simulationContainer

  for (let i = 0; i < floors; i++) {
    const clonedfloorContainer = floorContainer.cloneNode(true);
    clonedfloorContainer.querySelector(
      '.floorNumber'
    ).textContent = `Floor ${i}`;
    console.log(`Floor ${i}`);
    simulationContainer.prepend(clonedfloorContainer);
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
simulateBtn.addEventListener('click', createFloors);
