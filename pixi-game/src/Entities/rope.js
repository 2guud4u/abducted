import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import GreenBlock from './alien';

const Rope = ({ app, character, blocks, ropeStage, setRopeStage }) => {
  const ropeRef = useRef(null);
  const [ropeLength, setRopeLength] = useState(0);
  const [grabbed, setGrabbed] = useState(false);
  const ropeTexture = PIXI.Texture.from('https://raw.githubusercontent.com/2guud4u/abducted/4f211bf5d7b3baf2af18806f062e8572d53ef87f/pixi-game/src/Entities/skins/asteroid.png');
  const alienTexture = PIXI.Texture.from('https://raw.githubusercontent.com/2guud4u/abducted/newBranch/pixi-game/src/Entities/skins/happyAlien.png'); 
  useEffect(() => {
    if (ropeRef.current) {
      app.stage.removeChild(ropeRef.current);
    }

    const rope = new PIXI.Sprite(ropeTexture);
    ropeRef.current = rope;

    rope.x = character.x + 100;
    rope.y = character.y + 100;
    rope.height = 0;
    app.stage.addChild(rope);

    const updateRope = () => {
      ropeRef.current.x = character.x + 50;
      ropeRef.current.y = character.y + 40;

      if (ropeStage === 'growing') {
        ropeRef.current.height = ropeLength;
        setRopeLength(ropeLength + 1);

        if (ropeLength >= 200) { // Maximum length of rope
          setRopeStage('maximum');
          // Additional customization for rope image when it reaches maximum length
          // For example, you can change the tint color of the rope
          ropeRef.current.tint = 0xffff00; // Set the tint color to yellow
        }
      } else if (ropeStage === 'maximum') {
        setRopeStage('shrinking');
      } else if (ropeStage === 'shrinking') {
        ropeRef.current.height = ropeLength;
        setRopeLength(ropeLength - 1);

        if (ropeLength <= 0) { // Rope fully retracted
          setRopeStage('finished');
          ropeRef.current.tint = 0x0000ff; // Set the tint color back to blue
        }
      }
      for (let i = 0; i < app.stage.children.length; i++) {
        const sprite = app.stage.children[i];
        // Check if the sprite is a alien and if it collides with the asteroid
        if ( sprite.texture === alienTexture &&   sprite !== rope && sprite.getBounds().intersects(rope.getBounds())) {
          sprite.x = ropeRef.current.x;
          sprite.y = ropeRef.current.height + ropeRef.current.y-10;
          //app.stage.removeChild(sprite); // Remove bullet
          
          break;
        }
      }
    };

    app.ticker.add(updateRope);

    return () => {
      app.ticker.remove(updateRope);
      if (ropeStage === 'finished') {
        app.stage.removeChild(ropeRef.current);
      }
    };
  }, [app, character, ropeLength, ropeStage]);

  return null;
};

export default Rope;
