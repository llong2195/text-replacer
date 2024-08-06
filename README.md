# Text Replacer Extension

Text Replacer is a Chrome extension that allows you to replace text on the current page.

## Features

- Replace text in all input fields and text areas on the current page.
- Save and load find/replace values from local storage.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/text-replacer.git
   cd text-replacer
   ```

2. Open Chrome and navigate to `chrome://extensions/`.

3. Enable "Developer mode" by toggling the switch in the top right corner.

4. Click on "Load unpacked" and select the directory where you cloned the repository.

## Usage

1. Click on the Text Replacer extension icon in the Chrome toolbar to open the popup.

2. Enter the text you want to find in the "Find" input field.

3. Enter the text you want to replace it with in the "Replace with" input field.

4. Click the "Replace All" button to replace all occurrences of the text on the current page.

## Project Structure

- **background.js**: Handles background tasks for the extension.
- **manifest.json**: Configuration file for the Chrome extension.
- **popup.html**: HTML file for the extension's popup interface.
- **popup.js**: JavaScript file for the extension's popup logic.
- **styles.css**: CSS file for styling the popup interface.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
