import { useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import Bullet from './bullet';
import Rope from './rope';
import {characterTexture} from './textures';
const Character = ({ app, blocks, mycharacter, mysetCharacter, setCharIndex }) => {
  
  const [keysPressed, setKeysPressed] = useState({});
  const [bullets, setBullets] = useState([]);
  const [ropeStage, setRopeStage] = useState('finished');
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const characterSprite = new PIXI.Sprite(characterTexture);
    characterSprite.width = 100;
    characterSprite.height = 50;
    setCharacter(characterSprite);
    characterSprite.x = app.screen.width / 2;
    characterSprite.y = app.screen.height / 2;
    
    app.stage.addChild(characterSprite);
    setCharIndex(app.stage.getChildIndex(characterSprite));
    
    const handleKeyDown = (e) => {
      setKeysPressed(keysPressed => ({ ...keysPressed, [e.key]: true }));

      if (e.key === 'g') {
        setBullets(bullets => [
          ...bullets,
          <Bullet key={bullets.length} app={app} startX={characterSprite.x + 90} startY={characterSprite.y + 20} />
        ]);
      }

      if (e.key === ' ') { // Space key
        setRopeStage('growing');
        
        
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
      
      //mysetCharacter({x: character.x, y: character.y}); 
    };

    app.ticker.add(moveCharacter);

    return () => {
      app.ticker.remove(moveCharacter);
    };
  }, [app, character, keysPressed, mysetCharacter]);

  return (
    <>
      {bullets}
      { character && <Rope app={app} character={character} blocks={blocks} ropeStage={ropeStage} setRopeStage={setRopeStage}/>}
    </>
  );
};

export default Character;
