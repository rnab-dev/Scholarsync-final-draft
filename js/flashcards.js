const STORAGE_KEY = 'scholarsync_flashcards_v1';

let flashcards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
let currentFlashcardId = null;
let studyCards = [];
let studyIndex = 0;

const newFlashcardBtn = document.getElementById('newFlashcardBtn');
const flashcardModal = document.getElementById('flashcardModal');
const closeFlashcardModal = document.getElementById('closeFlashcardModal');
const flashcardForm = document.getElementById('flashcardForm');
const flashcardsGrid = document.getElementById('flashcardsGrid');
const emptyState = document.getElementById('emptyState');
const subjectFilter = document.getElementById('subjectFilter');
const studyModeBtn = document.getElementById('studyModeBtn');
const studyModal = document.getElementById('studyModal');
const closeStudyModal = document.getElementById('closeStudyModal');
const flashcardDisplay = document.getElementById('flashcardDisplay');
const flashcardInner = document.getElementById('flashcardInner');
const flipCardBtn = document.getElementById('flipCardBtn');
const prevCardBtn = document.getElementById('prevCardBtn');
const nextCardBtn = document.getElementById('nextCardBtn');
const studyProgress = document.getElementById('studyProgress');
const deleteFlashcardBtn = document.getElementById('deleteFlashcardBtn');

function openModal() {
  flashcardModal.classList.add('active');
  document.getElementById('flashcardSubject').focus();
}

function closeModal() {
  flashcardModal.classList.remove('active');
  resetForm();
}

function resetForm() {
  flashcardForm.reset();
  currentFlashcardId = null;
  deleteFlashcardBtn.style.display = 'none';
  document.getElementById('flashcardModalTitle').textContent = 'New Flashcard';
}

newFlashcardBtn.addEventListener('click', openModal);
closeFlashcardModal.addEventListener('click', closeModal);

flashcardModal.addEventListener('click', (e) => {
  if (e.target === flashcardModal) closeModal();
});

flashcardForm.addEventListener('submit', (e) => {
  e.preventDefault();
  saveFlashcard();
});

function saveFlashcard() {
  const flashcard = {
    id: currentFlashcardId || Date.now().toString(),
    subject: document.getElementById('flashcardSubject').value.trim(),
    question: document.getElementById('flashcardQuestion').value.trim(),
    answer: document.getElementById('flashcardAnswer').value.trim(),
    createdAt: currentFlashcardId ? flashcards.find(f => f.id === currentFlashcardId).createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (currentFlashcardId) {
    const index = flashcards.findIndex(f => f.id === currentFlashcardId);
    flashcards[index] = flashcard;
  } else {
    flashcards.push(flashcard);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
  closeModal();
  renderFlashcards();
  renderSubjects();
}

function editFlashcard(id) {
  const flashcard = flashcards.find(f => f.id === id);
  if (!flashcard) return;

  currentFlashcardId = id;
  document.getElementById('flashcardSubject').value = flashcard.subject;
  document.getElementById('flashcardQuestion').value = flashcard.question;
  document.getElementById('flashcardAnswer').value = flashcard.answer;
  document.getElementById('flashcardModalTitle').textContent = 'Edit Flashcard';
  deleteFlashcardBtn.style.display = 'block';
  openModal();
}

deleteFlashcardBtn.addEventListener('click', () => {
  if (!currentFlashcardId) return;
  if (confirm('Delete this flashcard?')) {
    flashcards = flashcards.filter(f => f.id !== currentFlashcardId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
    closeModal();
    renderFlashcards();
    renderSubjects();
  }
});

function renderFlashcards(filter = {}) {
  let filtered = flashcards;

  if (filter.subject) {
    filtered = filtered.filter(f => f.subject === filter.subject);
  }

  if (filtered.length === 0) {
    flashcardsGrid.style.display = 'none';
    emptyState.style.display = 'block';
  } else {
    flashcardsGrid.style.display = 'grid';
    emptyState.style.display = 'none';
  }

  flashcardsGrid.innerHTML = filtered.map(flashcard => `
    <div class="flashcard" data-id="${flashcard.id}">
      <div class="flashcard-header">
        <span class="flashcard-subject">${flashcard.subject}</span>
        <button class="icon-btn edit-flashcard" data-id="${flashcard.id}" aria-label="Edit flashcard">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      </div>
      <div class="flashcard-question">${flashcard.question}</div>
      <div class="flashcard-footer">
        <small>Updated ${new Date(flashcard.updatedAt).toLocaleDateString()}</small>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.edit-flashcard').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      editFlashcard(btn.dataset.id);
    });
  });

  document.querySelectorAll('.flashcard').forEach(card => {
    card.addEventListener('click', () => {
      editFlashcard(card.dataset.id);
    });
  });
}

function renderSubjects() {
  const subjects = [...new Set(flashcards.map(f => f.subject))];
  
  subjectFilter.innerHTML = '<option value="">All Subjects</option>';
  subjects.forEach(subject => {
    const option = document.createElement('option');
    option.value = subject;
    option.textContent = subject;
    subjectFilter.appendChild(option);
  });
}

subjectFilter.addEventListener('change', () => {
  renderFlashcards({ subject: subjectFilter.value });
});

studyModeBtn.addEventListener('click', () => {
  const filter = subjectFilter.value;
  studyCards = filter ? flashcards.filter(f => f.subject === filter) : [...flashcards];
  
  if (studyCards.length === 0) {
    alert('No flashcards to study!');
    return;
  }
  
  studyCards.sort(() => Math.random() - 0.5);
  studyIndex = 0;
  showStudyCard();
  studyModal.classList.add('active');
});

closeStudyModal.addEventListener('click', () => {
  studyModal.classList.remove('active');
  flashcardInner.classList.remove('flipped');
});

studyModal.addEventListener('click', (e) => {
  if (e.target === studyModal) {
    studyModal.classList.remove('active');
    flashcardInner.classList.remove('flipped');
  }
});

function showStudyCard() {
  if (studyCards.length === 0) return;
  
  const card = studyCards[studyIndex];
  document.getElementById('studyQuestion').textContent = card.question;
  document.getElementById('studyAnswer').textContent = card.answer;
  studyProgress.textContent = `${studyIndex + 1} / ${studyCards.length}`;
  flashcardInner.classList.remove('flipped');
  
  prevCardBtn.disabled = studyIndex === 0;
  nextCardBtn.disabled = studyIndex === studyCards.length - 1;
}

flipCardBtn.addEventListener('click', () => {
  flashcardInner.classList.toggle('flipped');
});

prevCardBtn.addEventListener('click', () => {
  if (studyIndex > 0) {
    studyIndex--;
    showStudyCard();
  }
});

nextCardBtn.addEventListener('click', () => {
  if (studyIndex < studyCards.length - 1) {
    studyIndex++;
    showStudyCard();
  }
});

flashcardDisplay.addEventListener('click', () => {
  flashcardInner.classList.toggle('flipped');
});

renderFlashcards();
renderSubjects();
