import { useEffect, useRef, forwardRef } from 'react';
import * as PIXI from 'pixi.js';

const GreenBlock = forwardRef(({ app }, ref) => {
  const blockRef = useRef(null);

  useEffect(() => {
    const blockTexture = PIXI.Texture.from('https://raw.githubusercontent.com/2guud4u/abducted/newBranch/pixi-game/src/Entities/skins/happyAlien.png');
    const blockSprite = new PIXI.Sprite(blockTexture);
    blockSprite.width = 50;
    blockSprite.height = 50;

    blockRef.current = blockSprite;
    if (ref) {
      ref.current = blockSprite;
    }

    blockSprite.y = app.screen.height - 45 - blockSprite.height;
    blockSprite.x = app.screen.width;

    app.stage.addChild(blockSprite);

    const moveBlock = () => {
      blockSprite.x -= 3;
      if (blockSprite.x + blockSprite.width < 0) {
        app.stage.removeChild(blockSprite);
        app.ticker.remove(moveBlock);
      }
    };

    app.ticker.add(moveBlock);

    return () => {
      app.ticker.remove(moveBlock);
      if (app.stage.children.includes(blockSprite)) {
        app.stage.removeChild(blockSprite);
      }
    };
  }, [app, ref]);

  return null;
});

export default GreenBlock;
