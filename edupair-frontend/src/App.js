import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import Matches from './components/Matches';

function App() {
  return (
    <Router basename="">
      <div className="App">
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/" element={<h1>EduPair Test</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;