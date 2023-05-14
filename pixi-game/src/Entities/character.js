import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import Bullet from './bullet';
import Rope from './rope';

const Character = ({ app }) => {
    //const texture = PIXI.Sprite.from('./character.png');
  const characterRef = useRef(new PIXI.Graphics());
  const [keysPressed, setKeysPressed] = useState({});
  const [bullets, setBullets] = useState([]);
  const [showRope, setShowRope] = useState(false);

  useEffect(() => {
    // const bunny = new PIXI.Sprite(texture);
    // bunny.x = 30;
    // bunny.y =  30;
    // bunny.rotation = Math.random() * (Math.PI * 2);
    // app.stage.addChild(bunny);

    // const character = characterRef.current;
    // character.beginFill(0xff0000);
    // character.drawRect(0, 0, 50, 50);
    // character.endFill(); 
    const characterTexture = PIXI.Texture.from('https://raw.githubusercontent.com/2guud4u/abducted/d7a12237fe333310a6bb4e0e9e1ed35a2aff34cf/pixi-game/src/Entities/skins/main.png');
    const character = new PIXI.Sprite(characterTexture);
    character.width = 125;
    character.height = 125;
    characterRef.current = character;
    character.x = app.screen.width / 2;
    character.y = app.screen.height / 2;

    app.stage.addChild(character);

    

    const handleKeyDown = (e) => {
      setKeysPressed(keysPressed => ({ ...keysPressed, [e.key]: true }));

      if (e.key === 'g') {
        setBullets(bullets => [
          ...bullets,
          <Bullet key={bullets.length} app={app} startX={character.x + 120} startY={character.y + 70} />
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