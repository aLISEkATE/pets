// JavaScript for Puzzle Game

const puzzleBoard = document.getElementById("puzzle-board");
const resetBtn = document.getElementById("reset-btn");

// Image to use for puzzle pieces (You can replace this with a pet image URL)
const imageUrl = 'https://via.placeholder.com/300x300'; // Placeholder image URL for puzzle

// Number of rows and columns for the puzzle
const rows = 3;
const cols = 3;

// Function to generate shuffled puzzle pieces
function generatePuzzle() {
    const pieces = [];
    for (let i = 0; i < rows * cols; i++) {
        pieces.push(i);
    }

    // Shuffle the pieces
    pieces.sort(() => Math.random() - 0.5);

    // Create puzzle pieces and add them to the board
    pieces.forEach((pieceIndex, idx) => {
        const row = Math.floor(pieceIndex / cols);
        const col = pieceIndex % cols;
        const piece = document.createElement("div");
        piece.classList.add("puzzle-piece");
        piece.style.backgroundImage = `url(${imageUrl})`;
        piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;

        // Set up the drag events
        piece.draggable = true;
        piece.setAttribute("data-index", pieceIndex);
        piece.setAttribute("data-position", pieceIndex);

        piece.addEventListener("dragstart", dragStart);
        piece.addEventListener("dragover", dragOver);
        piece.addEventListener("drop", drop);
        piece.addEventListener("dragend", dragEnd);

        puzzleBoard.appendChild(piece);
    });
}

// Drag and Drop functions
let draggedPiece = null;

function dragStart(event) {
    draggedPiece = event.target;
    event.dataTransfer.setData("text", draggedPiece.dataset.index);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const targetPiece = event.target;

    // Swap positions if the target is a puzzle piece
    if (targetPiece.classList.contains("puzzle-piece") && targetPiece !== draggedPiece) {
        const draggedIndex = draggedPiece.dataset.index;
        const targetIndex = targetPiece.dataset.index;

        // Swap the background positions
        const draggedPosition = draggedPiece.style.backgroundPosition;
        const targetPosition = targetPiece.style.backgroundPosition;

        draggedPiece.style.backgroundPosition = targetPosition;
        targetPiece.style.backgroundPosition = draggedPosition;

        // Swap the data-index values
        draggedPiece.dataset.index = targetIndex;
        targetPiece.dataset.index = draggedIndex;
    }
}

function dragEnd() {
    draggedPiece = null;

    // Check if the puzzle is solved
    checkPuzzleSolved();
}

// Check if the puzzle is solved
function checkPuzzleSolved() {
    const allPieces = document.querySelectorAll(".puzzle-piece");
    let isSolved = true;
    
    allPieces.forEach(piece => {
        if (piece.dataset.index !== piece.dataset.position) {
            isSolved = false;
        }
    });

    if (isSolved) {
        alert("Congratulations! You completed the puzzle.");
    }
}

// Reset the puzzle
function resetPuzzle() {
    puzzleBoard.innerHTML = "";
    generatePuzzle();
}

// Initialize the game
generatePuzzle();

// Add reset event listener
resetBtn.addEventListener("click", resetPuzzle);
