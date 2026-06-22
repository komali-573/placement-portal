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

  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[testimonialIndex];

  return (
    <div style={styles.page}>
      <div style={styles.leftPanel}>
        <div style={styles.leftInner}>
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
            Where preparation becomes <span style={styles.italicAccent}>placement.</span>
          </h1>
          <p style={styles.leftDesc}>
            A focused space for serious aspirants — real practice, AI-graded feedback, and the consistency that gets you placed.
          </p>

          <div style={styles.statsRow}>
            <div style={styles.statBox}>
              <div style={styles.statValue}>5000+</div>
              <div style={styles.statLabel}>Questions</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statValue}>2000+</div>
              <div style={styles.statLabel}>Students</div>
            </div>
            <div style={styles.statBox}>
              <div style={styles.statValue}>85%</div>
              <div style={styles.statLabel}>Success Rate</div>
            </div>
          </div>

          <div style={styles.spacer} />

          <div style={styles.testimonialBlock}>
            <div style={styles.testimonialHeader}>
              <span style={styles.testimonialLabel}>💬 WHAT STUDENTS SAY</span>
              <span style={styles.testimonialCount}>{testimonialIndex + 1} / {testimonials.length}</span>
            </div>
            <p style={styles.testimonialQuote}>"{t.quote}"</p>
            <div style={styles.testimonialFooterRow}>
              <div style={styles.testimonialPerson}>
                <div style={styles.testimonialAvatar}>{t.name[0]}</div>
                <div>
                  <p style={styles.testimonialName}>{t.name}</p>
                  <p style={styles.testimonialRole}>{t.role}</p>
                </div>
              </div>
              <div style={styles.arrowRow}>
                <button onClick={prevTestimonial} style={styles.arrowBtn}>‹</button>
                <button onClick={nextTestimonial} style={styles.arrowBtn}>›</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <h2 style={styles.welcome}>Welcome Back!</h2>
          <p style={styles.subtext}>
            <span style={{ color: '#6C63FF', fontWeight: 700 }}>Start your placement preparation</span> journey today
          </p>

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
            <label style={styles.label}>Email or Phone Number</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />

            <div style={styles.passwordHeaderRow}>
              <label style={styles.label}>Password</label>
              <a href="#" style={styles.forgotLink}>Forgot Password?</a>
            </div>
            <div style={styles.passwordWrap}>
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

            <label style={styles.checkboxLabel}>
              <input type="checkbox" /> Remember Me
            </label>

            <button type="submit" disabled={loading} style={styles.loginBtn}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p style={styles.registerText}>
            Don't have an account? <Link to="/register" style={styles.registerLink}>Register Now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', display: 'flex', width: '100%', fontFamily: "'Inter', sans-serif" },

  leftPanel: {
    flex: 1.1, background: 'linear-gradient(150deg, #4338CA 0%, #6C63FF 50%, #8B7CFF 100%)',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '50px 40px'
  },
  leftInner: { width: '100%', maxWidth: '620px' },

  brandRow: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' },
  brandName: { fontFamily: "'Poppins', sans-serif", fontSize: '46px', fontWeight: 800, lineHeight: 1 },
  brandNamePrep: { color: '#fff' },
  brandNameMate: { color: '#FF9F43' },
  brandSub: { fontSize: '13px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.75)', fontWeight: 600, marginTop: '6px' },
  tagline: { fontSize: '16px', fontWeight: 700, color: '#FFD93D', margin: '16px 0 0' },

  spacer: { height: '36px' },

  eyebrow: { fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.9)', margin: '0 0 10px' },
  leftHeadline: { fontFamily: "'Poppins', serif", fontSize: '38px', fontWeight: 600, lineHeight: 1.3, margin: '0 0 18px' },
  italicAccent: { fontStyle: 'italic', color: '#FFD93D', fontWeight: 700 },
  leftDesc: { fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '26px' },

  statsRow: {
    display: 'flex', gap: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '14px',
    padding: '20px 14px', border: '1px solid rgba(255,255,255,0.15)'
  },
  statBox: { flex: 1, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.2)' },
  statValue: { fontSize: '22px', fontWeight: 800, color: '#FFD93D', fontFamily: "'Poppins', sans-serif" },
  statLabel: { fontSize: '12px', color: 'rgba(255,255,255,0.75)', marginTop: '2px' },

  testimonialBlock: { borderTop: '1px solid rgba(255,255,255,0.25)', paddingTop: '22px' },
  testimonialHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '14px' },
  testimonialLabel: { fontSize: '12px', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.75)', fontWeight: 700 },
  testimonialCount: { fontSize: '13px', color: 'rgba(255,255,255,0.65)' },
  testimonialQuote: { fontSize: '15px', color: '#fff', lineHeight: 1.6, marginBottom: '16px', fontStyle: 'italic' },
  testimonialFooterRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  testimonialPerson: { display: 'flex', alignItems: 'center', gap: '10px' },
  testimonialAvatar: { width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' },
  testimonialName: { fontSize: '14px', fontWeight: 600, margin: 0 },
  testimonialRole: { fontSize: '12px', color: 'rgba(255,255,255,0.65)', margin: 0 },
  arrowRow: { display: 'flex', gap: '8px' },
  arrowBtn: { width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.4)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: '16px' },

  rightPanel: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1F2FA', padding: '40px' },
 card: {
    width: '100%', maxWidth: '540px', background: '#fff', borderRadius: '20px',
    padding: '44px 48px', boxShadow: '0 20px 50px rgba(108,99,255,0.15)'
  },

  welcome: { fontFamily: "'Poppins', sans-serif", fontSize: '26px', fontWeight: 700, margin: '0 0 6px', color: '#1E293B', textAlign: 'center' },
  subtext: { fontSize: '14px', color: '#64748B', marginBottom: '24px', textAlign: 'center' },

  socialRow: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '4px' },
  socialBtn: { padding: '12px', borderRadius: '8px', border: '1.5px solid #E7E9F3', background: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer', color: '#1E293B' },

  divider: { display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' },
  dividerLine: { flex: 1, height: '1px', background: '#E7E9F3' },
  dividerText: { fontSize: '12px', color: '#94A3B8' },

  error: { color: '#FF6B6B', fontSize: '13px', marginBottom: '12px' },

  label: { fontSize: '13px', fontWeight: 600, color: '#1E293B', marginBottom: '6px', display: 'block' },
  input: {
    width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1.5px solid #E7E9F3',
    fontSize: '14px', marginBottom: '16px', background: '#fff', fontFamily: 'inherit'
  },

  passwordHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
  forgotLink: { fontSize: '13px', color: '#6C63FF', textDecoration: 'none', fontWeight: 600 },
  passwordWrap: { position: 'relative' },
  eyeIcon: { position: 'absolute', right: '14px', top: '12px', cursor: 'pointer', fontSize: '14px' },

  checkboxLabel: { fontSize: '13px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' },

  loginBtn: {
    width: '100%', padding: '14px', background: 'linear-gradient(135deg,#6C63FF,#4338ca)', color: '#fff', border: 'none',
    borderRadius: '8px', fontSize: '15px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(108,99,255,0.35)'
  },

  registerText: { textAlign: 'center', fontSize: '13px', color: '#64748B', marginTop: '18px' },
  registerLink: { color: '#6C63FF', fontWeight: 700, textDecoration: 'none' }
};

export default Login;