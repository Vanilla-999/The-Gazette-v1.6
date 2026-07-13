// 1. БИБЛИОТЕКА ДОСОК
const allBoards = {
    "2026-07-13": [
        [5,3,0,0,7,0,0,0,0], [6,0,0,1,9,5,0,0,0], [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3], [4,0,0,8,0,3,0,0,1], [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0], [0,0,0,4,1,9,0,0,5], [0,0,0,0,8,0,0,7,9]
    ],
    "2026-07-14": [
        [0,0,0,2,6,0,7,0,1], [6,8,0,0,7,0,0,9,0], [1,9,0,0,0,4,5,0,0],
        [8,2,0,1,0,0,0,4,0], [0,0,4,6,0,2,9,0,0], [0,5,0,0,0,3,0,2,8],
        [0,0,9,3,0,0,0,7,4], [0,4,0,0,5,0,0,3,6], [7,0,3,0,1,8,0,0,0]
    ]
};

// 2. ОПРЕДЕЛЕНИЕ ДНЯ
const today = new Date().toISOString().split('T')[0];
// Выбираем доску на сегодня. Если доски на сегодня нет в списке, берем первую попавшуюся (дефолтную)
const board = allBoards[today] || allBoards["2026-07-13"];

// 3. ЛОГИКА ЕЖЕДНЕВНОГО СБРОСА
const savedDate = localStorage.getItem('sudokuDate');
if (savedDate !== today) {
    localStorage.removeItem('sudokuProgress'); // Удаляем старый прогресс
    localStorage.setItem('sudokuDate', today); // Обновляем дату в памяти
}

// 4. ЗАГРУЗКА ИГРЫ
const savedBoard = localStorage.getItem('sudokuProgress');
const currentBoard = savedBoard ? JSON.parse(savedBoard) : JSON.parse(JSON.stringify(board));

// 5. ФУНКЦИЯ ОТРИСОВКИ (твоя логика остается прежней)
function createBoard() {
    const boardElement = document.getElementById('sudoku-board');
    boardElement.innerHTML = '';
    
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const input = document.createElement('input');
            input.type = 'number';
            
            if (currentBoard[row][col] !== 0) {
                input.value = currentBoard[row][col];
            }
            
            if (board[row][col] !== 0) {
                input.disabled = true;
                input.style.backgroundColor = '#f0f0f0';
            } else {
                input.addEventListener('input', function() {
                    if (this.value.length > 1) this.value = this.value.slice(0, 1);
                    if (this.value === '0') this.value = '';
                    
                    currentBoard[row][col] = this.value ? parseInt(this.value) : 0;
                    localStorage.setItem('sudokuProgress', JSON.stringify(currentBoard));
                });
            }
            boardElement.appendChild(input);
        }
    }
}

// 6. НАВИГАЦИЯ (твой код)
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page-view');

navItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
        pages.forEach(page => page.classList.remove('active'));
        const targetId = this.getAttribute('href') + '-view'; 
        document.querySelector(targetId).classList.add('active');
    });
});

const allBoards = {
    "2026-07-13": {
        puzzle: [ /* твой массив с нулями */ ],
        solution: [ /* полностью заполненная доска с правильными ответами */ ]
    }
};

// Внутри слушателя input:
input.addEventListener('input', function() {
    // ... твой код ограничения ...
    
    const val = this.value ? parseInt(this.value) : 0;
    currentBoard[row][col] = val;
    localStorage.setItem('sudokuProgress', JSON.stringify(currentBoard));

    // ЛОГИКА СКОРА
    const sol = allBoards[today].solution[row][col];
    if (val !== 0) {
        if (val === sol) {
            this.style.color = 'green'; // Правильно
        } else {
            this.style.color = 'red';   // Ошибка
        }
    }
    updateScore();
});

// ФУНКЦИЯ ОБНОВЛЕНИЯ СКОРА
function updateScore() {
    let score = 0;
    const sol = allBoards[today].solution;
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (currentBoard[r][c] !== 0 && currentBoard[r][c] === sol[r][c]) {
                score += 10; // +10 очков за каждую верную цифру
            }
        }
    }
    document.getElementById('sudoku-score').innerText = score;
}

createBoard();