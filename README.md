# 🩺 AIDEN Medical Chatbot – Nextjs (FastAPI + RAG + OpenAI)

This is the **frontend** for the AIDEN Medical Assistant — an AI-powered medical chatbot that uses RAG (Retrieval-Augmented Generation) with a Python backend.

🔗 **Backend Repository:**  
https://github.com/Abdullaha2h/AIDEN-Medical-Bot-Backend-Python-

---

## 🚀 Tech Stack (Frontend)

- **React**
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/UI** components
- **Lucide React Icons**
- **Dark / Light mode** with Theme Provider
- **Responsive UI**

---

## 📁 Folder Structure

```md
frontend/
├── public/
│   └── face.png
│
├── src/
│   ├── components/
│   │   ├── ChatBubble.tsx
│   │   ├── MessageInput.tsx
│   │   ├── Navbar.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── ui/        ← shadcn UI components folder
│   │
│   │
│   ├── pages/
│   │   └── Home.tsx
│   │
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── tailwind.config.js
└── package.json
```

---

## 🔧 Installation & Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/Abdullaha2h/AIDEN-Medical-Bot-Rag-FastAPI-Nextsj-
cd AIDEN-Medical-Bot-Frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Run locally

```bash
npm run dev
```

---

## 🎨 Features

### ✔ Modern & Clean UI  
Built with **shadcn/ui** — smooth buttons, cards, animations.

### ✔ Dark / Light Mode  
Using shadcn `<ThemeProvider>` with system theme support.

### ✔ Chat Interface  
- User/AI bubbles  
- Loading indicator  
- Scroll management  

### ✔ API Integration  
Connected to Python FastAPI backend.

---

## 📦 Deploying on Vercel

### 1️⃣ Build Command

```bash
npm run build
```

### 2️⃣ Output Directory

```
dist
```

## 🤝 Backend Repo Again (for connection)

https://github.com/Abdullaha2h/AIDEN-Medical-Bot-Backend-Python-

---

## 🛠 Troubleshooting

### ❗ CORS error  
Make sure backend FastAPI has:

```py
allow_origins=["*"]
```


### ❗ Dark mode not switching  
Ensure your layout wraps with:

```tsx
<ThemeProvider defaultTheme="system" storageKey="aiden-theme">
  <App />
</ThemeProvider>
```

---

## 🧑‍⚕️ AIDEN Medical Chatbot  
Designed to provide quick medical guidance with AI-powered RAG search.  
This repository contains only the **frontend UI**.

---

