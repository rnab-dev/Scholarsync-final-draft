const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navCenter = document.querySelector('.nav-center');
const themeToggle = document.getElementById('themeToggle');
const globalSearch = document.getElementById('globalSearch');
const quickAddFab = document.getElementById('quickAddFab');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navCenter.classList.toggle('active');
    const expanded = navCenter.classList.contains('active');
    hamburger.setAttribute('aria-expanded', expanded);
  });
}

const themes = ['dark', 'light', 'synthwave', 'forest'];
let currentThemeIndex = 0;
const savedTheme = localStorage.getItem('scholarsync_theme') || 'dark';
currentThemeIndex = themes.indexOf(savedTheme);
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  const nextTheme = themes[currentThemeIndex];
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('scholarsync_theme', nextTheme);
});

let commandPaletteOpen = false;

function createCommandPalette() {
  if (document.getElementById('commandPalette')) return;
  
  const palette = document.createElement('div');
  palette.id = 'commandPalette';
  palette.className = 'command-palette';
  palette.innerHTML = `
    <div class="command-palette-content glass-card">
      <input type="text" id="commandInput" class="command-input" placeholder="Type a command or search...">
      <div class="command-list" id="commandList">
        <div class="command-item" data-action="dashboard">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span>Go to Dashboard</span>
        </div>
        <div class="command-item" data-action="notes">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <path d="M14 2v6h6"/>
          </svg>
          <span>Go to Notes</span>
        </div>
        <div class="command-item" data-action="flashcards">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
          </svg>
          <span>Go to Flashcards</span>
        </div>
        <div class="command-item" data-action="planner">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
          <span>Go to Planner</span>
        </div>
        <div class="command-item" data-action="grades">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
          </svg>
          <span>Go to Grades</span>
        </div>
        <div class="command-item" data-action="backup">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>Backup Data</span>
        </div>
        <div class="command-item" data-action="restore">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span>Restore Data</span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(palette);
  
  const commandInput = document.getElementById('commandInput');
  const commandList = document.getElementById('commandList');
  
  palette.addEventListener('click', (e) => {
    if (e.target === palette) {
      closeCommandPalette();
    }
  });
  
  commandInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    document.querySelectorAll('.command-item').forEach(item => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? 'flex' : 'none';
    });
  });
  
  commandInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCommandPalette();
    }
  });
  
  document.querySelectorAll('.command-item').forEach(item => {
    item.addEventListener('click', () => {
      executeCommand(item.dataset.action);
    });
  });
}

function openCommandPalette() {
  if (commandPaletteOpen) return;
  createCommandPalette();
  const palette = document.getElementById('commandPalette');
  palette.classList.add('active');
  document.getElementById('commandInput').focus();
  commandPaletteOpen = true;
}

function closeCommandPalette() {
  const palette = document.getElementById('commandPalette');
  if (palette) {
    palette.classList.remove('active');
    commandPaletteOpen = false;
  }
}

function executeCommand(action) {
  closeCommandPalette();
  
  switch(action) {
    case 'dashboard':
      window.location.href = 'dashboard.html';
      break;
    case 'notes':
      window.location.href = 'notes.html';
      break;
    case 'flashcards':
      window.location.href = 'flashcards.html';
      break;
    case 'planner':
      window.location.href = 'planner.html';
      break;
    case 'grades':
      window.location.href = 'grades.html';
      break;
    case 'backup':
      backupData();
      break;
    case 'restore':
      restoreData();
      break;
  }
}

function backupData() {
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
}

function restoreData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        if (confirm('This will replace all your current data. Continue?')) {
          localStorage.setItem('scholarsync_notes_v1', JSON.stringify(data.notes || []));
          localStorage.setItem('scholarsync_tasks_v1', JSON.stringify(data.tasks || []));
          localStorage.setItem('scholarsync_flashcards_v1', JSON.stringify(data.flashcards || []));
          localStorage.setItem('scholarsync_courses_v1', JSON.stringify(data.courses || []));
          localStorage.setItem('scholarsync_theme', data.theme || 'dark');
          if (data.bg) localStorage.setItem('scholarsync_bg', data.bg);
          if (data.pomodoro) localStorage.setItem('scholarsync_pomodoro_v1', JSON.stringify(data.pomodoro));
          
          alert('Data restored successfully! Reloading page...');
          location.reload();
        }
      } catch (err) {
        alert('Error restoring data. Please check the file format.');
        console.error(err);
      }
    };
    
    reader.readAsText(file);
  };
  
  input.click();
}

globalSearch.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const query = globalSearch.value.trim();
    if (query) {
      window.location.href = `notes.html?search=${encodeURIComponent(query)}`;
    }
  }
});

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    openCommandPalette();
  }

  if (e.key === 'n' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
    e.preventDefault();
    window.location.href = 'notes.html';
  }

  if (e.key === 'p' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
    e.preventDefault();
    window.location.href = 'planner.html';
  }
});

if (quickAddFab) {
  quickAddFab.addEventListener('click', () => {
    if (window.location.pathname.includes('notes.html')) {
      document.getElementById('newNoteBtn')?.click();
    } else if (window.location.pathname.includes('planner.html')) {
      document.getElementById('taskTitle')?.focus();
    } else {
      window.location.href = 'notes.html';
    }
  });
}

const savedBg = localStorage.getItem('scholarsync_bg');
if (savedBg) {
  document.documentElement.style.setProperty('--bg-image', `url(${savedBg})`);
}

function typeWriter(element, text, speed = 80) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

const heroTitle = document.getElementById('heroTitle');
if (heroTitle) {
  typeWriter(heroTitle, 'Your all-in-one academic companion');
}
