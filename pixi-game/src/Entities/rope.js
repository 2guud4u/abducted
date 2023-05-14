import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';

const Rope = ({ app, character }) => {
  const ropeRef = useRef(new PIXI.Graphics());
  const [ropeLength, setRopeLength] = useState(0);
  const [ropeStage, setRopeStage] = useState('growing');

  useEffect(() => {
    const rope = ropeRef.current;

    rope.beginFill(0x0000ff); // Blue color
    rope.drawRect(0, 0, 10, 100); // draw a rectangle
    rope.endFill();

    rope.x = character.x + 100;
    rope.y = character.y + 100;

    app.stage.addChild(rope);

    const updateRope = () => {
      ropeRef.current.x = character.x + 50;
      ropeRef.current.y = character.y + 100;

      if (ropeStage === 'growing') {
        ropeRef.current.height = ropeLength;
        setRopeLength(ropeLength + 1);

        if (ropeLength >= 200) { // Maximum length of rope
          setRopeStage('maximum');
        }
      } else if (ropeStage === 'maximum') {
        setRopeStage('shrinking');
      } else if (ropeStage === 'shrinking') {
        ropeRef.current.height = ropeLength;
        setRopeLength(ropeLength - 1);

        if (ropeLength <= 0) { // Rope fully retracted
          setRopeStage('finished');
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
