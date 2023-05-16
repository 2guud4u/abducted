import { useEffect, useRef, forwardRef } from 'react';
import * as PIXI from 'pixi.js';
import {alienTexture, characterTexture} from './textures';
const GreenBlock = forwardRef(({ app , charIndex, setScore}, ref) => {
  const blockRef = useRef(null);

  useEffect(() => {
    const blockSprite = new PIXI.Sprite(alienTexture);
    blockSprite.width = 50;
    blockSprite.height = 50;
    //blockSprite = 'alien'; 
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
      for (let i = 0; i < app.stage.children.length; i++) {
        const sprite = app.stage.children[i];
        // Check if the sprite is a bullet and if it collides with the asteroid
        if (sprite.texture === characterTexture && sprite !==  blockSprite&& sprite.getBounds().intersects(blockSprite.getBounds())) {
          setScore(score => score + 1);
          
          app.stage.removeChild(blockSprite); // Remove asteroid
          app.ticker.remove(moveBlock); // Stop moving the asteroid
          break;
        }
      }
    };
    
    app.ticker.add(moveBlock);

    return () => {
      app.ticker.remove(moveBlock);
      if (app.stage.children.includes(blockSprite)) {
        app.stage.removeChild(blockSprite);
      }
    };
  }, [app, ref, charIndex]);

  return null;
});

export default GreenBlock;
