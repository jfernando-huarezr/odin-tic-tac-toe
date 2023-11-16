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

        // //horizontals
        // for(let i = 0; i < board.length; i++) {
        //     win = true
        //     for(let j = 0; j < board[i].length; j++) {
        //         if (board[i][j] !== symbol) {
        //             win = false
        //             break;
        //         }
        //     }
        //     if(win) return win
        // }

        // //verticals
        // for(let i = 0; i < board[0].length; i++) {
        //     win = true
        //     for(let j = 0; j < board.length; j++) {
        //         if (board[j][i] !== symbol) {
        //             win = false
        //             break;
        //         } 
        //     }
        //     if(win) return win
        // }

        //diagonals
        for(let i = 0; i < board.length; i++) {
            win = true
            console.log(i)
            if (board[i][i] !== symbol)  {
                win = false
                break;
            }
        }

        for(let i = 0; i < board.length; i++) {
            win = true
            if (board[i][board.length-i-1] !== symbol) {
                win = false
                break;
            } 
        }    

        return win
    }

    return {getBoard, clearBoard, updateBoard, checkWin}
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

    const tiles = document.querySelectorAll(".tile")
    tiles.forEach((element, index) => {
        element.addEventListener('click', () => {
            const symbol = game.currentSymbol()
            console.log(gameboard.checkWin(player1.getSymbol()))

            if (!gameboard.checkWin(player1.getSymbol()) && !gameboard.checkWin(player2.getSymbol())) {
                if (!element.textContent) {
                    element.textContent = symbol
                    gameboard.updateBoard(index, symbol)
                } 
                    
                if(gameboard.checkWin(player1.getSymbol())) {
                    console.log("Player 1 Won")
                }
    
                else if (gameboard.checkWin(player2.getSymbol())) {
                    console.log("Player 2 Won")
                }
            }    
        })
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