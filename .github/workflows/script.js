const departments = ["Manufacturing", "Quality Assurance", "Quality Control", "Supply Chain", "Process Development"];
let shuffledDepartments = shuffle(departments);
let boxes = [false, false, false, false, false];

// Array of GIFs
let gifs = [
    'https://media.giphy.com/media/XmbsL1sfBEsbS/giphy.gif',
    'https://media.giphy.com/media/Jtjz6djMj7o9ToRSDp/giphy.gif',
    'https://media.giphy.com/media/W80Y9y1XwiL84/giphy.gif',
    'https://media.giphy.com/media/oaRG0HAau2X1SU7BTw/giphy.gif',
    'https://media.giphy.com/media/1xpCU3KvBgCeSq1TQH/giphy.gif'
];

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function revealBox(index) {
    if (boxes[index]) return; // If already revealed, do nothing
    
    const selectedDepartment = shuffledDepartments[index];
    document.getElementById('next-speaker').innerText = `Next Speaker: ${selectedDepartment}`;
    
    // Randomly select a GIF from the array of available GIFs
    const randomIndex = Math.floor(Math.random() * gifs.length);
    const randomGif = gifs[randomIndex];
    
    // Remove the selected GIF from the array so it can't be played again
    gifs.splice(randomIndex, 1);

    const gifElement = document.getElementById('gif');
    gifElement.src = randomGif; // Set the source of the GIF
    gifElement.style.display = 'block'; // Show the GIF
    
    // Hide the GIF after 5 seconds
    setTimeout(() => {
        gifElement.style.display = 'none';
    }, 5000);
    
    const selectedBox = document.querySelectorAll('.box')[index];
    selectedBox.innerHTML = selectedDepartment;
    selectedBox.style.pointerEvents = 'none'; // Disable further clicks
    selectedBox.style.backgroundColor = '#333'; // Make it look "selected"
    boxes[index] = true;
    
    checkIfAllSelected();
}

function checkIfAllSelected() {
    if (boxes.every(box => box)) {
        setTimeout(() => {
            alert("All departments have been revealed!");
            resetGame();
        }, 1000);
    }
}

function resetGame() {
    shuffledDepartments = shuffle(departments);
    boxes = [false, false, false, false, false];
    
    // Reset GIFs array to allow replaying of the game
    gifs = [
        'https://media.giphy.com/media/XmbsL1sfBEsbS/giphy.gif',
        'https://media.giphy.com/media/KBfKueAjIJV8Q/giphy.gif',
        'https://media.giphy.com/media/W80Y9y1XwiL84/giphy.gif',
        'https://media.giphy.com/media/KecXbQcnd7oeBrF8U0/giphy.gif',
        'https://media.giphy.com/media/FY8c5SKwiNf1EtZKGs/giphy.gif'
    ];

    const allBoxes = document.querySelectorAll('.box');
    allBoxes.forEach((box, index) => {
        box.innerHTML = index + 1; // Reset to numbers
        box.style.pointerEvents = 'auto'; // Enable clicking again
        box.style.backgroundColor = '#006680'; // Reset color
    });
    document.getElementById('next-speaker').innerText = "Next Speaker: None";
    document.getElementById('gif').style.display = 'none';
}