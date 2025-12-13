const studyAssistant = {
    responses: [
      {
        keywords: ['photosynthesis', 'plant', 'chlorophyll'],
        answer: `PHOTOSYNTHESIS EXPLAINED
  
  Photosynthesis is the process by which plants convert light energy into chemical energy.
  
  Key Components:
  • Chlorophyll - green pigment that captures light
  • Carbon dioxide (CO₂) - absorbed from air
  • Water (H₂O) - absorbed through roots
  • Sunlight - energy source
  
  Chemical Equation:
  6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂
  
  Two Main Stages:
  1. Light-dependent reactions (in thylakoid membranes)
     - Captures light energy
     - Produces ATP and NADPH
     - Releases oxygen
  
  2. Light-independent reactions (Calvin cycle)
     - Uses ATP and NADPH
     - Fixes CO₂ into glucose
     - Occurs in stroma
  
  Importance:
  - Produces oxygen for atmosphere
  - Base of food chain
  - Removes CO₂ from atmosphere`
      },
      {
        keywords: ['calculus', 'derivative', 'integration', 'limit'],
        answer: `CALCULUS FUNDAMENTALS
  
  Calculus is the mathematics of change and motion.
  
  Core Concepts:
  
  1. LIMITS
     lim(x→a) f(x) = L
     Foundation of calculus; describes function behavior as x approaches a value
  
  2. DERIVATIVES
     f'(x) = lim(h→0) [f(x+h) - f(x)] / h
     
     Represents:
     • Instantaneous rate of change
     • Slope of tangent line
     • Velocity (if function represents position)
     
     Common Rules:
     • Power rule: d/dx(xⁿ) = nxⁿ⁻¹
     • Product rule: d/dx(fg) = f'g + fg'
     • Chain rule: d/dx(f(g(x))) = f'(g(x))·g'(x)
  
  3. INTEGRATION
     ∫f(x)dx = F(x) + C
     
     Represents:
     • Area under curve
     • Accumulation
     • Antiderivative
     
     Fundamental Theorem:
     ∫ₐᵇ f(x)dx = F(b) - F(a)
  
  Applications:
  - Physics: motion, forces, energy
  - Economics: marginal analysis
  - Engineering: optimization problems`
      }
    ],
    
    getResponse(query) {
      const lowerQuery = query.toLowerCase();
      
      for (const response of this.responses) {
        if (response.keywords.some(keyword => lowerQuery.includes(keyword))) {
          return response.answer;
        }
      }
      
      return `STUDY ASSISTANT RESPONSE
  
  Thank you for your question: "${query}"
  
  General Study Tips:
  
  • Break complex topics into smaller concepts
  • Use active recall - test yourself frequently
  • Create connections between new and existing knowledge
  • Practice spaced repetition for better retention
  • Explain concepts to others to deepen understanding
  
  Recommended Approach:
  1. Read and understand the material
  2. Summarize in your own words
  3. Create practice problems
  4. Review regularly with increasing intervals
  5. Apply concepts to real-world scenarios
  
  For specific topics, try asking about:
  - Scientific concepts (biology, chemistry, physics)
  - Mathematical topics (algebra, calculus, statistics)
  - Programming concepts (algorithms, data structures)
  - Historical events and analysis
  
  Would you like to explore any of these areas?`;
    }
  };
  
  const quizGenerator = {
    templates: {
      calculus: [
        { q: 'Find the derivative of f(x) = 3x⁴ - 2x² + 5', a: "f'(x) = 12x³ - 4x" },
        { q: 'Evaluate ∫(2x + 3)dx', a: 'x² + 3x + C' },
        { q: 'Find lim(x→0) (sin(x)/x)', a: '1' },
        { q: 'If f(x) = eˣ, what is f\'(x)?', a: 'eˣ' },
        { q: 'Integrate ∫₀¹ x²dx', a: '1/3' }
      ],
      physics: [
        { q: 'State Newton\'s Second Law', a: 'F = ma (Force equals mass times acceleration)' },
        { q: 'What is the speed of light in vacuum?', a: '3 × 10⁸ m/s' },
        { q: 'Define kinetic energy', a: 'KE = ½mv² (energy of motion)' },
        { q: 'What is Ohm\'s Law?', a: 'V = IR (Voltage = Current × Resistance)' },
        { q: 'State the Law of Conservation of Energy', a: 'Energy cannot be created or destroyed, only transformed' }
      ],
      programming: [
        { q: 'What is time complexity of binary search?', a: 'O(log n)' },
        { q: 'Define polymorphism in OOP', a: 'Ability of objects to take multiple forms' },
        { q: 'What does SOLID stand for in software design?', a: 'Single responsibility, Open-closed, Liskov substitution, Interface segregation, Dependency inversion' },
        { q: 'Difference between stack and queue?', a: 'Stack: LIFO (Last In First Out), Queue: FIFO (First In First Out)' },
        { q: 'What is recursion?', a: 'Function that calls itself to solve a problem' }
      ]
    },
    
    generate(topic, count) {
      const key = Object.keys(this.templates).find(k => topic.toLowerCase().includes(k));
      const questions = key ? this.templates[key] : this.templates.calculus;
      
      const selected = [];
      const indices = new Set();
      
      while (selected.length < Math.min(count, questions.length)) {
        const idx = Math.floor(Math.random() * questions.length);
        if (!indices.has(idx)) {
          indices.add(idx);
          selected.push(questions[idx]);
        }
      }
      
      let output = `QUIZ: ${topic.toUpperCase()}\n\n`;
      output += `${selected.length} Questions\n`;
      output += '═'.repeat(50) + '\n\n';
      
      selected.forEach((item, index) => {
        output += `${index + 1}. ${item.q}\n\n`;
      });
      
      output += '\n' + '═'.repeat(50) + '\n';
      output += 'ANSWER KEY\n';
      output += '═'.repeat(50) + '\n\n';
      
      selected.forEach((item, index) => {
        output += `${index + 1}. ${item.a}\n\n`;
      });
      
      return output;
    }
  };
  
  const careerHelper = {
    getAdvice(interests, level) {
      const interestsLower = interests.toLowerCase();
      
      let career = 'Technology';
      let paths = ['Software Engineer', 'Data Scientist', 'Product Manager'];
      
      if (interestsLower.includes('data') || interestsLower.includes('analytics')) {
        career = 'Data Science';
        paths = ['Data Analyst', 'Data Engineer', 'Machine Learning Engineer', 'Business Intelligence Analyst'];
      } else if (interestsLower.includes('design') || interestsLower.includes('ux') || interestsLower.includes('ui')) {
        career = 'Design';
        paths = ['UI/UX Designer', 'Product Designer', 'Visual Designer', 'Design Researcher'];
      } else if (interestsLower.includes('business') || interestsLower.includes('management')) {
        career = 'Business';
        paths = ['Business Analyst', 'Product Manager', 'Consultant', 'Project Manager'];
      } else if (interestsLower.includes('web') || interestsLower.includes('frontend') || interestsLower.includes('backend')) {
        career = 'Web Development';
        paths = ['Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'DevOps Engineer'];
      }
      
      return `CAREER GUIDANCE: ${career.toUpperCase()}
  
  Based on your interests in "${interests}" at ${level} level
  
  Recommended Career Paths:
  ${paths.map((p, i) => `${i + 1}. ${p}`).join('\n')}
  
  Skills to Develop:
  
  Technical Skills:
  • Core programming/domain knowledge
  • Problem-solving and analytical thinking
  • Tools and frameworks relevant to field
  • Version control (Git)
  • Communication and documentation
  
  Soft Skills:
  • Collaboration and teamwork
  • Time management
  • Critical thinking
  • Adaptability
  • Continuous learning mindset
  
  Action Plan:
  
  For Students:
  1. Build foundational knowledge through courses
  2. Work on personal projects
  3. Contribute to open source
  4. Join student organizations and clubs
  5. Seek internships and co-op positions
  
  For Graduates:
  1. Create a strong portfolio
  2. Network with professionals
  3. Attend industry events and meetups
  4. Apply for entry-level positions
  5. Consider specialization or certifications
  
  Resources:
  • Online learning platforms (Coursera, edX, Udacity)
  • Technical communities (GitHub, Stack Overflow)
  • Professional networks (LinkedIn)
  • Mentorship programs
  • Industry conferences and workshops
  
  Next Steps:
  - Define specific short-term goals (3-6 months)
  - Identify skills gaps and learning resources
  - Build projects that demonstrate capabilities
  - Connect with professionals in the field
  - Stay updated with industry trends`;
    }
  };
  
  document.querySelectorAll('.ai-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const tool = form.dataset.tool;
      const output = document.querySelector(`[data-output="${tool}"]`);
      
      let result = '';
      
      if (tool === 'study') {
        const question = form.querySelector('textarea').value.trim();
        result = studyAssistant.getResponse(question);
      } else if (tool === 'quiz') {
        const topic = form.querySelector('input').value.trim();
        const count = parseInt(form.querySelector('select').value);
        result = quizGenerator.generate(topic, count);
      } else if (tool === 'career') {
        const interests = form.querySelectorAll('input')[0].value.trim();
        const level = form.querySelectorAll('input')[1].value.trim();
        result = careerHelper.getAdvice(interests, level);
      }
      
      output.textContent = result;
      output.classList.add('active');
      
      if (!output.querySelector('.ai-output-actions')) {
        const actions = document.createElement('div');
        actions.className = 'ai-output-actions';
        actions.innerHTML = `
          <button class="copy-output" aria-label="Copy output">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
            </svg>
          </button>
          <button class="download-output" aria-label="Download output">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
          </button>
        `;
        output.appendChild(actions);
        
        actions.querySelector('.copy-output').addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(result);
            actions.querySelector('.copy-output').innerHTML = 'Copied!';
            setTimeout(() => {
              actions.querySelector('.copy-output').innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
              `;
            }, 2000);
          } catch (err) {
            console.error('Failed to copy:', err);
          }
        });
        
        actions.querySelector('.download-output').addEventListener('click', () => {
          const blob = new Blob([result], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${tool}-output.txt`;
          a.click();
          URL.revokeObjectURL(url);
        });
      }
    });
  });
  