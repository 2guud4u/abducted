import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function AppWrapper() {
  const [appStarted, setAppStarted] = useState(false);

  const startApp = () => {
    setAppStarted(true);
  };

  return (
    <React.StrictMode>
    <App appStarted={appStarted} />
      {!appStarted && (
        <div className="overlay">
          <h1>Welcome to My App</h1>
          <p>Click the button below to start the app:</p>
          <button onClick={startApp}>Start App</button>
        </div>
      )}
    </React.StrictMode>
  );
}

ReactDOM.render(
  <AppWrapper />,
  document.getElementById('root')
);

reportWebVitals();
