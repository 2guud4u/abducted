import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import Bullet from './bullet';
import Rope from './rope';

const Character = ({ app }) => {
  const characterRef = useRef(null);
  const [keysPressed, setKeysPressed] = useState({});
  const [bullets, setBullets] = useState([]);
  const [showRope, setShowRope] = useState(false);

  useEffect(() => {
    const characterTexture = PIXI.Texture.from('https://pixijs.io/examples/examples/assets/bunny.png');
    const characterSprite = new PIXI.Sprite(characterTexture);
    characterSprite.width = 50;
    characterSprite.height = 50;

    characterRef.current = characterSprite;
    characterSprite.x = app.screen.width / 2;
    characterSprite.y = app.screen.height / 2;

    app.stage.addChild(characterSprite);

    const handleKeyDown = (e) => {
      setKeysPressed(keysPressed => ({ ...keysPressed, [e.key]: true }));

      if (e.key === 'g') {
        setBullets(bullets => [
          ...bullets,
          <Bullet key={bullets.length} app={app} startX={characterSprite.x + 50} startY={characterSprite.y + 25} />
        ]);
      }

      if (e.key === ' ') { // Space key
        setShowRope(true);
      }
    };

    const handleKeyUp = (e) => {
      setKeysPressed(keysPressed => ({ ...keysPressed, [e.key]: false }));

      if (e.key === ' ') { // Space key
        setShowRope(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [app]);

  useEffect(() => {
    const character = characterRef.current;
    const moveCharacter = () => {
      if (keysPressed.w) character.y -= 5;
      if (keysPressed.a) character.x -= 5;
      if (keysPressed.s) character.y += 5;
      if (keysPressed.d) character.x += 5;
    };

    app.ticker.add(moveCharacter);

    return () => {
      app.ticker.remove(moveCharacter);
    };
  }, [app, keysPressed]);

  return (
    <>
      {bullets}
      {showRope && <Rope app={app} character={characterRef.current} />}
    </>
  );
};

export default Character;
