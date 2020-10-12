document.addEventListener('DOMContentLoaded', () => {
	
	const displayStatus = document.querySelector('#status');
	let activeGame = true;
	let currentPlayer = "X";
	let gameState = ["", "", "", "", "", "", "", "", ""];
	const winner = () => `Player ${currentPlayer} has won!`;
	const drawgame = () => `It seems you have met your match!!!`;
	const currentPlayerTurn = () => ` It's ${currentPlayer}'s turn to play!`;
	
	const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
	function addBoard() {
		activeGame = true;
		let boarddiv = document.getElementById("board");
		let boardindiv = boarddiv.getElementsByTagName("div");
			for(var d=0; d<boardindiv.length; d++) {
				boardindiv[d].setAttribute("data-cell-index", d);
				boardindiv[d].setAttribute("class", "square"); 
			}	
	}
	
		
	function Played(squareClicked, squareindex) {
		gameState[squareIndex] = currentPlayer;
		squareClicked.innerHTML = currentPlayer;

	}
	
	
	function ClickedSquare(square_is_clicked) {
		const clicked_square = square_is_clicked.target;
		const index_of_square = parseInt(clicked_square.getAttribute('data-cell-index'));
		
		if (gameState[index_of_square] !== "" || !activeGame) {
        return;
		}  
		Played(clicked_square, index_of_square);
		GameResults();
	}

	function NextPlayer() {
		currentPlayer = currentPlayer === "X" ? "O" : "X";
		displayStatus.innerHTML = currentPlayerTurn();

	}
	
	function GameResults() {
		let roundWon = false;
		for (var i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
			}
		}
		if (roundWon) {
			displayStatus.innerHTML = winner();
			activeGame = false;
			return;
		}
		
		let roundDraw = !gameState.includes("");
		if (roundDraw) {
			displayStatus.innerHTML = drawgame();
			activeGame = false;
			return;
		}

	   NextPlayer();

	}
	
	function NewGame() {
		gameState = ["", "", "", "", "", "", "", "", ""];
		displayStatus.innerHTML = currentPlayerTurn();
		addBoard()

	}
	addBoard();
	document.querySelectorAll('div').forEach(cell => cell.addEventListener('click', ClickedSquare));
	document.querySelector('.btn').addEventListener('click', NewGame);
	
	
 })