import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.png';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/auth/register', { name, email, password });
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: '💻', text: 'Practice 5000+ Coding Problems' },
    { icon: '🧮', text: 'Aptitude Tests with Instant Scoring' },
    { icon: '📄', text: 'AI-Powered Resume Analyzer' },
    { icon: '🎤', text: 'Mock Interviews with Feedback' },
    { icon: '🏆', text: 'Leaderboard & Progress Tracking' },
  ];

  return (
    <div style={styles.page}>

      {/* LEFT PANEL */}
      <div style={styles.leftPanel}>
        <div style={styles.leftInner}>

          {/* Brand */}
          <div style={styles.brandRow}>
            <img src={logoImg} alt="PrepMate" style={{ width: '78px' }} />
            <div>
              <div style={styles.brandName}>
                <span style={styles.brandNamePrep}>Prep</span>
                <span style={styles.brandNameMate}>Mate</span>
              </div>
              <div style={styles.brandSub}>STUDENT PORTAL</div>
            </div>
          </div>

          <p style={styles.tagline}>🚀 Crack Your Dream Job</p>

          <div style={styles.spacer} />

          <p style={styles.eyebrow}>🎯 Start your placement journey today</p>
          <h1 style={styles.leftHeadline}>
            Join thousands of students already <span style={styles.italicAccent}>getting placed.</span>
          </h1>
          <p style={styles.leftDesc}>
            A complete placement preparation portal — practice, analyze, improve and get placed in your dream company.
          </p>

          {/* Features list */}
          <div style={styles.featuresList}>
            {features.map((f, i) => (
              <div key={i} style={styles.featureItem}>
                <span style={styles.featureIcon}>{f.icon}</span>
                <span style={styles.featureText}>{f.text}</span>
              </div>
            ))}
          </div>

          <div style={styles.spacer} />

          {/* Stats */}
          <div style={styles.statsRow}>
            <div style={styles.statBox}>
              <div style={styles.statValue}>5000+</div>
              <div style={styles.statLabel}>Questions</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statValue}>2000+</div>
              <div style={styles.statLabel}>Students</div>
            </div>
            <div style={{ ...styles.statBox, borderRight: 'none' }}>
              <div style={styles.statValue}>85%</div>
              <div style={styles.statLabel}>Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={styles.rightPanel}>
        <div style={styles.card}>

          <h2 style={styles.welcome}>Create Your Account</h2>
          <p style={styles.subtext}>
            <span style={styles.subtextHighlight}>Start your placement preparation</span> journey today
          </p>

          {/* Tabs */}
          <div style={styles.tabRow}>
            <Link to="/login" style={styles.tabInactive}>Login</Link>
            <div style={styles.tabActive}>Register</div>
          </div>

          {/* Social */}
          <div style={styles.socialRow}>
            <button style={styles.socialBtn}>🔵 Continue with Google</button>
            <button style={styles.socialBtn}>🪟 Continue with Microsoft</button>
            <button style={styles.socialBtn}>🔗 Continue with LinkedIn</button>
          </div>

          <div style={styles.divider}>
            <span style={styles.dividerLine} />
            <span style={styles.dividerText}>or</span>
            <span style={styles.dividerLine} />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />

            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrap}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                style={styles.input}
              />
              <span style={styles.eyeIcon}
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>

            <button type="submit" disabled={loading} style={styles.registerBtn}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p style={styles.loginText}>
            Already have an account?{' '}
            <Link to="/login" style={styles.loginLink}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh', display: 'flex',
    width: '100%', fontFamily: "'Inter', sans-serif"
  },

  leftPanel: {
    flex: 1.1,
    background: 'linear-gradient(150deg, #4338CA 0%, #6C63FF 50%, #8B7CFF 100%)',
    color: '#fff', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    padding: '50px 40px'
  },
  leftInner: { width: '100%', maxWidth: '620px' },

  brandRow: {
    display: 'flex', alignItems: 'center',
    gap: '16px', marginBottom: '8px'
  },
  brandName: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '46px', fontWeight: 800, lineHeight: 1
  },
  brandNamePrep: { color: '#fff' },
  brandNameMate: { color: '#FF9F43' },
  brandSub: {
    fontSize: '13px', letterSpacing: '0.15em',
    color: 'rgba(255,255,255,0.75)',
    fontWeight: 600, marginTop: '6px'
  },

  tagline: {
    fontSize: '16px', fontWeight: 700,
    color: '#FFD93D', margin: '16px 0 0'
  },

  spacer: { height: '28px' },

  eyebrow: {
    fontSize: '14px', fontWeight: 700,
    color: 'rgba(255,255,255,0.9)', margin: '0 0 10px'
  },
  leftHeadline: {
    fontFamily: "'Poppins', serif",
    fontSize: '34px', fontWeight: 600,
    lineHeight: 1.3, margin: '0 0 16px'
  },
  italicAccent: {
    fontStyle: 'italic', color: '#FFD93D', fontWeight: 700
  },
  leftDesc: {
    fontSize: '15px', color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.7, marginBottom: '24px'
  },

  featuresList: {
    display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '8px'
  },
  featureItem: {
    display: 'flex', alignItems: 'center', gap: '12px'
  },
  featureIcon: {
    width: '36px', height: '36px', borderRadius: '10px',
    background: 'rgba(255,255,255,0.15)',
    display: 'flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '18px',
    flexShrink: 0
  },
  featureText: {
    fontSize: '14px', color: 'rgba(255,255,255,0.90)',
    fontWeight: 500
  },

  statsRow: {
    display: 'flex', gap: '12px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '14px', padding: '20px 14px',
    border: '1px solid rgba(255,255,255,0.15)'
  },
  statBox: {
    flex: 1, textAlign: 'center',
    borderRight: '1px solid rgba(255,255,255,0.2)'
  },
  statValue: {
    fontSize: '22px', fontWeight: 800,
    color: '#FFD93D', fontFamily: "'Poppins', sans-serif"
  },
  statLabel: {
    fontSize: '12px', color: 'rgba(255,255,255,0.75)', marginTop: '2px'
  },

  rightPanel: {
    flex: 1, display: 'flex', alignItems: 'center',
    justifyContent: 'center', background: '#F1F2FA', padding: '40px'
  },
  card: {
    width: '100%', maxWidth: '540px',
    background: '#fff', borderRadius: '20px',
    padding: '40px 48px',
    boxShadow: '0 20px 50px rgba(108,99,255,0.15)'
  },

  welcome: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '26px', fontWeight: 700,
    margin: '0 0 6px', color: '#1E293B', textAlign: 'center'
  },
  subtext: {
    fontSize: '14px', color: '#64748B',
    marginBottom: '24px', textAlign: 'center'
  },
  subtextHighlight: { color: '#6C63FF', fontWeight: 700 },

  tabRow: {
    display: 'flex', borderBottom: '2px solid #E7E9F3', marginBottom: '22px'
  },
  tabActive: {
    flex: 1, textAlign: 'center', padding: '10px 0',
    fontWeight: 700, fontSize: '14px', color: '#6C63FF',
    borderBottom: '2.5px solid #6C63FF', marginBottom: '-2px'
  },
  tabInactive: {
    flex: 1, textAlign: 'center', padding: '10px 0',
    fontWeight: 600, fontSize: '14px',
    color: '#94A3B8', textDecoration: 'none'
  },

  socialRow: {
    display: 'flex', flexDirection: 'column',
    gap: '10px', marginBottom: '4px'
  },
  socialBtn: {
    padding: '12px', borderRadius: '8px',
    border: '1.5px solid #E7E9F3', background: '#fff',
    fontSize: '13px', fontWeight: 600,
    cursor: 'pointer', color: '#1E293B'
  },

  divider: {
    display: 'flex', alignItems: 'center',
    gap: '10px', margin: '20px 0'
  },
  dividerLine: { flex: 1, height: '1px', background: '#E7E9F3' },
  dividerText: { fontSize: '12px', color: '#94A3B8' },

  error: {
    color: '#FF6B6B', fontSize: '13px', marginBottom: '12px'
  },

  label: {
    fontSize: '13px', fontWeight: 600,
    color: '#1E293B', marginBottom: '6px', display: 'block'
  },
  input: {
    width: '100%', padding: '12px 16px',
    borderRadius: '8px', border: '1.5px solid #E7E9F3',
    fontSize: '14px', marginBottom: '16px',
    background: '#fff', fontFamily: 'inherit',
    boxSizing: 'border-box'
  },

  passwordWrap: { position: 'relative' },
  eyeIcon: {
    position: 'absolute', right: '14px', top: '12px',
    cursor: 'pointer', fontSize: '14px'
  },

  registerBtn: {
    width: '100%', padding: '14px',
    background: 'linear-gradient(135deg,#6C63FF,#4338ca)',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontSize: '15px', fontWeight: 700, cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(108,99,255,0.35)',
    marginTop: '4px'
  },

  loginText: {
    textAlign: 'center', fontSize: '13px',
    color: '#64748B', marginTop: '18px'
  },
  loginLink: {
    color: '#6C63FF', fontWeight: 700, textDecoration: 'none'
  }
};

export default Register;