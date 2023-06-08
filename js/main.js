const floorInput = document.querySelector('.floorInput');
const liftInput = document.querySelector('.liftInput');
const errorMsg = document.querySelector('.errorMsg');
const backButton = document.querySelector('.backButton');
const simulateBtn = document.querySelector('.simulateBtn');
const simulationContainer = document.querySelector('.simulationContainer');

function getLiftArray() {
  return Array.from(document.querySelectorAll('.liftCar'), (el) => ({
    el,
    currentFloor: 0,
  }));
}

function moveLift(liftCar, targetFloor, currentFloor) {
  const distance = Math.abs(targetFloor - currentFloor);
  liftCar.style.backgroundColor = 'red';
  liftCar.style.transform = `translateY(-${targetFloor * 200}px)`;
  liftCar.style.transition = `transform ${distance * 2}s ease-in-out`;
}

function addListenersToLiftBtn() {
  const liftArray = getLiftArray();
  const liftUpBtn = document.querySelectorAll('.liftUpBtn');

  liftUpBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      const [_, floorNumber] = btn.id.split('-');
      const liftCar = document.querySelector(`#liftCar-0`);

      moveLift(liftCar, floorNumber, liftArray[0].currentFloor);
      liftArray[0].currentFloor = floorNumber;
    });
  });
}

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

    const upBtn = clonedfloorContainer.querySelector('.liftUpBtn');
    if (upBtn !== null) {
      upBtn.id = `liftUpBtn-${i}`;
    }

    if (i === 0) {
      // remove liftDownBtn from ground floor
      clonedfloorContainer.querySelector('.liftDownBtn').remove();
      createLifts(clonedfloorContainer.querySelector('.liftContainer'));
    }
    if (i === floorCount - 1) {
      // remove liftUpBtn from top floor
      clonedfloorContainer.querySelector('.liftUpBtn').remove();
    }
    simulationContainer.prepend(clonedfloorContainer);
  }
}

function createFloorsAndLifts() {
  const floorCount = floorInput.value;
  const liftCount = liftInput.value;

  if (!validateSubmission(floorCount, liftCount)) return;
  toggleFormVisibility(true);
  createFloors(floorCount);
  main();
}

function validateSubmission(floor, lift) {
  errorMsg.textContent = null;
  if (floor <= lift) {
    errorMsg.textContent = 'Floors must be greater than elevators';
    return false;
  }
  if (lift < 1) {
    errorMsg.textContent = 'At least 1 elevator is required';
    return false;
  }
  return true;
}
backButton.addEventListener('click', () => toggleFormVisibility(false));
simulateBtn.addEventListener('click', createFloorsAndLifts);

function main() {
  addListenersToLiftBtn();
}
