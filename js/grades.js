const STORAGE_KEY = 'scholarsync_cgpa_subjects_v2';
const MAX_SUBJECTS = 5;

let subjects = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const calculateBtn = document.getElementById('calculateBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const subjectsList = document.getElementById('subjectsList');
const gpaValue = document.getElementById('gpaValue');
const earnedCredits = document.getElementById('earnedCredits');
const totalCredits = document.getElementById('totalCredits');
const percentageValue = document.getElementById('percentageValue');
const subjectCount = document.getElementById('subjectCount');

function getGradeLetter(grade) {
  if (grade >= 10) return 'O';
  if (grade >= 9) return 'A+';
  if (grade >= 8) return 'A';
  if (grade >= 7) return 'B+';
  if (grade >= 6) return 'B';
  if (grade >= 5) return 'C';
  if (grade >= 4) return 'D';
  return 'F';
}

function cgpaToPercentage(cgpa) {
  return (cgpa * 9.5).toFixed(1);
}

function createSubjectRow(index) {
  const subject = subjects[index] || { name: '', credits: '', grade: '' };
  
  return `
    <div class="subject-row" data-index="${index}">
      <div class="subject-number">${index + 1}</div>
      <div class="subject-inputs">
        <input 
          type="text" 
          class="input subject-name" 
          placeholder="Subject Name"
          value="${subject.name}"
          data-field="name"
        >
        <input 
          type="number" 
          class="input subject-credits" 
          placeholder="Credits"
          min="0"
          max="10"
          step="0.5"
          value="${subject.credits}"
          data-field="credits"
        >
        <select class="select-input subject-grade" data-field="grade">
          <option value="">Grade</option>
          <option value="10" ${subject.grade == 10 ? 'selected' : ''}>O (10)</option>
          <option value="9" ${subject.grade == 9 ? 'selected' : ''}>A+ (9)</option>
          <option value="8" ${subject.grade == 8 ? 'selected' : ''}>A (8)</option>
          <option value="7" ${subject.grade == 7 ? 'selected' : ''}>B+ (7)</option>
          <option value="6" ${subject.grade == 6 ? 'selected' : ''}>B (6)</option>
          <option value="5" ${subject.grade == 5 ? 'selected' : ''}>C (5)</option>
          <option value="4" ${subject.grade == 4 ? 'selected' : ''}>D (4)</option>
          <option value="0" ${subject.grade == 0 ? 'selected' : ''}>F (0)</option>
        </select>
        <button class="icon-btn delete-subject-btn" data-index="${index}" title="Remove subject">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

function renderSubjects() {
  // Ensure we have at least one empty row
  if (subjects.length === 0) {
    subjects.push({ name: '', credits: '', grade: '' });
  }

  subjectsList.innerHTML = subjects.map((_, index) => createSubjectRow(index)).join('');
  
  // Show add more button if less than MAX_SUBJECTS
  if (subjects.length < MAX_SUBJECTS) {
    subjectsList.innerHTML += `
      <button class="btn btn-secondary btn-add-subject" id="addSubjectBtn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        Add Subject
      </button>
    `;
  }

  updateSubjectCount();
  attachEventListeners();
  saveToStorage();
}

function attachEventListeners() {
  // Input changes
  document.querySelectorAll('.subject-row input, .subject-row select').forEach(input => {
    input.addEventListener('input', (e) => {
      const row = e.target.closest('.subject-row');
      const index = parseInt(row.dataset.index);
      const field = e.target.dataset.field;
      
      if (!subjects[index]) {
        subjects[index] = { name: '', credits: '', grade: '' };
      }
      
      subjects[index][field] = e.target.value;
      saveToStorage();
      updateSubjectCount();
    });
  });

  // Delete buttons
  document.querySelectorAll('.delete-subject-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const index = parseInt(btn.dataset.index);
      subjects.splice(index, 1);
      renderSubjects();
      calculateCGPA();
    });
  });

  // Add subject button
  const addBtn = document.getElementById('addSubjectBtn');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      if (subjects.length < MAX_SUBJECTS) {
        subjects.push({ name: '', credits: '', grade: '' });
        renderSubjects();
      }
    });
  }
}

function updateSubjectCount() {
  const filledSubjects = subjects.filter(s => s.name && s.credits && s.grade).length;
  subjectCount.textContent = `${filledSubjects} / ${MAX_SUBJECTS}`;
}

function calculateCGPA() {
  const validSubjects = subjects.filter(s => s.name && s.credits && s.grade);
  
  if (validSubjects.length === 0) {
    gpaValue.textContent = '0.00';
    earnedCredits.textContent = '0';
    totalCredits.textContent = '0';
    percentageValue.textContent = '0%';
    return;
  }

  let totalPoints = 0;
  let totalCreditsSum = 0;
  let earnedCreditsSum = 0;

  validSubjects.forEach(subject => {
    const credits = parseFloat(subject.credits);
    const grade = parseFloat(subject.grade);
    
    totalPoints += grade * credits;
    totalCreditsSum += credits;
    
    // Count earned credits (grade >= 4 means pass)
    if (grade >= 4) {
      earnedCreditsSum += credits;
    }
  });

  const cgpa = totalCreditsSum > 0 ? totalPoints / totalCreditsSum : 0;
  const percentage = cgpaToPercentage(cgpa);
  
  gpaValue.textContent = cgpa.toFixed(2);
  earnedCredits.textContent = earnedCreditsSum.toFixed(1);
  totalCredits.textContent = totalCreditsSum.toFixed(1);
  percentageValue.textContent = percentage + '%';
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects));
}

function clearAll() {
  if (confirm('Are you sure you want to clear all subjects?')) {
    subjects = [{ name: '', credits: '', grade: '' }];
    renderSubjects();
    calculateCGPA();
  }
}

// Event listeners
calculateBtn.addEventListener('click', calculateCGPA);
clearAllBtn.addEventListener('click', clearAll);

// Initialize
renderSubjects();
calculateCGPA();
