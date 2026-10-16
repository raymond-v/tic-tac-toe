const Gameboard = (() => {
    let board = ['', '', '', '', '', '', '', '', '']

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', '']
    }

    const showBoard = () => {
        console.log(board)
    }
    const playerX = (num) => {
        if (num >= 0 && num < board.length && board[num] == '') {
            board[num] = 'X'
            return true
        } else {
            return false
        }
    }
    const playerO = (num) => {
        if (num >= 0 && num < board.length && board[num] == '') {
            board[num] = 'O'
            return true
        } else {
            return false
        }
    }
    const checkWinner = () => {
        let count = 0
        let current
        // row
        for (let i = 0; i < board.length; i++) {
            if (i == 0 || i == 3 || i == 6) {
                current = board[i]
                count = 0
            }
            if (current != '' && current == board[i]) {
                count++
                if (count > 2) {
                    return current
                }
            } else {
                count = 0
                current = undefined
            }
        }
        // column
        count = 0
        current = undefined
        for (let i = 0; i <= 2; i ++) {
            current = board[i]
            count = 0
            for (let j = i; j <= i+6; j+=3) {
                if (current != '' && current == board[j]) {
                    count++
                    if (count > 2) {
                        return current
                    }
                } else {
                    count = 0
                }
            }
        }
        // diagonal
        // left to right
        count = 0
        current = undefined
        for (let i = 0; i <= 8; i+=4) {
            current = board[0]
            if (current != '' && current == board[i]) {
                count++
                if (count > 2) {
                    return current
                }
            } else {
                count = 0
            }
        }
        // right to left
        count = 0
        current = undefined
        for (let i = 2; i <= 6; i+=2) {
            current = board[2]
            if (current != '' && current == board[i]) {
                count++
                if (count > 2) {
                    return current
                }
            } else {
                count = 0
            }
        }
        let total = 0
        board.forEach((spot) => {
            if (spot != '') {
                total++
            }
        })

        if (total == 9) {
            return 'Tie'
        }
    }
    return { resetBoard, showBoard, playerX, playerO, checkWinner }
})()

const GameLogic = (() => {
    const allTile = document.querySelectorAll('.tile')
    const results = document.querySelector('#results')
    let count = 0
    let gameOver = false

    allTile.forEach((tile) => {
        tile.addEventListener('click', () => {
            if (!gameOver) {
                let check
                if (count % 2 == 0) {
                    check = Gameboard.playerX(Number(tile.id))
                    if (check) {
                        tile.textContent = 'X'
                        count++
                    }
                } else {
                    check = Gameboard.playerO(Number(tile.id))
                    if (check) {
                        tile.textContent = 'O'
                        count++
                    }
                }
                if (check) {
                    const winner = Gameboard.checkWinner()
                        if (winner == 'X' || winner == 'O') {
                            results.textContent = `The winner is ${winner}`
                            gameOver = true
                        } else if (winner == 'Tie') {
                            results.textContent = `${winner}. There is no winner`
                            gameOver = true
                        }
                    }
            }
        })
    })
    const button = document.querySelector('#restart')
    button.addEventListener('click', () => {
        allTile.forEach((tile) => {
            tile.textContent = ''
        })
        results.textContent = ''
        Gameboard.resetBoard()
        gameOver = false
        count = 0
    })
})()