// ==================== GLOBAL VARIABLES ====================
let currentTheme = 'light';
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let savedQuotes = JSON.parse(localStorage.getItem('savedQuotes')) || [];
let goals = JSON.parse(localStorage.getItem('goals')) || [];
let pomodoroCount = parseInt(localStorage.getItem('pomodoroCount')) || 0;
let totalFocusTime = parseInt(localStorage.getItem('totalFocusTime')) || 0;
let plannerData = JSON.parse(localStorage.getItem('plannerData')) || {};

// ==================== THEME TOGGLE ====================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    currentTheme = savedTheme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    const themeBtn = document.getElementById('themeBtn');
    const icon = themeBtn.querySelector('i');
    const text = themeBtn.querySelector('span') || document.createTextNode('');
    
    themeBtn.innerHTML = '';
    themeBtn.appendChild(icon);
    themeBtn.appendChild(text);
    
    if (currentTheme === 'dark') {
        icon.className = 'fas fa-sun';
        text.textContent = ' Light Mode';
    } else {
        icon.className = 'fas fa-moon';
        text.textContent = ' Dark Mode';
    }
    
    themeBtn.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    initTheme();
}

// ==================== DATE AND TIME ====================
function updateDateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    const timeStr = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    
    const dateElement = document.getElementById('currentDate');
    const timeElement = document.getElementById('currentTime');
    
    if (dateElement) dateElement.textContent = dateStr;
    if (timeElement) timeElement.textContent = `Current Time: ${timeStr}`;
}

// ==================== PAGE NAVIGATION ====================
function openFeature() {
    const allElems = document.querySelectorAll(".elem");
    const allFullElems = document.querySelectorAll(".fullElems");

    allElems.forEach(function (elem, index) {
        elem.addEventListener("click", function () {
            allFullElems[index].style.display = "block";
            
            switch(index) {
                case 0:
                    initTodoList();
                    break;
                case 1:
                    initDailyPlanner();
                    break;
                case 2:
                    motivationFeature();
                    break;
                case 3:
                    initPomodoro();
                    break;
                case 4:
                    initGoals();
                    break;
            }
        });
    });

    allFullElems.forEach(function (fullElem) {
        const closeBtn = fullElem.querySelector(".close");

        if (closeBtn) {
            closeBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                fullElem.style.display = "none";
                
                if (fullElem.classList.contains('pomodoroPage')) {
                    resetPomodoro();
                }
            });
        }
    });
}

// ==================== TO DO LIST FEATURE ====================
function initTodoList() {
    const todoForm = document.querySelector('.todoForm');
    const todoList = document.querySelector('.todoList');
    const clearTasksBtn = document.getElementById('clearTasksBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const taskCount = document.querySelector('.task-count');
    
    renderTodoList();
    
    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('taskTitle').value.trim();
        const desc = document.getElementById('taskDesc').value.trim();
        const priority = document.getElementById('taskPriority').value;
        
        if (!title) {
            alert('Please enter a task title');
            return;
        }
        
        const newTask = {
            id: Date.now(),
            title: title,
            description: desc,
            priority: priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTodoList();
        todoForm.reset();
    });
    
    clearTasksBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all tasks?')) {
            tasks = [];
            saveTasks();
            renderTodoList();
        }
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderTodoList(this.dataset.filter);
        });
    });
    
    function renderTodoList(filter = 'all') {
        todoList.innerHTML = '';
        
        let filteredTasks = tasks;
        if (filter === 'pending') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }
        
        if (filteredTasks.length === 0) {
            todoList.innerHTML = `
                <div class="empty-tasks">
                    <i class="fas fa-clipboard-list"></i>
                    <h3>No tasks found</h3>
                    <p>Add your first task using the form on the left</p>
                </div>
            `;
            taskCount.textContent = '(0)';
            return;
        }
        
        filteredTasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.innerHTML = `
                <div class="task-content">
                    <h4>${task.title}</h4>
                    ${task.description ? `<p>${task.description}</p>` : ''}
                    <span class="task-priority priority-${task.priority}">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority</span>
                </div>
                <div class="task-actions">
                    <button class="task-btn complete-btn" data-id="${task.id}">
                        <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i>
                    </button>
                    <button class="task-btn delete-btn" data-id="${task.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            todoList.appendChild(taskItem);
        });
        
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(t => t.completed).length;
        taskCount.textContent = `(${completedTasks}/${totalTasks})`;
        
        document.querySelectorAll('.complete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const taskId = parseInt(this.dataset.id);
                const task = tasks.find(t => t.id === taskId);
                if (task) {
                    task.completed = !task.completed;
                    saveTasks();
                    renderTodoList(document.querySelector('.filter-btn.active').dataset.filter);
                }
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const taskId = parseInt(this.dataset.id);
                tasks = tasks.filter(t => t.id !== taskId);
                saveTasks();
                renderTodoList(document.querySelector('.filter-btn.active').dataset.filter);
            });
        });
    }
    
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// ==================== DAILY PLANNER FEATURE ====================
function initDailyPlanner() {
    const plannerContainer = document.querySelector('.planner-container');
    const plannedHoursEl = document.getElementById('plannedHours');
    const completedHoursEl = document.getElementById('completedHours');
    const remainingHoursEl = document.getElementById('remainingHours');
    
    if (plannerContainer) {
        plannerContainer.innerHTML = '';
    }
    
    // Check if it's a new day - FIXED VERSION
    const today = new Date().toDateString();
    const lastSavedDate = localStorage.getItem('plannerDate');
    
    // Agar last saved date nahi hai ya alag day hai, to naye din ke liye data clear karo
    if (!lastSavedDate || lastSavedDate !== today) {
        // Naye din ke liye data clear karo
        plannerData = {};
        localStorage.setItem('plannerData', JSON.stringify(plannerData));
        localStorage.setItem('plannerDate', today);
    } else {
        // Same day hai to saved data load karo
        const savedData = localStorage.getItem('plannerData');
        if (savedData) {
            try {
                plannerData = JSON.parse(savedData);
            } catch (e) {
                console.error('Error parsing planner data:', e);
                plannerData = {};
            }
        }
    }
    
    // Debugging ke liye console mein data check karo
    console.log('Planner Data:', plannerData);
    console.log('Today:', today);
    console.log('Last Saved Date:', lastSavedDate);
    
    // Generate hour slots
    for (let hour = 8; hour <= 22; hour++) {
        const timeLabel = hour <= 12 ? `${hour} AM` : `${hour - 12} PM`;
        if (hour === 12) timeLabel = '12 PM';
        const time24 = `${hour.toString().padStart(2, '0')}:00`;
        
        // Get data for this hour, agar nahi hai to default values
        const hourData = plannerData[time24] || { task: '', status: 'pending' };
        
        const hourSlot = document.createElement('div');
        hourSlot.className = 'hour-slot';
        hourSlot.innerHTML = `
            <div class="hour-time">${timeLabel}</div>
            <input type="text" class="hour-input" data-time="${time24}" 
                   value="${hourData.task}" placeholder="What's planned for this hour?">
            <button class="hour-status ${hourData.status}" data-time="${time24}">
                ${hourData.status.charAt(0).toUpperCase() + hourData.status.slice(1).replace('-', ' ')}
            </button>
        `;
        if (plannerContainer) {
            plannerContainer.appendChild(hourSlot);
        }
    }
    
    updatePlannerStats();
    
    // Input change event
    document.querySelectorAll('.hour-input').forEach(input => {
        input.addEventListener('input', function() {
            const time = this.dataset.time;
            // Ensure object exists
            if (!plannerData[time]) {
                plannerData[time] = { task: '', status: 'pending' };
            }
            plannerData[time].task = this.value;
            // Save to localStorage
            localStorage.setItem('plannerData', JSON.stringify(plannerData));
            updatePlannerStats();
        });
        
        input.addEventListener('focus', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.4)';
        });
        
        input.addEventListener('blur', function() {
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
    });
    
    // Status button click event
    document.querySelectorAll('.hour-status').forEach(btn => {
        btn.addEventListener('click', function() {
            const time = this.dataset.time;
            const currentStatus = this.className.includes('pending') ? 'pending' : 
                                 this.className.includes('in-progress') ? 'in-progress' : 'completed';
            
            let nextStatus = 'pending';
            if (currentStatus === 'pending') nextStatus = 'in-progress';
            if (currentStatus === 'in-progress') nextStatus = 'completed';
            
            // Update button
            this.className = `hour-status ${nextStatus}`;
            this.textContent = nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1).replace('-', ' ');
            
            // Ensure object exists
            if (!plannerData[time]) {
                plannerData[time] = { task: '', status: 'pending' };
            }
            plannerData[time].status = nextStatus;
            
            // Save to localStorage
            localStorage.setItem('plannerData', JSON.stringify(plannerData));
            updatePlannerStats();
            
            // Animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    function updatePlannerStats() {
        const hours = Object.values(plannerData);
        
        const plannedHours = hours.filter(h => h.task && h.task.trim() !== '').length;
        const completedHours = hours.filter(h => h.status === 'completed').length;
        const remainingHours = Math.max(0, plannedHours - completedHours);
        
        if (plannedHoursEl) plannedHoursEl.textContent = plannedHours;
        if (completedHoursEl) completedHoursEl.textContent = completedHours;
        if (remainingHoursEl) remainingHoursEl.textContent = remainingHours;
        
        updateStatsColors(plannedHours, completedHours);
    }
    
    function updateStatsColors(planned, completed) {
        const stats = [plannedHoursEl, completedHoursEl, remainingHoursEl];
        const progress = planned > 0 ? (completed / planned) * 100 : 0;
        
        stats.forEach(stat => {
            if (stat) {
                if (progress >= 75) {
                    stat.style.color = '#4CAF50';
                } else if (progress >= 50) {
                    stat.style.color = '#FF9800';
                } else {
                    stat.style.color = '#f44336';
                }
            }
        });
    }
    
    // Clear planner button - agar already nahi hai to add karo
    let clearPlannerBtn = document.querySelector('.clear-planner-btn');
    if (!clearPlannerBtn) {
        clearPlannerBtn = document.createElement('button');
        clearPlannerBtn.innerHTML = '<i class="fas fa-trash"></i> Clear Today\'s Planner';
        clearPlannerBtn.className = 'clear-planner-btn';
        clearPlannerBtn.style.cssText = `
            margin: 20px auto;
            padding: 12px 25px;
            background: rgba(244, 67, 54, 0.8);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.3s;
        `;
        
        clearPlannerBtn.addEventListener('mouseenter', () => {
            clearPlannerBtn.style.background = 'rgba(244, 67, 54, 1)';
            clearPlannerBtn.style.transform = 'translateY(-2px)';
        });
        
        clearPlannerBtn.addEventListener('mouseleave', () => {
            clearPlannerBtn.style.background = 'rgba(244, 67, 54, 0.8)';
            clearPlannerBtn.style.transform = 'translateY(0)';
        });
        
        clearPlannerBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all planner data for today?')) {
                plannerData = {};
                localStorage.setItem('plannerData', JSON.stringify(plannerData));
                initDailyPlanner();
                alert('Today\'s planner cleared!');
            }
        });
        
        const plannerStatsSection = document.querySelector('.planner-stats');
        if (plannerStatsSection) {
            plannerStatsSection.parentNode.insertBefore(clearPlannerBtn, plannerStatsSection.nextSibling);
        }
    }
    
    // Highlight current hour
    highlightCurrentHour();
}

// Highlight current hour function
function highlightCurrentHour() {
    const now = new Date();
    const currentHour24 = now.getHours();
    
    const allHourSlots = document.querySelectorAll('.hour-slot');
    
    // Remove previous highlights
    allHourSlots.forEach(slot => {
        slot.style.boxShadow = 'none';
        slot.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        slot.style.transform = 'translateY(0)';
        slot.style.background = '';
    });
    
    // Highlight current hour if within range (8 AM to 10 PM)
    if (currentHour24 >= 8 && currentHour24 <= 22) {
        const hourIndex = currentHour24 - 8;
        if (allHourSlots[hourIndex]) {
            allHourSlots[hourIndex].style.boxShadow = '0 0 15px rgba(76, 175, 80, 0.5)';
            allHourSlots[hourIndex].style.border = '2px solid #4CAF50';
            allHourSlots[hourIndex].style.transform = 'translateY(-3px)';
            allHourSlots[hourIndex].style.background = 'rgba(76, 175, 80, 0.1)';
            allHourSlots[hourIndex].style.transition = 'all 0.3s ease';
        }
    }
}

// ==================== MOTIVATION FEATURE ====================
function motivationFeature() {
    const motivationPage = document.querySelector(".motivationPage");
    if (!motivationPage) return;

    const quoteEl = motivationPage.querySelector(".quote");
    const authorEl = motivationPage.querySelector(".author");
    const newQuoteBtn = document.getElementById("newQuoteBtn");
    const saveQuoteBtn = document.getElementById("saveQuoteBtn");
    const viewSavedBtn = document.getElementById("viewSavedBtn");

    const API = "https://api.quotable.io/random?tags=motivational|inspirational";
    const QUOTE_KEY = "dailyMotivationQuote";
    const DATE_KEY = "dailyMotivationDate";

    function today() {
        return new Date().toDateString();
    }

    function render(data) {
        if (quoteEl) quoteEl.textContent = `"${data.text}"`;
        if (authorEl) authorEl.textContent = `— ${data.author}`;
    }

    function fetchQuote() {
        fetch(API)
            .then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then(data => {
                const obj = {
                    text: data.content,
                    author: data.author,
                    date: new Date().toISOString()
                };
                localStorage.setItem(QUOTE_KEY, JSON.stringify(obj));
                localStorage.setItem(DATE_KEY, today());
                render(obj);
            })
            .catch(() => {
                const fallbackQuotes = [
                    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
                    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
                    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
                    { text: "Discipline beats motivation every single time.", author: "Anonymous" }
                ];
                const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
                render(randomQuote);
            });
    }

    function loadDaily() {
        const q = localStorage.getItem(QUOTE_KEY);
        const d = localStorage.getItem(DATE_KEY);

        if (q && d === today()) {
            render(JSON.parse(q));
        } else {
            fetchQuote();
        }
    }

    function saveCurrentQuote() {
        const currentQuote = quoteEl.textContent.slice(1, -1);
        const currentAuthor = authorEl.textContent.slice(2);
        
        const quoteToSave = {
            text: currentQuote,
            author: currentAuthor,
            savedAt: new Date().toISOString()
        };
        
        savedQuotes.push(quoteToSave);
        localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));
        
        alert('Quote saved to your collection!');
    }

    function viewSavedQuotes() {
        if (savedQuotes.length === 0) {
            alert('You haven\'t saved any quotes yet.');
            return;
        }
        
        const randomSavedQuote = savedQuotes[Math.floor(Math.random() * savedQuotes.length)];
        render(randomSavedQuote);
    }

    if (newQuoteBtn) newQuoteBtn.addEventListener("click", fetchQuote);
    if (saveQuoteBtn) saveQuoteBtn.addEventListener("click", saveCurrentQuote);
    if (viewSavedBtn) viewSavedBtn.addEventListener("click", viewSavedQuotes);

    loadDaily();
}

// ==================== POMODORO TIMER FEATURE ====================
function initPomodoro() {
    const timerDisplay = document.getElementById('timerDisplay');
    const timerStatus = document.getElementById('timerStatus');
    const startBtn = document.getElementById('startTimerBtn');
    const pauseBtn = document.getElementById('pauseTimerBtn');
    const resetBtn = document.getElementById('resetTimerBtn');
    const modeBtns = document.querySelectorAll('.mode-btn');
    const pomodoroCountEl = document.getElementById('pomodoroCount');
    const focusTimeEl = document.getElementById('focusTime');
    
    let timeLeft = 25 * 60;
    let timerInterval = null;
    let isRunning = false;
    let currentMode = 'focus';
    
    if (pomodoroCountEl) pomodoroCountEl.textContent = pomodoroCount;
    if (focusTimeEl) focusTimeEl.textContent = `${totalFocusTime} min`;
    
    updateTimerDisplay();
    
    modeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (isRunning) {
                if (!confirm('Timer is running. Switch mode anyway?')) return;
                clearInterval(timerInterval);
                isRunning = false;
            }
            
            modeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const minutes = parseInt(this.dataset.time);
            currentMode = minutes === 25 ? 'focus' : minutes === 5 ? 'shortBreak' : 'longBreak';
            timeLeft = minutes * 60;
            updateTimerDisplay();
            if (timerStatus) timerStatus.textContent = `${currentMode === 'focus' ? 'Focus Time' : 'Break Time'} - Ready`;
        });
    });
    
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            if (isRunning) return;
            
            isRunning = true;
            startBtn.disabled = true;
            if (pauseBtn) pauseBtn.disabled = false;
            if (timerStatus) timerStatus.textContent = `${currentMode === 'focus' ? 'Focus Time' : 'Break Time'} - Running`;
            
            timerInterval = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    if (startBtn) startBtn.disabled = false;
                    if (pauseBtn) pauseBtn.disabled = true;
                    
                    // Play sound
                    playTimerSound();
                    
                    // Update stats if focus session completed
                    if (currentMode === 'focus') {
                        pomodoroCount++;
                        totalFocusTime += 25;
                        localStorage.setItem('pomodoroCount', pomodoroCount.toString());
                        localStorage.setItem('totalFocusTime', totalFocusTime.toString());
                        if (pomodoroCountEl) pomodoroCountEl.textContent = pomodoroCount;
                        if (focusTimeEl) focusTimeEl.textContent = `${totalFocusTime} min`;
                    }
                    
                    // Show notification
                    const notification = currentMode === 'focus' 
                        ? 'Focus session complete! Time for a break.' 
                        : 'Break time over! Ready to focus again?';
                    
                    if (timerStatus) timerStatus.textContent = notification;
                    
                    // Auto-start next session
                    setTimeout(() => {
                        if (currentMode === 'focus') {
                            if (confirm('Start 5-minute break?')) {
                                const shortBreakBtn = document.querySelector('[data-time="5"]');
                                if (shortBreakBtn) {
                                    shortBreakBtn.click();
                                    startBtn.click();
                                }
                            }
                        } else if (currentMode === 'shortBreak') {
                            if (confirm('Start next focus session?')) {
                                const focusBtn = document.querySelector('[data-time="25"]');
                                if (focusBtn) {
                                    focusBtn.click();
                                    startBtn.click();
                                }
                            }
                        }
                    }, 1000);
                }
            }, 1000);
        });
    }
    
    if (pauseBtn) {
        pauseBtn.addEventListener('click', function() {
            if (!isRunning) return;
            
            clearInterval(timerInterval);
            isRunning = false;
            if (startBtn) startBtn.disabled = false;
            if (pauseBtn) pauseBtn.disabled = true;
            if (timerStatus) timerStatus.textContent = `${currentMode === 'focus' ? 'Focus Time' : 'Break Time'} - Paused`;
        });
    }
    
    if (resetBtn) resetBtn.addEventListener('click', resetPomodoro);
    
    function resetPomodoro() {
        clearInterval(timerInterval);
        isRunning = false;
        if (startBtn) startBtn.disabled = false;
        if (pauseBtn) pauseBtn.disabled = true;
        
        const activeModeBtn = document.querySelector('.mode-btn.active');
        if (activeModeBtn) {
            const minutes = parseInt(activeModeBtn.dataset.time);
            timeLeft = minutes * 60;
        }
        
        updateTimerDisplay();
        if (timerStatus) timerStatus.textContent = `${currentMode === 'focus' ? 'Focus Time' : 'Break Time'} - Ready`;
    }
    
    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        if (timerDisplay) {
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    function playTimerSound() {
        try {
            const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
            audio.volume = 0.3;
            audio.play().catch(e => console.log('Audio play failed:', e));
        } catch (e) {
            console.log('Audio playback failed:', e);
        }
    }
}

// ==================== DAILY GOALS FEATURE ====================
function initGoals() {
    const goalForm = document.querySelector('.goalForm');
    const goalsList = document.querySelector('.goals-list');
    const completedGoalsEl = document.getElementById('completedGoals');
    const totalGoalsEl = document.getElementById('totalGoals');
    const progressFill = document.getElementById('progressFill');
    const goalsCount = document.querySelector('.goals-count');
    
    renderGoals();
    
    if (goalForm) {
        goalForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('goalTitle').value.trim();
            const desc = document.getElementById('goalDesc').value.trim();
            const categoryElement = document.querySelector('input[name="category"]:checked');
            
            if (!title) {
                alert('Please enter a goal title');
                return;
            }
            
            if (!categoryElement) {
                alert('Please select a category');
                return;
            }
            
            const category = categoryElement.value;
            
            const newGoal = {
                id: Date.now(),
                title: title,
                description: desc,
                category: category,
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            goals.push(newGoal);
            saveGoals();
            renderGoals();
            goalForm.reset();
        });
    }
    
    function renderGoals() {
        if (!goalsList) return;
        
        goalsList.innerHTML = '';
        
        if (goals.length === 0) {
            goalsList.innerHTML = `
                <div class="empty-goals">
                    <i class="fas fa-bullseye"></i>
                    <h3>No goals set for today</h3>
                    <p>Add your first goal using the form on the left</p>
                </div>
            `;
        } else {
            goals.forEach(goal => {
                const goalItem = document.createElement('div');
                goalItem.className = `goal-item ${goal.completed ? 'completed' : ''}`;
                goalItem.innerHTML = `
                    <div class="goal-info">
                        <h4>${goal.title}</h4>
                        ${goal.description ? `<p>${goal.description}</p>` : ''}
                        <span class="goal-category ${goal.category}">${goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}</span>
                    </div>
                    <div class="goal-actions">
                        <button class="goal-btn complete-goal-btn" data-id="${goal.id}">
                            <i class="fas fa-${goal.completed ? 'undo' : 'check'}"></i>
                        </button>
                        <button class="goal-btn delete-goal-btn" data-id="${goal.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                goalsList.appendChild(goalItem);
            });
            
            document.querySelectorAll('.complete-goal-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const goalId = parseInt(this.dataset.id);
                    const goal = goals.find(g => g.id === goalId);
                    if (goal) {
                        goal.completed = !goal.completed;
                        saveGoals();
                        renderGoals();
                    }
                });
            });
            
            document.querySelectorAll('.delete-goal-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const goalId = parseInt(this.dataset.id);
                    goals = goals.filter(g => g.id !== goalId);
                    saveGoals();
                    renderGoals();
                });
            });
        }
        
        updateProgress();
    }
    
    function updateProgress() {
        const totalGoals = goals.length;
        const completedGoals = goals.filter(g => g.completed).length;
        const progress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
        
        if (completedGoalsEl) completedGoalsEl.textContent = completedGoals;
        if (totalGoalsEl) totalGoalsEl.textContent = totalGoals;
        if (progressFill) progressFill.style.width = `${progress}%`;
        if (goalsCount) goalsCount.textContent = `(${completedGoals}/${totalGoals})`;
    }
    
    function saveGoals() {
        localStorage.setItem('goals', JSON.stringify(goals));
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    openFeature();
    
    // Auto-refresh current hour highlight every minute
    setInterval(() => {
        if (document.querySelector('.dailyPage') && 
            document.querySelector('.dailyPage').style.display === 'block') {
            highlightCurrentHour();
        }
    }, 60000);
    
    // Initialize features if their pages are already visible
    if (document.querySelector('.todoPage') && 
        document.querySelector('.todoPage').style.display === 'block') {
        initTodoList();
    }
    if (document.querySelector('.dailyPage') && 
        document.querySelector('.dailyPage').style.display === 'block') {
        initDailyPlanner();
    }
    if (document.querySelector('.motivationPage') && 
        document.querySelector('.motivationPage').style.display === 'block') {
        motivationFeature();
    }
    if (document.querySelector('.pomodoroPage') && 
        document.querySelector('.pomodoroPage').style.display === 'block') {
        initPomodoro();
    }
    if (document.querySelector('.goalsPage') && 
        document.querySelector('.goalsPage').style.display === 'block') {
        initGoals();
    }
});