import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import logoImg from '../assets/logo.png';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadialBarChart, RadialBar
} from 'recharts';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [resumes, setResumes] = useState([]);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    API.get('/resume/my-resumes').then(r => setResumes(r.data)).catch(() => {});
    API.get('/interview/my-interviews').then(r => setInterviews(r.data)).catch(() => {});
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  const navItems = [
    { icon: '🏠', label: 'Dashboard' },
    { icon: '💻', label: 'Coding Practice' },
    { icon: '🧮', label: 'Aptitude Tests' },
    { icon: '📄', label: 'Resume Analyzer' },
    { icon: '🎤', label: 'Mock Interview' },
    { icon: '🏆', label: 'Leaderboard' },
    { icon: '📈', label: 'Performance' },
  ];

  const navRoutes = {
    'Coding Practice': '/coding',
    'Aptitude Tests': '/aptitude',
    'Resume Analyzer': '/resume',
    'Mock Interview': '/interview',
  };

  const progressData = [
    { day: 'Mon', score: 45 },
    { day: 'Tue', score: 60 },
    { day: 'Wed', score: 55 },
    { day: 'Thu', score: 75 },
    { day: 'Fri', score: 70 },
    { day: 'Sat', score: 85 },
    { day: 'Sun', score: 90 },
  ];

  const radialData = [
    { name: 'Aptitude', value: 82, fill: '#6C63FF' },
    { name: 'Coding', value: 65, fill: '#00C9A7' },
    { name: 'Interview', value: 74, fill: '#FFD93D' },
    { name: 'Resume', value: resumes.length > 0 ? resumes[0].score : 70, fill: '#FF6B6B' },
  ];

  const statsCards = [
    { icon: '📊', label: 'Aptitude Score', value: '82%', sub: '+5% this week', color: '#EEF2FF', iconBg: '#6C63FF' },
    { icon: '💻', label: 'Problems Solved', value: '24', sub: '3 today', color: '#E3FBF6', iconBg: '#00C9A7' },
    { icon: '🔥', label: 'Current Streak', value: '7 Days', sub: 'Keep it up!', color: '#FFF8DD', iconBg: '#FFD93D' },
    { icon: '🎤', label: 'Interviews Done', value: `${interviews.length}`, sub: 'Mock sessions', color: '#FFEDED', iconBg: '#FF6B6B' },
  ];

  const leaderboard = [
    { rank: 1, name: 'Arjun Sharma', score: 980, badge: '🥇' },
    { rank: 2, name: 'Priya Nair', score: 945, badge: '🥈' },
    { rank: 3, name: 'Rohit Kumar', score: 912, badge: '🥉' },
    { rank: 4, name: user?.name || 'You', score: 876, badge: '4️⃣', isYou: true },
    { rank: 5, name: 'Sneha Reddy', score: 841, badge: '5️⃣' },
  ];

  const activities = [
    { icon: '✅', text: 'Completed Aptitude Test', sub: 'Score: 83% • 2 hours ago', color: '#E3FBF6' },
    { icon: '💻', text: 'Solved "Two Sum"', sub: 'JavaScript • 4 hours ago', color: '#EEF2FF' },
    { icon: '📄', text: 'Resume Analyzed', sub: `Score: ${resumes[0]?.score || 95}/100 • Yesterday`, color: '#FFF8DD' },
    { icon: '🎤', text: 'Mock Interview Done', sub: 'Frontend Developer • Yesterday', color: '#FFEDED' },
  ];

  return (
    <div style={styles.shell}>

      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.sidebarLogo}>
          <img src={logoImg} alt="PrepMate" style={{ width: '34px' }} />
          <span style={styles.sidebarLogoText}>PrepMate</span>
        </div>

        <nav style={styles.sidebarNav}>
          {navItems.map(item => (
            <div
              key={item.label}
              style={{ ...styles.navItem, ...(activeNav === item.label ? styles.navItemActive : {}) }}
              onClick={() => {
                setActiveNav(item.label);
                if (navRoutes[item.label]) navigate(navRoutes[item.label]);
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span style={styles.navLabel}>{item.label}</span>
              {activeNav === item.label && <div style={styles.navActiveDot} />}
            </div>
          ))}
        </nav>

        <div style={styles.sidebarBottom}>
          <div style={styles.sidebarUser}>
            <div style={styles.userAvatar}>{user?.name?.[0] || 'U'}</div>
            <div>
              <p style={styles.userName}>{user?.name}</p>
              <p style={styles.userRole}>Student</p>
            </div>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>⬅ Logout</button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>

        {/* TOPBAR */}
        <div style={styles.topbar}>
          <div>
            <h2 style={styles.pageTitle}>Dashboard</h2>
            <p style={styles.pageSubtitle}>Welcome back, <strong>{user?.name}</strong>! Ready to practice today? 🚀</p>
          </div>
          <div style={styles.topbarRight}>
            <div style={styles.streakBadge}>🔥 7 Day Streak</div>
            <div style={styles.xpBadge}>⭐ 876 XP</div>
            <div style={styles.notifBtn}>🔔</div>
          </div>
        </div>

        {/* STATS ROW */}
        <div style={styles.statsRow}>
          {statsCards.map((s, i) => (
            <div key={i} style={{ ...styles.statCard, background: s.color }}>
              <div style={{ ...styles.statIconBox, background: s.iconBg }}>
                <span style={{ fontSize: '20px' }}>{s.icon}</span>
              </div>
              <div>
                <p style={styles.statLabel}>{s.label}</p>
                <p style={styles.statValue}>{s.value}</p>
                <p style={styles.statSub}>{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CHARTS ROW */}
        <div style={styles.chartsRow}>

          {/* AREA CHART */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <div>
                <h3 style={styles.chartTitle}>Weekly Progress</h3>
                <p style={styles.chartSub}>Your score trend this week</p>
              </div>
              <span style={styles.chartBadge}>↑ 12% vs last week</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E7E9F3' }} />
                <Area type="monotone" dataKey="score" stroke="#6C63FF" strokeWidth={2.5} fill="url(#scoreGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* RADIAL CHART */}
          <div style={styles.chartCard}>
            <div style={styles.chartHeader}>
              <div>
                <h3 style={styles.chartTitle}>Skill Breakdown</h3>
                <p style={styles.chartSub}>Performance by module</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart innerRadius="30%" outerRadius="90%" data={radialData} startAngle={180} endAngle={0}>
                <RadialBar dataKey="value" cornerRadius={6} />
                <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #E7E9F3' }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div style={styles.radialLegend}>
              {radialData.map((d, i) => (
                <div key={i} style={styles.legendItem}>
                  <div style={{ ...styles.legendDot, background: d.fill }} />
                  <span style={styles.legendLabel}>{d.name}</span>
                  <span style={styles.legendValue}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM ROW */}
        <div style={styles.bottomRow}>

          {/* LEADERBOARD */}
          <div style={styles.leaderCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>🏆 Leaderboard</h3>
              <span style={styles.chartBadge}>This Week</span>
            </div>
            {leaderboard.map((l, i) => (
              <div key={i} style={{ ...styles.leaderRow, ...(l.isYou ? styles.leaderRowYou : {}) }}>
                <span style={styles.leaderBadge}>{l.badge}</span>
                <div style={styles.leaderAvatar}>{l.name[0]}</div>
                <span style={styles.leaderName}>{l.name}{l.isYou ? ' (You)' : ''}</span>
                <span style={styles.leaderScore}>{l.score} XP</span>
              </div>
            ))}
          </div>

          {/* RECENT ACTIVITY */}
          <div style={styles.activityCard}>
            <div style={styles.chartHeader}>
              <h3 style={styles.chartTitle}>⚡ Recent Activity</h3>
              <span style={styles.chartBadge}>Today</span>
            </div>
            {activities.map((a, i) => (
              <div key={i} style={styles.activityRow}>
                <div style={{ ...styles.activityIcon, background: a.color }}>{a.icon}</div>
                <div>
                  <p style={styles.activityText}>{a.text}</p>
                  <p style={styles.activitySub}>{a.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* QUICK ACTIONS */}
          <div style={styles.quickCard}>
            <h3 style={styles.chartTitle}>🚀 Quick Actions</h3>
            <div style={styles.quickGrid}>
              {[
                { icon: '💻', label: 'Start Coding', route: '/coding', color: '#EEF2FF' },
                { icon: '🧮', label: 'Take Test', route: '/aptitude', color: '#E3FBF6' },
                { icon: '📄', label: 'Analyze Resume', route: '/resume', color: '#FFF8DD' },
                { icon: '🎤', label: 'Mock Interview', route: '/interview', color: '#FFEDED' },
              ].map((q, i) => (
                <div key={i} style={{ ...styles.quickBtn, background: q.color }}
                  onClick={() => navigate(q.route)}>
                  <span style={{ fontSize: '24px' }}>{q.icon}</span>
                  <span style={styles.quickLabel}>{q.label}</span>
                </div>
              ))}
            </div>

            <div style={styles.motivationBox}>
              <p style={styles.motivationText}>
                💡 "Success is the sum of small efforts repeated day in and day out."
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  shell: { display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: "'Inter', sans-serif" },

  sidebar: {
    width: '240px', background: '#1E1B4B', display: 'flex',
    flexDirection: 'column', padding: '24px 0', position: 'fixed',
    top: 0, left: 0, height: '100vh', zIndex: 50
  },
  sidebarLogo: { display: 'flex', alignItems: 'center', gap: '10px', padding: '0 24px 28px' },
  sidebarLogoText: { fontFamily: "'Poppins',sans-serif", fontSize: '18px', fontWeight: 700, color: '#fff' },

  sidebarNav: { flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 12px' },
  navItem: {
    display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px',
    borderRadius: '10px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)',
    fontSize: '14px', fontWeight: 500, position: 'relative', transition: 'all 0.15s'
  },
  navItemActive: { background: 'rgba(108,99,255,0.25)', color: '#fff', fontWeight: 700 },
  navIcon: { fontSize: '18px', width: '22px', textAlign: 'center' },
  navLabel: { flex: 1 },
  navActiveDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#6C63FF' },

  sidebarBottom: { padding: '16px 16px 0' },
  sidebarUser: {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '12px', background: 'rgba(255,255,255,0.06)',
    borderRadius: '10px', marginBottom: '10px'
  },
  userAvatar: {
    width: '36px', height: '36px', borderRadius: '50%',
    background: '#6C63FF', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, fontSize: '15px'
  },
  userName: { fontSize: '13px', fontWeight: 700, color: '#fff', margin: 0 },
  userRole: { fontSize: '11px', color: 'rgba(255,255,255,0.5)', margin: 0 },
  logoutBtn: {
    width: '100%', padding: '10px', background: 'rgba(255,107,107,0.15)',
    color: '#FF6B6B', border: 'none', borderRadius: '8px',
    cursor: 'pointer', fontSize: '13px', fontWeight: 600
  },

  main: { marginLeft: '240px', flex: 1, padding: '28px 32px', minHeight: '100vh' },

  topbar: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
    marginBottom: '24px'
  },
  pageTitle: { fontFamily: "'Poppins',sans-serif", fontSize: '24px', fontWeight: 700, margin: '0 0 4px', color: '#1E293B' },
  pageSubtitle: { fontSize: '14px', color: '#64748B', margin: 0 },
  topbarRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  streakBadge: {
    background: '#FFF8DD', color: '#B8860B', padding: '8px 16px',
    borderRadius: '20px', fontSize: '13px', fontWeight: 700
  },
  xpBadge: {
    background: '#EEF2FF', color: '#6C63FF', padding: '8px 16px',
    borderRadius: '20px', fontSize: '13px', fontWeight: 700
  },
  notifBtn: {
    width: '38px', height: '38px', background: '#fff', border: '1px solid #E7E9F3',
    borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', fontSize: '16px'
  },

  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' },
  statCard: {
    padding: '20px', borderRadius: '16px', display: 'flex',
    alignItems: 'center', gap: '14px', border: '1px solid rgba(0,0,0,0.04)'
  },
  statIconBox: {
    width: '48px', height: '48px', borderRadius: '12px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
  },
  statLabel: { fontSize: '12px', color: '#64748B', margin: '0 0 4px', fontWeight: 600 },
  statValue: { fontSize: '22px', fontWeight: 800, color: '#1E293B', margin: '0 0 2px', fontFamily: "'Poppins',sans-serif" },
  statSub: { fontSize: '11px', color: '#94A3B8', margin: 0 },

  chartsRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' },
  chartCard: {
    background: '#fff', borderRadius: '18px', padding: '22px',
    border: '1px solid #E7E9F3', boxShadow: '0 2px 8px rgba(108,99,255,0.05)'
  },
  chartHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' },
  chartTitle: { fontFamily: "'Poppins',sans-serif", fontSize: '15px', fontWeight: 700, margin: '0 0 4px', color: '#1E293B' },
  chartSub: { fontSize: '12px', color: '#94A3B8', margin: 0 },
  chartBadge: {
    background: '#E3FBF6', color: '#0A8A72', padding: '4px 12px',
    borderRadius: '20px', fontSize: '12px', fontWeight: 700
  },

  radialLegend: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' },
  legendItem: { display: 'flex', alignItems: 'center', gap: '8px' },
  legendDot: { width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0 },
  legendLabel: { fontSize: '12px', color: '#64748B', flex: 1 },
  legendValue: { fontSize: '12px', fontWeight: 700, color: '#1E293B' },

  bottomRow: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' },

  leaderCard: {
    background: '#fff', borderRadius: '18px', padding: '22px',
    border: '1px solid #E7E9F3', boxShadow: '0 2px 8px rgba(108,99,255,0.05)'
  },
  leaderRow: {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '10px 12px', borderRadius: '10px', marginBottom: '6px'
  },
  leaderRowYou: { background: '#EEF2FF' },
  leaderBadge: { fontSize: '16px', width: '24px', textAlign: 'center' },
  leaderAvatar: {
    width: '30px', height: '30px', borderRadius: '50%', background: '#6C63FF',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '12px', fontWeight: 700, flexShrink: 0
  },
  leaderName: { flex: 1, fontSize: '13px', fontWeight: 600, color: '#1E293B' },
  leaderScore: { fontSize: '12px', fontWeight: 700, color: '#6C63FF' },

  activityCard: {
    background: '#fff', borderRadius: '18px', padding: '22px',
    border: '1px solid #E7E9F3', boxShadow: '0 2px 8px rgba(108,99,255,0.05)'
  },
  activityRow: { display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' },
  activityIcon: {
    width: '36px', height: '36px', borderRadius: '10px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '16px', flexShrink: 0
  },
  activityText: { fontSize: '13px', fontWeight: 600, color: '#1E293B', margin: '0 0 2px' },
  activitySub: { fontSize: '11px', color: '#94A3B8', margin: 0 },

  quickCard: {
    background: '#fff', borderRadius: '18px', padding: '22px',
    border: '1px solid #E7E9F3', boxShadow: '0 2px 8px rgba(108,99,255,0.05)'
  },
  quickGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '16px 0' },
  quickBtn: {
    padding: '16px 12px', borderRadius: '12px', cursor: 'pointer',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
    border: '1px solid rgba(0,0,0,0.04)', transition: 'transform 0.15s'
  },
  quickLabel: { fontSize: '12px', fontWeight: 700, color: '#1E293B', textAlign: 'center' },

  motivationBox: {
    background: 'linear-gradient(135deg,#6C63FF,#4338ca)',
    borderRadius: '12px', padding: '16px'
  },
  motivationText: { fontSize: '12px', color: '#fff', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }
};

export default Dashboard;