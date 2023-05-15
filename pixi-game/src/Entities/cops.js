import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const Cops = ({ app }) => {
  const copsRef = useRef([]);

  useEffect(() => {
    const moveCop = (cop) => {
      cop.x += 2; // Adjust the speed of cop movement
    };

    const removeCop = (cop) => {
      if (cop.x >= app.screen.width + cop.width / 2) {
        app.ticker.remove(() => moveCop(cop));
        app.ticker.remove(() => removeCop(cop));
        app.stage.removeChild(cop);
        copsRef.current = copsRef.current.filter((ref) => ref !== cop);
      }
    };

    const spawnCop = () => {
      const copTexture = PIXI.Texture.from('https://raw.githubusercontent.com/2guud4u/abducted/newBranch/pixi-game/src/Entities/skins/alienCop.png');
      const cop = new PIXI.Sprite(copTexture);
      cop.anchor.set(0.5); // Set the anchor point to the middle of the sprite
      cop.x = -cop.width / 2; // Spawn outside of the left screen
      do{
        cop.y = Math.random() * app.screen.height; // Random y-coordinate
        }while(cop.y > 500 );
      app.stage.addChild(cop);

      copsRef.current.push(cop);

      app.ticker.add(() => moveCop(cop));
      app.ticker.add(() => removeCop(cop));

      // Schedule the creation of the next cop
      setTimeout(spawnCop, Math.random() * 2000 + 90000); // random interval between 1 and 3 seconds
    };

    spawnCop();

    return () => {
      copsRef.current.forEach((cop) => {
        app.ticker.remove(() => moveCop(cop));
        app.ticker.remove(() => removeCop(cop));
        app.stage.removeChild(cop);
      });
      copsRef.current = [];
    };
  }, [app]);

  return null;
};

export default Cops;