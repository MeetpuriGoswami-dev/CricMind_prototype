// CricMind Portfolio Engine - app.js
// Modern fully interactive frontend replica controller

document.addEventListener('DOMContentLoaded', () => {
  
  // ─── 1. GLOBAL PORTFOLIO TABS ROUTING ────────────────────────────
  const tabs = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      // Update active nav button
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update visible section
      sections.forEach(s => s.classList.remove('active'));
      const activeSection = document.getElementById(target);
      if (activeSection) {
        activeSection.classList.add('active');
      }
    });
  });

  // ─── 2. INNER MOCKUP BROWSER SCREENS SYSTEM ─────────────────────────
  const sidebarBtns = document.querySelectorAll('.flow-step-btn');
  const innerNavLinks = document.querySelectorAll('.inner-link-btn');
  const urlBar = document.querySelector('.device-url-bar');
  const screens = {
    home: document.getElementById('screen-home'),
    dashboard: document.getElementById('screen-dashboard'),
    cricai: document.getElementById('screen-cricai'),
    simulator: document.getElementById('screen-simulator')
  };

  window.showScreen = function(screenName) {
    // Hide all mockup screen views first
    Object.keys(screens).forEach(key => {
      if (screens[key]) screens[key].style.display = 'none';
    });

    // Show selected screen
    if (screens[screenName]) {
      screens[screenName].style.display = 'block';
    }

    // Update Browser Mockup URL
    if (urlBar) {
      if (screenName === 'home') urlBar.textContent = 'cricmind.io/arena';
      else urlBar.textContent = `cricmind.io/${screenName}`;
    }

    // Sync Sidebar Flow step highlights
    sidebarBtns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.screen === screenName) btn.classList.add('active');
    });

    // Sync Mockup Inner navbar link highlights
    innerNavLinks.forEach(link => {
      link.classList.remove('active');
    });
    const activeLink = document.getElementById(`inav-${screenName}`);
    if (activeLink) activeLink.classList.add('active');
  };

  // Connect sidebar buttons
  sidebarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const screenName = btn.dataset.screen;
      window.showScreen(screenName);
    });
  });


  // ─── 3. INTERACTIVE CRICAI CHAT SYSTEM ─────────────────────────────
  const chatMessagesBox = document.getElementById('chat-messages-box');
  const chatQueryInput = document.getElementById('chat-query-input');
  const aiLoadingDot = document.getElementById('ai-loading-dot');

  // Hardcoded rich offline database responses
  const AI_OFFLINE_DB = {
    'csk-mi': `
      <div style="font-family: var(--font-heading); font-size: 15px; color: var(--neon-gold); font-weight: 700; margin-bottom: 8px;">⚔️ HEAD-TO-HEAD INTEL: CSK VS MI</div>
      Based on our comprehensive database of **36 historical IPL clashes**:
      <ul style="margin: 8px 0 8px 16px; padding: 0; list-style-type: circle;">
        <li><strong>Mumbai Indians (MI):</strong> **20 wins** (55.6% win rate)</li>
        <li><strong>Chennai Super Kings (CSK):</strong> **16 wins** (44.4% win rate)</li>
      </ul>
      **Pitch Split:** MI dominates at Wankhede Stadium (72% success), while CSK holds the advantage on turning tracks at Chepauk (64% success).
      <br><br>
      <span class="ds-tag green" style="font-size: 9px; padding: 2px 8px;">VERDICT: MI holds the historical edge, but CSK chasing success is 12% higher.</span>
    `,
    'kohli': `
      <div style="font-family: var(--font-heading); font-size: 15px; color: var(--neon-blue); font-weight: 700; margin-bottom: 8px;">🏏 PLAYER LAB RECORD: VIRAT KOHLI</div>
      Our local analytics engine scanned **252 matches** (2008–2026):
      <ul style="margin: 8px 0 8px 16px; padding: 0; list-style-type: square;">
        <li><strong>Total Runs:</strong> **9,155 runs** (All-Time Record Winner 👑)</li>
        <li><strong>Strike Rate:</strong> **134.8** | Average: **38.6**</li>
        <li><strong>Boundaries:</strong> 720 Fours | 280 Sixes</li>
        <li><strong>100s/50s:</strong> 8 Hundreds, 54 Fifties</li>
        <li><strong>MVP MOM Awards:</strong> 17 Player of the Match selections</li>
      </ul>
      <span class="ds-tag blue" style="font-size: 9px; padding: 2px 8px;">PROFILE STRENGTH: Innings builder index of 98.2 (Elite tier).</span>
    `,
    'champions': `
      <div style="font-family: var(--font-heading); font-size: 15px; color: var(--neon-purple); font-weight: 700; margin-bottom: 8px;">🏆 MOST SUCCESSFUL IPL FRANCHISES</div>
      Unified search across all 19 seasons (2008-2026):
      <ol style="margin: 8px 0 8px 16px; padding: 0;">
        <li><strong>Chennai Super Kings (CSK):</strong> **5 Titles** (2010, 2011, 2018, 2021, 2023) 🏆🏆🏆🏆🏆</li>
        <li><strong>Mumbai Indians (MI):</strong> **5 Titles** (2013, 2015, 2017, 2019, 2020) 🏆🏆🏆🏆🏆</li>
        <li><strong>Kolkata Knight Riders (KKR):</strong> **3 Titles** (2012, 2014, 2024) 🏆🏆🏆</li>
      </ol>
      **Dynasty Trend:** CSK holds the record for most final appearances (10 matches), exhibiting the highest structural squad longevity.
    `,
    'toss': `
      <div style="font-family: var(--font-heading); font-size: 15px; color: var(--neon-gold); font-weight: 700; margin-bottom: 8px;">🪙 CRICAI DEEP-DIVE: THE TOSS ADVANTAGE MYTH</div>
      Statistical verification from **1,226 matches**:
      <ul style="margin: 8px 0 8px 16px; padding: 0; list-style-type: disc;">
        <li><strong>Toss Winner = Match Winner:</strong> **50.6%** (Pure coin-flip correlation. Toss wins do not determine match wins!)</li>
        <li><strong>Innings Split Revolution:</strong>
          <br>• Fielding First (Chasing): **53.8% total wins**
          <br>• Batting First (Defending): **44.3% total wins**
        </li>
      </ul>
      **Dew Factor:** Outfield moisture in day-night settings accounts for a **9.5% win margin delta** favoring the chasing side due to wet ball slip rates in the second innings.
    `,
    'default': `
      <div style="font-family: var(--font-heading); font-size: 14px; color: var(--neon-green); font-weight: 700; margin-bottom: 6px;">🤖 CRICAI LOCAL DATA SCAN COMPLETE</div>
      Analyzed 1,226 Matches across 19 Seasons (2008-2026):
      <br>• Outfield dew factors increase fielding win rates by **53.8%**.
      <br>• Middle Overs (Overs 6-15) account for **38.8%** of total game wickets.
      <br><br>
      *Try clicking one of the preset quick queries above to extract precise historical telemetry reports!*
    `
  };

  // Preset button sender
  window.sendPreset = function(presetKey) {
    // Add user bubble
    let userText = "";
    if (presetKey === 'csk-mi') userText = "What is the historical head-to-head record between CSK and MI?";
    else if (presetKey === 'kohli') userText = "Show me Virat Kohli's player profile statistics.";
    else if (presetKey === 'champions') userText = "Which teams have won the most IPL titles in history?";
    else if (presetKey === 'toss') userText = "Does winning the toss give a match-winning advantage?";

    appendChatBubble('user', userText);

    // Show loading spinner
    aiLoadingDot.style.display = 'block';
    chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;

    setTimeout(() => {
      aiLoadingDot.style.display = 'none';
      const reply = AI_OFFLINE_DB[presetKey] || AI_OFFLINE_DB['default'];
      appendChatBubble('ai', reply);
    }, 850);
  };

  // Custom text sender
  window.sendCustomInput = function() {
    const text = chatQueryInput.value.trim();
    if (!text) return;

    appendChatBubble('user', text);
    chatQueryInput.value = "";

    // Show loading spinner
    aiLoadingDot.style.display = 'block';
    chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;

    // Local Regex keyword search
    const queryLower = text.toLowerCase();
    let replyKey = 'default';

    if (queryLower.includes('csk') || queryLower.includes('mi') || queryLower.includes('mumbai') || queryLower.includes('chennai')) {
      replyKey = 'csk-mi';
    } else if (queryLower.includes('kohli') || queryLower.includes('virat') || queryLower.includes('runs')) {
      replyKey = 'kohli';
    } else if (queryLower.includes('champion') || queryLower.includes('won') || queryLower.includes('winner') || queryLower.includes('title')) {
      replyKey = 'champions';
    } else if (queryLower.includes('toss') || queryLower.includes('chase') || queryLower.includes('decision')) {
      replyKey = 'toss';
    }

    setTimeout(() => {
      aiLoadingDot.style.display = 'none';
      const reply = AI_OFFLINE_DB[replyKey];
      appendChatBubble('ai', reply);
    }, 900);
  };

  function appendChatBubble(sender, content) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = content;
    chatMessagesBox.appendChild(bubble);
    
    // Auto scroll to bottom
    chatMessagesBox.scrollTop = chatMessagesBox.scrollHeight;
  }


  // ─── 4. INTERACTIVE MONTE CARLO MATCH SIMULATOR ───────────────────
  const simTeam1Select = document.getElementById('sim-team-1');
  const simTeam2Select = document.getElementById('sim-team-2');
  const runSimActionBtn = document.getElementById('run-sim-action-btn');
  const simResultsPanel = document.getElementById('sim-results-panel');
  
  const simEmptyState = document.getElementById('sim-empty-state');
  const simLoaderState = document.getElementById('sim-loader-state');
  const simOutcomesState = document.getElementById('sim-outcomes-state');
  
  const simLoaderLogs = document.getElementById('sim-loader-logs');
  const simProgressFill = document.getElementById('sim-progress-fill');
  
  const simWinnerName = document.getElementById('sim-winner-name');
  const simWinnerConfidence = document.getElementById('sim-winner-confidence');
  const simWinnerScore = document.getElementById('sim-winner-score');
  const simWinnerWickets = document.getElementById('sim-winner-wickets');

  // Realistic franchise win rate factors
  const SQUAD_WEIGHTS = {
    "Chennai Super Kings": 0.584,
    "Mumbai Indians": 0.562,
    "Kolkata Knight Riders": 0.541,
    "Rajasthan Royals": 0.512,
    "Sunrisers Hyderabad": 0.495,
    "Royal Challengers Bengaluru": 0.489
  };

  window.runMonteCarloSim = function() {
    const team1 = simTeam1Select.value;
    const team2 = simTeam2Select.value;

    if (team1 === team2) {
      alert("Please configure two different franchises to run the simulated matchups.");
      return;
    }

    // Disable button & switch view states
    runSimActionBtn.disabled = true;
    simEmptyState.style.display = 'none';
    simOutcomesState.style.display = 'none';
    simLoaderState.style.display = 'block';

    let progress = 0;
    simProgressFill.style.width = '0%';
    
    // Non-blocking log ticker sequence mimicking complex compiler loops
    const simulationLogs = [
      { prg: 10, text: "PARSING ATMOSPHERIC DEW COEFFICIENTS..." },
      { prg: 25, text: "COMPILING HISTORIC H2H RATIOS..." },
      { prg: 45, text: "WEIGHTING PLAYER RADAR VECTORS..." },
      { prg: 65, text: "LAUNCHING MONTE CARLO SEEDS [1500/5000]..." },
      { prg: 85, text: "COMPILING SCORE DISTRIBUTIONS [3800/5000]..." },
      { prg: 100, text: "SIMULATION METRICS AGGREGATED!" }
    ];

    let logIdx = 0;
    
    const interval = setInterval(() => {
      if (logIdx < simulationLogs.length) {
        const log = simulationLogs[logIdx];
        simLoaderLogs.textContent = log.text;
        simProgressFill.style.width = `${log.prg}%`;
        logIdx++;
      } else {
        clearInterval(interval);
        renderSimulationOutcomes(team1, team2);
      }
    }, 380);
  };

  function renderSimulationOutcomes(team1, team2) {
    // Enable simulate button
    runSimActionBtn.disabled = false;

    // Calculate outcomes based on historic weights
    const w1 = SQUAD_WEIGHTS[team1] || 0.5;
    const w2 = SQUAD_WEIGHTS[team2] || 0.5;
    
    const totalWeight = w1 + w2;
    const probability1 = w1 / totalWeight;
    const probability2 = w2 / totalWeight;

    // Weighted selection of winner
    let winner = "";
    let confidence = 0;
    if (Math.random() < probability1) {
      winner = team1;
      confidence = probability1;
    } else {
      winner = team2;
      confidence = probability2;
    }

    // Score generation boundaries
    const baseScore = Math.floor(Math.random() * 40) + 165; // 165 to 205
    const wickets = Math.floor(Math.random() * 4) + 3; // 3 to 6

    // Render results
    simWinnerName.textContent = winner.toUpperCase();
    simWinnerConfidence.textContent = `${(confidence * 100).toFixed(1)}%`;
    simWinnerScore.textContent = `${baseScore} to ${baseScore + 12}`;
    simWinnerWickets.textContent = `${wickets} to ${wickets + 2}`;

    // Toggle views
    simLoaderState.style.display = 'none';
    simOutcomesState.style.display = 'block';
  }


  // ─── 5. SUPPORTING DOCS RENDER ────────────────────────────────────
  const docBtns = document.querySelectorAll('.doc-btn');
  const docContent = document.querySelector('.doc-content');

  const DOCS_DATA = {
    'design-system': `
      <h1>DESIGN_SYSTEM.md</h1>
      <p class="neon-green">CricMind UI Design Specifications & Core Components</p>
      
      <h2>1. Design Aesthetics & Philosophy</h2>
      <p>CricMind uses a safety-first, offline-exclusive <strong>Sci-Fi Glassmorphism (Glass-UI)</strong> theme. It draws inspiration from futuristic visual consoles, neon holographic data metrics, and fluid transition animations. The interface is optimized to minimize visual fatigue during long analytical sessions while creating a "wow" factor upon load.</p>

      <h2>2. Design Tokens</h2>
      <h3>A. Core Palette</h3>
      <ul>
        <li><strong>Deep Space Background:</strong> <code>#020817</code> (Variables: <code>--bg</code>)</li>
        <li><strong>Neon Green Accent:</strong> <code>#00FF9C</code> (Orange/Cyan metrics, toss advantages, success indicators)</li>
        <li><strong>Cyber Blue Accent:</strong> <code>#00C2FF</code> (Simulator predictions, player comparison stats)</li>
        <li><strong>Futuristic Amber/Gold:</strong> <code>#FFC857</code> (Championship alerts, MVP cap records)</li>
        <li><strong>Neon Purple:</strong> <code>#A855F7</code> (AI Chatbot responses, query details)</li>
      </ul>

      <h3>B. Typography Scale</h3>
      <ul>
        <li><strong>Display Font:</strong> <code>'Orbitron', monospace</code> - Used for scoreboard figures, timers, and critical digital headings.</li>
        <li><strong>Heading Font:</strong> <code>'Rajdhani', sans-serif</code> - Used for subheadings, team titles, and dashboard widgets.</li>
        <li><strong>Body Font:</strong> <code>'Inter', sans-serif</code> - Used for analytical paragraphs, logs, and tabular grids to guarantee strict readability.</li>
      </ul>

      <h2>3. Standard UI Components</h2>
      <h3>A. Glassmorphic Card (<code>.glass</code>)</h3>
      <pre><code>background: rgba(2, 8, 23, 0.72);
border: 1px solid rgba(0, 255, 156, 0.18);
backdrop-filter: blur(16px);
border-radius: 12px;</code></pre>
      <p>Used to float telemetry widgets, charts, and chatbot messages above the background video render.</p>

      <h3>B. Glowing Borders</h3>
      <p>Interactive elements pulse using box shadows containing color-specific opacity levels. Transitions occupy a standard <code>300ms cubic-bezier(0.16, 1, 0.3, 1)</code> curve for maximum response feel.</p>
    `,
    'architecture': `
      <h1>ARCHITECTURE.md</h1>
      <p class="neon-blue">System Design & Technical Architecture Specifications</p>

      <h2>1. Overview</h2>
      <p>CricMind is structured as a client-side offline analytical engine. Instead of generating high latency backend requests, it utilizes local pre-processed JSON data streams containing full analytical history. This guarantees data privacy, instantaneous queries, and eliminates API hosting costs entirely.</p>

      <h2>2. Data Preprocessing Pipeline</h2>
      <p>The system digests raw match streams from <strong>Cricsheet.org</strong>. Preprocessing compiles match and ball data through a standard Node.js script (<code>preprocess-data.cjs</code>):</p>
      <ul>
        <li>Filters 1,226 matches across 19 IPL seasons (2008-2026).</li>
        <li>Aggregates metrics: dot-ball ratios, death over wicket densities, run-rate trends, toss biases.</li>
        <li>Compiles 680+ unique player career profiles directly into indexed JSON binaries.</li>
      </ul>

      <h2>3. Core Technical Modules</h2>
      
      <h3>A. CricAI Statistical Query Engine</h3>
      <p>An offline natural-language regex parser designed to resolve structural questions. Unlike heavy server-side large language models, CricAI extracts key tokens (e.g. H2H queries, player profiles, season champions) and scans client-side indices instantly in <strong>&lt; 5 milliseconds</strong>.</p>

      <h3>B. Monte Carlo Match Simulator</h3>
      <p>Calculates match probability weights using historic franchise head-to-head ratios, season standings, and stadium records. Executes 5,000 iterative simulations using mathematical splits to yield highly accurate win margins and toss suggestions.</p>

      <h2>4. Security Architecture</h2>
      <ul>
        <li><strong>Sanitized Environment:</strong> Zero cookies, zero local storage exploits, zero cloud database credentials.</li>
        <li><strong>Strict Sandbox:</strong> Operates entirely inside the browser's JavaScript engine.</li>
      </ul>
    `
  };

  docBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const docId = btn.dataset.doc;
      docBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (docContent) {
        docContent.innerHTML = DOCS_DATA[docId];
      }
    });
  });

  // Initialize first doc
  if (docBtns.length > 0) {
    docBtns[0].click();
  }


  // ─── 6. PRINT TRIGGERS ──────────────────────────────────────────
  const printBtn = document.getElementById('print-case-study-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

});
