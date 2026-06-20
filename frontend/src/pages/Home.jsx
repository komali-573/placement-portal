import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import hoodieBoy from '../assets/hoodie-boy.png';

function Home() {
  const features = [
    { icon: '💻', title: 'Coding Practice', desc: 'Practice DSA, CP and improve problem solving skills', color: '#EEF2FF' },
    { icon: '➕', title: 'Aptitude Practice', desc: 'Quant, Reasoning and Verbal Ability all in one place', color: '#E3FBF6' },
    { icon: '📄', title: 'Resume Analyzer', desc: 'Get AI-powered feedback and improve your resume instantly', color: '#FFEDED' },
    { icon: '🎤', title: 'Mock Interviews', desc: 'AI-based interviews with instant feedback and improvement tips', color: '#EEF2FF' },
    { icon: '📈', title: 'Progress Tracking', desc: 'Track your progress with detailed analytics and insights', color: '#FFF8DD' },
    { icon: '🏆', title: 'Leaderboard', desc: 'Compete and rank among top performers across the platform', color: '#FFF3E6' }
  ];

  const testimonials = [
    { name: 'Ananya Reddy', role: 'Placed at Microsoft', quote: 'PrepMate helped me improve my coding skills and crack placements in top product based companies!', stars: 5 },
    { name: 'Rohit Verma', role: 'Placed at Amazon', quote: 'The resume analyzer is a game changer. It helped me shortlist for more interviews.', stars: 5 },
    { name: 'Sneha Patil', role: 'Placed at TCS', quote: 'Mock interviews gave me confidence like never before. Highly recommended!', stars: 5 },
    { name: 'Vikram Singh', role: 'Placed at Infosys', quote: 'The daily challenges and streaks kept me consistent throughout my preparation.', stars: 5 },
    { name: 'Kavya Sharma', role: 'Placed at Deloitte', quote: 'Best platform for complete placement preparation. Everything in one place!', stars: 5 }
  ];

  const stats = [
    { icon: '📚', value: '5000+', label: 'Questions' },
    { icon: '🏢', value: '100+', label: 'Top Companies' },
    { icon: '🎓', value: '2000+', label: 'Happy Students' },
    { icon: '✅', value: '85%', label: 'Success Rate' }
  ];

  const footerLinks = {
    Platform: ['Coding Practice', 'Aptitude Practice', 'Resume Analyzer', 'Mock Interviews', 'Progress Tracking', 'Leaderboard'],
    Company: ['About Us', 'Careers', 'Contact Us', 'Privacy Policy', 'Terms of Service'],
    Resources: ['Blog', 'Placement Roadmap', 'Interview Experiences', 'Study Materials', 'FAQs']
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#1E293B', background: '#fff' }}>

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.navLeft}>
          <img src={logoImg} alt="PrepMate" style={{ width: '36px' }} />
          <span style={styles.navLogo}>PrepMate</span>
        </div>
        <div style={styles.navCenter}>
          {['Home', 'Features', 'Roadmap', 'Companies', 'Success Stories', 'Pricing'].map(item => (
            <a key={item} href="#" style={styles.navLink}>{item}</a>
          ))}
        </div>
        <div style={styles.navRight}>
          <Link to="/login" style={styles.loginBtn}>Login</Link>
          <Link to="/register" style={styles.registerBtn}>Register</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <span style={styles.heroTag}>🎯 Your Placement Partner 🎉</span>
          <h1 style={styles.heroTitle}>
            Crack Your<br />
            <span style={styles.heroTitlePurple}>Dream Job</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Practice Coding, Aptitude, Resume Analysis,<br />
            Mock Interviews and Track Your Progress<br />
            — All in One Place!
          </p>
          <div style={styles.heroButtons}>
            <Link to="/register" style={styles.btnPrimary}>Get Started — It's Free →</Link>
            <Link to="/login" style={styles.btnOutline}>▷ Explore Features</Link>
          </div>
          <div style={styles.socialProof}>
            <div style={styles.avatarRow}>
              {['A', 'R', 'S', 'V'].map((l, i) => (
                <div key={i} style={{ ...styles.avatar, marginLeft: i > 0 ? '-8px' : 0, background: ['#6C63FF','#FF6B6B','#00C9A7','#FF9F43'][i] }}>{l}</div>
              ))}
            </div>
            <span style={styles.socialText}>Join 2000+ students already preparing and placed in top companies! 🚀</span>
          </div>
        </div>

        <div style={styles.heroRight}>
          <div style={styles.heroImgWrap}>
            <img src={hoodieBoy} alt="Student" style={styles.heroImg} />
            <div style={{ ...styles.floatCard, top: '8%', left: '-5%' }}>
              <p style={styles.floatLabel}>📊 Practice</p>
              <p style={styles.floatBig}>4.9 hrs</p>
              <p style={styles.floatSub}>This Week</p>
            </div>
            <div style={{ ...styles.floatCard, top: '8%', right: '-5%' }}>
              <p style={styles.floatLabel}>🔥 Current Streak</p>
              <p style={styles.floatBig}>15 Days</p>
              <p style={styles.floatSub}>Keep Going! 🔥</p>
            </div>
            <div style={{ ...styles.floatCard, bottom: '18%', left: '-8%' }}>
              <p style={styles.floatLabel}>📈 Placement Score</p>
              <p style={styles.floatBig}>78%</p>
              <p style={styles.floatSub}>Keep it up!</p>
            </div>
            <div style={{ ...styles.floatCard, bottom: '18%', right: '-5%' }}>
              <p style={styles.floatLabel}>🏢 Target Company</p>
              <p style={styles.floatBig}>TCS</p>
              <p style={styles.floatSub}>Dream Big! 💙</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={styles.statsSection}>
        {stats.map((s, i) => (
          <div key={i} style={styles.statItem}>
            <span style={styles.statIcon}>{s.icon}</span>
            <div>
              <div style={styles.statValue}>{s.value}</div>
              <div style={styles.statLabel}>{s.label}</div>
            </div>
            {i < stats.length - 1 && <div style={styles.statDivider} />}
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <section style={styles.featuresSection}>
        <span style={styles.sectionTag}>⚡ Everything You Need</span>
        <h2 style={styles.sectionTitle}>All-in-One Placement Preparation Platform</h2>
        <p style={styles.sectionSub}>From practice to placement — We've got you covered!</p>

        <div style={styles.featureGrid}>
          {features.map((f, i) => (
            <div key={i} style={styles.featureCard}>
              <div style={{ ...styles.featureIconBox, background: f.color }}>
                <span style={{ fontSize: '22px' }}>{f.icon}</span>
              </div>
              <h3 style={styles.featureTitle}>{f.title}</h3>
              <p style={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER */}
      <section style={styles.banner}>
        <div style={styles.bannerInner}>
          <span style={{ fontSize: '28px' }}>🎯</span>
          <div>
            <p style={styles.bannerTitle}>
              "The Distance Between Your Dreams and Reality Is Called <span style={{ color: '#FFD93D' }}>Action.</span> Start Today!"
            </p>
            <p style={styles.bannerSub}>Learn • Practice • Improve • Get Placed</p>
          </div>
          <span style={{ fontSize: '28px' }}>🏆</span>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={styles.testimonialsSection}>
        <span style={styles.sectionTag}>💬 Student Voices</span>
        <h2 style={styles.sectionTitle}>Loved by Thousands of Students</h2>
        <p style={styles.sectionSub}>See what our students have to say about their journey with PrepMate</p>

        <div style={styles.testimonialGrid}>
          {testimonials.map((t, i) => (
            <div key={i} style={styles.testimonialCard}>
              <div style={styles.quoteIcon}>"</div>
              <p style={styles.testimonialText}>{t.quote}</p>
              <div style={styles.stars}>{'⭐'.repeat(t.stars)}</div>
              <div style={styles.testimonialFooter}>
                <div style={{ ...styles.avatar, background: ['#6C63FF','#FF6B6B','#00C9A7','#FF9F43','#6C63FF'][i] }}>
                  {t.name[0]}
                </div>
                <div>
                  <p style={styles.testimonialName}>{t.name}</p>
                  <p style={styles.testimonialRole}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={styles.ctaSection}>
        <span style={{ fontSize: '48px' }}>🎓</span>
        <h2 style={styles.ctaTitle}>Ready to Start Your Placement Journey?</h2>
        <p style={styles.ctaSub}>Join thousands of students who are already achieving their dreams.</p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/register" style={styles.ctaBtnWhite}>Register Now</Link>
          <Link to="/login" style={styles.ctaBtnOutline}>Login</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div style={styles.footerBrand}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <img src={logoImg} alt="PrepMate" style={{ width: '32px' }} />
              <span style={styles.footerLogo}>PrepMate</span>
            </div>
            <p style={styles.footerBrandDesc}>Your all-in-one platform for placement preparation. Practice, learn and get placed in your dream company.</p>
            <div style={styles.socialIcons}>
              {['📸', '💼', '🐦', '▶️'].map((icon, i) => (
                <span key={i} style={styles.socialIcon}>{icon}</span>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} style={styles.footerCol}>
              <h4 style={styles.footerColTitle}>{section}</h4>
              {links.map(link => (
                <a key={link} href="#" style={styles.footerLink}>{link}</a>
              ))}
            </div>
          ))}

          <div style={styles.footerCol}>
            <h4 style={styles.footerColTitle}>Stay Updated</h4>
            <p style={styles.footerBrandDesc}>Subscribe to get the latest updates and placement tips.</p>
            <div style={styles.subscribeRow}>
              <input placeholder="Enter your email" style={styles.subscribeInput} />
              <button style={styles.subscribeBtn}>Subscribe</button>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={{ margin: 0 }}>© 2024 PrepMate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '12px 56px', background: '#fff',
    borderBottom: '1px solid #e7e9f3', position: 'sticky', top: 0, zIndex: 100,
    boxShadow: '0 2px 10px rgba(108,99,255,0.06)'
  },
  navLeft: { display: 'flex', alignItems: 'center', gap: '10px' },
  navLogo: { fontFamily: "'Poppins',sans-serif", fontSize: '20px', fontWeight: 700, color: '#1E293B' },
  navCenter: { display: 'flex', gap: '28px' },
  navLink: { color: '#64748B', textDecoration: 'none', fontSize: '14px', fontWeight: 500 },
  navRight: { display: 'flex', gap: '12px', alignItems: 'center' },
  loginBtn: {
    padding: '9px 22px', border: '1.5px solid #E7E9F3', borderRadius: '10px',
    color: '#1E293B', textDecoration: 'none', fontSize: '14px', fontWeight: 600, background: '#fff'
  },
  registerBtn: {
    padding: '9px 22px', background: 'linear-gradient(135deg,#6C63FF,#4338ca)',
    borderRadius: '10px', color: '#fff', textDecoration: 'none', fontSize: '14px', fontWeight: 600
  },

 hero: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '40px 80px 30px', maxWidth: '1650px', margin: '0 auto', gap: '60px'
  },
  heroLeft: { flex: 1, maxWidth: '600px' },
  heroTag: {
    display: 'inline-block', background: '#EEF2FF', color: '#6C63FF',
    padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 700, marginBottom: '16px'
  },
  heroTitle: {
    fontFamily: "'Poppins',sans-serif", fontSize: '58px', fontWeight: 800,
    lineHeight: 1.1, margin: '0 0 14px', color: '#1E293B'
  },
  heroTitlePurple: { color: '#6C63FF' },
  heroSubtitle: { fontSize: '17px', color: '#64748B', lineHeight: 1.65, margin: '0 0 22px' },
  heroButtons: { display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '22px' },
  btnPrimary: {
    padding: '15px 28px', background: 'linear-gradient(135deg,#6C63FF,#4338ca)',
    color: '#fff', borderRadius: '12px', textDecoration: 'none',
    fontSize: '16px', fontWeight: 700, boxShadow: '0 4px 16px rgba(108,99,255,0.35)'
  },
  btnOutline: {
    padding: '15px 28px', border: '1.5px solid #E7E9F3',
    color: '#1E293B', borderRadius: '12px', textDecoration: 'none',
    fontSize: '16px', fontWeight: 600, background: '#fff'
  },
  socialProof: { display: 'flex', alignItems: 'center', gap: '12px' },
  avatarRow: { display: 'flex' },
  avatar: {
    width: '32px', height: '32px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#fff', fontSize: '12px', fontWeight: 700, border: '2px solid #fff'
  },
  socialText: { fontSize: '13px', color: '#64748B', lineHeight: 1.5 },

 heroRight: { flex: 1, display: 'flex', justifyContent: 'center' },
  heroImgWrap: { position: 'relative', width: '480px' },
  heroImg: { width: '100%', display: 'block' },
  floatCard: {
    position: 'absolute', background: '#fff', padding: '10px 14px',
    borderRadius: '14px', boxShadow: '0 8px 24px rgba(108,99,255,0.15)',
    minWidth: '125px', border: '1px solid #E7E9F3'
  },
  floatLabel: { fontSize: '11px', color: '#94A3B8', margin: '0 0 2px', fontWeight: 600 },
  floatBig: { fontSize: '19px', fontWeight: 800, color: '#1E293B', margin: '0 0 2px', fontFamily: "'Poppins',sans-serif" },
  floatSub: { fontSize: '11px', color: '#94A3B8', margin: 0 },

  statsSection: {
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    background: '#fff', maxWidth: '900px', margin: '10px auto 40px',
    padding: '22px 40px', borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(108,99,255,0.10)', border: '1px solid #E7E9F3'
  },
  statItem: { display: 'flex', alignItems: 'center', gap: '14px', flex: 1, justifyContent: 'center', position: 'relative' },
  statIcon: { fontSize: '26px' },
  statValue: { fontSize: '21px', fontWeight: 800, color: '#1E293B', fontFamily: "'Poppins',sans-serif" },
  statLabel: { fontSize: '12px', color: '#94A3B8', marginTop: '2px' },
  statDivider: { position: 'absolute', right: 0, top: '10%', height: '80%', width: '1px', background: '#E7E9F3' },

  featuresSection: { padding: '10px 56px 50px', maxWidth: '1650px', margin: '0 auto', textAlign: 'center' },
  sectionTag: {
    display: 'inline-block', background: '#EEF2FF', color: '#6C63FF',
    padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, marginBottom: '10px'
  },
  // ✅ FIXED: Much darker and bolder title color
  sectionTitle: {
    fontFamily: "'Poppins',sans-serif", fontSize: '28px', fontWeight: 800,
    margin: '0 0 8px', color: '#0F172A'
  },
  // ✅ FIXED: Darker subtitle color
  sectionSub: { fontSize: '15px', color: '#334155', marginBottom: '32px', fontWeight: 500 },
  featureGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'left' },
  featureCard: {
    background: '#fff', padding: '24px', borderRadius: '18px',
    border: '1px solid #E7E9F3', boxShadow: '0 2px 8px rgba(108,99,255,0.06)'
  },
  featureIconBox: {
    width: '50px', height: '50px', borderRadius: '14px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px'
  },
  featureTitle: { fontSize: '15px', fontWeight: 700, margin: '0 0 6px', fontFamily: "'Poppins',sans-serif", color: '#0F172A' },
  featureDesc: { fontSize: '13px', color: '#64748B', lineHeight: 1.6, margin: 0 },

  banner: {
    background: 'linear-gradient(135deg,#6C63FF,#4338ca)',
    margin: '0 56px 50px', borderRadius: '22px', padding: '36px 48px'
  },
  bannerInner: { display: 'flex', alignItems: 'center', gap: '24px', justifyContent: 'center' },
  bannerTitle: { fontSize: '19px', fontWeight: 700, color: '#fff', margin: '0 0 8px', textAlign: 'center' },
  bannerSub: { fontSize: '14px', color: 'rgba(255,255,255,0.85)', margin: 0, textAlign: 'center' },

  testimonialsSection: { padding: '0 56px 60px', maxWidth: '1650px', margin: '0 auto', textAlign: 'center' },
  testimonialGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', textAlign: 'left', marginTop: '30px' },
  testimonialCard: {
    background: '#fff', padding: '22px', borderRadius: '18px',
    border: '1px solid #E7E9F3', boxShadow: '0 2px 8px rgba(108,99,255,0.06)'
  },
  quoteIcon: { fontSize: '30px', color: '#EEF2FF', fontFamily: 'serif', lineHeight: 1, marginBottom: '-6px' },
  testimonialText: { fontSize: '13px', color: '#475569', lineHeight: 1.65, marginBottom: '10px' },
  stars: { fontSize: '12px', marginBottom: '12px' },
  testimonialFooter: { display: 'flex', alignItems: 'center', gap: '10px' },
  testimonialName: { fontSize: '13px', fontWeight: 700, margin: 0, color: '#0F172A' },
  testimonialRole: { fontSize: '11px', color: '#94A3B8', margin: 0 },

  ctaSection: {
    textAlign: 'center', padding: '56px 24px',
    background: 'linear-gradient(135deg,#6C63FF,#4338ca)'
  },
  ctaTitle: { fontFamily: "'Poppins',sans-serif", fontSize: '26px', fontWeight: 700, color: '#fff', margin: '12px 0 8px' },
  ctaSub: { fontSize: '15px', color: 'rgba(255,255,255,0.85)', marginBottom: '24px' },
  ctaBtnWhite: {
    padding: '12px 30px', background: '#fff', color: '#6C63FF',
    borderRadius: '12px', textDecoration: 'none', fontSize: '15px', fontWeight: 700
  },
  ctaBtnOutline: {
    padding: '12px 30px', border: '2px solid rgba(255,255,255,0.5)',
    color: '#fff', borderRadius: '12px', textDecoration: 'none', fontSize: '15px', fontWeight: 600
  },

  footer: { background: '#1E293B', color: '#fff' },
  footerTop: { display: 'flex', gap: '40px', padding: '44px 56px 32px', flexWrap: 'wrap' },
  footerBrand: { flex: 2, minWidth: '200px' },
  footerLogo: { fontFamily: "'Poppins',sans-serif", fontSize: '18px', fontWeight: 700 },
  footerBrandDesc: { fontSize: '13px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '14px' },
  socialIcons: { display: 'flex', gap: '10px' },
  socialIcon: {
    width: '34px', height: '34px', background: 'rgba(255,255,255,0.1)',
    borderRadius: '8px', display: 'inline-flex', alignItems: 'center',
    justifyContent: 'center', fontSize: '15px', cursor: 'pointer'
  },
  footerCol: { flex: 1, minWidth: '140px', display: 'flex', flexDirection: 'column', gap: '9px' },
  footerColTitle: { fontSize: '14px', fontWeight: 700, color: '#fff', margin: '0 0 4px' },
  footerLink: { fontSize: '13px', color: '#94A3B8', textDecoration: 'none' },
  subscribeRow: { display: 'flex', gap: '8px', marginTop: '8px' },
  subscribeInput: {
    flex: 1, padding: '10px 14px', borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)',
    color: '#fff', fontSize: '13px'
  },
  subscribeBtn: {
    padding: '10px 14px', background: '#6C63FF', color: '#fff',
    border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 600
  },
  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    padding: '18px 56px', fontSize: '13px', color: '#64748B', textAlign: 'center'
  }
};

export default Home;