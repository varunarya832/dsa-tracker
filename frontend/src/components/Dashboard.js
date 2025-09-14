import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import ProblemCard from './ProblemCard';
import { dsaProblems } from '../data/dsaProblems';

function Dashboard({ token, username, onLogout }) {
  const [progress, setProgress] = useState({});
  const [selectedTopic, setSelectedTopic] = useState('All');

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await axios.get('https://backend-psi-black-59.vercel.app/api/progress', {
        headers: { 'x-auth-token': token }
      });
      
      const progressMap = {};
      response.data.forEach(item => {
        progressMap[item.problemId] = item;
      });
      setProgress(progressMap);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const updateProgress = async (problemId, completed) => {
    try {
      await axios.post(
        `https://backend-psi-black-59.vercel.app/api/progress/${problemId}`,
        { completed },
        { headers: { 'x-auth-token': token } }
      );
      
      setProgress(prev => ({
        ...prev,
        [problemId]: { ...prev[problemId], completed }
      }));
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const topics = ['All', ...Object.keys(dsaProblems)];
  const filteredProblems = selectedTopic === 'All' 
    ? Object.entries(dsaProblems).flatMap(([topic, problems]) => 
        problems.map(p => ({ ...p, topic })))
    : dsaProblems[selectedTopic].map(p => ({ ...p, topic: selectedTopic }));

  const completedCount = Object.values(progress).filter(p => p.completed).length;
  const totalCount = Object.values(dsaProblems).flat().length;

  return (
    <div className="dashboard">
      <Navbar 
        username={username} 
        onLogout={onLogout}
        completedCount={completedCount}
        totalCount={totalCount}
      />
      
      <div className="container">
        <div className="topic-filter">
          {topics.map(topic => (
            <button
              key={topic}
              className={selectedTopic === topic ? 'active' : ''}
              onClick={() => setSelectedTopic(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
        
        <div className="problems-grid">
          {filteredProblems.map(problem => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              completed={progress[problem.id]?.completed || false}
              onToggle={(completed) => updateProgress(problem.id, completed)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;