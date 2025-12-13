const STORAGE_KEY = 'scholarsync_notes_v1';

let notes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentNoteId = null;

const newNoteBtn = document.getElementById('newNoteBtn');
const emptyNewNoteBtn = document.getElementById('emptyNewNoteBtn');
const noteModal = document.getElementById('noteModal');
const closeNoteModal = document.getElementById('closeNoteModal');
const noteForm = document.getElementById('noteForm');
const notesGrid = document.getElementById('notesGrid');
const emptyState = document.getElementById('emptyState');
const notesSearch = document.getElementById('notesSearch');
const subjectFilter = document.getElementById('subjectFilter');
const subjectList = document.getElementById('subjectList');
const noteTitle = document.getElementById('noteTitle');
const noteSubject = document.getElementById('noteSubject');
const noteContent = document.getElementById('noteContent');
const noteMonospace = document.getElementById('noteMonospace');
const deleteNoteBtn = document.getElementById('deleteNoteBtn');
const exportNoteBtn = document.getElementById('exportNoteBtn');
const copyNoteBtn = document.getElementById('copyNoteBtn');

function openModal() {
  noteModal.classList.add('active');
  noteTitle.focus();
  trapFocus(noteModal);
}

function closeModal() {
  noteModal.classList.remove('active');
  resetForm();
}

function resetForm() {
  noteForm.reset();
  currentNoteId = null;
  deleteNoteBtn.style.display = 'none';
  document.getElementById('noteModalTitle').textContent = 'New Note';
  noteContent.classList.remove('monospace');
}

function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

newNoteBtn.addEventListener('click', openModal);
emptyNewNoteBtn.addEventListener('click', openModal);
closeNoteModal.addEventListener('click', closeModal);

noteModal.addEventListener('click', (e) => {
  if (e.target === noteModal) {
    closeModal();
  }
});

noteMonospace.addEventListener('change', () => {
  if (noteMonospace.checked) {
    noteContent.classList.add('monospace');
  } else {
    noteContent.classList.remove('monospace');
  }
});

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  saveNote();
});

function saveNote() {
  const note = {
    id: currentNoteId || Date.now().toString(),
    title: noteTitle.value.trim(),
    subject: noteSubject.value.trim(),
    content: noteContent.value.trim(),
    createdAt: currentNoteId ? notes.find(n => n.id === currentNoteId).createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (currentNoteId) {
    const index = notes.findIndex(n => n.id === currentNoteId);
    notes[index] = note;
  } else {
    notes.push(note);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  closeModal();
  renderNotes();
  renderSubjects();
}

function editNote(id) {
  const note = notes.find(n => n.id === id);
  if (!note) return;

  currentNoteId = id;
  noteTitle.value = note.title;
  noteSubject.value = note.subject;
  noteContent.value = note.content;
  document.getElementById('noteModalTitle').textContent = 'Edit Note';
  deleteNoteBtn.style.display = 'block';
  openModal();
}

deleteNoteBtn.addEventListener('click', () => {
  if (!currentNoteId) return;
  if (confirm('Delete this note?')) {
    notes = notes.filter(n => n.id !== currentNoteId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    closeModal();
    renderNotes();
    renderSubjects();
  }
});

exportNoteBtn.addEventListener('click', () => {
  const content = `${noteTitle.value}\n\nSubject: ${noteSubject.value}\n\n${noteContent.value}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${noteTitle.value || 'note'}.txt`;
  a.click();
  URL.revokeObjectURL(url);
});

copyNoteBtn.addEventListener('click', async () => {
  const content = `${noteTitle.value}\n\nSubject: ${noteSubject.value}\n\n${noteContent.value}`;
  try {
    await navigator.clipboard.writeText(content);
    copyNoteBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyNoteBtn.textContent = 'Copy';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
});

function renderNotes(filter = {}) {
  let filtered = notes;

  if (filter.search) {
    const query = filter.search.toLowerCase();
    filtered = filtered.filter(n =>
      n.title.toLowerCase().includes(query) ||
      n.content.toLowerCase().includes(query) ||
      n.subject.toLowerCase().includes(query)
    );
  }

  if (filter.subject) {
    filtered = filtered.filter(n => n.subject === filter.subject);
  }

  if (filtered.length === 0) {
    notesGrid.style.display = 'none';
    emptyState.style.display = 'block';
  } else {
    notesGrid.style.display = 'grid';
    emptyState.style.display = 'none';
  }

  notesGrid.innerHTML = filtered.map(note => `
    <article class="note-card" data-id="${note.id}">
      <h3>${note.title}</h3>
      <span class="note-subject">${note.subject}</span>
      <p class="note-excerpt">${note.content}</p>
      <div class="note-meta">Updated ${new Date(note.updatedAt).toLocaleDateString()}</div>
    </article>
  `).join('');

  document.querySelectorAll('.note-card').forEach(card => {
    card.addEventListener('click', () => {
      editNote(card.dataset.id);
    });
  });
}

function renderSubjects() {
  const subjects = [...new Set(notes.map(n => n.subject))];
  
  subjectFilter.innerHTML = '<option value="">All Subjects</option>';
  subjects.forEach(subject => {
    const option = document.createElement('option');
    option.value = subject;
    option.textContent = subject;
    subjectFilter.appendChild(option);
  });

  subjectList.innerHTML = subjects.map(subject => {
    const count = notes.filter(n => n.subject === subject).length;
    return `<li data-subject="${subject}">${subject} <span>${count}</span></li>`;
  }).join('');

  subjectList.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      subjectList.querySelectorAll('li').forEach(li => li.classList.remove('active'));
      item.classList.add('active');
      renderNotes({ subject: item.dataset.subject });
    });
  });
}

notesSearch.addEventListener('input', () => {
  renderNotes({ search: notesSearch.value });
});

subjectFilter.addEventListener('change', () => {
  renderNotes({ subject: subjectFilter.value });
});

const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('search');
if (searchQuery) {
  notesSearch.value = searchQuery;
  renderNotes({ search: searchQuery });
} else {
  renderNotes();
}

renderSubjects();

document.addEventListener('keydown', (e) => {
  if (e.key === 'n' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
    e.preventDefault();
    openModal();
  }
});
