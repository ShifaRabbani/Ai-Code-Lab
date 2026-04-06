const fs = require('fs');

const HEADER = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ai CodeLab - Core Documentation</title>
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Modern Styles -->
    <link rel="stylesheet" href="styles.css">
    <style>
        .study-grid {
            display: grid;
            grid-template-columns: 3fr 1fr;
            gap: 3rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .study-content {
            background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 3rem;
            backdrop-filter: blur(20px);
            color: var(--text-pure);
        }
        
        .study-content h1, .study-content h2, .study-content h3 {
            color: var(--secondary);
            margin-top: 2.5rem;
            margin-bottom: 1rem;
            border-bottom: 1px solid var(--glass-border);
            padding-bottom: 0.5rem;
        }
        
        .study-content h1 {
            color: var(--primary);
            font-size: 3rem;
        }

        .study-content p, .study-content li {
            margin-bottom: 1.2rem;
            color: var(--text-muted);
            line-height: 1.8;
            font-size: 1.05rem;
        }

        .study-content ul, .study-content ol {
            margin-left: 2rem;
            margin-bottom: 2rem;
        }

        .study-content pre {
            background: rgba(0,0,0,0.6);
            border: 1px solid var(--glass-border);
            padding: 1.5rem;
            border-radius: 10px;
            overflow-x: auto;
            margin-bottom: 2rem;
            color: var(--accent);
            font-family: monospace;
            box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
        }

        .study-sidebar {
            background: linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 2rem;
            backdrop-filter: blur(20px);
            position: sticky;
            top: 100px;
            height: fit-content;
        }

        .study-sidebar h2 {
            color: var(--primary);
            margin-bottom: 1.5rem;
            border-bottom: 1px solid var(--glass-border);
            padding-bottom: 0.5rem;
            font-size: 1.2rem;
        }

        .study-sidebar a {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.5rem 0;
            color: var(--text-muted);
            transition: all 0.3s;
        }

        .study-sidebar a:hover {
            color: var(--secondary);
            transform: translateX(5px);
        }

        @media (max-width: 900px) {
            .study-grid { grid-template-columns: 1fr; }
            .study-sidebar { position: relative; top: 0; }
        }
    </style>
</head>
<body>

    <!-- Custom Cursor -->
    <div id="custom-cursor"></div>

    <!-- Animated Mesh Gradient Background -->
    <div class="mesh-bg">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
    </div>

    <!-- Modern Extreme Navbar -->
    <nav>
        <div class="logo-container">
            <i class="fas fa-robot"></i>
            <span>CodeLab<span style="color:var(--primary)">.ai</span></span>
        </div>
        <div class="nav-links">
            <a href="index.html">Platform</a>
            <a href="courses.html">Syllabus</a>
            <a href="study.html" class="active">Resources</a>
            <a href="join.html">Community</a>
        </div>
        <div style="display:flex;gap:10px;">
            <a href="login.html" class="magnetic-btn" style="padding: 0.5rem 1.5rem; font-size: 0.9rem;"><span>Login</span></a>
        </div>
    </nav>

    <!-- Page Title Header -->
    <header style="margin-top: 120px; text-align: center; padding: 2rem;">
        <h1 class="hover-target" style="font-size: clamp(2.5rem, 5vw, 4rem);"><span class="gradient-text">Protocol</span> Documentation</h1>
    </header>

    <main style="padding: 2rem;">
        <div class="study-grid">
            <div class="study-content reveal hover-target" data-tilt>
`;

const FOOTER = `
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <div class="footer-grid reveal">
            <div>
                <h2 class="footer-logo">CodeLab<span style="color:var(--primary)">.ai</span></h2>
                <p class="footer-p">The frontier of learning.</p>
            </div>
        </div>
        <div style="text-align: center; border-top: 1px solid var(--glass-border); padding-top: 2rem; margin-top:2rem; color:var(--text-muted); font-size: 0.9rem;">
            &copy; 2026 CodeLab.ai Operations. All Rights Reserved.
        </div>
    </footer>
    <script src="script.js"></script>
</body>
</html>
`;

const files = [
    "codelab-html.html",
    "codelab-css.html", 
    "codelab-javascript.html",
    "codelab-python.html",
    "codelab-java.html",
    "codelab-cpp.html"
];

files.forEach(file => {
    if(fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        let mainContent = "";
        let asideContent = "";
        
        // Extract main
        const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
        if(mainMatch) mainContent = mainMatch[1].trim();
        
        // Extract aside
        const asideMatch = content.match(/<aside[^>]*>([\s\S]*?)<\/aside>/i);
        if(asideMatch) asideContent = asideMatch[1].trim();

        if(mainContent && asideContent) {
            let newHtml = HEADER + mainContent + '\\n            </div>\\n            <aside class="study-sidebar reveal">\\n' + asideContent + '\\n            </aside>' + FOOTER;
            fs.writeFileSync(file, newHtml);
            console.log("Successfully rebuilt " + file);
        } else {
            console.log("Could not find required tags in " + file);
        }
    }
});
