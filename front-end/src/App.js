import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  const componentContext = require.context('./components', true, /\.js$/);
  const componentModules = componentContext.keys().map(componentContext);
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          {componentModules.map((ComponentModule, index) => {
          const Component = ComponentModule.default;
          if (!Component) return null;
          const componentName = Component.name || `Component${index + 1}`;
          const path = `/${componentName.toLowerCase()}`;
          return <Route key={path} path={path} element={<Component />} />;
        })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
