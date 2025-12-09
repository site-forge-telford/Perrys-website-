import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Process from './pages/Process';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Booking from './pages/Booking';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import RecycleBin from './pages/RecycleBin';
import { initializeDatabase } from './lib/initDatabase';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    initializeDatabase();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash);
    };

    window.addEventListener('popstate', handlePopState);
    handlePopState();

    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page: string) => {
    setCurrentPage(page);
    window.history.pushState({}, '', `#${page}`);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <About onNavigate={navigate} />;
      case 'services':
        return <Services onNavigate={navigate} />;
      case 'projects':
        return <Projects onNavigate={navigate} />;
      case 'process':
        return <Process onNavigate={navigate} />;
      case 'testimonials':
        return <Testimonials onNavigate={navigate} />;
      case 'contact':
        return <Contact />;
      case 'booking':
        return <Booking />;
      case 'admin-login':
        return <AdminLogin onNavigate={navigate} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={navigate} />;
      case 'recycle-bin':
        return <RecycleBin onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  const isAdminPage = currentPage.startsWith('admin') || currentPage === 'recycle-bin';

  return (
    <div className="min-h-screen">
      {!isAdminPage && <Header currentPage={currentPage} onNavigate={navigate} />}
      <main key={currentPage} className="animate-fade-in">{renderPage()}</main>
      {!isAdminPage && <Footer onNavigate={navigate} />}
    </div>
  );
}

export default App;
