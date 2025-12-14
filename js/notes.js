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
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    const title = noteTitle.value.trim() || 'Untitled Note';
    const subject = noteSubject.value.trim();
    const content = noteContent.value.trim();
    
    // Set document properties
    doc.setProperties({
      title: title,
      subject: subject,
      author: 'ScholarSync',
      keywords: 'notes, study',
      creator: 'ScholarSync Notes'
    });
    
    // Add title
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text(title, 20, 20);
    
    // Add subject
    if (subject) {
      doc.setFontSize(12);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(`Subject: ${subject}`, 20, 30);
      doc.setTextColor(0, 0, 0);
    }
    
    // Add date
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(date, 20, subject ? 37 : 32);
    doc.setTextColor(0, 0, 0);
    
    // Add separator line
    const yPos = subject ? 42 : 37;
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(20, yPos, 190, yPos);
    
    // Add content
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    const contentStartY = yPos + 8;
    const pageWidth = 170;
    const lineHeight = 7;
    
    // Split content into lines that fit the page width
    const lines = doc.splitTextToSize(content, pageWidth);
    
    let currentY = contentStartY;
    const pageHeight = 280;
    
    lines.forEach((line, index) => {
      if (currentY > pageHeight) {
        doc.addPage();
        currentY = 20;
      }
      doc.text(line, 20, currentY);
      currentY += lineHeight;
    });
    
    // Add footer on the last page
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Generated by ScholarSync - Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }
    
    // Save the PDF
    const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
    doc.save(fileName);
    
    // Show success feedback
    const originalText = exportNoteBtn.textContent;
    exportNoteBtn.textContent = 'Exported!';
    exportNoteBtn.style.backgroundColor = 'var(--success)';
    setTimeout(() => {
      exportNoteBtn.textContent = originalText;
      exportNoteBtn.style.backgroundColor = '';
    }, 2000);
    
  } catch (err) {
    console.error('Failed to export PDF:', err);
    alert('Failed to export note as PDF. Please try again.');
  }
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
