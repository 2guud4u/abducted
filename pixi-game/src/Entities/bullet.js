import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const Bullet = ({ app, startX, startY }) => {
  const bulletRef = useRef(new PIXI.Graphics());

  useEffect(() => {
    const bullet = bulletRef.current;
    bullet.beginFill(0xffff00);
    bullet.drawRect(0, 0, 10, 10);
    bullet.endFill();

    bullet.x = startX;
    bullet.y = startY;

    app.stage.addChild(bullet);

    const moveBullet = () => {
      bullet.x += 10;
    };

    app.ticker.add(moveBullet);

    return () => {
      app.ticker.remove(moveBullet);
    };
  }, [app, startX, startY]);

  return null;
};

export default Bullet;
