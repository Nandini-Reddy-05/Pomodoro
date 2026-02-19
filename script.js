const WORK_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

let currentMode = 'work';
let timeLeft = WORK_TIME;
let isRunning = false;
let timerInterval = null;
let completedPomodoros = 0;
let totalMinutes = 0;
let currentStreak = 0;

const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');

function setMode(mode, event) {
    if (isRunning) return;

    currentMode = mode;

    document.querySelectorAll('.mode-btn').forEach(btn =>
        btn.classList.remove('active')
    );
    event.target.classList.add('active');

    if (mode === 'work') timeLeft = WORK_TIME;
    if (mode === 'short') timeLeft = SHORT_BREAK;
    if (mode === 'long') timeLeft = LONG_BREAK;

    updateDisplay();
}

function startTimer() {
    isRunning = true;
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';

    timerInterval = setInterval(() => {
        timeLeft--;
        totalMinutes++;

        if (timeLeft <= 0) completeTimer();

        updateDisplay();
        updateStats();
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

function resetTimer() {
    pauseTimer();

    if (currentMode === 'work') timeLeft = WORK_TIME;
    if (currentMode === 'short') timeLeft = SHORT_BREAK;
    if (currentMode === 'long') timeLeft = LONG_BREAK;

    updateDisplay();
}

function completeTimer() {
    pauseTimer();

    if (currentMode === 'work') {
        completedPomodoros++;
        currentStreak++;
        alert("🎉 Work session completed!");
    } else {
        alert("✅ Break finished!");
    }

    resetTimer();
    updateStats();
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
}

function updateStats() {
    document.getElementById('completedPomodoros').textContent = completedPomodoros;
    document.getElementById('totalMinutes').textContent = Math.floor(totalMinutes / 60);
    document.getElementById('currentStreak').textContent = currentStreak;
}

updateDisplay();
