const STORAGE_KEY = 'scholarsync_tutorials_v1';

const videosData = [
  { id: 'pQN-pnXPaVg', title: 'HTML Full Course - Build a Website Tutorial', channel: 'freeCodeCamp.org', views: '13M', duration: '2:04:36', category: 'web-dev', description: 'Master HTML and CSS from scratch with projects' },
  { id: 'yfoY53QXEnI', title: 'CSS Tutorial – Full Course for Beginners', channel: 'freeCodeCamp.org', views: '4M', duration: '11:08:11', category: 'web-dev', description: 'Complete CSS course with modern techniques' },
  { id: '1Rs2ND1ryYc', title: 'Tailwind CSS Full Course for Beginners', channel: 'freeCodeCamp.org', views: '2.3M', duration: '3:09:26', category: 'web-dev', description: 'Learn Tailwind CSS utility framework' },
  { id: 'srvUrASNj0s', title: 'Responsive Web Design Tutorial', channel: 'freeCodeCamp.org', views: '4.2M', duration: '4:01:06', category: 'web-dev', description: 'Build responsive websites for all devices' },
  { id: 'iJKCj8uAHz8', title: 'Bootstrap CSS Framework - Full Course', channel: 'freeCodeCamp.org', views: '3.1M', duration: '2:46:11', category: 'web-dev', description: 'Master Bootstrap 5 framework' },
  { id: '_a5j7KoflTs', title: 'Sass Tutorial for Beginners - CSS', channel: 'freeCodeCamp.org', views: '1.2M', duration: '2:04:38', category: 'web-dev', description: 'Learn Sass CSS preprocessor' },
  { id: 'RGOj5yH7evk', title: 'Git and GitHub for Beginners - Crash Course', channel: 'freeCodeCamp.org', views: '12M', duration: '1:08:41', category: 'web-dev', description: 'Master version control with Git' },
  { id: 'phWxA89Dy94', title: 'Learn Flexbox CSS in 8 minutes', channel: 'Web Dev Simplified', views: '1.5M', duration: '8:01', category: 'web-dev', description: 'Learn CSS Flexbox layout' },
  { id: 'jx5jmI0UlXU', title: 'Learn CSS Grid in 20 Minutes', channel: 'Web Dev Simplified', views: '2.1M', duration: '20:45', category: 'web-dev', description: 'Master CSS Grid layout system' },
  { id: 'G3e-cpL7ofc', title: 'HTML Tutorial for Beginners: HTML Crash Course', channel: 'Programming with Mosh', views: '6.4M', duration: '1:00:35', category: 'web-dev', description: 'Learn HTML in one hour' },
  { id: 'c9Wg6Cb_YlU', title: 'Figma Tutorial - A Free UI Design Course', channel: 'Bring Your Own Laptop', views: '3.7M', duration: '49:32', category: 'web-dev', description: 'Design websites with Figma' },
  { id: 'qr0ujkLLgmE', title: 'Web Accessibility Tutorial', channel: 'DesignCourse', views: '380K', duration: '14:39', category: 'web-dev', description: 'Build accessible websites' },
  { id: 'zJSY8tbf_ys', title: 'Frontend Web Development Bootcamp Course', channel: 'freeCodeCamp.org', views: '22M', duration: '3:26:42', category: 'web-dev', description: 'Complete frontend development course' },
  { id: 'un5fJXjtv3U', title: 'Website Speed Optimization Tutorial', channel: 'Kevin Powell', views: '290K', duration: '24:43', category: 'web-dev', description: 'Speed up your websites' },
  { id: 'YszONjKpgg4', title: 'CSS Animation Tutorial', channel: 'Online Tutorials', views: '7.8M', duration: '10:47', category: 'web-dev', description: 'Create smooth CSS animations' },

  { id: 'rfscVS0vtbw', title: 'Learn Python - Full Course for Beginners', channel: 'freeCodeCamp.org', views: '49M', duration: '4:26:52', category: 'python', description: 'Complete Python tutorial for absolute beginners' },
  { id: '_uQrJ0TkZlc', title: 'Python Tutorial - Python Full Course for Beginners', channel: 'Programming with Mosh', views: '34M', duration: '6:14:07', category: 'python', description: 'Complete Python programming guide' },
  { id: 't8pPdKYpowI', title: 'Python Tutorial for Beginners | Full Course', channel: 'Telusko', views: '15M', duration: '1:37:58', category: 'python', description: 'Quick Python crash course' },
  { id: 'LHBE6Q9XlzI', title: 'Python for Data Science - Course for Beginners', channel: 'freeCodeCamp.org', views: '7.9M', duration: '12:21:34', category: 'python', description: 'Python for data analysis and ML' },
  { id: 'F5mRW0jo-U4', title: 'Python Django 7 Hour Course', channel: 'freeCodeCamp.org', views: '6.2M', duration: '7:47:58', category: 'python', description: 'Build web apps with Django framework' },
  { id: 'Z1RJmh_OqeA', title: 'Flask Course - Python Web Application', channel: 'freeCodeCamp.org', views: '3.8M', duration: '5:59:32', category: 'python', description: 'Learn Flask web framework' },
  { id: 'ZDa-Z5JzLYM', title: 'Python OOP Tutorial (Object Oriented Programming)', channel: 'Corey Schafer', views: '5.7M', duration: '44:25', category: 'python', description: 'Object-oriented programming in Python' },
  { id: 'pkYVOmU3MgA', title: 'Python Data Structures and Algorithms', channel: 'freeCodeCamp.org', views: '6.4M', duration: '12:42:11', category: 'python', description: 'Master Python data structures' },
  { id: 'i_LwzRVP7bg', title: 'Machine Learning Course - Python scikit-learn', channel: 'freeCodeCamp.org', views: '8.7M', duration: '3:50:17', category: 'python', description: 'ML with Python and scikit-learn' },
  { id: 'XVv6mJpFOb0', title: 'Web Scraping with Python - Beautiful Soup', channel: 'freeCodeCamp.org', views: '4.5M', duration: '1:25:14', category: 'python', description: 'Learn web scraping with BeautifulSoup' },
  { id: 'vmEHCJofslg', title: 'Pandas & Python for Data Analysis', channel: 'freeCodeCamp.org', views: '4.6M', duration: '1:23:37', category: 'python', description: 'Data analysis with Pandas' },
  { id: 'ZyhVh-qRZPA', title: 'NumPy Tutorial for Beginners', channel: 'freeCodeCamp.org', views: '3.2M', duration: '58:41', category: 'python', description: 'Numerical computing with NumPy' },
  { id: '3Xc3CA655Y4', title: 'Matplotlib Tutorial - Python Plotting', channel: 'Corey Schafer', views: '2.8M', duration: '51:10', category: 'python', description: 'Data visualization with Matplotlib' },
  { id: '0sOvCWFmrtA', title: 'Python API Development - FastAPI', channel: 'freeCodeCamp.org', views: '3.4M', duration: '19:16:34', category: 'python', description: 'Build APIs with FastAPI' },
  { id: 'PXMJ6FS7llk', title: 'Automate the Boring Stuff with Python', channel: 'freeCodeCamp.org', views: '4.7M', duration: '9:28:23', category: 'python', description: 'Automate tasks with Python' },
  { id: 'cHYq1MRoyI0', title: 'Python Testing 101 with pytest', channel: 'JetBrainsTV', views: '290K', duration: '34:43', category: 'python', description: 'Unit testing with pytest' },
  { id: 'FsAPt_9Bf3U', title: 'Python Decorators - How to Use Them', channel: 'Corey Schafer', views: '1.5M', duration: '27:45', category: 'python', description: 'Master Python decorators' },
  { id: 'tSLDcRkgTsY', title: 'Python Asyncio Tutorial', channel: 'Tech With Tim', views: '680K', duration: '30:12', category: 'python', description: 'Asynchronous programming in Python' },

  { id: 'RBSGKlAvoiM', title: 'Data Structures and Algorithms Full Course', channel: 'freeCodeCamp.org', views: '15M', duration: '5:18:35', category: 'dsa', description: 'Complete DSA course in one video' },
  { id: 'CBYHwZcbD-s', title: 'Data Structures Easy to Advanced Course', channel: 'freeCodeCamp.org', views: '5.4M', duration: '9:18:18', category: 'dsa', description: 'Master all data structures' },
  { id: 'oBt53YbR9Kk', title: 'Dynamic Programming - Learn to Solve', channel: 'freeCodeCamp.org', views: '8.2M', duration: '5:09:17', category: 'dsa', description: 'Master DP for coding interviews' },
  { id: '8hly31xKli0', title: 'Algorithms Course - Graph Theory Tutorial', channel: 'freeCodeCamp.org', views: '4.1M', duration: '3:47:36', category: 'dsa', description: 'Learn all important algorithms' },
  { id: '09_LlHjoEiY', title: 'Graph Algorithms for Technical Interviews', channel: 'freeCodeCamp.org', views: '6.8M', duration: '2:18:35', category: 'dsa', description: 'Complete graph theory and algorithms' },
  { id: 'fAAZixBzIAI', title: 'Binary Tree Algorithms for Interviews', channel: 'freeCodeCamp.org', views: '3.7M', duration: '1:56:23', category: 'dsa', description: 'Master tree data structures' },
  { id: 'kPRA0W1kECg', title: 'Sorting Algorithms Explained Visually', channel: 'Beyond Fireship', views: '3.2M', duration: '8:57', category: 'dsa', description: 'Visual guide to sorting algorithms' },
  { id: 'njTh_OwMljA', title: 'Linked Lists for Technical Interviews', channel: 'freeCodeCamp.org', views: '2.4M', duration: '1:44:20', category: 'dsa', description: 'Complete linked list tutorial' },
  { id: 'GBKI9VSKdGg', title: 'Recursion in Programming - Full Course', channel: 'freeCodeCamp.org', views: '2.8M', duration: '2:15:12', category: 'dsa', description: 'Master recursion techniques' },
  { id: 'KyUTuwz_b7Q', title: 'Hash Tables and Hash Functions', channel: 'Computer Science', views: '1.4M', duration: '13:18', category: 'dsa', description: 'Understanding hash tables' },
  { id: 't0Cq6tVNRBA', title: 'Heap Data Structure | Min Heap and Max Heap', channel: 'WilliamFiset-videos', views: '1.1M', duration: '15:27', category: 'dsa', description: 'Learn heap data structure' },
  { id: 'wjI1WNcIntg', title: 'Stack Data Structure Tutorial', channel: 'mycodeschool', views: '3.8M', duration: '10:37', category: 'dsa', description: 'Master stacks and queues' },
  { id: 'AXjmTQ8LEoI', title: 'Trie Data Structure Implementation', channel: 'Tushar Roy', views: '1.3M', duration: '18:36', category: 'dsa', description: 'Learn trie data structure' },
  { id: 'Mo4vesaut8g', title: 'Big O Notation - Full Course', channel: 'freeCodeCamp.org', views: '4.5M', duration: '1:51:38', category: 'dsa', description: 'Time complexity analysis' },
  { id: 'Oq2E-yBmvB0', title: 'Segment Tree Tutorial', channel: 'Tushar Roy', views: '890K', duration: '15:39', category: 'dsa', description: 'Advanced data structure tutorial' },
  { id: '8XcXEJtg8pI', title: 'Sliding Window Algorithm Pattern', channel: 'NeetCode', views: '1.2M', duration: '14:23', category: 'dsa', description: 'Master sliding window pattern' },

  { id: 'PkZNo7MFNFg', title: 'JavaScript Programming - Full Course', channel: 'freeCodeCamp.org', views: '22M', duration: '7:46:38', category: 'javascript', description: 'Learn JavaScript from beginner to advanced' },
  { id: 'hdI2bqOjy3c', title: 'JavaScript Crash Course For Beginners', channel: 'Traversy Media', views: '4.2M', duration: '1:40:25', category: 'javascript', description: 'Quick JavaScript fundamentals' },
  { id: 'W6NZfCO5SIk', title: 'JavaScript Course - Master the Fundamentals', channel: 'Programming with Mosh', views: '5.8M', duration: '2:15:27', category: 'javascript', description: 'JS DSA complete guide' },
  { id: 'jS4aFq5-91M', title: 'Modern JavaScript Tutorial', channel: 'The Net Ninja', views: '3.6M', duration: '3:54:23', category: 'javascript', description: 'Full modern JS course' },
  { id: 'ZYb_ZU8LNxs', title: 'Asynchronous JavaScript Tutorial', channel: 'freeCodeCamp.org', views: '2.7M', duration: '1:02:53', category: 'javascript', description: 'Master async JS concepts' },
  { id: 'NCwa_xi0Uuc', title: 'JavaScript ES6, ES7, ES8 Tutorial', channel: 'freeCodeCamp.org', views: '3.1M', duration: '2:33:45', category: 'javascript', description: 'Learn ES6+ features' },
  { id: '5fb2aPlgoys', title: 'JavaScript DOM Crash Course', channel: 'Traversy Media', views: '3.4M', duration: '37:28', category: 'javascript', description: 'Master the DOM' },
  { id: 'DHvZLI7Db8E', title: 'JavaScript Promises In 10 Minutes', channel: 'Web Dev Simplified', views: '2.8M', duration: '11:07', category: 'javascript', description: 'Understand promises and async/await' },
  { id: 'R8rmfD9Y5-c', title: 'JavaScript Array Methods', channel: 'Traversy Media', views: '1.9M', duration: '42:17', category: 'javascript', description: 'Master JavaScript arrays' },
  { id: 'PFmuCDHHpwk', title: 'JavaScript Objects Tutorial', channel: 'Programming with Mosh', views: '1.6M', duration: '48:29', category: 'javascript', description: 'Deep dive into JS objects' },
  { id: 'tv-_1er1mWI', title: 'JavaScript Design Patterns', channel: 'Traversy Media', views: '890K', duration: '51:32', category: 'javascript', description: 'Learn JS design patterns' },
  { id: '1S8SBDhA7HA', title: 'JavaScript Closures Explained', channel: 'Techsith', views: '640K', duration: '11:32', category: 'javascript', description: 'Master closures' },
  { id: 'qtfi4-8dj9c', title: 'Functional Programming in JavaScript', channel: 'Fun Fun Function', views: '1.2M', duration: '9:36', category: 'javascript', description: 'Functional programming concepts' },
  { id: '7r4xVDI2vho', title: 'JavaScript Testing Introduction Tutorial', channel: 'Traversy Media', views: '780K', duration: '57:19', category: 'javascript', description: 'Unit testing with Jest' },
  { id: 'cRHQNNcYf6s', title: 'JavaScript Modules - Import Export', channel: 'Web Dev Simplified', views: '890K', duration: '9:24', category: 'javascript', description: 'ES6 modules explained' },

  { id: 'bMknfKXIFA8', title: 'React Course - Beginner to Advanced', channel: 'freeCodeCamp.org', views: '15M', duration: '11:55:47', category: 'react', description: 'Complete React course with projects' },
  { id: 'Ke90Tje7VS0', title: 'React JS - Full Course for Beginners', channel: 'Programming with Mosh', views: '8.7M', duration: '2:25:22', category: 'react', description: 'React fundamentals explained' },
  { id: 'O6P86uwfdR0', title: 'React Hooks Tutorial - All React Hooks', channel: 'Codevolution', views: '3.8M', duration: '4:57:23', category: 'react', description: 'Master all React Hooks' },
  { id: 'Ul3y1LXxzdU', title: 'React Router v6 Tutorial', channel: 'Web Dev Simplified', views: '1.4M', duration: '46:51', category: 'react', description: 'Learn React Router v6' },
  { id: 'I6ypD7qv3Z8', title: 'React & TypeScript Course', channel: 'freeCodeCamp.org', views: '4.2M', duration: '5:07:48', category: 'react', description: 'React with TypeScript' },
  { id: 'CVpUuw9XSjY', title: 'React Redux Full Tutorial', channel: 'freeCodeCamp.org', views: '3.1M', duration: '4:36:52', category: 'react', description: 'State management with Redux' },
  { id: '5LrDIWkK_Bc', title: 'React Context & Hooks Tutorial', channel: 'The Net Ninja', views: '2.6M', duration: '51:48', category: 'react', description: 'Global state with Context API' },
  { id: 'mTz0GXj8NN0', title: 'Next.js Tutorial for Beginners', channel: 'Programming with Mosh', views: '3.9M', duration: '1:10:44', category: 'react', description: 'Learn Next.js framework' },
  { id: 'LDU_Txk06tM', title: 'React Performance Tips', channel: 'Codevolution', views: '640K', duration: '14:32', category: 'react', description: 'Optimize React apps' },
  { id: '6ThXsUwLWvc', title: 'React Custom Hooks Tutorial', channel: 'Codevolution', views: '720K', duration: '34:58', category: 'react', description: 'Create reusable custom hooks' },
  { id: 'ML5egqL3YFE', title: 'React Testing Tutorial with Jest', channel: 'Codevolution', views: '890K', duration: '2:34:19', category: 'react', description: 'Test React applications' },
  { id: 'fgdpvwEWJ9M', title: 'React Firebase Tutorial', channel: 'The Net Ninja', views: '2.3M', duration: '5:22:41', category: 'react', description: 'Build apps with Firebase' },

  { id: 'Oe421EPjeBE', title: 'Node.js and Express.js Full Course', channel: 'freeCodeCamp.org', views: '6.8M', duration: '8:16:48', category: 'backend', description: 'Complete backend development' },
  { id: 'TlB_eWDSMt4', title: 'Node.js Tutorial for Beginners', channel: 'Programming with Mosh', views: '4.3M', duration: '1:06:28', category: 'backend', description: 'Learn Node.js basics' },
  { id: 'SccSCuHhOw0', title: 'REST API concepts and examples', channel: 'WebConcepts', views: '2.1M', duration: '8:53', category: 'backend', description: 'Build RESTful APIs' },
  { id: 'L72fhGm1tfE', title: 'Express JS Crash Course', channel: 'Traversy Media', views: '1.7M', duration: '1:11:01', category: 'backend', description: 'Quick Express.js guide' },
  { id: 'ed8SzALpx1Q', title: 'GraphQL Tutorial', channel: 'freeCodeCamp.org', views: '2.4M', duration: '4:01:00', category: 'backend', description: 'Master GraphQL' },
  { id: 'Ud5xKCYQTjM', title: 'JWT Authentication Tutorial - Node.js', channel: 'Web Dev Simplified', views: '1.8M', duration: '25:33', category: 'backend', description: 'JWT authentication' },
  { id: 'M3wHmOPwhaM', title: 'Microservices with Node JS', channel: 'freeCodeCamp.org', views: '2.6M', duration: '10:16:11', category: 'backend', description: 'Microservices architecture' },
  { id: 'GlybiyVTt78', title: 'Node.js Streams Tutorial', channel: 'The Net Ninja', views: '420K', duration: '25:49', category: 'backend', description: 'Working with streams' },
  { id: '1BfCnjr_Vjg', title: 'Socket.io Tutorial - Real Time Chat App', channel: 'Traversy Media', views: '1.5M', duration: '40:03', category: 'backend', description: 'Real-time applications' },
  { id: 'qw--VYLpxG4', title: 'PostgreSQL Tutorial Full Course', channel: 'freeCodeCamp.org', views: '4.7M', duration: '4:09:23', category: 'backend', description: 'Learn PostgreSQL database' },
  { id: 'fqMOX6JJhGo', title: 'Docker Tutorial for Beginners', channel: 'freeCodeCamp.org', views: '9.2M', duration: '3:10:31', category: 'backend', description: 'Containerization with Docker' },
  { id: 'JKxlsvZXG7c', title: 'Nginx Tutorial', channel: 'Traversy Media', views: '780K', duration: '10:08', category: 'backend', description: 'Learn Nginx web server' },
  { id: '3hLmDS179YE', title: 'AWS Tutorial for Beginners', channel: 'edureka!', views: '3.8M', duration: '9:53:37', category: 'backend', description: 'Amazon Web Services guide' },

  { id: 'HXV3zeQKqGY', title: 'SQL Tutorial - Full Database Course', channel: 'freeCodeCamp.org', views: '15M', duration: '4:20:41', category: 'database', description: 'Complete SQL guide' },
  { id: '-56x56UppqQ', title: 'MongoDB Crash Course Tutorial', channel: 'Traversy Media', views: '2.1M', duration: '39:21', category: 'database', description: 'Learn MongoDB basics' },
  { id: '7S_tz1z_5bA', title: 'MySQL Tutorial for Beginners', channel: 'Programming with Mosh', views: '4.8M', duration: '3:10:44', category: 'database', description: 'MySQL database tutorial' },
  { id: 'ztHopE5Wnpc', title: 'Database Design Course', channel: 'freeCodeCamp.org', views: '3.6M', duration: '8:29:13', category: 'database', description: 'Learn database design' },
  { id: 'jgpVdJB2sKQ', title: 'Redis Crash Course Tutorial', channel: 'Web Dev Simplified', views: '780K', duration: '33:33', category: 'database', description: 'Learn Redis caching' },
  { id: 'qw--VYLpxG4', title: 'PostgreSQL Tutorial Full Course', channel: 'freeCodeCamp.org', views: '4.7M', duration: '4:09:23', category: 'database', description: 'Complete PostgreSQL guide' },
  { id: '-bt_y4Loofg', title: 'MongoDB Complete Course', channel: 'freeCodeCamp.org', views: '4.2M', duration: '6:52:44', category: 'database', description: 'Master MongoDB' },
  { id: 'fsG1XaZEa78', title: 'Database Indexing Explained', channel: 'Hussein Nasser', views: '640K', duration: '14:23', category: 'database', description: 'Optimize database queries' },
  { id: 'xQnIN9bW0og', title: 'SQL vs NoSQL or MySQL vs MongoDB', channel: 'Academind', views: '1.4M', duration: '18:09', category: 'database', description: 'Choose the right database' },
  { id: '93p3LxYuuqw', title: 'Database Transaction Management', channel: 'Hussein Nasser', views: '340K', duration: '22:46', category: 'database', description: 'ACID properties explained' }
];

let tutorialsData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
  completed: [],
  loved: [],
  notes: {}
};

const videosGrid = document.getElementById('videosGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const videoModal = document.getElementById('videoModal');
const closeVideoModal = document.getElementById('closeVideoModal');
const videoContainer = document.getElementById('videoContainer');
const markCompleteBtn = document.getElementById('markCompleteBtn');
const loveBtn = document.getElementById('loveBtn');
const addNoteBtn = document.getElementById('addNoteBtn');
const videoNotesSection = document.getElementById('videoNotesSection');
const videoNoteInput = document.getElementById('videoNoteInput');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const cancelNoteBtn = document.getElementById('cancelNoteBtn');
const savedNotes = document.getElementById('savedNotes');

let currentVideoId = null;

function renderVideos(category = 'all') {
  const filtered = category === 'all' ? videosData : videosData.filter(v => v.category === category);
  
  videosGrid.innerHTML = filtered.map(video => {
    const isCompleted = tutorialsData.completed.includes(video.id);
    const isLoved = tutorialsData.loved.includes(video.id);
    const hasNotes = tutorialsData.notes[video.id];
    
    return `
      <div class="video-card glass-card" data-video-id="${video.id}">
        <div class="video-thumbnail" style="background-image: url('https://img.youtube.com/vi/${video.id}/maxresdefault.jpg')">
          <div class="video-duration">${video.duration}</div>
          ${isCompleted ? '<div class="completed-badge">✓ Completed</div>' : ''}
          <button class="play-btn">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
          </button>
        </div>
        <div class="video-card-body">
          <h3>${video.title}</h3>
          <div class="video-meta">
            <span class="video-channel">${video.channel}</span>
            <span class="video-views">${video.views} views</span>
          </div>
          <div class="video-badges">
            <span class="category-badge ${video.category}">${getCategoryName(video.category)}</span>
            ${isLoved ? '<span class="loved-badge">❤️</span>' : ''}
            ${hasNotes ? '<span class="notes-badge">📝</span>' : ''}
          </div>
          <div class="video-progress-bar">
            <div class="progress-fill" style="width: ${isCompleted ? '100' : '0'}%"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      openVideoModal(card.dataset.videoId);
    });
  });
  
  updateStats();
}

function getCategoryName(category) {
  const names = {
    'web-dev': 'Web Dev',
    'python': 'Python',
    'dsa': 'DSA',
    'javascript': 'JavaScript',
    'react': 'React',
    'backend': 'Backend',
    'database': 'Database'
  };
  return names[category] || category;
}

function openVideoModal(videoId) {
  const video = videosData.find(v => v.id === videoId);
  if (!video) return;
  
  currentVideoId = videoId;
  document.getElementById('videoModalTitle').textContent = video.title;
  document.getElementById('videoDescription').textContent = video.description;
  document.getElementById('videoLink').href = `https://www.youtube.com/watch?v=${video.id}`;
  
  videoContainer.innerHTML = `
    <iframe 
      width="100%" 
      height="100%" 
      src="https://www.youtube.com/embed/${video.id}" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen>
    </iframe>
  `;
  
  updateModalButtons();
  loadVideoNotes();
  videoModal.classList.add('active');
}

function updateModalButtons() {
  const isCompleted = tutorialsData.completed.includes(currentVideoId);
  const isLoved = tutorialsData.loved.includes(currentVideoId);
  
  markCompleteBtn.innerHTML = isCompleted 
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Completed</span>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Mark as Complete</span>';
  markCompleteBtn.classList.toggle('completed', isCompleted);
  
  loveBtn.innerHTML = isLoved
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg><span>Loved</span>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg><span>Love</span>';
  loveBtn.classList.toggle('loved', isLoved);
}

function loadVideoNotes() {
  const notes = tutorialsData.notes[currentVideoId] || [];
  if (notes.length === 0) {
    savedNotes.innerHTML = '<p class="no-notes">No notes yet</p>';
  } else {
    savedNotes.innerHTML = notes.map((note, index) => `
      <div class="note-item">
        <p>${note.text}</p>
        <div class="note-footer">
          <span class="note-date">${new Date(note.date).toLocaleDateString()}</span>
          <button class="icon-btn delete-note-btn" data-index="${index}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
          </button>
        </div>
      </div>
    `).join('');
    
    document.querySelectorAll('.delete-note-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteNote(parseInt(btn.dataset.index));
      });
    });
  }
}

closeVideoModal.addEventListener('click', () => {
  videoModal.classList.remove('active');
  videoContainer.innerHTML = '';
  videoNotesSection.style.display = 'none';
});

videoModal.addEventListener('click', (e) => {
  if (e.target === videoModal) {
    videoModal.classList.remove('active');
    videoContainer.innerHTML = '';
    videoNotesSection.style.display = 'none';
  }
});

markCompleteBtn.addEventListener('click', () => {
  if (tutorialsData.completed.includes(currentVideoId)) {
    tutorialsData.completed = tutorialsData.completed.filter(id => id !== currentVideoId);
  } else {
    tutorialsData.completed.push(currentVideoId);
  }
  saveTutorialsData();
  updateModalButtons();
  renderVideos(document.querySelector('.filter-btn.active').dataset.category);
});

loveBtn.addEventListener('click', () => {
  if (tutorialsData.loved.includes(currentVideoId)) {
    tutorialsData.loved = tutorialsData.loved.filter(id => id !== currentVideoId);
  } else {
    tutorialsData.loved.push(currentVideoId);
  }
  saveTutorialsData();
  updateModalButtons();
  renderVideos(document.querySelector('.filter-btn.active').dataset.category);
});

addNoteBtn.addEventListener('click', () => {
  videoNotesSection.style.display = 'block';
  videoNoteInput.focus();
});

saveNoteBtn.addEventListener('click', () => {
  const noteText = videoNoteInput.value.trim();
  if (!noteText) return;
  
  if (!tutorialsData.notes[currentVideoId]) {
    tutorialsData.notes[currentVideoId] = [];
  }
  
  tutorialsData.notes[currentVideoId].push({
    text: noteText,
    date: new Date().toISOString()
  });
  
  saveTutorialsData();
  videoNoteInput.value = '';
  loadVideoNotes();
  updateStats();
  renderVideos(document.querySelector('.filter-btn.active').dataset.category);
});

cancelNoteBtn.addEventListener('click', () => {
  videoNotesSection.style.display = 'none';
  videoNoteInput.value = '';
});

function deleteNote(index) {
  if (confirm('Delete this note?')) {
    tutorialsData.notes[currentVideoId].splice(index, 1);
    if (tutorialsData.notes[currentVideoId].length === 0) {
      delete tutorialsData.notes[currentVideoId];
    }
    saveTutorialsData();
    loadVideoNotes();
    updateStats();
    renderVideos(document.querySelector('.filter-btn.active').dataset.category);
  }
}

function saveTutorialsData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tutorialsData));
}

function updateStats() {
  document.getElementById('completedCount').textContent = tutorialsData.completed.length;
  document.getElementById('lovedCount').textContent = tutorialsData.loved.length;
  document.getElementById('notesCount').textContent = Object.keys(tutorialsData.notes).length;
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderVideos(btn.dataset.category);
  });
});

renderVideos();
updateStats();
