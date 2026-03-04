// Получение элементов DOM
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const speedElement = document.getElementById('speed');
const finalScoreElement = document.getElementById('finalScore');
const gameOverScreen = document.getElementById('gameOver');
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const pauseBtn = document.getElementById('pauseBtn');
const newGameBtn = document.getElementById('newGameBtn');

// Константы игры
const GRID_SIZE = 20;
const TILE_COUNT = canvas.width / GRID_SIZE;

// Переменные игры
let snake = [];
let snakeLength = 5;
let food = {};
let dx = 0;
let dy = 0;
let score = 0;
let highScore = 0;
let gameSpeed = 100;
let gameLoop = null;
let isPaused = false;
let isGameOver = false;
let isGameStarted = false;

// Направления
const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

// Инициализация игры
function initGame() {
    // Загрузка рекорда из localStorage
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
        highScore = parseInt(savedHighScore);
        highScoreElement.textContent = highScore;
    }
    
    // Инициализация змейки в центре
    snake = [];
    const startX = Math.floor(TILE_COUNT / 2);
    const startY = Math.floor(TILE_COUNT / 2);
    
    for (let i = 0; i < snakeLength; i++) {
        snake.push({ x: startX - i, y: startY });
    }
    
    // Начальное направление - вправо
    dx = 1;
    dy = 0;
    
    score = 0;
    gameSpeed = 100;
    isPaused = false;
    isGameOver = false;
    
    updateScore();
    generateFood();
}

// Генерация еды
function generateFood() {
    let foodPosition;
    let isValidPosition = false;
    
    while (!isValidPosition) {
        foodPosition = {
            x: Math.floor(Math.random() * TILE_COUNT),
            y: Math.floor(Math.random() * TILE_COUNT)
        };
        
        // Проверка, что еда не на змейке
        isValidPosition = true;
        for (let i = 0; i < snake.length; i++) {
            if (snake[i].x === foodPosition.x && snake[i].y === foodPosition.y) {
                isValidPosition = false;
                break;
            }
        }
    }
    
    food = foodPosition;
}

// Отрисовка игры
function draw() {
    // Очистка canvas
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Отрисовка сетки
    drawGrid();
    
    // Отрисовка еды с анимацией
    drawFood();
    
    // Отрисовка змейки
    drawSnake();
}

// Отрисовка сетки
function drawGrid() {
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= TILE_COUNT; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(canvas.width, i * GRID_SIZE);
        ctx.stroke();
    }
}

// Отрисовка змейки
function drawSnake() {
    for (let i = 0; i < snake.length; i++) {
        const segment = snake[i];
        
        // Градиент для змейки
        const gradient = ctx.createLinearGradient(
            segment.x * GRID_SIZE,
            segment.y * GRID_SIZE,
            segment.x * GRID_SIZE + GRID_SIZE,
            segment.y * GRID_SIZE + GRID_SIZE
        );
        
        if (i === 0) {
            // Голова змейки
            gradient.addColorStop(0, '#4CAF50');
            gradient.addColorStop(1, '#45a049');
        } else {
            // Тело змейки
            const opacity = 1 - (i / snake.length) * 0.3;
            gradient.addColorStop(0, `rgba(76, 175, 80, ${opacity})`);
            gradient.addColorStop(1, `rgba(69, 160, 73, ${opacity})`);
        }
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
            segment.x * GRID_SIZE + 1,
            segment.y * GRID_SIZE + 1,
            GRID_SIZE - 2,
            GRID_SIZE - 2
        );
        
        // Глаза для головы
        if (i === 0) {
            ctx.fillStyle = 'white';
            const eyeSize = 4;
            const eyeOffset = 6;
            
            if (dx === 1) { // Вправо
                ctx.fillRect(segment.x * GRID_SIZE + GRID_SIZE - eyeOffset, segment.y * GRID_SIZE + 4, eyeSize, eyeSize);
                ctx.fillRect(segment.x * GRID_SIZE + GRID_SIZE - eyeOffset, segment.y * GRID_SIZE + GRID_SIZE - 8, eyeSize, eyeSize);
            } else if (dx === -1) { // Влево
                ctx.fillRect(segment.x * GRID_SIZE + 2, segment.y * GRID_SIZE + 4, eyeSize, eyeSize);
                ctx.fillRect(segment.x * GRID_SIZE + 2, segment.y * GRID_SIZE + GRID_SIZE - 8, eyeSize, eyeSize);
            } else if (dy === -1) { // Вверх
                ctx.fillRect(segment.x * GRID_SIZE + 4, segment.y * GRID_SIZE + 2, eyeSize, eyeSize);
                ctx.fillRect(segment.x * GRID_SIZE + GRID_SIZE - 8, segment.y * GRID_SIZE + 2, eyeSize, eyeSize);
            } else if (dy === 1) { // Вниз
                ctx.fillRect(segment.x * GRID_SIZE + 4, segment.y * GRID_SIZE + GRID_SIZE - eyeOffset, eyeSize, eyeSize);
                ctx.fillRect(segment.x * GRID_SIZE + GRID_SIZE - 8, segment.y * GRID_SIZE + GRID_SIZE - eyeOffset, eyeSize, eyeSize);
            }
        }
    }
}

// Отрисовка еды с анимацией
function drawFood() {
    const time = Date.now() / 200;
    const pulse = Math.sin(time) * 2 + 2;
    
    // Тень
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(
        food.x * GRID_SIZE + GRID_SIZE / 2 + 1,
        food.y * GRID_SIZE + GRID_SIZE / 2 + 1,
        GRID_SIZE / 2 - 2 + pulse,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // Еда
    const gradient = ctx.createRadialGradient(
        food.x * GRID_SIZE + GRID_SIZE / 2,
        food.y * GRID_SIZE + GRID_SIZE / 2,
        0,
        food.x * GRID_SIZE + GRID_SIZE / 2,
        food.y * GRID_SIZE + GRID_SIZE / 2,
        GRID_SIZE / 2
    );
    gradient.addColorStop(0, '#ff6b6b');
    gradient.addColorStop(1, '#ee5a6f');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(
        food.x * GRID_SIZE + GRID_SIZE / 2,
        food.y * GRID_SIZE + GRID_SIZE / 2,
        GRID_SIZE / 2 - 2 + pulse,
        0,
        Math.PI * 2
    );
    ctx.fill();
}

// Обновление игры
function update() {
    if (isPaused || isGameOver || !isGameStarted) {
        return;
    }
    
    // Новая позиция головы
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // Проверка столкновения со стенами
    if (head.x < 0 || head.x >= TILE_COUNT || head.y < 0 || head.y >= TILE_COUNT) {
        endGame();
        return;
    }
    
    // Проверка столкновения с собой
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            endGame();
            return;
        }
    }
    
    // Добавление новой головы
    snake.unshift(head);
    
    // Проверка поедания еды
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScore();
        generateFood();
        
        // Увеличение скорости каждые 50 очков
        if (score % 50 === 0 && gameSpeed > 50) {
            gameSpeed -= 10;
            clearInterval(gameLoop);
            gameLoop = setInterval(gameStep, gameSpeed);
        }
    } else {
        // Удаление хвоста
        snake.pop();
    }
}

// Шаг игры
function gameStep() {
    update();
    draw();
}

// Обновление счета
function updateScore() {
    scoreElement.textContent = score;
    speedElement.textContent = Math.floor((100 - gameSpeed) / 10) + 1;
    
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        localStorage.setItem('snakeHighScore', highScore);
    }
}

// Завершение игры
function endGame() {
    isGameOver = true;
    clearInterval(gameLoop);
    finalScoreElement.textContent = score;
    gameOverScreen.classList.remove('hidden');
}

// Начало игры
function startGame() {
    initGame();
    startScreen.classList.add('hidden');
    gameOverScreen.classList.add('hidden');
    isGameStarted = true;
    
    if (gameLoop) {
        clearInterval(gameLoop);
    }
    
    gameLoop = setInterval(gameStep, gameSpeed);
    draw();
}

// Пауза
function togglePause() {
    if (!isGameStarted || isGameOver) {
        return;
    }
    
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Продолжить' : 'Пауза';
    
    if (isPaused) {
        clearInterval(gameLoop);
    } else {
        gameLoop = setInterval(gameStep, gameSpeed);
    }
}

// Обработка клавиатуры
document.addEventListener('keydown', function(event) {
    if (!isGameStarted || isGameOver) {
        return;
    }
    
    const key = event.key.toLowerCase();
    
    // Пауза на пробел
    if (key === ' ') {
        event.preventDefault();
        togglePause();
        return;
    }
    
    // Управление стрелками
    if (key === 'arrowup' || key === 'w') {
        if (dy === 0) {
            dx = 0;
            dy = -1;
        }
    } else if (key === 'arrowdown' || key === 's') {
        if (dy === 0) {
            dx = 0;
            dy = 1;
        }
    } else if (key === 'arrowleft' || key === 'a') {
        if (dx === 0) {
            dx = -1;
            dy = 0;
        }
    } else if (key === 'arrowright' || key === 'd') {
        if (dx === 0) {
            dx = 1;
            dy = 0;
        }
    }
});

// Обработчики кнопок
startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', togglePause);
newGameBtn.addEventListener('click', function() {
    if (isGameStarted) {
        if (confirm('Начать новую игру? Текущий прогресс будет потерян.')) {
            startGame();
        }
    }
});

// Инициализация при загрузке
window.addEventListener('load', function() {
    initGame();
    draw();
});
