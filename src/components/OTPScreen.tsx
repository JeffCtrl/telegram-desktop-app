import React, { useState, useEffect } from 'react';
import { ChevronLeft, RotateCcw } from 'lucide-react';

interface OTPScreenProps {
  phoneNumber: string;
  onSubmit: (otp: string) => void;
  isDark: boolean;
}

const OTPScreen: React.FC<OTPScreenProps> = ({ phoneNumber, onSubmit, isDark }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit(otpCode);
    }, 1500);
  };

  const handleResend = () => {
    if (canResend) {
      setTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      setError('Code sent to ' + phoneNumber);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className={`mb-6 flex items-center gap-2 ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Verify Your Number</h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Enter the 6-digit code we sent to<br />
            <span className={`font-semibold ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
              {phoneNumber}
            </span>
          </p>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Fields */}
          <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(index, e)}
                className={`w-12 h-14 text-center text-2xl font-bold rounded-lg border-2 outline-none transition-colors ${
                  error
                    ? isDark
                      ? 'border-red-600 bg-red-900/20'
                      : 'border-red-500 bg-red-50'
                    : isDark
                    ? 'border-gray-700 bg-gray-900 text-white'
                    : 'border-gray-300 bg-gray-50 text-black'
                } focus:border-blue-500 dark:focus:border-blue-400`}
              />
            ))}
          </div>

          {error && (
            <p className={`text-center text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || otp.some((d) => !d)}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              loading || otp.some((d) => !d)
                ? isDark
                  ? 'bg-gray-700 text-gray-500'
                  : 'bg-gray-300 text-gray-500'
                : isDark
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>

        {/* Resend Code */}
        <div className="mt-6 text-center">
          {!canResend ? (
            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              Didn't receive code? Resend in <span className="font-bold">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className={`flex items-center justify-center gap-2 mx-auto text-sm font-semibold ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
            >
              <RotateCcw size={16} />
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPScreen;
