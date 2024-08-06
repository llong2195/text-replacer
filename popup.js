const APP_PREFIX = "__text_replace__";
const FIND_INPUT = "find-input";
const REPLACE_INPUT = "replace-input";
const REPLACE_ALL_BUTTON = "replace-all-button";
const REPLACE_BUTTON = "replace-button";
const FIND_BUTTON = "find-button";

// Load data from local storage and populate inputs on extension loading
document.addEventListener("DOMContentLoaded", () => {
  const textToReplaceInput = document.getElementById(FIND_INPUT);
  const replacementTextInput = document.getElementById(REPLACE_INPUT);

  // Retrieve values from local storage
  const storedTextToReplace = localStorage.getItem(
    `${APP_PREFIX}${FIND_INPUT}`
  );
  const storedReplacementText = localStorage.getItem(
    `${APP_PREFIX}${REPLACE_INPUT}`
  );

  // Set input values if they exist in local storage
  if (storedTextToReplace) {
    textToReplaceInput.value = storedTextToReplace;
  }
  if (storedReplacementText) {
    replacementTextInput.value = storedReplacementText;
  }

  onChangeInputValue();
});

function onChangeInputValue() {
  // Save input values to local storage on change
  document.getElementById(FIND_INPUT).addEventListener("change", (event) => {
    const textToReplace = event.target.value;
    localStorage.setItem(`${APP_PREFIX}${FIND_INPUT}`, textToReplace);
  });

  document.getElementById(REPLACE_INPUT).addEventListener("change", (event) => {
    const replacementText = event.target.value;
    localStorage.setItem(`${APP_PREFIX}${REPLACE_INPUT}`, replacementText);
  });

  document.getElementById(REPLACE_ALL_BUTTON).addEventListener("click", () => {
    const textToReplace = document.getElementById(FIND_INPUT).value;
    const replacementText = document.getElementById(REPLACE_INPUT).value;

    if (textToReplace) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: replaceTextInInputs,
          args: [textToReplace, replacementText],
        });
      });
    }
  });
}

function replaceTextInInputs(textToReplace, replacementText) {
  const inputs = document.querySelectorAll('input[type="text"], textarea');
  inputs.forEach((input) => {
    input.value = input.value.replace(
      new RegExp(textToReplace, "gi"),
      replacementText
    );
    input.innerHTML = input.innerHTML.replace(
      new RegExp(textToReplace, "gi"),
      replacementText
    );
    input.dispatchEvent(new Event("change", { bubbles: true }));
  });
}
