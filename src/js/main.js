let buttons = document.querySelectorAll('.liftCallBtn');
let liftEls = document.querySelectorAll('.liftContainer');
const floorsContainer = document.querySelector('.floors');
let floors = document.querySelectorAll('.floor');
const floorInput = document.querySelector('.floorInput');
const liftInput = document.querySelector('.liftInput');
const errorMsg = document.querySelector('.errorMsg');
const backButton = document.querySelector('.backButton');
const simulateBtn = document.querySelector('.simulateBtn');
const simulationContainer = document.querySelector('.simulationContainer');
let leftDoors = document.querySelectorAll('.leftDoor');
let rightDoors = document.querySelectorAll('.rightDoor');

const lifts = Array.from(document.querySelectorAll('.liftContainer'), (el) => ({
  el,
  isAvailable: true,
  currentFloor: 0,
}));

function getClosestLiftAvailable(targetFloor) {
  const emptyLifts = lifts.reduce((result, value, i) => {
    if (value.isAvailable === true) {
      result.push({
        i,
        currentFloor: value.currentFloor,
        distance: Math.abs(targetFloor - value.currentFloor),
      });
    }
    return result;
  }, []);

  if (emptyLifts.length <= 0) {
    return { lift: {}, index: -1 };
  }

  const closestLift = emptyLifts.reduce((result, value) =>
    value.distance < result.distance ? value : result
  );

  const index = closestLift.i;

  return { lift: lifts[index], index };
}

const callLift = () => {
  const { lift, index } = getClosestLiftAvailable(
    requests[requests.length - 1]
  );

  if (index >= 0) {
    lifts[index].isAvailable = false;
    let getFirstRequest;
    if (requests.length > 0) {
      getFirstRequest = requests.shift();
    }
    moveLift(lift.el, getFirstRequest, index);
  }
};

const openLift = (index) => {
  rightDoors[index].classList.add('rightDoor__open');
  leftDoors[index].classList.add('leftDoor__open');
};

const closeLift = (index) => {
  rightDoors[index].classList.remove('rightDoor__open');
  leftDoors[index].classList.remove('leftDoor__open');

  setTimeout(() => {
    lifts[index].isAvailable = true;
    dispatchliftIdle();
  }, 2500);
};

const openCloseLift = (index) => {
  openLift(index);
  setTimeout(() => {
    closeLift(index);
  }, 3000);
};

const moveLift = (lift, targetFloor, index) => {
  const liftHeight = lift.clientHeight + 1;
  const distance = Math.abs(targetFloor - lifts[index].currentFloor);
  lift.style.transform = `translateY(-${targetFloor * liftHeight}px)`;
  lift.style.transition = `transform ${2000 * distance}ms linear`;

  setTimeout(() => {
    openCloseLift(index);
  }, distance * 2000 + 1000);

  lifts[index].currentFloor = targetFloor;
};

let requests = [];

function addRequest(targetFloor) {
  requests.push(targetFloor);
  dispatchRequestAdded();
}

function removeRequest() {
  if (requests.length > 0) {
    requests.shift();
  }
}

const requestAddedEvent = new Event('requestAdded');
const liftIdleEvent = new Event('liftIdle');

function dispatchRequestAdded() {
  document.dispatchEvent(requestAddedEvent);
}

function dispatchliftIdle() {
  document.dispatchEvent(liftIdleEvent);
}

document.addEventListener('requestAdded', () => {
  callLift();
});

document.addEventListener('liftIdle', () => {
  if (!(requests.length === 0)) {
    callLift();
  }
});

function addLift() {
  floors[floors.length - 1].append(getLiftEl());
  liftEls = document.querySelectorAll('.liftContainer');
  lifts.push({
    el: liftEls[liftEls.length - 1],
    isAvailable: true,
    currentFloor: 0,
  });

  rightDoors = document.querySelectorAll('.rightDoor');
  leftDoors = document.querySelectorAll('.leftDoor');
}

function getLiftEl() {
  const liftEL = document.createElement('div');
  liftEL.classList.add('liftContainer');

  liftEL.innerHTML += `
            <div class="leftDoor">
            </div>
            <div class="rightDoor">
            </div>
        `;
  return liftEL;
}

function addFloor() {
  floorsContainer.prepend(getFloorEl());
  floors = document.querySelectorAll('.floor');
  buttons = document.querySelectorAll('.liftCallBtn');
  addCallLiftListeners([buttons[0], buttons[1]]);
}

function getFloorEl() {
  const newLiftNum = floors.length;

  const floorEl = document.createElement('div');
  floorEl.classList.add('floor');
  floorEl.innerHTML += `
          <div class="liftButtons">
          <button class="liftCallBtn liftUpBtn" data-lift-num="${newLiftNum}">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2rem"
            viewBox="0 0 512 512"
          >
            <path
              d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM135.1 217.4c-4.5 4.2-7.1 10.1-7.1 16.3c0 12.3 10 22.3 22.3 22.3H208v96c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V256h57.7c12.3 0 22.3-10 22.3-22.3c0-6.2-2.6-12.1-7.1-16.3L269.8 117.5c-3.8-3.5-8.7-5.5-13.8-5.5s-10.1 2-13.8 5.5L135.1 217.4z"
            />
          </svg>
          </button>
          <button class="liftCallBtn liftDownBtn" data-lift-num="${newLiftNum}">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2rem"
            viewBox="0 0 512 512"
          >
            <path
              d="M256 464a208 208 0 1 1 0-416 208 208 0 1 1 0 416zM256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM376.9 294.6c4.5-4.2 7.1-10.1 7.1-16.3c0-12.3-10-22.3-22.3-22.3H304V160c0-17.7-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32v96H150.3C138 256 128 266 128 278.3c0 6.2 2.6 12.1 7.1 16.3l107.1 99.9c3.8 3.5 8.7 5.5 13.8 5.5s10.1-2 13.8-5.5l107.1-99.9z"
            />
          </svg>
          </button>
        </div>
                `;

  if (newLiftNum === 0) {
    floorEl.querySelector('.liftDownBtn').style.display = 'none';
  }
  if (newLiftNum === floorInput.value - 1) {
    floorEl.querySelector('.liftUpBtn').style.display = 'none';
  }
  return floorEl;
}

function addCallLiftListeners(buttons) {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      addRequest(buttons[i].dataset.liftNum);
    });
  }
}

function toggleFormVisibility(shouldHide) {
  const mainSection = document.querySelector('.mainSection');
  const formContainer = document.querySelector('.formContainer');
  mainSection.style.display = shouldHide ? 'block' : 'none';
  formContainer.style.display = shouldHide ? 'none' : 'block';
}

function validateSubmission(floor, lift) {
  const width = window.innerWidth;
  const divisor = width < 450 ? 70 : 130;
  const maxLiftAllowed = Math.floor(width / divisor);

  errorMsg.textContent = null;
  if (floor < lift) {
    errorMsg.textContent = 'Floors must be greater than elevators';
    return false;
  }
  if (lift < 1) {
    errorMsg.textContent = 'At least 1 elevator is required';
    return false;
  }
  if (lift > maxLiftAllowed) {
    errorMsg.textContent = `Max ${maxLiftAllowed} elevators are allowed`;
    return false;
  }
  return true;
}

function createFloorsAndLifts() {
  const floor = floorInput.value;
  const lift = liftInput.value;

  if (!validateSubmission(floor, lift)) return;
  toggleFormVisibility(true);
  main();

  for (let i = 0; i < floor; i++) {
    addFloor();
  }

  for (let i = 0; i < lift; i++) {
    addLift();
  }
}

function main() {
  floorsContainer.innerHTML = '';
  addCallLiftListeners(buttons);
}

backButton.addEventListener('click', () => toggleFormVisibility(false));
simulateBtn.addEventListener('click', createFloorsAndLifts);
