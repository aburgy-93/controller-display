let controllerIndex = null;

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("gamepadconnected", (e) => {
    const gamepad = e.gamepad;
    controllerIndex = gamepad.index; // Use let or const to declare controllerIndex
    console.log("Gamepad connected at index: " + controllerIndex);
    gameLoop();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("gamepaddisconnected", (e) => {
    controllerIndex = null;
    console.log("disconnected");
  });
});

function handleButtons(buttons) {
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    const buttonEl = document.getElementById(`controller-b${i}`);
    const selectedButtonClass = "selected-button";

    if (buttonEl) {
      if (button.value > 0) {
        buttonEl.classList.add(selectedButtonClass);
        buttonEl.style.filter = `contrast(${button.value * 150}%)`;
      } else {
        buttonEl.classList.remove(selectedButtonClass);
        buttonEl.style.filter = `contrast(100%)`;
      }
    }
  }
}

function updateStick(elID, leftRightAxis, upDownAxis) {
  const multiplier = 25;
  const stickLeftRight = leftRightAxis * multiplier;
  const stickUpDown = upDownAxis * multiplier;

  const stick = document.getElementById(elID);
  const x = Number(stick.dataset.originalXPosition);
  const y = Number(stick.dataset.originalYPosition);

  stick.setAttribute("cx", x + stickLeftRight);
  stick.setAttribute("cy", y + stickUpDown);
}

function handleSticks(axes) {
  updateStick("controller-b10", axes[0], axes[1]);
  updateStick("controller-b11", axes[2], axes[3]);
}

function gameLoop() {
  if (controllerIndex !== null) {
    const gamepad = navigator.getGamepads()[controllerIndex];
    handleButtons(gamepad.buttons);
    handleSticks(gamepad.axes);
  }
  requestAnimationFrame(gameLoop);
}
