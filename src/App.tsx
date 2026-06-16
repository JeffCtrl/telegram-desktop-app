import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import OTPScreen from './components/OTPScreen';
import ProfileSetup from './components/ProfileSetup';
import MainApp from './components/MainApp';
import { Moon, Sun } from 'lucide-react';

type AuthStep = 'login' | 'otp' | 'profile' | 'main';

function App() {
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [isDark, setIsDark] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check localStorage for saved theme and auth
    const savedTheme = localStorage.getItem('theme');
    const savedAuth = localStorage.getItem('auth');
    
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.body.classList.add('dark');
    }

    if (savedAuth) {
      setUserData(JSON.parse(savedAuth));
      setAuthStep('main');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone);
    setAuthStep('otp');
  };

  const handleOTPSubmit = (otp: string) => {
    setAuthStep('profile');
  };

  const handleProfileSubmit = (profile: any) => {
    const user = {
      phoneNumber,
      ...profile,
    };
    setUserData(user);
    localStorage.setItem('auth', JSON.stringify(user));
    setAuthStep('main');
  };

  const handleLogout = () => {
    setAuthStep('login');
    setUserData(null);
    setPhoneNumber('');
    localStorage.removeItem('auth');
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="w-full h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors">
        {/* Theme Toggle */}
        {authStep !== 'main' && (
          <button
            onClick={toggleTheme}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            title="Toggle theme"
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        )}

        {/* Auth Steps */}
        {authStep === 'login' && <LoginScreen onSubmit={handlePhoneSubmit} isDark={isDark} />}
        {authStep === 'otp' && <OTPScreen phoneNumber={phoneNumber} onSubmit={handleOTPSubmit} isDark={isDark} />}
        {authStep === 'profile' && <ProfileSetup onSubmit={handleProfileSubmit} isDark={isDark} />}
        {authStep === 'main' && userData && (
          <MainApp userData={userData} isDark={isDark} toggleTheme={toggleTheme} onLogout={handleLogout} />
        )}
      </div>
    </div>
  );
}

export default App;
