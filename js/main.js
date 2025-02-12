const posts = [
    {
        title: "My Beginning in Tech: A Journey of Discovery",
        date: "February 12, 2025",
        excerpt: "From writing my first line of code to building full-stack applications, here's my story of entering the tech world...",
        link: "posts/beginning-in-tech.html",
        tags: ["Personal", "Career"]
    }
    // Add more posts here as you create them
];

function displayPosts() {
    const blogContainer = document.getElementById('blog-posts');
    
    const postsHTML = posts.map(post => `
        <div class="col-md-6 col-lg-4">
            <article class="card blog-card h-100 border-0 shadow-sm">
                <div class="card-body">
                    <h3 class="card-title h5 fw-bold">${post.title}</h3>
                    <div class="blog-date mb-2">
                        <i class="bi bi-calendar3"></i> ${post.date}
                    </div>
                    <div class="mb-2">
                        ${post.tags.map(tag => `
                            <span class="badge bg-primary me-1">${tag}</span>
                        `).join('')}
                    </div>
                    <p class="card-text">${post.excerpt}</p>
                    <a href="${post.link}" class="read-more text-primary">Read More</a>
                </div>
            </article>
        </div>
    `).join('');
    
    blogContainer.innerHTML = postsHTML;
}

// Initialize the blog posts when the page loads
document.addEventListener('DOMContentLoaded', displayPosts);