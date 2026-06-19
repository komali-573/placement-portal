import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cards = [
    { title: 'Aptitude Tests', desc: 'Practice MCQs across categories', path: '/aptitude' },
    { title: 'Coding Practice', desc: 'Solve real coding problems', path: '/coding' },
    { title: 'Resume Analyzer', desc: 'Upload and score your resume', path: '/resume' },
    { title: 'AI Interview Prep', desc: 'Practice role-based interviews', path: '/interview' }
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2>Welcome, {user?.name} 👋</h2>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </header>

      <div style={styles.grid}>
        {cards.map((card) => (
          <div
            key={card.path}
            style={styles.card}
            onClick={() => navigate(card.path)}
          >
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    background: '#f4f4f9',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  logoutBtn: {
    padding: '8px 16px',
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px'
  },
  card: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: 'transform 0.2s'
  }
};

export default Dashboard;