import React, { useState } from 'react';
import { Mail, Phone, ChevronRight } from 'lucide-react';

interface LoginScreenProps {
  onSubmit: (phoneNumber: string) => void;
  isDark: boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onSubmit, isDark }) => {
  const [loginType, setLoginType] = useState<'phone' | 'email'>('phone');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!value.trim()) {
      setError(`Please enter your ${loginType}`);
      return;
    }

    if (loginType === 'phone') {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
      if (!phoneRegex.test(value)) {
        setError('Please enter a valid phone number');
        return;
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError('Please enter a valid email address');
        return;
      }
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onSubmit(value);
    }, 1500);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className={`w-16 h-16 mx-auto rounded-full ${isDark ? 'bg-blue-600' : 'bg-blue-500'} flex items-center justify-center mb-4`}>
            <span className="text-2xl font-bold text-white">✈️</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Telegram</h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            {loginType === 'phone' ? 'Enter your phone number' : 'Enter your email'}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Toggle Buttons */}
          <div className={`flex gap-2 mb-6 p-1 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
            <button
              type="button"
              onClick={() => {
                setLoginType('phone');
                setValue('');
                setError('');
              }}
              className={`flex-1 py-2 rounded-md transition-all flex items-center justify-center gap-2 ${
                loginType === 'phone'
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : isDark
                  ? 'text-gray-400'
                  : 'text-gray-600'
              }`}
            >
              <Phone size={18} />
              <span>Phone</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginType('email');
                setValue('');
                setError('');
              }}
              className={`flex-1 py-2 rounded-md transition-all flex items-center justify-center gap-2 ${
                loginType === 'email'
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : isDark
                  ? 'text-gray-400'
                  : 'text-gray-600'
              }`}
            >
              <Mail size={18} />
              <span>Email</span>
            </button>
          </div>

          {/* Input Field */}
          <div>
            <input
              type={loginType === 'phone' ? 'tel' : 'email'}
              placeholder={loginType === 'phone' ? '+1 (555) 123-4567' : 'your@email.com'}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError('');
              }}
              className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors ${
                error
                  ? isDark
                    ? 'border-red-600 bg-red-900/20'
                    : 'border-red-500 bg-red-50'
                  : isDark
                  ? 'border-gray-700 bg-gray-900 text-white'
                  : 'border-gray-300 bg-gray-50 text-black'
              } focus:border-blue-500 dark:focus:border-blue-400`}
            />
            {error && (
              <p className={`mt-2 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                {error}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded"
            />
            <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Remember this account
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              loading
                ? isDark
                  ? 'bg-gray-700 text-gray-500'
                  : 'bg-gray-300 text-gray-500'
                : isDark
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {loading ? 'Sending...' : 'Send Code'}
            {!loading && <ChevronRight size={20} />}
          </button>
        </form>

        {/* Footer */}
        <p className={`text-center mt-6 text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
          We'll send you a code via {loginType === 'phone' ? 'SMS' : 'email'} to verify your account
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
