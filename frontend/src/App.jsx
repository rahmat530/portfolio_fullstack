import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthProvider } from './hooks/useAuth';
import Sidebar from './components/Sidebar';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Education from './pages/Education';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

import './styles/globals.css';

function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const isLight = theme === 'light';

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      title={`Switch to ${isLight ? 'dark' : 'light'} theme`}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb">
          {isLight ? '☾' : '☀'}
        </span>
      </span>
    </button>
  );
}

function Layout({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <ThemeToggle />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

function LoginLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      <ThemeToggle />
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/admin-login" element={<LoginLayout><AdminLogin /></LoginLayout>} />
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/skills" element={<Layout><Skills /></Layout>} />
          <Route path="/projects" element={<Layout><Projects /></Layout>} />
          <Route path="/education" element={<Layout><Education /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="/admin" element={<Layout><Admin /></Layout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
