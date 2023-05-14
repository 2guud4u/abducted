import { useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import Bullet from './bullet';
import Rope from './rope';

const Character = ({ app, blocks }) => {
  const [character, setCharacter] = useState(null);
  const [keysPressed, setKeysPressed] = useState({});
  const [bullets, setBullets] = useState([]);
  const [showRope, setShowRope] = useState(false);
  const [ropeKey, setRopeKey] = useState(0);  // new state to force re-render of Rope component

  useEffect(() => {
    const characterTexture = PIXI.Texture.from('https://raw.githubusercontent.com/2guud4u/abducted/d7a12237fe333310a6bb4e0e9e1ed35a2aff34cf/pixi-game/src/Entities/skins/main.png');
    const characterSprite = new PIXI.Sprite(characterTexture);
    characterSprite.width = 125;
    characterSprite.height = 125;
    setCharacter(characterSprite);
    characterSprite.x = app.screen.width / 2;
    characterSprite.y = app.screen.height / 2;

    app.stage.addChild(characterSprite);

    const handleKeyDown = (e) => {
      setKeysPressed(keysPressed => ({ ...keysPressed, [e.key]: true }));

      if (e.key === 'g') {
        setBullets(bullets => [
          ...bullets,
          <Bullet key={bullets.length} app={app} startX={characterSprite.x + 120} startY={characterSprite.y + 70} />
        ]);
      }

      if (e.key === ' ') { // Space key
        setShowRope(true);
        setRopeKey(prevKey => prevKey + 1);  // increment the key to force re-render
      }
    };

    const handleKeyUp = (e) => {
      setKeysPressed(keysPressed => ({ ...keysPressed, [e.key]: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [app]);

  useEffect(() => {
    const moveCharacter = () => {
      if (!character) return;

      if (keysPressed.w) character.y -= 5;
      if (keysPressed.a) character.x -= 5;
      if (keysPressed.s) character.y += 5;
      if (keysPressed.d) character.x += 5;
    };

    app.ticker.add(moveCharacter);

    return () => {
      app.ticker.remove(moveCharacter);
    };
  }, [app, character, keysPressed]);

  return (
    <>
      {bullets}
      {showRope && character && <Rope app={app} character={character} blocks={blocks} />}
    </>
  );
};

export default Character;
