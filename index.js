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

            if(win) return win
        }

        for(let i = 0; i < board.length; i++) {
            win = true
            if (board[i][board.length-i-1] !== symbol) {
                win = false
                break;
            } 

            if(win) return win
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

const ui = function () {

    const tiles = document.querySelectorAll(".tile")
    tiles.forEach((element, index) => {
        element.addEventListener('click', (e) => {
            const symbol = game.currentSymbol()
            if (!element.textContent) {
                element.textContent = symbol
                gameboard.updateBoard(index, symbol)
            } 
            
            console.log(gameboard.checkWin(symbol))
        })
    })
    
} ()

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
    
    return {currentSymbol}
} ()