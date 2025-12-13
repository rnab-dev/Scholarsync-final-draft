const STORAGE_KEY = 'scholarsync_tasks_v1';

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDate = document.getElementById('taskDate');
const taskCategory = document.getElementById('taskCategory');
const taskPriority = document.getElementById('taskPriority');
const tasksList = document.getElementById('tasksList');
const emptyTasksState = document.getElementById('emptyTasksState');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const tasksCount = document.getElementById('tasksCount');
const calendar = document.getElementById('calendar');
const calendarMonth = document.getElementById('calendarMonth');

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask();
});

function addTask() {
  const task = {
    id: Date.now().toString(),
    title: taskTitle.value.trim(),
    date: taskDate.value,
    category: taskCategory.value,
    priority: taskPriority.value,
    done: false,
    order: tasks.length
  };

  tasks.push(task);
  saveTasks();
  taskForm.reset();
  renderTasks();
  updateProgress();
  renderCalendar();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    saveTasks();
    renderTasks();
    updateProgress();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
  updateProgress();
  renderCalendar();
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function renderTasks() {
  const sorted = [...tasks].sort((a, b) => a.order - b.order);

  if (sorted.length === 0) {
    tasksList.style.display = 'none';
    emptyTasksState.style.display = 'block';
  } else {
    tasksList.style.display = 'flex';
    emptyTasksState.style.display = 'none';
  }

  tasksList.innerHTML = sorted.map(task => `
    <div class="task-item ${task.done ? 'done' : ''}" data-id="${task.id}" draggable="true">
      <input type="checkbox" class="task-checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask('${task.id}')">
      <div class="task-content">
        <div class="task-title">${task.title}</div>
        <div class="task-details">
          <span class="task-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
            ${new Date(task.date).toLocaleDateString()}
          </span>
          <span class="task-category">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 7h-9M14 17H5"/>
              <circle cx="17" cy="17" r="3"/>
              <circle cx="7" cy="7" r="3"/>
            </svg>
            ${task.category}
          </span>
        </div>
      </div>
      <span class="task-priority ${task.priority}">${task.priority}</span>
      <button class="icon-btn task-delete" onclick="deleteTask('${task.id}')" aria-label="Delete task">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
        </svg>
      </button>
    </div>
  `).join('');

  initDragAndDrop();
}

function initDragAndDrop() {
  const items = document.querySelectorAll('.task-item');
  let draggedItem = null;

  items.forEach(item => {
    item.addEventListener('dragstart', () => {
      draggedItem = item;
      item.style.opacity = '0.5';
    });

    item.addEventListener('dragend', () => {
      item.style.opacity = '1';
    });

    item.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    item.addEventListener('drop', (e) => {
      e.preventDefault();
      if (draggedItem !== item) {
        const allItems = [...tasksList.querySelectorAll('.task-item')];
        const draggedIndex = allItems.indexOf(draggedItem);
        const targetIndex = allItems.indexOf(item);

        if (draggedIndex < targetIndex) {
          item.after(draggedItem);
        } else {
          item.before(draggedItem);
        }

        updateTaskOrder();
      }
    });
  });
}

function updateTaskOrder() {
  const items = tasksList.querySelectorAll('.task-item');
  items.forEach((item, index) => {
    const task = tasks.find(t => t.id === item.dataset.id);
    if (task) {
      task.order = index;
    }
  });
  saveTasks();
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}% complete`;
  tasksCount.textContent = `${completed} / ${total} tasks`;
}

function renderCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  calendarMonth.textContent = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  calendar.innerHTML = '';
  
  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement('div'));
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEl = document.createElement('div');
    dayEl.className = 'calendar-day';
    dayEl.textContent = day;
    
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const hasTasks = tasks.some(t => t.date === dateStr);
    
    if (hasTasks) {
      dayEl.classList.add('has-tasks');
    }
    
    if (day === now.getDate()) {
      dayEl.classList.add('today');
    }
    
    calendar.appendChild(dayEl);
  }
}

window.toggleTask = toggleTask;
window.deleteTask = deleteTask;

renderTasks();
updateProgress();
renderCalendar();

document.addEventListener('keydown', (e) => {
  if (e.key === 'p' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
    e.preventDefault();
    taskTitle.focus();
  }
});
