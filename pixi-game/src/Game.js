import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const Game = () => {
  const pixiContainerRef = useRef(null);

  useEffect(() => {
    // Create a new PixiJS application
    const app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x000000,
      view: pixiContainerRef.current,
    });

    // Add the app view to the container
    pixiContainerRef.current.appendChild(app.view);

    // Load assets and create game elements here

    return () => {
      // Clean up resources when the component is unmounted
      app.destroy();
    };
  }, []);

  return <div ref={pixiContainerRef}></div>;
};

export default Game;
