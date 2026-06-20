import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const navigate = useNavigate();
  const { login } = useAuth();

  const testimonials = [
    { quote: 'PrepMate helped me improve my coding skills and crack placements in top product based companies!', name: 'Ananya Reddy', role: 'Placed at Microsoft' },
    { quote: 'The resume analyzer is a game changer. It helped me shortlist for more interviews.', name: 'Rohit Verma', role: 'Placed at Amazon' },
    { quote: 'Mock interviews gave me confidence like never before. Highly recommended!', name: 'Sneha Patil', role: 'Placed at TCS' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const next = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[testimonialIndex];

  return (
    <div style={styles.page}>

      {/* ── LEFT PANEL ── */}
      <div style={styles.leftPanel}>

        {/* Row 1: big logo + PrepMate + STUDENT PORTAL */}
        <div style={styles.brandRow}>
          <img src={logoImg} alt="PrepMate" style={styles.brandLogo} />
          <div style={styles.brandText}>
            <div style={styles.brandName}>
              Prep<span style={styles.brandAccent}>Mate</span>
            </div>
            <div style={styles.brandSub}>STUDENT PORTAL</div>
          </div>
        </div>

        {/* Row 2: Crack Your Dream Job — full-width yellow banner */}
        <div style={styles.crackBanner}>
          🚀 <span style={styles.crackText}>Crack Your Dream Job</span>
        </div>

        {/* Row 3: Start your placement journey today */}
        <p style={styles.journeyLine}>
          🚀 <span style={styles.journeyUnderline}>Start your placement journey today</span>
        </p>

        {/* Row 4: Main headline */}
        <h2 style={styles.headline}>
          Where preparation<br />
          becomes <span style={styles.headlineAccent}>placement.</span>
        </h2>

        {/* Row 5: Description */}
        <p style={styles.desc}>
          A focused space for <strong style={styles.bold}>serious aspirants</strong> — real practice,{' '}
          <strong style={styles.bold}>AI-graded feedback</strong>, and the consistency that{' '}
          <strong style={styles.bold}>gets you placed.</strong>
        </p>

        {/* Row 6: Stats bar */}
        <div style={styles.statsBar}>
          {[
            { value: '5000+', label: 'Questions' },
            { value: '2000+', label: 'Students' },
            { value: '85%',   label: 'Success Rate' },
          ].map((s, i) => (
            <div key={i} style={{
              ...styles.statBox,
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.18)' : 'none'
            }}>
              <span style={styles.statValue}>{s.value}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Row 7: Testimonial */}
        <div style={styles.testimonialBlock}>
          <div style={styles.testimonialTop}>
            <span style={styles.testimonialTag}>💬 WHAT STUDENTS SAY</span>
            <span style={styles.testimonialCount}>{testimonialIndex + 1} / {testimonials.length}</span>
          </div>
          <p style={styles.testimonialQuote}>"{t.quote}"</p>
          <div style={styles.testimonialFooter}>
            <div style={styles.testimonialPerson}>
              <div style={styles.avatar}>{t.name[0]}</div>
              <div>
                <p style={styles.tName}>{t.name}</p>
                <p style={styles.tRole}>{t.role}</p>
              </div>
            </div>
            <div style={styles.arrowRow}>
              <button onClick={prev} style={styles.arrowBtn}>‹</button>
              <button onClick={next} style={styles.arrowBtn}>›</button>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={styles.rightPanel}>
        <div style={styles.card}>

          <h2 style={styles.cardTitle}>Welcome Back!</h2>
          <p style={styles.cardSub}>
            <span style={styles.cardSubHighlight}>Start your placement preparation</span> journey today
          </p>

          {/* Tabs */}
          <div style={styles.tabRow}>
            <div style={styles.tabActive}>Login</div>
            <Link to="/register" style={styles.tabInactive}>Register</Link>
          </div>

          {/* Social */}
          <div style={styles.socialCol}>
            <button style={styles.socialBtn}><span>🔵</span> Continue with Google</button>
            <button style={styles.socialBtn}><span>🪟</span> Continue with Microsoft</button>
            <button style={styles.socialBtn}><span>🔗</span> Continue with LinkedIn</button>
          </div>

          <div style={styles.divider}>
            <span style={styles.divLine} />
            <span style={styles.divText}>or</span>
            <span style={styles.divLine} />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Email or Phone Number</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />

            <div style={styles.pwHeader}>
              <label style={styles.label}>Password</label>
              <a href="#" style={styles.forgotLink}>Forgot Password?</a>
            </div>
            <div style={styles.pwWrap}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
              <span style={styles.eyeIcon} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>

            <label style={styles.checkLabel}>
              <input type="checkbox" style={{ marginRight: '8px' }} />
              Remember Me
            </label>

            <button type="submit" disabled={loading} style={styles.loginBtn}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p style={styles.bottomText}>
            Don't have an account?{' '}
            <Link to="/register" style={styles.bottomLink}>Register Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex', minHeight: '100vh', width: '100%',
    fontFamily: "'Inter', sans-serif"
  },

  /* ── LEFT ── */
  leftPanel: {
    flex: 1.15,
    background: 'linear-gradient(160deg, #1E1B4B 0%, #3730A3 45%, #4F46E5 100%)',
    color: '#fff',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: '40px 44px', gap: '16px'
  },

  /* Brand row */
  brandRow: {
    display: 'flex', alignItems: 'center',
    gap: '14px', width: '100%', justifyContent: 'center'
  },
  brandLogo: {
    width: '80px', height: '80px',
    filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))'
  },
  brandText: { display: 'flex', flexDirection: 'column', gap: '2px' },
  brandName: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '44px', fontWeight: 800,
    color: '#fff', lineHeight: 1, letterSpacing: '-0.02em'
  },
  brandAccent: { color: '#FFD93D' },
  brandSub: {
    fontSize: '13px', fontWeight: 700,
    letterSpacing: '0.22em', color: 'rgba(255,255,255,0.65)',
    textTransform: 'uppercase', textAlign: 'center'
  },

  /* Crack banner */
  crackBanner: {
    width: '100%', textAlign: 'center',
    borderTop: '2px solid #FFD93D',
    borderBottom: '2px solid #FFD93D',
    padding: '10px 0', boxSizing: 'border-box',
    fontSize: '18px', color: '#FFD93D'
  },
  crackText: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '20px', fontWeight: 800,
    color: '#FFD93D', letterSpacing: '0.01em'
  },

  /* Journey */
  journeyLine: {
    fontSize: '14px', color: 'rgba(255,255,255,0.85)',
    margin: 0, textAlign: 'center', fontWeight: 500
  },
  journeyUnderline: {
    fontWeight: 700, color: '#fff',
    borderBottom: '2px solid rgba(255,217,61,0.7)',
    paddingBottom: '1px'
  },

  /* Headline */
  headline: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '28px', fontWeight: 800,
    lineHeight: 1.25, margin: 0,
    color: '#fff', textAlign: 'center'
  },
  headlineAccent: { color: '#FFD93D', fontStyle: 'italic' },

  /* Desc */
  desc: {
    fontSize: '13px', color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.75, margin: 0, textAlign: 'center'
  },
  bold: { color: '#fff', fontWeight: 700 },

  /* Stats */
  statsBar: {
    display: 'flex', width: '100%',
    background: 'rgba(255,255,255,0.10)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '14px', padding: '14px 10px',
    boxSizing: 'border-box'
  },
  statBox: {
    flex: 1, display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: '4px'
  },
  statValue: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '22px', fontWeight: 800, color: '#FFD93D'
  },
  statLabel: {
    fontSize: '11px', color: 'rgba(255,255,255,0.65)', fontWeight: 600
  },

  /* Testimonial */
  testimonialBlock: {
    width: '100%',
    borderTop: '1px solid rgba(255,255,255,0.18)',
    paddingTop: '16px'
  },
  testimonialTop: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '10px'
  },
  testimonialTag: {
    fontSize: '11px', fontWeight: 700,
    letterSpacing: '0.08em', color: 'rgba(255,255,255,0.55)'
  },
  testimonialCount: { fontSize: '12px', color: 'rgba(255,255,255,0.45)' },
  testimonialQuote: {
    fontSize: '13px', color: 'rgba(255,255,255,0.90)',
    lineHeight: 1.65, fontStyle: 'italic', marginBottom: '14px'
  },
  testimonialFooter: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  },
  testimonialPerson: { display: 'flex', alignItems: 'center', gap: '10px' },
  avatar: {
    width: '34px', height: '34px', borderRadius: '50%',
    background: 'rgba(255,255,255,0.22)', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, fontSize: '13px'
  },
  tName: { fontSize: '13px', fontWeight: 700, margin: 0 },
  tRole: { fontSize: '11px', color: 'rgba(255,255,255,0.55)', margin: 0 },
  arrowRow: { display: 'flex', gap: '8px' },
  arrowBtn: {
    width: '30px', height: '30px', borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.35)',
    background: 'transparent', color: '#fff',
    cursor: 'pointer', fontSize: '18px',
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },

  /* ── RIGHT ── */
  rightPanel: {
    flex: 1, background: '#EEEEFF',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '40px 20px'
  },
  card: {
    background: '#fff', borderRadius: '24px',
    padding: '44px 40px', width: '100%', maxWidth: '480px',
    boxShadow: '0 20px 60px rgba(108,99,255,0.15)'
  },

  cardTitle: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '26px', fontWeight: 800,
    color: '#1E293B', margin: '0 0 6px', textAlign: 'center'
  },
  cardSub: {
    fontSize: '13px', color: '#94A3B8',
    textAlign: 'center', marginBottom: '22px'
  },
  cardSubHighlight: { color: '#6C63FF', fontWeight: 600 },

  tabRow: {
    display: 'flex', borderBottom: '2px solid #E7E9F3', marginBottom: '20px'
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

  socialCol: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' },
  socialBtn: {
    padding: '11px 16px', borderRadius: '10px',
    border: '1.5px solid #E7E9F3', background: '#fff',
    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
    color: '#1E293B', display: 'flex',
    alignItems: 'center', justifyContent: 'center', gap: '10px'
  },

  divider: { display: 'flex', alignItems: 'center', gap: '10px', margin: '4px 0 16px' },
  divLine: { flex: 1, height: '1px', background: '#E7E9F3' },
  divText: { fontSize: '12px', color: '#94A3B8', fontWeight: 600 },

  error: { color: '#FF6B6B', fontSize: '13px', textAlign: 'center', marginBottom: '10px' },

  label: {
    fontSize: '12px', fontWeight: 700, color: '#475569',
    marginBottom: '6px', display: 'block'
  },
  input: {
    width: '100%', padding: '12px 14px', borderRadius: '10px',
    border: '1.5px solid #E7E9F3', fontSize: '14px',
    marginBottom: '14px', background: '#FAFAFE',
    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
  },

  pwHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  forgotLink: { fontSize: '12px', color: '#6C63FF', textDecoration: 'none', fontWeight: 600 },
  pwWrap: { position: 'relative' },
  eyeIcon: { position: 'absolute', right: '14px', top: '12px', cursor: 'pointer', fontSize: '14px' },

  checkLabel: {
    fontSize: '13px', color: '#64748B',
    display: 'flex', alignItems: 'center',
    marginBottom: '18px', cursor: 'pointer'
  },

  loginBtn: {
    width: '100%', padding: '13px',
    background: 'linear-gradient(135deg, #6C63FF, #4338CA)',
    color: '#fff', border: 'none', borderRadius: '12px',
    fontSize: '15px', fontWeight: 700, cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(108,99,255,0.35)'
  },

  bottomText: { textAlign: 'center', fontSize: '13px', color: '#64748B', marginTop: '18px' },
  bottomLink: { color: '#6C63FF', fontWeight: 700, textDecoration: 'none' }
};

export default Login;