import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function AptitudeTest() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await API.get('/questions');
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (questionId, optionIndex) => {
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const handleSubmit = async () => {
    const formattedAnswers = Object.keys(answers).map((qid) => ({
      questionId: qid,
      selectedAnswer: answers[qid]
    }));

    try {
      const res = await API.post('/questions/submit', { answers: formattedAnswers });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p style={{ padding: '2rem' }}>Loading questions...</p>;

  if (result) {
    return (
      <div style={styles.container}>
        <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Back to Dashboard</button>
        <h2>Test Results</h2>
        <div style={styles.resultCard}>
          <h1>{result.percentage}%</h1>
          <p>Score: {result.score} / {result.total}</p>
        </div>
        {result.results.map((r, i) => (
          <div key={i} style={{ ...styles.reviewCard, borderLeft: r.isCorrect ? '5px solid #22c55e' : '5px solid #ef4444' }}>
            <p>{r.isCorrect ? '✅ Correct' : '❌ Wrong'}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>← Back to Dashboard</button>
      <h2>Aptitude Test</h2>

      {questions.map((q, index) => (
        <div key={q._id} style={styles.questionCard}>
          <p style={styles.questionText}>{index + 1}. {q.question}</p>
          <div style={styles.options}>
            {q.options.map((opt, i) => (
              <label key={i} style={styles.optionLabel}>
                <input
                  type="radio"
                  name={q._id}
                  checked={answers[q._id] === i}
                  onChange={() => selectAnswer(q._id, i)}
                />
                {' '}{opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button onClick={handleSubmit} style={styles.submitBtn}>Submit Test</button>
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
  questionCard: {
    background: '#fff',
    padding: '1.2rem',
    borderRadius: '10px',
    marginBottom: '1rem',
    boxShadow: '0 1px 5px rgba(0,0,0,0.08)'
  },
  questionText: {
    fontWeight: '600',
    marginBottom: '10px'
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  optionLabel: {
    cursor: 'pointer'
  },
  submitBtn: {
    padding: '12px 24px',
    background: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '15px',
    marginTop: '1rem'
  },
  resultCard: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    textAlign: 'center',
    marginBottom: '1.5rem'
  },
  reviewCard: {
    background: '#fff',
    padding: '10px 16px',
    borderRadius: '6px',
    marginBottom: '8px'
  }
};

export default AptitudeTest;