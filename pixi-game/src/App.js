import React, { useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import Game from './Game';

const App = () => {
  const [app, setApp] = useState(null);

  useEffect(() => {
    const pixiApp = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x00000,
    });

    document.body.appendChild(pixiApp.view);

    setApp(pixiApp);

    return () => {
      pixiApp.destroy(true, true);
      setApp(null);
    };
  }, []);

  return app ? <Game app={app} /> : null;
};

export default App;
