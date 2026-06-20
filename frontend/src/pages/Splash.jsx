import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';

function Splash() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 1;
      });
    }, 100);

    const timer = setTimeout(() => navigate('/home'), 10000);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [navigate]);

  return (
    <div style={styles.container}>
      <img src={logoImg} alt="PrepMate" style={styles.logo} />

      <h1 style={styles.appName}>
        <span style={styles.prepText}>Prep</span>
        <span style={styles.mateText}>Mate</span>
      </h1>

      <p style={styles.tagline}>✨ Crack Your Dream Job ✨</p>

      <div style={styles.stepsRow}>
        {[
          { icon: '📘', label: 'Learn' },
          { icon: '✏️', label: 'Practice' },
          { icon: '📈', label: 'Improve' },
          { icon: '🎯', label: 'Get Placed' }
        ].map((step, i) => (
          <div key={i} style={styles.step}>
            <div style={styles.stepDot}>
              <span style={styles.stepIcon}>{step.icon}</span>
            </div>
            <span style={styles.stepLabel}>{step.label}</span>
          </div>
        ))}
      </div>

      <p style={styles.loadingText}>Preparing your success journey...</p>
      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>
      <p style={styles.progressPercent}>{progress}%</p>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(160deg, #1E1B4B 0%, #4338CA 55%, #6C63FF 100%)',
    color: '#fff',
    textAlign: 'center',
    padding: '24px'
  },
  logo: {
    width: '220px',
    marginBottom: '20px',
    filter: 'drop-shadow(0 8px 24px rgba(108,99,255,0.5))'
  },
  appName: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: '56px',
    fontWeight: 800,
    margin: '0 0 10px',
    letterSpacing: '-0.02em',
    lineHeight: 1
  },
  prepText: {
    color: '#fff'
  },
  mateText: {
    background: 'linear-gradient(90deg, #FFD93D, #FF9F43)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  tagline: {
    fontSize: '18px',
    fontWeight: 700,
    margin: '0 0 44px',
    background: 'linear-gradient(90deg, #a5b4fc, #ffffff, #a5b4fc)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '0.04em'
  },
  stepsRow: {
    display: 'flex',
    gap: '40px',
    marginBottom: '50px'
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px'
  },
  stepDot: {
    width: '68px',
    height: '68px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.13)',
    border: '2px solid rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
  },
  stepIcon: {
    fontSize: '28px'
  },
  stepLabel: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.85)',
    fontWeight: 700,
    letterSpacing: '0.02em'
  },
  loadingText: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '14px',
    fontWeight: 500
  },
  progressTrack: {
    width: '300px',
    height: '8px',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '10px',
    overflow: 'hidden',
    marginBottom: '12px'
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #FFD93D, #FF9F43)',
    borderRadius: '10px',
    transition: 'width 0.06s linear',
    boxShadow: '0 0 10px rgba(255,159,67,0.6)'
  },
  progressPercent: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
    fontWeight: 700,
    margin: 0
  }
};

export default Splash;