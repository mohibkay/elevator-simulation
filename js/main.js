const floorInput = document.querySelector('.floorInput');
const liftInput = document.querySelector('.liftInput');
const errorMsg = document.querySelector('.errorMsg');
const simulateBtn = document.querySelector('.simulateBtn');

function createFloorsAndLifts() {
  console.log('running');
  validateSubmission(floorInput.value, liftInput.value);
}

function validateSubmission(floor, lift) {
  errorMsg.textContent = null;
  if (floor <= lift) {
    errorMsg.textContent = 'Floors must be greater than elevators';
  }
}

simulateBtn.addEventListener('click', createFloorsAndLifts);
