const quotes = [
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    { text: "Education is not preparation for life; education is life itself.", author: "John Dewey" },
    { text: "The beautiful thing about learning is that no one can take it away from you.", author: "B.B. King" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The only way to learn mathematics is to do mathematics.", author: "Paul Halmos" },
    { text: "Study hard what interests you the most in the most undisciplined way.", author: "Richard Feynman" },
    { text: "Learning is not attained by chance, it must be sought for with ardor.", author: "Abigail Adams" }
  ];
  
  const greetingText = document.getElementById('greetingText');
  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');
  const pomodoroBtn = document.getElementById('pomodoroBtn');
  const pomodoroModal = document.getElementById('pomodoroModal');
  const closePomodoroModal = document.getElementById('closePomodoroModal');
  const backupBtn = document.getElementById('backupBtn');
  
  function setGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good morning';
    if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
    if (hour >= 17) greeting = 'Good evening';
    greetingText.textContent = `${greeting}! Ready to be productive?`;
  }
  
  function displayRandomQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
  }
  
  function loadDashboardStats() {
    const notes = JSON.parse(localStorage.getItem('scholarsync_notes_v1')) || [];
    const tasks = JSON.parse(localStorage.getItem('scholarsync_tasks_v1')) || [];
    const flashcards = JSON.parse(localStorage.getItem('scholarsync_flashcards_v1')) || [];
    const pomodoroData = JSON.parse(localStorage.getItem('scholarsync_pomodoro_v1')) || { sessionsToday: 0, totalMinutes: 0 };
  
    document.getElementById('notesCount').textContent = notes.length;
    document.getElementById('tasksCompletedCount').textContent = tasks.filter(t => t.done).length;
    document.getElementById('flashcardsCount').textContent = flashcards.length;
    
    const hours = Math.floor(pomodoroData.totalMinutes / 60);
    const mins = pomodoroData.totalMinutes % 60;
    document.getElementById('studyTimeCount').textContent = `${hours}h ${mins}m`;
  }
  
  function loadTodayTasks() {
    const tasks = JSON.parse(localStorage.getItem('scholarsync_tasks_v1')) || [];
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter(t => t.date === today);
  
    const container = document.getElementById('todayTasks');
    if (todayTasks.length === 0) {
      container.innerHTML = '<p class="empty-message">No tasks for today</p>';
    } else {
      container.innerHTML = todayTasks.slice(0, 5).map(task => `
        <div class="task-preview ${task.done ? 'done' : ''}">
          <input type="checkbox" ${task.done ? 'checked' : ''} disabled>
          <span>${task.title}</span>
          <span class="task-priority ${task.priority}">${task.priority}</span>
        </div>
      `).join('');
    }
  }
  
  function loadRecentNotes() {
    const notes = JSON.parse(localStorage.getItem('scholarsync_notes_v1')) || [];
    const sorted = notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  
    const container = document.getElementById('recentNotes');
    if (sorted.length === 0) {
      container.innerHTML = '<p class="empty-message">No notes yet</p>';
    } else {
      container.innerHTML = sorted.slice(0, 5).map(note => `
        <div class="note-preview">
          <strong>${note.title}</strong>
          <span class="note-subject">${note.subject}</span>
        </div>
      `).join('');
    }
  }
  
  function loadUpcomingDeadlines() {
    const tasks = JSON.parse(localStorage.getItem('scholarsync_tasks_v1')) || [];
    const today = new Date();
    const upcoming = tasks
      .filter(t => !t.done && new Date(t.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);
  
    const container = document.getElementById('upcomingDeadlines');
    if (upcoming.length === 0) {
      container.innerHTML = '<p class="empty-message">No upcoming deadlines</p>';
    } else {
      container.innerHTML = upcoming.map(task => {
        const daysUntil = Math.ceil((new Date(task.date) - today) / (1000 * 60 * 60 * 24));
        return `
          <div class="deadline-item">
            <strong>${task.title}</strong>
            <span class="deadline-date">${daysUntil === 0 ? 'Today' : `${daysUntil}d`}</span>
          </div>
        `;
      }).join('');
    }
  }
  
  let timerInterval;
  let timerSeconds = 25 * 60;
  let isRunning = false;
  let isBreak = false;
  let totalSeconds = 25 * 60;
  
  const timerDisplay = document.getElementById('timerDisplay');
  const timerLabel = document.getElementById('timerLabel');
  const timerProgress = document.getElementById('timerProgress');
  const startTimerBtn = document.getElementById('startTimerBtn');
  const pauseTimerBtn = document.getElementById('pauseTimerBtn');
  const resetTimerBtn = document.getElementById('resetTimerBtn');
  const focusTime = document.getElementById('focusTime');
  const breakTime = document.getElementById('breakTime');
  const sessionsToday = document.getElementById('sessionsToday');
  const totalTime = document.getElementById('totalTime');
  
  function updateTimerDisplay() {
    const mins = Math.floor(timerSeconds / 60);
    const secs = timerSeconds % 60;
    timerDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    const progress = ((totalSeconds - timerSeconds) / totalSeconds) * 565;
    timerProgress.style.strokeDashoffset = 565 - progress;
  }
  
  function startTimer() {
    isRunning = true;
    startTimerBtn.style.display = 'none';
    pauseTimerBtn.style.display = 'inline-flex';
    
    timerInterval = setInterval(() => {
      timerSeconds--;
      updateTimerDisplay();
      
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        completeSession();
      }
    }, 1000);
  }
  
  function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    startTimerBtn.style.display = 'inline-flex';
    pauseTimerBtn.style.display = 'none';
  }
  
  function resetTimer() {
    pauseTimer();
    isBreak = false;
    timerSeconds = parseInt(focusTime.value) * 60;
    totalSeconds = timerSeconds;
    timerLabel.textContent = 'Focus Time';
    updateTimerDisplay();
  }
  
  function completeSession() {
    const pomodoroData = JSON.parse(localStorage.getItem('scholarsync_pomodoro_v1')) || { 
      sessionsToday: 0, 
      totalMinutes: 0,
      lastDate: new Date().toISOString().split('T')[0]
    };
    
    const today = new Date().toISOString().split('T')[0];
    if (pomodoroData.lastDate !== today) {
      pomodoroData.sessionsToday = 0;
    }
    
    if (!isBreak) {
      pomodoroData.sessionsToday++;
      pomodoroData.totalMinutes += parseInt(focusTime.value);
      pomodoroData.lastDate = today;
      localStorage.setItem('scholarsync_pomodoro_v1', JSON.stringify(pomodoroData));
      
      isBreak = true;
      timerSeconds = parseInt(breakTime.value) * 60;
      totalSeconds = timerSeconds;
      timerLabel.textContent = 'Break Time';
      
      if (Notification.permission === 'granted') {
        new Notification('Pomodoro Complete!', { body: 'Time for a break!' });
      }
    } else {
      isBreak = false;
      timerSeconds = parseInt(focusTime.value) * 60;
      totalSeconds = timerSeconds;
      timerLabel.textContent = 'Focus Time';
      
      if (Notification.permission === 'granted') {
        new Notification('Break Complete!', { body: 'Time to focus!' });
      }
    }
    
    updateTimerDisplay();
    updatePomodoroStats();
    loadDashboardStats();
  }
  
  function updatePomodoroStats() {
    const pomodoroData = JSON.parse(localStorage.getItem('scholarsync_pomodoro_v1')) || { 
      sessionsToday: 0, 
      totalMinutes: 0 
    };
    
    sessionsToday.textContent = pomodoroData.sessionsToday;
    const hours = Math.floor(pomodoroData.totalMinutes / 60);
    const mins = pomodoroData.totalMinutes % 60;
    totalTime.textContent = `${hours}h ${mins}m`;
  }
  
  pomodoroBtn.addEventListener('click', () => {
    pomodoroModal.classList.add('active');
    updatePomodoroStats();
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  });
  
  closePomodoroModal.addEventListener('click', () => {
    pomodoroModal.classList.remove('active');
    pauseTimer();
  });
  
  pomodoroModal.addEventListener('click', (e) => {
    if (e.target === pomodoroModal) {
      pomodoroModal.classList.remove('active');
      pauseTimer();
    }
  });
  
  startTimerBtn.addEventListener('click', startTimer);
  pauseTimerBtn.addEventListener('click', pauseTimer);
  resetTimerBtn.addEventListener('click', resetTimer);
  
  focusTime.addEventListener('change', () => {
    if (!isRunning) {
      timerSeconds = parseInt(focusTime.value) * 60;
      totalSeconds = timerSeconds;
      updateTimerDisplay();
    }
  });
  
  backupBtn.addEventListener('click', () => {
    const data = {
      notes: JSON.parse(localStorage.getItem('scholarsync_notes_v1')) || [],
      tasks: JSON.parse(localStorage.getItem('scholarsync_tasks_v1')) || [],
      flashcards: JSON.parse(localStorage.getItem('scholarsync_flashcards_v1')) || [],
      courses: JSON.parse(localStorage.getItem('scholarsync_courses_v1')) || [],
      theme: localStorage.getItem('scholarsync_theme') || 'dark',
      bg: localStorage.getItem('scholarsync_bg') || '',
      pomodoro: JSON.parse(localStorage.getItem('scholarsync_pomodoro_v1')) || {},
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scholarsync-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    alert('Backup created successfully!');
  });
  
  setGreeting();
  displayRandomQuote();
  loadDashboardStats();
  loadTodayTasks();
  loadRecentNotes();
  loadUpcomingDeadlines();
  updateTimerDisplay();
  