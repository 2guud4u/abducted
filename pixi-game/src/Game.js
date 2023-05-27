import React, { useEffect, useState, useRef } from 'react';
import Character from './Entities/character';
import GreenBlock from './Entities/alien';
import Asteroid from './Entities/asteroid';
import ShrinkingRope from './Entities/rope'; // Import the ShrinkingRope component
import Cops, {spawnCop} from './Entities/cops'; // Import the Cops component
import * as PIXI from 'pixi.js';

const Game = ({ app, appStarted }) => {
  const [blockRefs, setBlockRefs] = useState([]); // State for block refs
  const [blocks, setBlocks] = useState([]); // State for block components
  const [bullets, setBullets] = useState([]); // State for bullets
  const [asteroids, setAsteroids] = useState([]); // State for asteroids
  const [cops, setCops] = useState([]); // State for cops
  const [charIndex, setCharIndex] = useState(0); // State for character index
  const [score, setScore] = useState(0); // State for score
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
    console.log(score);
    // Create new blocks periodically and randomly
    const createBlock = () => {
      setBlocks(blocks => [
        ...blocks,
        <GreenBlock key={blocks.length} app={app} appStarted={appStarted} ref={ref => setBlockRefs(blockRefs => [...blockRefs, ref])} charIndex={charIndex} setScore={setScore}/>
      ]);

      // Schedule the creation of the next block
      setTimeout(createBlock, Math.random() * 2000 + 1000); // random interval between 1 and 3 seconds
    };

      // Create new asteroids periodically and randomly
    const createAsteroid = () => {
      setAsteroids(asteroids => [
       ...asteroids,
        <Asteroid key={asteroids.length} app={app} appStarted={appStarted}/>
      ]);
    
       // Schedule the creation of the next asteroid
      setTimeout(createAsteroid, Math.random() * 2000 + 1000); // random interval between 1 and 3 seconds
    };
    
    const createCop = () => {
      setCops(cops => [
       ...cops,
        <Cops  app={app} charIndex={charIndex}/>
      ]);
    
       // Schedule the creation of the next asteroid
      setTimeout(createCop, Math.random() * 2000 + 1000); // random interval between 1 and 3 seconds
    }; 
    if (appStarted) {
      createBlock();
      createAsteroid();
      createCop();
    }

    console.log( "charIndex:", charIndex);
  }, [app, charIndex, appStarted]);

  // const handleGreenBlockCollision = () => {
  //   setShowShrinkingRope(true);
  // };

  const addBullet = (bulletRef) => {
    setBullets(bullets => [...bullets, bulletRef]);
  };

  const removeBullet = (bulletRef) => {
    setBullets(bullets => bullets.filter(ref => ref !== bulletRef));
  };

  return (
    <>
      <Character app={app} addBullet={addBullet} removeBullet={removeBullet} blocks={blockRefs} setCharIndex={setCharIndex} appStarted={appStarted}/>

      {/* <Cops app={app} charIndex={charIndex}/>  */}
      {cops}
      {blocks}
      {asteroids}
      
    </>
  );
};

export default Game;