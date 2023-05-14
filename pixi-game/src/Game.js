import React, { useEffect, useState } from 'react';
import Character from './Entities/character';
import GreenBlock from './Entities/alien';
import Asteroid from './Entities/asteroid';
import * as PIXI from 'pixi.js';

const Game = ({ app }) => {
  const [blocks, setBlocks] = useState([]);
  const [bullets, setBullets] = useState([]); // State for bullets
  const [asteroids, setAsteroids] = useState([]); // State for asteroids

  let sprite = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/bunny.png');
  app.stage.addChild(sprite);

  useEffect(() => {
    // Create the ground
    const ground = new PIXI.Graphics();
    ground.beginFill(0x008000); // green color
    ground.drawRect(0, app.screen.height - 50, app.screen.width, 50); // draw a rectangle
    ground.endFill();

    // Add the ground to the stage
    app.stage.addChild(ground);

    // Create new blocks periodically and randomly
    const createBlock = () => {
      setBlocks(blocks => [
        ...blocks,
        <GreenBlock key={blocks.length} app={app} />
      ]);

      // Schedule the creation of the next block
      setTimeout(createBlock, Math.random() * 2000 + 1000); // random interval between 1 and 3 seconds
    };

    createBlock();

    // Create new asteroids periodically and randomly
    const createAsteroid = () => {
      setAsteroids(asteroids => [
        ...asteroids,
        <Asteroid key={asteroids.length} app={app} />
      ]);

      // Schedule the creation of the next asteroid
      setTimeout(createAsteroid, Math.random() * 2000 + 1000); // random interval between 1 and 3 seconds
    };

    createAsteroid();
  }, [app]);

  const addBullet = (bulletRef) => {
    setBullets(bullets => [...bullets, bulletRef]);
  };

  const removeBullet = (bulletRef) => {
    setBullets(bullets => bullets.filter(ref => ref !== bulletRef));
  };

  return (
    <>
      <Character app={app} addBullet={addBullet} removeBullet={removeBullet} />
      {blocks}
      {asteroids} 
    </>
  );
};

export default Game;
