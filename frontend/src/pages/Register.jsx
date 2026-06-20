import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.png';
import hoodieBoy from '../assets/hoodie-boy.png';

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

  return (
    <div style={styles.page}>
      <div style={styles.leftPanel}>
        <div style={styles.leftLogoRow}>
          <img src={logoImg} alt="PrepMate" style={{ width: '40px' }} />
          <span style={styles.leftLogoText}>PrepMate</span>
        </div>
        <h2 style={styles.leftTitle}>Start your placement<br />journey today 🎯</h2>
        <p style={styles.leftSubtitle}>Join 2000+ students already practicing and getting placed.</p>
        <img src={hoodieBoy} alt="Student" style={styles.leftImg} />
        <div style={styles.leftStats}>
          <div style={styles.leftStatItem}><strong>5000+</strong> Questions</div>
          <div style={styles.leftStatItem}><strong>100+</strong> Companies</div>
          <div style={styles.leftStatItem}><strong>85%</strong> Success Rate</div>
        </div>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <h2 style={styles.welcome}>Create Your Account</h2>
          <p style={styles.subtext}>Start your placement preparation journey today</p>

          <div style={styles.tabRow}>
            <Link to="/login" style={styles.tabInactive}>Login</Link>
            <div style={styles.tabActive}>Register</div>
          </div>

          <div style={styles.socialRow}>
            <button style={styles.socialBtn}>🔵 Continue with Google</button>
            <button style={styles.socialBtn}>🪟 Continue with Microsoft</button>
            <button style={styles.socialBtn}>🔗 Continue with LinkedIn</button>
          </div>

          <div style={styles.divider}>
            <span style={styles.dividerLine}></span>
            <span style={styles.dividerText}>or</span>
            <span style={styles.dividerLine}></span>
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
              className="input-field"
              style={styles.input}
            />

            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
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
                className="input-field"
                style={styles.input}
              />
              <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>

            <button type="submit" disabled={loading} style={styles.loginBtn}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <p style={styles.registerText}>
              Already have an account? <Link to="/login" style={styles.registerLink}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', width: '100%' },

  leftPanel: {
    flex: 1, background: 'linear-gradient(160deg, #1E1B4B 0%, #4338CA 55%, #6C63FF 100%)',
    color: '#fff', padding: '50px 60px', display: 'flex', flexDirection: 'column',
    justifyContent: 'center', position: 'relative', overflow: 'hidden'
  },
  leftLogoRow: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' },
  leftLogoText: { fontFamily: "'Poppins',sans-serif", fontSize: '20px', fontWeight: 700 },
  leftTitle: { fontFamily: "'Poppins',sans-serif", fontSize: '34px', fontWeight: 700, lineHeight: 1.25, margin: '0 0 14px' },
  leftSubtitle: { fontSize: '15px', color: 'rgba(255,255,255,0.75)', marginBottom: '20px', maxWidth: '380px' },
  leftImg: { width: '280px', alignSelf: 'center', margin: '10px 0 30px' },
  leftStats: { display: 'flex', gap: '28px', fontSize: '13px', color: 'rgba(255,255,255,0.85)' },
  leftStatItem: { display: 'flex', flexDirection: 'column', gap: '2px' },

  rightPanel: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: '24px' },
  card: { background: '#fff', borderRadius: '24px', padding: '40px 44px', width: '420px', boxShadow: '0 20px 50px rgba(108,99,255,0.10)' },

  welcome: { fontFamily: "'Poppins',sans-serif", fontSize: '24px', fontWeight: 700, textAlign: 'center', margin: '0 0 6px', color: '#1E293B' },
  subtext: { fontSize: '13px', color: '#64748B', textAlign: 'center', marginBottom: '24px' },

  tabRow: { display: 'flex', borderBottom: '1.5px solid #E7E9F3', marginBottom: '20px' },
  tabActive: { flex: 1, textAlign: 'center', padding: '10px 0', fontWeight: 700, fontSize: '14px', color: '#6C63FF', borderBottom: '2.5px solid #6C63FF' },
  tabInactive: { flex: 1, textAlign: 'center', padding: '10px 0', fontWeight: 600, fontSize: '14px', color: '#94A3B8', textDecoration: 'none' },

  socialRow: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' },
  socialBtn: { padding: '11px', borderRadius: '10px', border: '1.5px solid #E7E9F3', background: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer', color: '#1E293B' },

  divider: { display: 'flex', alignItems: 'center', gap: '10px', margin: '18px 0' },
  dividerLine: { flex: 1, height: '1px', background: '#E7E9F3' },
  dividerText: { fontSize: '12px', color: '#94A3B8' },

  error: { color: '#FF6B6B', fontSize: '13px', textAlign: 'center', marginBottom: '12px' },

  label: { fontSize: '13px', fontWeight: 600, color: '#1E293B', marginBottom: '6px', display: 'block' },
  input: { marginBottom: '16px' },

  passwordWrap: { position: 'relative' },
  eyeIcon: { position: 'absolute', right: '14px', top: '13px', cursor: 'pointer', fontSize: '14px' },

  loginBtn: {
    width: '100%', padding: '14px', background: 'linear-gradient(135deg,#6C63FF,#4338ca)',
    color: '#fff', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 700,
    cursor: 'pointer', boxShadow: '0 4px 16px rgba(108,99,255,0.35)', marginTop: '6px'
  },
  registerText: { textAlign: 'center', fontSize: '13px', color: '#64748B', marginTop: '18px' },
  registerLink: { color: '#6C63FF', fontWeight: 700, textDecoration: 'none' }
};

export default Register;