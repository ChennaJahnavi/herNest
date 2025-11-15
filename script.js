// Calendar functionality
let currentDate = new Date();

// Symptom colors mapping
const symptomColors = {
    'cramps': '#ff6b6b',
    'headache': '#4ecdc4',
    'bloating': '#ffe66d',
    'fatigue': '#95e1d3'
};

// Generate calendar
function generateCalendar(month, year) {
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYear = document.getElementById('month-year');
    
    if (!calendarGrid) return;
    
    // Clear the grid
    calendarGrid.innerHTML = '';
    
    // Set month and year display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    monthYear.textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Create empty cells for days before the 1st
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Create cells for each day of the month
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        
        // Create day number element
        const dayNumber = document.createElement('span');
        dayNumber.textContent = day;
        dayNumber.style.fontWeight = '500';
        dayDiv.appendChild(dayNumber);
        
        // Highlight today's date
        if (isCurrentMonth && day === today.getDate()) {
            dayDiv.classList.add('today');
        }
        
        // Check for saved symptoms
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const savedData = localStorage.getItem(dateKey);
        
        if (savedData) {
            const symptoms = JSON.parse(savedData);
            dayDiv.classList.add('has-data');
            
            // Add symptom squares
            const symptomContainer = document.createElement('div');
            symptomContainer.className = 'symptom-squares';
            
            symptoms.forEach(symptom => {
                const square = document.createElement('div');
                square.className = 'symptom-square';
                square.style.backgroundColor = symptomColors[symptom] || '#ccc';
                square.title = symptom;
                symptomContainer.appendChild(square);
            });
            
            dayDiv.appendChild(symptomContainer);
        }
        
        // Make day clickable
        dayDiv.addEventListener('click', () => {
            openModalForDate(dateKey, day, month, year);
        });
        
        calendarGrid.appendChild(dayDiv);
    }
}

// Open modal for specific date
let selectedDate = null;

function openModalForDate(dateKey, day, month, year) {
    selectedDate = dateKey;
    const modal = document.getElementById('symptom-modal');
    const form = document.getElementById('symptom-form');
    
    // Clear all checkboxes
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    // Load saved symptoms for this date
    const savedData = localStorage.getItem(dateKey);
    if (savedData) {
        const symptoms = JSON.parse(savedData);
        symptoms.forEach(symptom => {
            const checkbox = document.getElementById(symptom);
            if (checkbox) checkbox.checked = true;
        });
    }
    
    // Show modal
    modal.classList.add('is-active');
    document.body.classList.add('modal-open');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('symptom-modal');
    modal.classList.remove('is-active');
    document.body.classList.remove('modal-open');
    selectedDate = null;
}

// Auth Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Auth modal elements
    const authModal = document.getElementById('auth-modal');
    const authBtn = document.getElementById('auth-btn');
    const heroCtaBtn = document.getElementById('hero-cta-btn');
    const ctaAuthBtn = document.getElementById('cta-auth-btn');
    const authCloseBtn = document.getElementById('auth-close-btn');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const loginFormContainer = document.getElementById('login-form-container');
    const signupFormContainer = document.getElementById('signup-form-container');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    // Open auth modal
    function openAuthModal() {
        if (authModal) {
            authModal.classList.add('is-active');
            document.body.classList.add('modal-open');
        }
    }
    
    // Close auth modal
    function closeAuthModal() {
        if (authModal) {
            authModal.classList.remove('is-active');
            document.body.classList.remove('modal-open');
        }
    }
    
    // Event listeners for opening modal
    if (authBtn) authBtn.addEventListener('click', openAuthModal);
    if (heroCtaBtn) heroCtaBtn.addEventListener('click', openAuthModal);
    if (ctaAuthBtn) ctaAuthBtn.addEventListener('click', openAuthModal);
    
    // Close button
    if (authCloseBtn) {
        authCloseBtn.addEventListener('click', closeAuthModal);
    }
    
    // Close on outside click
    if (authModal) {
        authModal.addEventListener('click', function(e) {
            if (e.target === authModal) {
                closeAuthModal();
            }
        });
    }
    
    // Tab switching
    if (loginTab) {
        loginTab.addEventListener('click', function() {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginFormContainer.style.display = 'block';
            signupFormContainer.style.display = 'none';
        });
    }
    
    if (signupTab) {
        signupTab.addEventListener('click', function() {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupFormContainer.style.display = 'block';
            loginFormContainer.style.display = 'none';
        });
    }
    
    // Form submissions
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Login functionality coming soon!');
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            alert('Sign up functionality coming soon!');
        });
    }
    
    // Calendar functionality
    const symptomsBtn = document.querySelector('.symptoms-btn');
    const modal = document.getElementById('symptom-modal');
    const closeBtn = document.getElementById('close-modal');
    const symptomForm = document.getElementById('symptom-form');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    // Open modal for today when "Log Today's Symptoms" is clicked
    if (symptomsBtn) {
        symptomsBtn.addEventListener('click', function() {
            const today = new Date();
            const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            openModalForDate(dateKey, today.getDate(), today.getMonth(), today.getFullYear());
        });
    }
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Save symptoms
    if (symptomForm) {
        symptomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!selectedDate) {
                const today = new Date();
                selectedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            }
            
            const checkedSymptoms = [];
            const checkboxes = symptomForm.querySelectorAll('input[type="checkbox"]:checked');
            checkboxes.forEach(cb => checkedSymptoms.push(cb.value));
            
            // Save to localStorage
            localStorage.setItem(selectedDate, JSON.stringify(checkedSymptoms));
            
            // Close modal
            closeModal();
            
            // Refresh calendar
            generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
        });
    }
    
    // Month navigation
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
        });
    }
    
    // Initialize calendar
    generateCalendar(currentDate.getMonth(), currentDate.getFullYear());
});

// Articles page functionality
if (window.location.pathname.includes('articles.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        loadArticles();
    });
}

async function loadArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    const articlesLoading = document.getElementById('articles-loading');
    const articlesError = document.getElementById('articles-error');
    
    if (!articlesGrid) return;
    
    // Show loading
    if (articlesLoading) articlesLoading.style.display = 'block';
    if (articlesError) articlesError.style.display = 'none';
    articlesGrid.innerHTML = '';
    
    // Check for API keys (you can set these in your environment)
    const API_KEY = ''; // Add your Google Custom Search API key here
    const SEARCH_ENGINE_ID = ''; // Add your Search Engine ID here
    
    if (!API_KEY || !SEARCH_ENGINE_ID) {
        // Use demo articles
        displayDemoArticles();
        return;
    }
    
    try {
        const query = 'recent articles on women menstruation and menopause and pregnancy';
        const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            displayArticles(data.items);
        } else {
            displayDemoArticles();
        }
    } catch (error) {
        console.error('Error fetching articles:', error);
        displayDemoArticles();
    } finally {
        if (articlesLoading) articlesLoading.style.display = 'none';
    }
}

function displayArticles(articles) {
    const articlesGrid = document.getElementById('articles-grid');
    if (!articlesGrid) return;
    
    articles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.className = 'article-card';
        
        const title = escapeHtml(article.title || 'No title');
        const snippet = escapeHtml(article.snippet || 'No description available');
        const link = article.link || '#';
        const displayLink = article.displayLink || '';
        
        articleCard.innerHTML = `
            <div class="article-card-content">
                <h3 class="article-title">${title}</h3>
                <p class="article-snippet">${snippet}</p>
                <div class="article-footer">
                    <span class="article-source">${escapeHtml(displayLink)}</span>
                    <a href="${link}" target="_blank" rel="noopener noreferrer" class="article-read-more">Read more →</a>
                </div>
            </div>
        `;
        
        articlesGrid.appendChild(articleCard);
    });
}

function displayDemoArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    if (!articlesGrid) return;
    
    const demoArticles = [
        {
            title: 'Understanding Your Menstrual Cycle',
            snippet: 'A comprehensive guide to tracking and understanding your menstrual cycle, including phases, symptoms, and what\'s normal.',
            link: 'https://www.healthline.com/health/womens-health/menstrual-cycle',
            displayLink: 'healthline.com'
        },
        {
            title: 'Menopause: Symptoms and Management',
            snippet: 'Learn about the signs of menopause, common symptoms, and effective strategies for managing this natural transition.',
            link: 'https://www.mayoclinic.org/diseases-conditions/menopause/symptoms-causes/syc-20353397',
            displayLink: 'mayoclinic.org'
        },
        {
            title: 'Pregnancy Health and Wellness',
            snippet: 'Essential information about maintaining your health during pregnancy, including nutrition, exercise, and prenatal care.',
            link: 'https://www.webmd.com/baby/pregnancy-health',
            displayLink: 'webmd.com'
        },
        {
            title: 'Women\'s Health: A Holistic Approach',
            snippet: 'Exploring holistic approaches to women\'s health, including natural remedies and lifestyle changes.',
            link: 'https://www.womenshealth.gov/',
            displayLink: 'womenshealth.gov'
        }
    ];
    
    displayArticles(demoArticles);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Community page functionality
if (window.location.pathname.includes('community.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        initializeCommunityChannels();
    });
}

function initializeCommunityChannels() {
    const channelCards = document.querySelectorAll('.channel-card');
    const startConversationBtns = document.querySelectorAll('.channel-join-btn');
    const channelModal = document.getElementById('channel-modal');
    const channelBackBtn = document.getElementById('channel-back-btn');
    const channelCloseBtn = document.getElementById('channel-close-btn');
    
    // Open channel when card or button is clicked
    channelCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open if clicking the button
            if (e.target.closest('.channel-join-btn')) return;
            
            const channelName = card.dataset.channel;
            openChannel(channelName);
        });
    });
    
    startConversationBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const channelName = btn.closest('.channel-card').dataset.channel;
            openChannel(channelName);
        });
    });
    
    // Close channel modal
    if (channelBackBtn) {
        channelBackBtn.addEventListener('click', closeChannelModal);
    }
    
    if (channelCloseBtn) {
        channelCloseBtn.addEventListener('click', closeChannelModal);
    }
    
    if (channelModal) {
        channelModal.addEventListener('click', function(e) {
            if (e.target === channelModal) {
                closeChannelModal();
            }
        });
    }
}

function openChannel(channelName) {
    const channelModal = document.getElementById('channel-modal');
    const channelModalTitle = document.querySelector('.channel-modal-header h2');
    
    if (channelModalTitle) {
        channelModalTitle.textContent = channelName;
    }
    
    if (channelModal) {
        channelModal.classList.add('is-active');
        document.body.classList.add('modal-open');
    }
    
    loadChannelPosts(channelName);
}

function closeChannelModal() {
    const channelModal = document.getElementById('channel-modal');
    if (channelModal) {
        channelModal.classList.remove('is-active');
        document.body.classList.remove('modal-open');
    }
}

function loadChannelPosts(channelName) {
    const postsContainer = document.getElementById('channel-posts-container');
    if (!postsContainer) return;
    
    // Get posts from localStorage or use demo posts
    const storageKey = `channel_posts_${channelName}`;
    let posts = JSON.parse(localStorage.getItem(storageKey) || 'null');
    
    if (!posts || posts.length === 0) {
        posts = getDemoPostsForChannel(channelName);
        localStorage.setItem(storageKey, JSON.stringify(posts));
    }
    
    displayChannelPosts(posts);
}

function getDemoPostsForChannel(channelName) {
    const demoPosts = {
        'Menstruation': [
            {
                id: 1,
                category: 'Menstruation',
                author: 'cycle_tracker',
                time: '2 hours ago',
                title: 'Irregular periods after stopping birth control?',
                content: 'I stopped taking birth control pills 3 months ago and my periods have been very irregular. Is this normal? How long does it typically take for cycles to regulate?',
                upvotes: 24,
                comments: 8
            },
            {
                id: 2,
                category: 'Menstruation',
                author: 'health_seeker',
                time: '5 hours ago',
                title: 'Best apps for tracking symptoms?',
                content: 'Looking for recommendations on cycle tracking apps. What features do you find most useful?',
                upvotes: 18,
                comments: 12
            },
            {
                id: 3,
                category: 'Menstruation',
                author: 'new_member',
                time: '1 day ago',
                title: 'Heavy flow - when to see a doctor?',
                content: 'My periods have been getting heavier over the past few months. At what point should I be concerned and see a doctor?',
                upvotes: 31,
                comments: 15
            }
        ],
        'Pregnancy': [
            {
                id: 1,
                category: 'Pregnancy',
                author: 'expecting_mom',
                time: '1 hour ago',
                title: 'First trimester fatigue - any tips?',
                content: 'I\'m 8 weeks pregnant and feeling exhausted all the time. Any suggestions for managing fatigue during the first trimester?',
                upvotes: 42,
                comments: 20
            },
            {
                id: 2,
                category: 'Pregnancy',
                author: 'mom_to_be',
                time: '3 hours ago',
                title: 'Safe exercises during pregnancy?',
                content: 'What exercises are safe during pregnancy? I was fairly active before getting pregnant and want to maintain some level of fitness.',
                upvotes: 28,
                comments: 14
            },
            {
                id: 3,
                category: 'Pregnancy',
                author: 'second_time',
                time: '6 hours ago',
                title: 'Morning sickness remedies that actually work?',
                content: 'Struggling with morning sickness. What remedies or tips have worked for you?',
                upvotes: 35,
                comments: 18
            }
        ],
        'Menopause': [
            {
                id: 1,
                category: 'Menopause',
                author: 'transitioning',
                time: '4 hours ago',
                title: 'Hot flashes disrupting sleep',
                content: 'My hot flashes are worst at night and I\'m getting terrible sleep. Has anyone found effective ways to manage this?',
                upvotes: 39,
                comments: 22
            },
            {
                id: 2,
                category: 'Menopause',
                author: 'seeking_advice',
                time: '7 hours ago',
                title: 'HRT - pros and cons?',
                content: 'Considering hormone replacement therapy. Would love to hear experiences from others who have tried it.',
                upvotes: 27,
                comments: 16
            },
            {
                id: 3,
                category: 'Menopause',
                author: 'new_phase',
                time: '1 day ago',
                title: 'Mood changes during perimenopause',
                content: 'I\'ve noticed significant mood swings and irritability. Is this common during perimenopause? How do you cope?',
                upvotes: 33,
                comments: 19
            }
        ],
        'Others': [
            {
                id: 1,
                category: 'General',
                author: 'wellness_seeker',
                time: '2 hours ago',
                title: 'Natural supplements for hormonal balance?',
                content: 'Interested in natural approaches to hormonal health. What supplements or herbs have you found helpful?',
                upvotes: 21,
                comments: 11
            },
            {
                id: 2,
                category: 'General',
                author: 'health_advocate',
                time: '5 hours ago',
                title: 'Finding a supportive healthcare provider',
                content: 'How do you find a doctor who really listens and takes women\'s health concerns seriously?',
                upvotes: 45,
                comments: 25
            },
            {
                id: 3,
                category: 'General',
                author: 'community_member',
                time: '8 hours ago',
                title: 'Self-care routines that work',
                content: 'What self-care practices help you feel your best? Looking for inspiration!',
                upvotes: 29,
                comments: 17
            }
        ]
    };
    
    return demoPosts[channelName] || [];
}

function displayChannelPosts(posts) {
    const postsContainer = document.getElementById('channel-posts-container');
    if (!postsContainer) return;
    
    postsContainer.innerHTML = '';
    
    if (posts.length === 0) {
        postsContainer.innerHTML = '<div class="no-posts">No posts yet. Be the first to start a conversation!</div>';
        return;
    }
    
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'reddit-post';
        
        postElement.innerHTML = `
            <div class="post-voting">
                <button class="vote-btn" onclick="votePost(${post.id}, 'up')">▲</button>
                <span class="vote-count" id="vote-count-${post.id}">${post.upvotes}</span>
                <button class="vote-btn" onclick="votePost(${post.id}, 'down')">▼</button>
            </div>
            <div class="post-content">
                <div class="post-header">
                    <span class="post-category">${escapeHtml(post.category)}</span>
                    <span class="post-author">u/${escapeHtml(post.author)}</span>
                    <span class="post-time">${escapeHtml(post.time)}</span>
                </div>
                <h3 class="post-title">${escapeHtml(post.title)}</h3>
                <p class="post-text">${escapeHtml(post.content)}</p>
                <div class="post-footer">
                    <button class="post-action-btn">💬 ${post.comments} Comments</button>
                    <button class="post-action-btn">Share</button>
                    <button class="post-action-btn">Save</button>
                </div>
            </div>
        `;
        
        postsContainer.appendChild(postElement);
    });
}

function votePost(postId, direction) {
    // Get current channel name from modal title
    const channelModalTitle = document.querySelector('.channel-modal-header h2');
    if (!channelModalTitle) return;
    
    const channelName = channelModalTitle.textContent;
    const storageKey = `channel_posts_${channelName}`;
    let posts = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    const post = posts.find(p => p.id === postId);
    if (post) {
        if (direction === 'up') {
            post.upvotes++;
        } else if (direction === 'down' && post.upvotes > 0) {
            post.upvotes--;
        }
        
        localStorage.setItem(storageKey, JSON.stringify(posts));
        displayChannelPosts(posts);
    }
}

// Make votePost globally accessible
window.votePost = votePost;

