import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* 다른 라우트 추가 가능 */}
        <Route path="/" element={<div>메인 페이지</div>} />
      </Routes>
    </Router>
  );
}

export default App;