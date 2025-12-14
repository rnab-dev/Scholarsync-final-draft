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
  const existingCard = currentFlashcardId ? flashcards.find(f => f.id === currentFlashcardId) : null;
  const flashcard = {
    id: currentFlashcardId || Date.now().toString(),
    subject: document.getElementById('flashcardSubject').value.trim(),
    question: document.getElementById('flashcardQuestion').value.trim(),
    answer: document.getElementById('flashcardAnswer').value.trim(),
    createdAt: existingCard ? existingCard.createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    // Spaced repetition properties
    interval: existingCard ? existingCard.interval : 0,
    repetitions: existingCard ? existingCard.repetitions : 0,
    easeFactor: existingCard ? existingCard.easeFactor : 2.5,
    nextReview: existingCard ? existingCard.nextReview : new Date().toISOString()
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
  const now = new Date();
  
  // Filter cards that are due for review
  studyCards = flashcards.filter(f => {
    const matchesSubject = !filter || f.subject === filter;
    const isDue = !f.nextReview || new Date(f.nextReview) <= now;
    return matchesSubject && isDue;
  });
  
  if (studyCards.length === 0) {
    const totalCards = filter ? flashcards.filter(f => f.subject === filter).length : flashcards.length;
    if (totalCards === 0) {
      alert('No flashcards to study!');
    } else {
      alert('No cards due for review! Come back later.');
    }
    return;
  }
  
  // Sort by next review date (oldest first)
  studyCards.sort((a, b) => new Date(a.nextReview || 0) - new Date(b.nextReview || 0));
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

// SM-2 Spaced Repetition Algorithm
function calculateNextReview(card, quality) {
  // quality: 0=Again (<1min), 1=Hard (<10min), 2=Good (1+ days), 3=Easy (6+ days)
  let interval = card.interval || 0;
  let repetitions = card.repetitions || 0;
  let easeFactor = card.easeFactor || 2.5;
  
  const now = Date.now();
  let nextReview;
  
  if (quality === 0) {
    // Again - show in 1 minute
    repetitions = 0;
    interval = 0;
    nextReview = now + (1 * 60 * 1000);
  } else if (quality === 1) {
    // Hard - show in 10 minutes
    repetitions = 0;
    interval = 0;
    nextReview = now + (10 * 60 * 1000);
  } else if (quality === 2) {
    // Good - standard progression
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions++;
    nextReview = now + (interval * 24 * 60 * 60 * 1000);
  } else {
    // Easy - longer progression
    if (repetitions === 0) {
      interval = 6;
    } else if (repetitions === 1) {
      interval = 15;
    } else {
      interval = Math.round(interval * easeFactor * 1.3);
    }
    repetitions++;
    nextReview = now + (interval * 24 * 60 * 60 * 1000);
  }
  
  // Update ease factor based on quality
  easeFactor = easeFactor + (0.1 - (3 - quality) * (0.08 + (3 - quality) * 0.02));
  easeFactor = Math.max(1.3, Math.min(2.5, easeFactor));
  
  return {
    interval,
    repetitions,
    easeFactor,
    nextReview
  };
}

function rateCard(quality) {
  if (studyCards.length === 0) return;
  
  const card = studyCards[studyIndex];
  const cardIndex = flashcards.findIndex(f => f.id === card.id);
  
  if (cardIndex !== -1) {
    // Update card with new spaced repetition data
    const srData = calculateNextReview(card, quality);
    flashcards[cardIndex] = {
      ...flashcards[cardIndex],
      ...srData,
      lastReviewed: Date.now()
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(flashcards));
    
    // Visual feedback
    const flashDisplay = document.getElementById('flashcardDisplay');
    const ratingNames = ['Again', 'Hard', 'Good', 'Easy'];
    const intervals = [
      '< 1 minute',
      '< 10 minutes', 
      srData.interval === 1 ? '1 day' : `${srData.interval} days`,
      srData.interval + ' days'
    ];
    
    // Flash animation
    flashDisplay.style.transition = 'opacity 0.2s';
    flashDisplay.style.opacity = '0.3';
    setTimeout(() => {
      flashDisplay.style.opacity = '1';
    }, 200);
    
    // Remove current card from study session
    studyCards.splice(studyIndex, 1);
    
    // Check if study session is complete
    if (studyCards.length === 0) {
      setTimeout(() => {
        alert(`Study session complete! Great job! 🎉\n\nCard will be reviewed: ${intervals[quality]}`);
        studyModal.classList.remove('active');
        flashcardInner.classList.remove('flipped');
        renderFlashcards();
        updateDueCount();
      }, 300);
      return;
    }
    
    // Adjust index if needed
    if (studyIndex >= studyCards.length) {
      studyIndex = studyCards.length - 1;
    }
    
    showStudyCard();
  }
}

function showStudyCard() {
  if (studyCards.length === 0) return;
  
  const card = studyCards[studyIndex];
  document.getElementById('studyQuestion').textContent = card.question;
  document.getElementById('studyAnswer').textContent = card.answer;
  
  // Calculate ease percentage for display
  const easeFactor = card.easeFactor || 2.5;
  const easePercent = Math.round(((easeFactor - 1.3) / (2.5 - 1.3)) * 100);
  
  // Show study progress with review info
  studyProgress.textContent = `Card ${studyIndex + 1} of ${studyCards.length} • Reviews: ${card.repetitions || 0} • Ease: ${easePercent}%`;
  
  flashcardInner.classList.remove('flipped');
  
  prevCardBtn.disabled = studyIndex === 0;
  nextCardBtn.disabled = studyIndex === studyCards.length - 1;
}

flipCardBtn.addEventListener('click', () => {
  flashcardInner.classList.toggle('flipped');
});

// Spaced repetition rating buttons
const againBtn = document.getElementById('againBtn');
const hardBtn = document.getElementById('hardBtn');
const goodBtn = document.getElementById('goodBtn');
const easyBtn = document.getElementById('easyBtn');

if (againBtn) againBtn.addEventListener('click', () => {
  console.log('Rating: Again (0)');
  rateCard(0);
});
if (hardBtn) hardBtn.addEventListener('click', () => {
  console.log('Rating: Hard (1)');
  rateCard(1);
});
if (goodBtn) goodBtn.addEventListener('click', () => {
  console.log('Rating: Good (2)');
  rateCard(2);
});
if (easyBtn) easyBtn.addEventListener('click', () => {
  console.log('Rating: Easy (3)');
  rateCard(3);
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

// Show cards due today count on page load
function updateDueCount() {
  const now = new Date();
  const dueCount = flashcards.filter(f => !f.nextReview || new Date(f.nextReview) <= now).length;
  const studyBtn = document.getElementById('studyModeBtn');
  if (studyBtn && dueCount > 0) {
    studyBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
      Study (${dueCount} due)
    `;
  }
}

renderFlashcards();
renderSubjects();
updateDueCount();

// Update due count every minute
setInterval(updateDueCount, 60000);
