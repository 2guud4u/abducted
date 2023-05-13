import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const GreenBlock = ({ app }) => {
  const blockRef = useRef(new PIXI.Graphics());

  useEffect(() => {
    const block = blockRef.current;

    block.beginFill(0x00FF00); // Green color
    const size = Math.random() * 50 + 50; // random size between 50 and 100
    block.drawRect(0, 0, size, size); // draw a square
    block.endFill();

    block.y = app.screen.height - 50 - size; // position the block on the ground
    block.x = app.screen.width; // position the block at the right edge of the screen

    // Add the block to the stage
    app.stage.addChild(block);

    const moveBlock = () => {
      block.x -= 2;
      if (block.x + block.width < 0) {
        app.stage.removeChild(block);
        app.ticker.remove(moveBlock);
      }
    };

    app.ticker.add(moveBlock);

    return () => {
      app.ticker.remove(moveBlock);
      if (app.stage.children.includes(block)) {
        app.stage.removeChild(block);
      }
    };
  }, [app]);

  return null;
};

export default GreenBlock;
