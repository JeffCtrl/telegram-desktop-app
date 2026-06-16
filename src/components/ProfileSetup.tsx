import React, { useState } from 'react';
import { Upload, ChevronRight, User } from 'lucide-react';

interface ProfileSetupProps {
  onSubmit: (profile: any) => void;
  isDark: boolean;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onSubmit, isDark }) => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (bio.length > 50) {
      newErrors.bio = 'Bio must be 50 words or less';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit({
        username,
        firstName,
        lastName,
        bio,
        profileImage,
      });
    }, 1500);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-8 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Profile</h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Complete your profile to get started
          </p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-6">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 transition-colors ${
              isDark ? 'bg-gray-900 border-2 border-gray-700' : 'bg-gray-100 border-2 border-gray-300'
            }`}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
              ) : (
                <User size={48} className={isDark ? 'text-gray-600' : 'text-gray-400'} />
              )}
            </div>
            <label className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              isDark
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}>
              <Upload size={18} />
              <span>Upload Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., john_doe"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({ ...errors, username: '' });
              }}
              className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors ${
                errors.username
                  ? isDark
                    ? 'border-red-600 bg-red-900/20'
                    : 'border-red-500 bg-red-50'
                  : isDark
                  ? 'border-gray-700 bg-gray-900 text-white'
                  : 'border-gray-300 bg-gray-50 text-black'
              } focus:border-blue-500`}
            />
            {errors.username && (
              <p className={`mt-1 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                {errors.username}
              </p>
            )}
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setErrors({ ...errors, firstName: '' });
              }}
              className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors ${
                errors.firstName
                  ? isDark
                    ? 'border-red-600 bg-red-900/20'
                    : 'border-red-500 bg-red-50'
                  : isDark
                  ? 'border-gray-700 bg-gray-900 text-white'
                  : 'border-gray-300 bg-gray-50 text-black'
              } focus:border-blue-500`}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors ${
                isDark
                  ? 'border-gray-700 bg-gray-900 text-white'
                  : 'border-gray-300 bg-gray-50 text-black'
              } focus:border-blue-500`}
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Bio (max 50 words)
            </label>
            <textarea
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
                setErrors({ ...errors, bio: '' });
              }}
              rows={3}
              className={`w-full px-4 py-3 rounded-lg border-2 outline-none transition-colors resize-none ${
                errors.bio
                  ? isDark
                    ? 'border-red-600 bg-red-900/20'
                    : 'border-red-500 bg-red-50'
                  : isDark
                  ? 'border-gray-700 bg-gray-900 text-white'
                  : 'border-gray-300 bg-gray-50 text-black'
              } focus:border-blue-500`}
            />
            <div className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              {bio.split(/\s+/).filter(w => w).length} / 50 words
            </div>
            {errors.bio && (
              <p className={`mt-1 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                {errors.bio}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all mt-6 ${
              loading
                ? isDark
                  ? 'bg-gray-700 text-gray-500'
                  : 'bg-gray-300 text-gray-500'
                : isDark
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {loading ? 'Creating Profile...' : 'Complete Setup'}
            {!loading && <ChevronRight size={20} />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
