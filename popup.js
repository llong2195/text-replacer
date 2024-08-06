// Load data from local storage and populate inputs on extension loading
document.addEventListener("DOMContentLoaded", () => {
  const textToReplaceInput = document.getElementById("textToReplace");
  const replacementTextInput = document.getElementById("replacementText");

  // Retrieve values from local storage
  const storedTextToReplace = localStorage.getItem("textToReplace");
  const storedReplacementText = localStorage.getItem("replacementText");

  // Set input values if they exist in local storage
  if (storedTextToReplace) {
    textToReplaceInput.value = storedTextToReplace;
  }
  if (storedReplacementText) {
    replacementTextInput.value = storedReplacementText;
  }
});

// Save input values to local storage on change
document.getElementById("textToReplace").addEventListener("change", (event) => {
  const textToReplace = event.target.value;
  localStorage.setItem("textToReplace", textToReplace);
});

document
  .getElementById("replacementText")
  .addEventListener("change", (event) => {
    const replacementText = event.target.value;
    localStorage.setItem("replacementText", replacementText);
  });

document.getElementById("replaceTextButton").addEventListener("click", () => {
  const textToReplace = document.getElementById("textToReplace").value;
  const replacementText = document.getElementById("replacementText").value;

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
