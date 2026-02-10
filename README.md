# 🌌 Galaxy Communities

Galaxy Communities is a web-based experimental platform that visualizes social communities as planets in a shared galaxy.

Each community exists as a planet orbiting a central star. Users can explore communities, view their activities, and even create their own planet to join the galaxy.

This project was built during a 4-day hackathon.

---

## ✨ Concept

In modern urban life, people often feel isolated despite being digitally connected.
Galaxy Communities reimagines social discovery as a spatial, exploratory experience:

- Communities are planets
- Interests form constellations
- Belonging is visualized through orbit and motion

---

## 🪐 User Flow

1. **Home**
   - View the main galaxy
   - Search for communities by keyword
   - Learn about partnered communities and interests

2. **Search Galaxy**
   - Explore a galaxy of relevant community planets
   - View brief descriptions via floating info cards
   - Option to create a new community planet

3. **Community Profile**
   - Explore posts, members, and upcoming events
   - Experience the community as a living planet

4. **Create Planet**
   - Customize planet appearance (texture, rings, colors)
   - Preview the planet in real time

5. **Customize & Launch**
   - Add text bubbles and images to introduce the community
   - Launch the planet into the main galaxy

---

## 🧱 Project Structure

```txt
app/            # Route-based pages (Next.js)
components/     # Reusable UI, 3D canvas, overlays
store/          # Global state management
data/           # Mock data (communities, posts, events)
public/         # Textures, images, assets
