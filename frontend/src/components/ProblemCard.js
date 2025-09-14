import React from 'react';

function ProblemCard({ problem, completed, onToggle }) {
  return (
    <div className={`problem-card ${completed ? 'completed' : ''}`}>
      <div className="problem-header">
        <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
          {problem.difficulty}
        </span>
        <span className="topic-tag">{problem.topic}</span>
      </div>
      
      <h3>{problem.name}</h3>
      
      <div className="problem-links">
        {problem.leetcode && (
          <a href={problem.leetcode} target="_blank" rel="noopener noreferrer">
            LeetCode
          </a>
        )}
        {problem.article && (
          <a href={problem.article} target="_blank" rel="noopener noreferrer">
            Article
          </a>
        )}
        {problem.youtube && (
          <a href={problem.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
        )}
      </div>
      
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => onToggle(e.target.checked)}
        />
        <span className="checkmark"></span>
        {completed ? 'Completed' : 'Mark as Complete'}
      </label>
    </div>
  );
}

export default ProblemCard;