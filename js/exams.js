const examsData = [
    {
      id: 'jee-main',
      name: 'JEE Main',
      fullName: 'Joint Entrance Examination Main',
      organization: 'National Testing Agency (NTA)',
      category: 'engineering',
      ageLimit: '17-25 years',
      frequency: 'Twice a year (January & April)',
      eligibility: '10+2 with Physics, Chemistry, Mathematics',
      documents: [
        'Class 10 Mark Sheet',
        'Class 12 Mark Sheet',
        'Category Certificate (if applicable)',
        'PwD Certificate (if applicable)',
        'Aadhaar Card',
        'Passport size photograph',
        'Signature'
      ],
      fileSpecs: [
        { type: 'Photograph', format: 'JPG/JPEG', size: '10-200 KB', dimensions: '3.5 x 4.5 cm (passport size)' },
        { type: 'Signature', format: 'JPG/JPEG', size: '4-30 KB', dimensions: '3.5 x 1.5 cm' },
        { type: 'Category Certificate', format: 'PDF', size: 'Max 300 KB', dimensions: 'N/A' }
      ],
      links: [
        { name: 'Official Website', url: 'https://jeemain.nta.nic.in/', verified: true },
        { name: 'Syllabus', url: 'https://jeemain.nta.nic.in/syllabus/', verified: true },
        { name: 'Application Form', url: 'https://jeemain.nta.nic.in/registration/', verified: true }
      ]
    },
    {
      id: 'jee-advanced',
      name: 'JEE Advanced',
      fullName: 'Joint Entrance Examination Advanced',
      organization: 'IIT (Rotating)',
      category: 'engineering',
      ageLimit: '17-25 years',
      frequency: 'Once a year (May)',
      eligibility: 'Qualified JEE Main with top 2.5 lakh ranks',
      documents: [
        'JEE Main Admit Card',
        'Class 10 Certificate',
        'Class 12 Certificate',
        'Category Certificate (if applicable)',
        'PwD Certificate (if applicable)',
        'Photograph',
        'Signature'
      ],
      fileSpecs: [
        { type: 'Photograph', format: 'JPG/JPEG', size: '10-200 KB', dimensions: '3.5 x 4.5 cm' },
        { type: 'Signature', format: 'JPG/JPEG', size: '4-30 KB', dimensions: '3.5 x 1.5 cm' }
      ],
      links: [
        { name: 'Official Website', url: 'https://jeeadv.ac.in/', verified: true },
        { name: 'Registration', url: 'https://jeeadv.ac.in/registration.php', verified: true }
      ]
    },
    {
      id: 'neet-ug',
      name: 'NEET UG',
      fullName: 'National Eligibility cum Entrance Test (UG)',
      organization: 'National Testing Agency (NTA)',
      category: 'medical',
      ageLimit: '17 years minimum, no upper limit',
      frequency: 'Once a year (May)',
      eligibility: '10+2 with Physics, Chemistry, Biology',
      documents: [
        'Class 10 Certificate',
        'Class 12 Certificate',
        'Category Certificate (if applicable)',
        'PwD Certificate (if applicable)',
        'Aadhaar Card',
        'Photograph',
        'Signature',
        'Left thumb impression'
      ],
      fileSpecs: [
        { type: 'Photograph', format: 'JPG/JPEG', size: '10-200 KB', dimensions: '3.5 x 4.5 cm (white background)' },
        { type: 'Signature', format: 'JPG/JPEG', size: '4-30 KB', dimensions: '3.5 x 1.5 cm (black ink)' },
        { type: 'Thumb Impression', format: 'JPG/JPEG', size: '10-50 KB', dimensions: '3.5 x 3.5 cm' }
      ],
      links: [
        { name: 'Official Website', url: 'https://neet.nta.nic.in/', verified: true },
        { name: 'Information Bulletin', url: 'https://neet.nta.nic.in/bulletin/', verified: true },
        { name: 'Application', url: 'https://neet.nta.nic.in/registration/', verified: true }
      ]
    },
    {
      id: 'upsc-cse',
      name: 'UPSC CSE',
      fullName: 'Civil Services Examination',
      organization: 'Union Public Service Commission',
      category: 'civil',
      ageLimit: '21-32 years (General), relaxations for reserved categories',
      frequency: 'Once a year (June Prelims)',
      eligibility: 'Graduate degree from recognized university',
      documents: [
        'Graduation Certificate',
        'Class 10 Certificate (for DOB proof)',
        'Category Certificate (if applicable)',
        'PwD Certificate (if applicable)',
        'EWS Certificate (if applicable)',
        'Photograph',
        'Signature'
      ],
      fileSpecs: [
        { type: 'Photograph', format: 'JPG/JPEG', size: '10-300 KB', dimensions: 'Passport size, white background' },
        { type: 'Signature', format: 'JPG/JPEG', size: '10-100 KB', dimensions: 'Clear signature' },
        { type: 'Certificates', format: 'PDF', size: 'Max 2 MB each', dimensions: 'N/A' }
      ],
      links: [
        { name: 'UPSC Official Website', url: 'https://www.upsc.gov.in/', verified: true },
        { name: 'CSE Notification', url: 'https://www.upsc.gov.in/examinations/civil-services-examination', verified: true },
        { name: 'Online Application', url: 'https://upsconline.nic.in/', verified: true }
      ]
    },
    {
      id: 'ssc-cgl',
      name: 'SSC CGL',
      fullName: 'Staff Selection Commission - Combined Graduate Level',
      organization: 'Staff Selection Commission',
      category: 'ssc',
      ageLimit: '18-32 years (varies by post)',
      frequency: 'Once a year',
      eligibility: 'Bachelor Degree from recognized university',
      documents: [
        'Graduation Certificate',
        'Class 10 Certificate',
        'Class 12 Certificate',
        'Category Certificate (if applicable)',
        'EWS Certificate (if applicable)',
        'PwD Certificate (if applicable)',
        'Ex-Servicemen Certificate (if applicable)',
        'Photograph',
        'Signature'
      ],
      fileSpecs: [
        { type: 'Photograph', format: 'JPG/JPEG', size: '20-50 KB', dimensions: '3.5 x 3.5 cm, white background' },
        { type: 'Signature', format: 'JPG/JPEG', size: '10-20 KB', dimensions: '4 x 3 cm, black ink on white paper' }
      ],
      links: [
        { name: 'SSC Official Website', url: 'https://ssc.nic.in/', verified: true },
        { name: 'CGL Notification', url: 'https://ssc.nic.in/SSCFileServer/PortalManagement/UploadedFiles/notice_cgl.pdf', verified: true },
        { name: 'Online Application', url: 'https://ssc.nic.in/apply', verified: true }
      ]
    },
    {
      id: 'ssc-chsl',
      name: 'SSC CHSL',
      fullName: 'Staff Selection Commission - Combined Higher Secondary Level',
      organization: 'Staff Selection Commission',
      category: 'ssc',
      ageLimit: '18-27 years',
      frequency: 'Once a year',
      eligibility: '10+2 or equivalent from recognized board',
      documents: [
        'Class 10 Certificate',
        'Class 12 Certificate',
        'Category Certificate (if applicable)',
        'EWS Certificate (if applicable)',
        'PwD Certificate (if applicable)',
        'Photograph',
        'Signature'
      ],
      fileSpecs: [
        { type: 'Photograph', format: 'JPG/JPEG', size: '20-50 KB', dimensions: '3.5 x 3.5 cm' },
        { type: 'Signature', format: 'JPG/JPEG', size: '10-20 KB', dimensions: '4 x 3 cm' }
      ],
      links: [
        { name: 'SSC Official Website', url: 'https://ssc.nic.in/', verified: true },
        { name: 'CHSL Notification', url: 'https://ssc.nic.in/SSCFileServer/PortalManagement/UploadedFiles/notice_chsl.pdf', verified: true },
        { name: 'Apply Online', url: 'https://ssc.nic.in/apply', verified: true }
      ]
    },
    {
      id: 'ibps-po',
      name: 'IBPS PO',
      fullName: 'Institute of Banking Personnel Selection - Probationary Officer',
      organization: 'Institute of Banking Personnel Selection',
      category: 'banking',
      ageLimit: '20-30 years',
      frequency: 'Once a year',
      eligibility: 'Graduate degree with 60% marks',
      documents: [
        'Graduation Certificate',
        'Class 10 Certificate',
        'Class 12 Certificate',
        'Category Certificate (if applicable)',
        'PwD Certificate (if applicable)',
        'Photograph',
        'Signature',
        'Left thumb impression'
      ],
      fileSpecs: [
        { type: 'Photograph', format: 'JPG/JPEG', size: '20-50 KB', dimensions: '200 x 230 pixels (4.3 x 3.5 cm)' },
        { type: 'Signature', format: 'JPG/JPEG', size: '10-20 KB', dimensions: '140 x 60 pixels (3.5 x 1.5 cm)' },
        { type: 'Thumb Impression', format: 'JPG/JPEG', size: '20-50 KB', dimensions: '240 x 240 pixels (2.5 x 2.5 cm)' }
      ],
      links: [
        { name: 'IBPS Official Website', url: 'https://www.ibps.in/', verified: true },
        { name: 'PO Notification', url: 'https://www.ibps.in/po-notification/', verified: true },
        { name: 'Online Registration', url: 'https://ibpsonline.ibps.in/', verified: true }
      ]
    },
    {
      id: 'sbi-clerk',
      name: 'SBI Clerk',
      fullName: 'State Bank of India - Junior Associate',
      organization: 'State Bank of India',
      category: 'banking',
      ageLimit: '20-28 years',
      frequency: 'Once a year',
      eligibility: 'Graduate degree from recognized university',
      documents: [
        'Graduation Certificate',
        'Class 10 Certificate',
        'Class 12 Certificate',
        'Category Certificate (if applicable)',
        'PwD Certificate (if applicable)',
        'Photograph',
        'Signature',
        'Left thumb impression'
      ],
      fileSpecs: [
        { type: 'Photograph', format: 'JPG/JPEG', size: '20-50 KB', dimensions: '200 x 230 pixels' },
        { type: 'Signature', format: 'JPG/JPEG', size: '10-20 KB', dimensions: '140 x 60 pixels' },
        { type: 'Thumb Impression', format: 'JPG/JPEG', size: '20-50 KB', dimensions: '240 x 240 pixels' }
      ],
      links: [
        { name: 'SBI Careers', url: 'https://bank.sbi/careers', verified: true },
        { name: 'Notification', url: 'https://sbi.co.in/careers', verified: true }
      ]
    },
    {
      id: 'rrb-ntpc',
      name: 'RRB NTPC',
      fullName: 'Railway Recruitment Board - Non-Technical Popular Categories',
      organization: 'Railway Recruitment Board',
      category: 'railway',
      ageLimit: '18-36 years',
      frequency: 'As notified',
      eligibility: 'Graduate degree for most posts',
      documents: [
        'Educational Certificates',
        'Class 10 Certificate (for DOB)',
        'Category Certificate (if applicable)',
        'EWS Certificate (if applicable)',
        'PwD Certificate (if applicable)',
        'Ex-Servicemen Certificate (if applicable)',
        'Photograph',
        'Signature'
      ],
      fileSpecs: [
        { type: 'Photograph', format: 'JPG/JPEG', size: '15-40 KB', dimensions: '3.5 x 3.5 cm to 3.5 x 4.5 cm' },
        { type: 'Signature', format: 'JPG/JPEG', size: '10-40 KB', dimensions: '4 x 3 cm' }
      ],
      links: [
        { name: 'RRB Official Portal', url: 'https://www.rrbcdg.gov.in/', verified: true },
        { name: 'NTPC Notification', url: 'https://www.rrbcdg.gov.in/ntpc/', verified: true }
      ]
    },
    {
      id: 'nda',
      name: 'NDA',
      fullName: 'National Defence Academy & Naval Academy Examination',
      organization: 'UPSC',
      category: 'defence',
      ageLimit: '16.5-19.5 years',
      frequency: 'Twice a year',
      eligibility: '10+2 (unmarried male candidates)',
      documents: [
        'Class 10 Certificate',
        'Class 12 Certificate (for NDA)',
        'Photograph',
        'Signature',
        'Character Certificate',
        'Medical Fitness Certificate'
      ],
      fileSpecs: [
        { type: 'Photograph', format: 'JPG/JPEG', size: '10-300 KB', dimensions: 'Passport size' },
        { type: 'Signature', format: 'JPG/JPEG', size: '10-100 KB', dimensions: 'Clear signature' }
      ],
      links: [
        { name: 'UPSC NDA Page', url: 'https://www.upsc.gov.in/examinations/nda', verified: true },
        { name: 'Application', url: 'https://upsconline.nic.in/', verified: true }
      ]
    },
    {
      id: 'cds',
      name: 'CDS',
      fullName: 'Combined Defence Services Examination',
      organization: 'UPSC',
      category: 'defence',
      ageLimit: '19-24 years (varies by academy)',
      frequency: 'Twice a year',
      eligibility: 'Graduate degree (unmarried)',
      documents: [
        'Graduation Certificate',
        'Class 10 Certificate',
        'Photograph',
        'Signature',
        'Character Certificate'
      ],
      fileSpecs: [
        { type: 'Photograph', format: 'JPG/JPEG', size: '10-300 KB', dimensions: 'Passport size' },
        { type: 'Signature', format: 'JPG/JPEG', size: '10-100 KB', dimensions: 'Clear signature' }
      ],
      links: [
        { name: 'UPSC CDS Page', url: 'https://www.upsc.gov.in/examinations/cds', verified: true },
        { name: 'Apply Online', url: 'https://upsconline.nic.in/', verified: true }
      ]
    },
    {
      id: 'gate',
      name: 'GATE',
      fullName: 'Graduate Aptitude Test in Engineering',
      organization: 'IIT (Rotating)',
      category: 'engineering',
      ageLimit: 'No age limit',
      frequency: 'Once a year (February)',
      eligibility: 'B.E/B.Tech (3rd year or passed)',
      documents: [
        'Graduation Certificate',
        'Class 10 Certificate',
        'Category Certificate (if applicable)',
        'PwD Certificate (if applicable)',
        'Photograph',
        'Signature'
      ],
      fileSpecs: [
        { type: 'Photograph', format: 'JPG/JPEG', size: '10-200 KB', dimensions: '3.5 x 4.5 cm' },
        { type: 'Signature', format: 'JPG/JPEG', size: '10-100 KB', dimensions: '3.5 x 1.5 cm' }
      ],
      links: [
        { name: 'GATE Official Website', url: 'https://gate.iitkgp.ac.in/', verified: true },
        { name: 'GOAPS Portal', url: 'https://appsgate.iitkgp.ac.in/', verified: true }
      ]
    }
  ];
  
  const examsGrid = document.getElementById('examsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const examModal = document.getElementById('examModal');
  const closeExamModal = document.getElementById('closeExamModal');
  
  function renderExams(category = 'all') {
    const filtered = category === 'all' ? examsData : examsData.filter(e => e.category === category);
    
    if (filtered.length === 0) {
      examsGrid.innerHTML = '<p class="no-results">No exams found in this category</p>';
      return;
    }
    
    examsGrid.innerHTML = filtered.map(exam => `
      <div class="exam-card glass-card" data-exam-id="${exam.id}">
        <div class="exam-card-header">
          <div class="exam-badge ${exam.category}">${getCategoryName(exam.category)}</div>
          <h3>${exam.name}</h3>
          <p class="exam-full-name">${exam.fullName}</p>
        </div>
        <div class="exam-card-body">
          <div class="exam-info-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>${exam.organization}</span>
          </div>
          <div class="exam-info-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>${exam.ageLimit}</span>
          </div>
          <div class="exam-info-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span>${exam.frequency}</span>
          </div>
        </div>
        <button class="btn btn-primary btn-block view-details-btn">
          View Full Details
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    `).join('');
    
    document.querySelectorAll('.exam-card').forEach(card => {
      card.querySelector('.view-details-btn').addEventListener('click', () => {
        openExamModal(card.dataset.examId);
      });
    });
  }
  
  function getCategoryName(category) {
    const names = {
      engineering: 'Engineering',
      medical: 'Medical',
      civil: 'Civil Services',
      banking: 'Banking',
      ssc: 'SSC',
      railway: 'Railway',
      defence: 'Defence'
    };
    return names[category] || category;
  }
  
  function openExamModal(examId) {
    const exam = examsData.find(e => e.id === examId);
    if (!exam) return;
    
    document.getElementById('examModalTitle').textContent = exam.fullName;
    document.getElementById('examModalOrg').textContent = exam.organization;
    
    document.getElementById('examDetails').innerHTML = `
      <div class="detail-grid">
        <div class="detail-item">
          <strong>Eligibility:</strong>
          <span>${exam.eligibility}</span>
        </div>
        <div class="detail-item">
          <strong>Age Limit:</strong>
          <span>${exam.ageLimit}</span>
        </div>
        <div class="detail-item">
          <strong>Frequency:</strong>
          <span>${exam.frequency}</span>
        </div>
      </div>
    `;
    
    document.getElementById('examDocuments').innerHTML = exam.documents.map(doc => `
      <li>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        ${doc}
      </li>
    `).join('');
    
    document.getElementById('examFileSpecs').innerHTML = exam.fileSpecs.map(spec => `
      <div class="file-spec-card">
        <h4>${spec.type}</h4>
        <div class="file-spec-details">
          <span><strong>Format:</strong> ${spec.format}</span>
          <span><strong>Size:</strong> ${spec.size}</span>
          <span><strong>Dimensions:</strong> ${spec.dimensions}</span>
        </div>
      </div>
    `).join('');
    
    document.getElementById('examLinks').innerHTML = exam.links.map(link => `
      <a href="${link.url}" class="official-link" target="_blank" rel="noopener noreferrer">
        <div class="link-content">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          <span>${link.name}</span>
        </div>
        ${link.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
      </a>
    `).join('');
    
    examModal.classList.add('active');
  }
  
  closeExamModal.addEventListener('click', () => {
    examModal.classList.remove('active');
  });
  
  examModal.addEventListener('click', (e) => {
    if (e.target === examModal) {
      examModal.classList.remove('active');
    }
  });
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderExams(btn.dataset.category);
    });
  });
  
  document.getElementById('addToPlanner')?.addEventListener('click', () => {
    alert('This feature will add exam dates to your planner. Coming soon!');
  });
  
  renderExams();
  