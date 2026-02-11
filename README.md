# 🌌 Galaxy Communities

**Galaxy Communities** is an experimental 3D spatial discovery platform designed to combat social isolation by visualizing digital communities as interactive planets in a shared galaxy. Built for the 2026 digital era, it bridges the gap between digital belonging and physical action through immersive engineering and Gemini AI.

---

## 🚀 The Vision: Beyond the Feed
In our hyper-connected landscape, **79% of young adults** report chronic isolation. Traditional "Feed-based" platforms lack a sense of **Place**, leading to emotional disengagement. Galaxy Communities reimagines social discovery as a **Community-Centred** exploration experience.

*   **Inclusive Discovery:** Every subculture has a visible orbit, from Gen-Z niche interests to an aging population's wellness groups.
*   **Scalable Infrastructure:** A horizontally scalable 3D engine that handles growth through "Theme Constellations."
*   **Social Enterprise:** Integrating local service providers directly into planetary ecosystems for **Economic Sustainability**.

---

## ✨ Key Features

### 1. Orbital Discovery (Core)
A high-fidelity 3D galaxy explorer where communities are clustered by thematic similarity. Spatial proximity allows for intuitive, curiosity-driven discovery rather than alphabetical list-scrolling.

### 2. Gemini-Powered Planet Architect (AI Layer)
Leveraging **Gemini 1.5 Flash** to democratize 3D design. Community leaders can describe their "vibe" in natural language (e.g., *"A cozy, rain-drenched library with a hint of warm jazz"*), and our AI maps those parameters to textures, lighting, and orbit instantly.

### 3. Atmospheric Bubble Editor
Visualizing group "warmth" through real-time atmosphere. Users populate their planet with "Vibe Bubbles"—floating fragments of community life—creating **Immediate Emotional Proximity** for new explorers.

---

## ⚙️ Technical Architecture

The system is built with a **Modular 3D Architecture**, separating rendering logic from business state to ensure scalability.

*   **3D Engine:** Built with `React Three Fiber` and `Three.js` using declarative scene graphs.
*   **AI Integration:** Custom `lib/gemini.ts` wrapper for prompt-to-parameter mapping.
*   **State Management:** `Zustand` handles the global planet registry and synchronized interactions.
*   **Scale Ready:** Designed for lazy-loading planets and spatial indexing to support thousands of concurrent planetary ecosystems.

---

## 🛠 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Google AI Studio API Key (for Planet Architect features)

### Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/galaxy-communities.git
    cd galaxy-communities
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory:
    ```env
    GOOGLE_AI_STUDIO_API_KEY=your_gemini_api_key_here
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
5.  **Open the galaxy:**
    Navigate to [http://localhost:3000](http://localhost:3000).

---

## 🧰 Tech Stack
*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **3D Rendering:** React Three Fiber, Three.js
*   **AI:** Gemini 1.5 Flash (@google/generative-ai)
*   **Styling:** Tailwind CSS, Framer Motion
*   **State:** Zustand

---

## 🏆 Project Status: Gemini Level
This project is currently a functional hackathon prototype (Project Gemini level). You can find the full academic research and business scalability plan in the [PROJECT_PROPOSAL.md](./docs/PROJECT_PROPOSAL.md).

**Team:** LLW

