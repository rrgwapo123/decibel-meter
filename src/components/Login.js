import React, { useEffect, useMemo, useState } from 'react';
import './login.css';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [rememberMe, setRememberMe] = useState(false);
  const [dbValue, setDbValue] = useState(48);
  const [loadLevel, setLoadLevel] = useState('Low');

  useEffect(() => {
    const saved = localStorage.getItem('rememberEmail');
    if (saved) {
      setEmail(saved);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const next = Math.max(35, Math.min(110, Math.round(dbValue + (Math.random() * 16 - 8))));
      setDbValue(next);
      const pct = Math.min(100, Math.max(0, Math.round((next - 35) / 75 * 100)));
      if (pct < 35) setLoadLevel('Low');
      else if (pct < 70) setLoadLevel('Moderate');
      else setLoadLevel('High');
    }, 900);
    return () => clearInterval(id);
  }, [dbValue]);

  const strength = useMemo(() => {
    const pwd = password || '';
    let score = 0;
    if (pwd.length >= 6) score += 20;
    if (pwd.length >= 8) score += 20;
    if (/[A-Z]/.test(pwd)) score += 15;
    if (/[a-z]/.test(pwd)) score += 15;
    if (/\d/.test(pwd)) score += 15;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 15;
    let label = 'Weak';
    if (score >= 80) label = 'Strong';
    else if (score >= 50) label = 'Medium';
    return { score: Math.min(score, 100), label };
  }, [password]);

  const validateLogin = () => {
    const errs = {};
    if (!email) {
      errs.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errs.email = 'Enter a valid email';
      }
    }

    if (!password) {
      errs.password = 'Password is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateRegister = () => {
    const errs = {};
    if (!name) {
      errs.name = 'Name is required';
    }
    if (!email) {
      errs.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errs.email = 'Enter a valid email';
      }
    }
    if (!password) {
      errs.password = 'Password is required';
    }
    if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    if (!confirmPassword) {
      errs.confirmPassword = 'Confirm password is required';
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      if (rememberMe) {
        localStorage.setItem('rememberEmail', email);
      } else {
        localStorage.removeItem('rememberEmail');
      }
      if (onLogin) onLogin(email);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (validateRegister()) {
      console.log('Creating account with', { name, email, password });
      setAccounts([...accounts, { name, email, password }]);
      setErrors({});
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      alert('Account created successfully! You can now login.');
      setIsLogin(true);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="login-container">
      <aside className="auth-hero" aria-hidden="true">
        <div className="hero-inner">
          <div className="brand-badge">
            <span className="brand-logo">dB</span>
            Smart IoT
          </div>
          <h1 className="hero-title">Decibel Monitoring System</h1>
          <p className="hero-subtitle">Real‑time noise insights with campus‑grade reliability.</p>
          <div className="sound-eq" role="img" aria-label="animated sound equalizer">
            <div className="bar" style={{height: '35%'}} />
            <div className="bar" style={{height: '65%'}} />
            <div className="bar" style={{height: '45%'}} />
            <div className="bar" style={{height: '80%'}} />
            <div className="bar" style={{height: '55%'}} />
            <div className="bar" style={{height: '90%'}} />
            <div className="bar" style={{height: '60%'}} />
            <div className="bar" style={{height: '40%'}} />
          </div>
          <div className="hero-status">
            <span>System: Online</span>
            <span>Live: {dbValue} dB</span>
            <span>Load: {loadLevel}</span>
          </div>
          <div className="hero-highlights">
            <div className="highlight">Secure</div>
            <div className="highlight">Fast</div>
            <div className="highlight">Reliable</div>
          </div>
        </div>
      </aside>
      <div className="login-card">
        <h2 className="system-title">Smart IoT Decibel Monitoring System</h2>

        <div className="auth-tabs">
          <button
            className={`tab-btn ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true);
              setErrors({});
              setEmail('');
              setPassword('');
              setConfirmPassword('');
            }}
          >
            Login
          </button>
          <button
            className={`tab-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setErrors({});
              setName('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
            }}
          >
            Create Account
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={togglePassword}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="form-row">
              <label style={{display:'flex',alignItems:'center',gap:'0.5rem'}}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  aria-label="Remember me"
                />
                Remember me
              </label>
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => alert('Password reset flow is not configured.')}
                aria-label="Forgot password"
              >
                Forgot password?
              </button>
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email-register">Email</label>
              <input
                id="email-register"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password-register">Password</label>
              <div className="password-input-wrapper">
                <input
                  id="password-register"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={togglePassword}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <div className="strength-meter" aria-hidden="true">
                <div
                  className="strength-fill"
                  style={{ width: `${strength.score}%` }}
                />
              </div>
              <div className="strength-label">Strength: {strength.label}</div>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={toggleConfirmPassword}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
            <button type="submit" className="login-button">
              Create Account
            </button>
          </form>
        )}

        <div className="status-footer">
          <span>System: Online</span>
          <span>Load: {loadLevel}</span>
          <span>v1</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
