import React, { useEffect, useState } from 'react';
import Character from './Entities/character';
import GreenBlock from './Entities/alien';
import * as PIXI from 'pixi.js';

const Game = ({ app }) => {
  const [blocks, setBlocks] = useState([]);

//     console.log("hii")
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
  }, [app]);

  return (
    <>
      <Character app={app} />
      {blocks}
    </>
  );
};

export default Game;
