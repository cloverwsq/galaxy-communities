# 🤜 Developer Sync: Cozy Galaxy Updates

This document summarizes the global changes and components created during the development of **Part D (Create Style)**. Please read this to see how it affects your page.

---

## 🧠 Global State (`store/useAppStore.ts`)
We are using **Zustand** for state management. This store now holds the "Source of Truth" for how a planet looks.

**Teammates B, C, and E:** You should import this store to display the user's planet correctly.

| Property | Type | Description |
| :--- | :--- | :--- |
| `color` | `string` | The hex code of the planet (e.g., `#FFB7B2`). |
| `surfaceType` | `string` | `clay`, `moss`, `sand`, or `lavender`. |
| `hasRings` | `boolean` | Whether to show planetary rings. |
| `hasMoons` | `boolean` | Whether to show the tiny orbiting moon. |
| `rotationLevel`| `number` | 0 (stopped) to 10 (energetic). |

---

## 📦 Shared Components
I have created a reusable 3D preview that anyone can drop into their page.

### `PlanetPreview.tsx`
*   **Location**: `components/visuals/PlanetPreview.tsx`
*   **What it does**: Renders the 3D planet with current store values, including lighting, shadows, and post-processing glow.
*   **Usage**:
    ```tsx
    import PlanetPreview from '@/components/visuals/PlanetPreview';
    // ... inside your component
    <div className="h-64 w-64">
       <PlanetPreview />
    </div>
    ```

---

## 🎨 Global Styling & UI
*   **Tailwind**: Fully configured in `tailwind.config.ts`.
*   **Colors**: I've leaning into a **"Cozy" palette** (Peaches, Lavenders, Creams). 
*   **Scrollbars**: Custom thin, rounded scrollbars are added to `globals.css`. Use the class `custom-scrollbar` on any overflow container.
*   **Animations**: **Framer Motion** is installed. Use it for bouncy, tactile UI.

---

## 🛠 Project Structure Update (New Organization)
I have reorganized the `app/` folder using **Next.js Route Groups** (names in parentheses). This allows us to label ownership without changing the URLs.

```txt
app/
  (B_GalaxyExplorer)/   # Responsible: Developer B
    galaxy/page.tsx
  (C_CommunityDetail)/  # Responsible: Developer C
    community/
      [id]/page.tsx
  (D_PlanetDesign)/     # Responsible: Developer D
    create/page.tsx
  (E_BubbleEditor)/     # Responsible: Developer E
    create/
      customize/page.tsx
  layout.tsx            # Global Layout
  page.tsx              # Landing Page (Dev A)

components/
  visuals/
    PlanetPreview.tsx      # SHARED: 3D Engine
    PlanetCustomizerUI_D.tsx # Dev D's UI Panel
store/
  useAppStore.ts        # SHARED: State Management
```

---

## ⚠️ Important for all Developers
1.  **Mark Your Code**: I've added `@responsibility` headers to each page. Please follow this convention!
2.  **Shared Tools**: Use `PlanetPreview.tsx` for any page that needs to show a planet.
3.  **URLs**: The URLs remain exactly the same (`/create`, `/galaxy`, etc.). Only the file explorer view is different.
