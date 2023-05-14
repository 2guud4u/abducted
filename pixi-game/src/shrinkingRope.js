import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const ShrinkingRope = ({ app, character }) => {
  const ropeRef = useRef(new PIXI.Graphics());

  useEffect(() => {
    const rope = ropeRef.current;

    rope.beginFill(0x0000ff); // Blue color
    rope.drawRect(0, 0, 10, 100); // draw a rectangle
    rope.endFill();

    rope.x = character.x + 50;
    rope.y = character.y + 50;

    app.stage.addChild(rope);

    const updateRope = () => {
      rope.x = character.x + 50;
      rope.y = character.y + 50;

      if (rope.height > 0) {
        rope.height -= 5; // Adjust the shrinking speed
      }
    };

    app.ticker.add(updateRope);

    return () => {
      app.ticker.remove(updateRope);
      app.stage.removeChild(rope);
    };
  }, [app, character]);

  return null;
};

export default ShrinkingRope;
