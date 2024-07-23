document.getElementById("replaceTextButton").addEventListener("click", () => {
  const textToReplace = document.getElementById("textToReplace").value;
  const replacementText = document.getElementById("replacementText").value;

  if (textToReplace) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: replaceTextInInputs,
        args: [textToReplace, replacementText]
      });
    });
  }
});

function replaceTextInInputs(textToReplace, replacementText) {
  const inputs = document.querySelectorAll('input[type="text"], textarea');
  inputs.forEach(input => {
    input.value = input.value.replace(new RegExp(textToReplace, 'gi'), replacementText);
    input.innerHTML = input.innerHTML.replace(new RegExp(textToReplace, 'gi'), replacementText);
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
}
