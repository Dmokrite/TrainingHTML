// add eventLisener on btn on click
const btns = document.querySelectorAll("span.btn");
const btnContainer = document.querySelector(".btns");
const btnSubmit = document.querySelector("button");
const questionEl = document.querySelector(".question");
const choiceEl = document.querySelector(".choice");
const selectedEl = document.querySelector(".selected");

/**
 * remove active class to all element with it
 */
function removeBtnClass() {
  /* remove active class on btn container so we can't submit
   if no selection done
   */
  if (btnContainer.classList.contains("active")) {
    btnContainer.classList.remove("active");
  }

  /* remove all active btn element */
  btns.forEach((el) => {
    if (el.classList.contains("active")) {
      el.classList.remove("active");
    }
  });
}

// for each btn element
btns.forEach((el) =>
  el.addEventListener("click", () => {
    // remove possibilities to submit if button is deselected
    if (el.classList.contains("active")) {
      el.classList.remove("active");
      // same with the button container
      btnContainer.classList.remove("active");
      // remove the event listener event, so no submit possible
      btnSubmit.removeEventListener("click", canSubmit);
      console.log("cannot click");
    } else {
      // remove all active btn
      removeBtnClass();
      el.classList.add("active");
      btnContainer.classList.add("active");
      // we add an event listener so we can submit again
      btnSubmit.addEventListener("click", canSubmit);
    }
    // add active class to this btn
  })
);

/**
 * give possibility to submit the selected element
 */
function canSubmit() {
  questionEl.style.display = "none";
  document.querySelector(".selected").style.display = "flex";

  // Get active element value
  const activeEl = document.querySelector(".btn.active");
  choiceEl.textContent = `You selected ${activeEl.dataset.val} out of 5`;
}

/* on the cached element, when visible, add the possibility to
to go back to hiding and show the first screen
*/
selectedEl.addEventListener("click", () => {
  // we unselect all active element
  removeBtnClass();
  selectedEl.style.display = "none";
  questionEl.style.display = "flex";
  questionEl.style.flexDirection = "column";
});