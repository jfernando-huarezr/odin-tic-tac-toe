const gameboard = (function () {

    const board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]

    const getBoard = function() {
        return board
    }

    const clearBoard = function () {
        board.forEach(element => {
            element.fill(0)
        })
    }

    const updateBoard = function (index, symbol) {
        board[Math.floor(index/3)][index%3] = symbol
    }

    const checkWin = function (symbol) {
        let win = true

        //horizontals
        for(let i = 0; i < board.length; i++) {
            win = true
            for(let j = 0; j < board[i].length; j++) {
                if (board[i][j] !== symbol) {
                    win = false
                    break;
                }
            }
            if(win) return win
        }

        //verticals
        for(let i = 0; i < board[0].length; i++) {
            win = true
            for(let j = 0; j < board.length; j++) {
                if (board[j][i] !== symbol) {
                    win = false
                    break;
                } 
            }
            if(win) return win
        }

        //diagonals
        for(let i = 0; i < board.length; i++) {
            win = true
            if (board[i][i] !== symbol)  {
                win = false
                break;
            }
        }

        if(win) return win

        for(let i = 0; i < board.length; i++) {
            win = true
            if (board[i][board.length-i-1] !== symbol) {
                win = false
                break;
            } 
        }    

        if(win) return win
    }

    const checkDraw = function () {
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                if(board[i][j] == 0) return false
            }
        }
        return true
    }

    return {getBoard, clearBoard, updateBoard, checkWin, checkDraw}
})()

const player =  function(name, symbol) {
    let points = 0
    const getPoints = function() { return points }
    const addPoints = function() {
        points++
    }

    const getName = function() { return name }
    const getSymbol = function () { return symbol}

    return {getName, getSymbol, getPoints, addPoints}
}

const ui = function (player1, player2) {

    const player1Name = document.querySelector(".player1 .name")
    const player2Name = document.querySelector(".player2 .name")
    const player1Points = document.querySelector(".player1 .points")
    const player2Points = document.querySelector(".player2 .points")

    const scoreSection = document.querySelector(".scores")
    const message = document.querySelector(".scores .message")
    const playAgain = document.querySelector(".scores button")

    player1Name.textContent = player1.getName()
    player2Name.textContent = player2.getName()
    player1Points.textContent = player1.getPoints()
    player2Points.textContent = player2.getPoints()

    const tiles = document.querySelectorAll(".tile")

    tiles.forEach((element, index) => {
        element.addEventListener('click', () => {
            const symbol = game.currentSymbol()

            if (!gameboard.checkWin(player1.getSymbol()) && !gameboard.checkWin(player2.getSymbol()) && !gameboard.checkDraw()) {
                if (!element.textContent) {
                    element.textContent = symbol
                    gameboard.updateBoard(index, symbol)
                } 
                    
                if(gameboard.checkWin(player1.getSymbol())) {
                    console.log("Player 1 Won")
                    player1.addPoints()
                    player1Points.textContent = player1.getPoints()
                    message.textContent = `${player1.getName()} Won`
                    scoreSection.classList.toggle("hidden")
                }
    
                else if (gameboard.checkWin(player2.getSymbol())) {
                    console.log("Player 2 Won")
                    player2.addPoints()
                    player2Points.textContent = player2.getPoints()
                    message.textContent = `${player2.getName()} Won`
                    scoreSection.classList.toggle("hidden")
                }

                else if (gameboard.checkDraw()) {
                    console.log("It's a draw!")
                    message.textContent = "It's a Draw"
                    scoreSection.classList.toggle("hidden")
                }
            }

        })
    })   

    playAgain.addEventListener('click', () => {
        console.log("play again")
        tiles.forEach(element => {
            element.textContent = ""
        })
        gameboard.clearBoard()
        scoreSection.classList.toggle("hidden")
    })
}

const game = function () {
    const player1 = player("Fernando", "X")
    const player2 = player("Anonimo", "O")
    let turn = 0

    const currentSymbol = function () {    
        if(!turn) {
            turn = 1
            return player1.getSymbol()            
        }
        else {
            turn = 0
            return player2.getSymbol()
        }
    }

    ui(player1, player2)

    
    return {currentSymbol}
} ()