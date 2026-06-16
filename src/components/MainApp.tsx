import React, { useState } from 'react';
import { LogOut, Settings, Moon, Sun } from 'lucide-react';

interface MainAppProps {
  userData: any;
  isDark: boolean;
  toggleTheme: () => void;
  onLogout: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ userData, isDark, toggleTheme, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'contacts' | 'settings'>('chats');

  return (
    <div className={`flex h-screen ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      {/* Sidebar */}
      <div className={`w-80 border-r ${isDark ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-gray-50'} flex flex-col`}>
        {/* Header */}
        <div className={`p-4 border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <h1 className="text-2xl font-bold mb-4">Telegram</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('chats')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'chats'
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : isDark
                  ? 'text-gray-400 hover:bg-gray-900'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Chats
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'contacts'
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : isDark
                  ? 'text-gray-400 hover:bg-gray-900'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Contacts
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'settings'
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : isDark
                  ? 'text-gray-400 hover:bg-gray-900'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'chats' && (
            <div className="text-center py-8">
              <p className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                No chats yet. Start a new conversation!
              </p>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="text-center py-8">
              <p className={isDark ? 'text-gray-500' : 'text-gray-400'}>
                Your contacts will appear here
              </p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <p className="text-sm font-semibold mb-2">Welcome back!</p>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {userData.firstName} {userData.lastName}
                </p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                  @{userData.username}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`border-t p-4 space-y-2 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-gray-900 text-gray-400'
                : 'hover:bg-gray-200 text-gray-600'
            }`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            <span className="text-sm">
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-red-900/20 text-red-400'
                : 'hover:bg-red-50 text-red-600'
            }`}
          >
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 mx-auto ${
            isDark ? 'bg-gray-900' : 'bg-gray-100'
          }`}>
            {userData.profileImage ? (
              <img src={userData.profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <span className="text-4xl">👤</span>
            )}
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Welcome, {userData.firstName}!
          </h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Your chat interface is ready. More features coming soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
