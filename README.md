# Ambati SaiSurya - React Portfolio

Modern, high-performance portfolio website built with **React.js** and **Vite**, featuring Vanilla CSS design tokens, dynamic dark/light theme switching, interactive project filtering, and Web3Forms contact integration.

## 🚀 Quick Start (Run Locally)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates an optimized, minified production bundle in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🌐 Hosting & Deployment

### Deploy to Vercel (Recommended)
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Deploy React portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. Vercel automatically detects Vite:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

### Deploy to Netlify
- **Option 1 (Drag & Drop)**: Run `npm run build` and drag the `dist` folder into [Netlify Drop](https://app.netlify.com/drop).
- **Option 2 (Git connection)**: Connect your GitHub repo, set Build Command to `npm run build` and Publish directory to `dist`.

---

## 🛠️ Tech Stack & Architecture
- **Framework**: React 18 + Vite
- **Styling**: Vanilla CSS with CSS Custom Properties (Theme tokens)
- **Typography**: Newsreader (Serif) & Inter Tight (Sans-Serif)
- **Data Layer**: Centralized `src/data/portfolioData.js`
- **Features**:
  - Dark / Light mode toggle with `localStorage` memory
  - Project filtering by category (Cloud, Full Stack, AI & Vision, Security)
  - Monogram-styled verified certification links (AWS, MongoDB, IBM)
  - One-click copy email button with tooltip state
  - Responsive mobile drawer navigation
