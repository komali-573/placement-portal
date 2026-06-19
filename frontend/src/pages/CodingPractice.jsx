import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function CodingPractice() {
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [submitMessage, setSubmitMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await API.get('/problems');
      setProblems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openProblem = (problem) => {
    setSelectedProblem(problem);
    setCode('');
    setSubmitMessage('');
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post('/problems/submit', {
        problemId: selectedProblem._id,
        code,
        language
      });
      setSubmitMessage(res.data.message);
    } catch (err) {
      setSubmitMessage('Submission failed. Try again.');
    }
  };

  if (loading) return <p style={{ padding: '2rem' }}>Loading problems...</p>;

  // Problem detail / code editor view
  if (selectedProblem) {
    return (
      <div style={styles.container}>
        <button onClick={() => setSelectedProblem(null)} style={styles.backBtn}>← Back to Problem List</button>

        <h2>{selectedProblem.title}</h2>
        <span style={styles.difficultyBadge}>{selectedProblem.difficulty}</span>

        <p style={styles.description}>{selectedProblem.description}</p>

        <div style={styles.sampleBox}>
          <p><strong>Sample Input:</strong> {selectedProblem.sampleInput}</p>
          <p><strong>Sample Output:</strong> {selectedProblem.sampleOutput}</p>
        </div>

       <select value={language} onChange={(e) => setLanguage(e.target.value)} style={styles.select}>
  <option value="javascript">JavaScript</option>
  <option value="python">Python</option>
  <option value="java">Java</option>
  <option value="cpp">C++</option>
  <option value="c">C</option>
</select>

        <textarea
          placeholder="Write your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={styles.codeBox}
        />

        <button onClick={handleSubmit} style={styles.submitBtn}>Submit Solution</button>

        {submitMessage && <p style={styles.message}>{submitMessage}</p>}
      </div>
    );
  }

  // Problem list view
  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Back to Dashboard</button>
      <h2>Coding Practice</h2>

      <div style={styles.list}>
        {problems.map((p) => (
          <div key={p._id} style={styles.problemCard} onClick={() => openProblem(p)}>
            <h3>{p.title}</h3>
            <span style={styles.difficultyBadge}>{p.difficulty}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '700px',
    margin: '0 auto'
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#4f46e5',
    cursor: 'pointer',
    marginBottom: '1rem',
    fontSize: '14px'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  problemCard: {
    background: '#fff',
    padding: '1rem 1.2rem',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 1px 5px rgba(0,0,0,0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  difficultyBadge: {
    background: '#e0e7ff',
    color: '#4f46e5',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  description: {
    margin: '1rem 0',
    lineHeight: '1.6'
  },
  sampleBox: {
    background: '#fff',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '14px'
  },
  select: {
    padding: '8px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  },
  codeBox: {
    width: '100%',
    minHeight: '200px',
    fontFamily: 'monospace',
    fontSize: '14px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '10px'
  },
  submitBtn: {
    padding: '10px 20px',
    background: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  message: {
    marginTop: '10px',
    color: '#16a34a',
    fontWeight: '500'
  }
};

export default CodingPractice;