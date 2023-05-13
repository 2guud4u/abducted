import React, { useEffect, useRef } from 'react';
import Character from './Entities/character';
import * as PIXI from 'pixi.js';

const Game = ({ app }) => {
  const blocksRef = useRef([]);

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
      const block = new PIXI.Graphics();
      block.beginFill(0x0000ff); // blue color
      const size = Math.random() * 50 + 50; // random size between 50 and 100
      block.drawRect(0, 0, size, size); // draw a square
      block.endFill();

      block.y = app.screen.height - 50 - size; // position the block on the ground
      block.x = app.screen.width; // position the block at the right edge of the screen

      // Add the block to the stage and the blocks array
      app.stage.addChild(block);
      blocksRef.current.push(block);

      // Schedule the creation of the next block
      setTimeout(createBlock, Math.random() * 2000 + 1000); // random interval between 1 and 3 seconds
    };

    createBlock();
  }, [app]);

  useEffect(() => {
    // Continuously move the blocks to the left and destroy the blocks when they move off the screen
    app.ticker.add(() => {
      blocksRef.current.forEach((block, i) => {
        block.x -= 2;
        if (block.x + block.width < 0) {
          app.stage.removeChild(block);
          blocksRef.current.splice(i, 1);
        }
      });
    });
  }, [app]);

  return <Character app={app} />;
};

export default Game;
