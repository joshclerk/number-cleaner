let cleanedNumbers = [];
let originalNumbers = []; // Store original cleaned numbers

function cleanNumber() {
    let input = document.getElementById('numberInput').value;
    
    // Regular expression to match various phone number formats
    let potentialNumbers = input.match(/(\+?1[\s-]?)?(\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4})/g);

    originalNumbers = potentialNumbers.map(number => {
        // Remove non-numeric characters
        number = number.replace(/\D/g, '');

        // Ensure the number has 10 digits, if not add leading '1'
        if (number.length === 10) {
            number = '1' + number;
        } else if (number.length === 11 && number.startsWith('1')) {
            // If the number is already in the format 1XXXXXXXXXX, do nothing
        } else if (number.length !== 11) {
            // Skip invalid numbers
            return null;
        }

        // Format number
        return `+${number}`;
    }).filter(number => number !== null);

    updateDisplay();
}

function updateDisplay() {
    let insertCommas = document.getElementById('insertCommas').checked;
    let removeDuplicates = document.getElementById('removeDuplicates').checked;

    cleanedNumbers = removeDuplicates ? [...new Set(originalNumbers)] : originalNumbers;

    let resultText = cleanedNumbers.join(insertCommas ? ', ' : ' ');
    document.getElementById('result').innerText = resultText;
}

function copyToClipboard() {
    const resultText = document.getElementById('result').innerText;
    navigator.clipboard.writeText(resultText).then(() => {
        alert('Number(s) copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}
