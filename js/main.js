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

function createLifts(liftContainer) {
  const liftCount = liftInput.value;
  for (let j = 0; j < liftCount; j++) {
    const liftCar = document.createElement('div');
    liftCar.classList.add('liftCar');
    liftCar.id = `liftCar-${j}`;
    liftContainer.append(liftCar);
  }
}

function createFloors(floorCount) {
  const floorContainer = document.querySelector('.floorContainer');
  simulationContainer.innerHTML = ''; // Clear the simulationContainer

  for (let i = 0; i < floorCount; i++) {
    const clonedfloorContainer = floorContainer.cloneNode(true);
    clonedfloorContainer.querySelector(
      '.floorNumber'
    ).textContent = `Floor ${i}`;
    if (i === 0) {
      createLifts(clonedfloorContainer.querySelector('.liftContainer'));
    }
    simulationContainer.prepend(clonedfloorContainer);
  }
}

function createFloorsAndLifts() {
  const floorCount = floorInput.value;
  const liftCount = liftInput.value;

  if (!validateSubmission(floorCount, liftCount)) return;
  toggleFormVisibility(true);
  createFloors(floorCount, liftCount);
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
