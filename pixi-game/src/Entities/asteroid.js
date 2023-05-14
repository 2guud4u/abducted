import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const Asteroid = ({ app }) => {
  const asteroidRef = useRef(new PIXI.Graphics());

  useEffect(() => {
    const asteroid = asteroidRef.current;

    asteroid.beginFill(0x00ff00); // Green
    asteroid.drawCircle(0, 0, 20); // Draw a circle
    asteroid.endFill();

    asteroid.x = app.screen.width; // Start from the right edge of the screen
    asteroid.y = Math.random() * app.screen.height; // Random y-coordinate

    app.stage.addChild(asteroid);

    const moveAsteroid = () => {
      asteroid.x -= 5; // Move to the left

      for (let i = 0; i < app.stage.children.length; i++) {
        const sprite = app.stage.children[i];
        // Check if the sprite is a bullet and if it collides with the asteroid
        if (sprite !== asteroid && sprite.getBounds().intersects(asteroid.getBounds())) {
          app.stage.removeChild(sprite); // Remove bullet
          app.stage.removeChild(asteroid); // Remove asteroid
          app.ticker.remove(moveAsteroid); // Stop moving the asteroid
          break;
        }
      }
    };

    app.ticker.add(moveAsteroid);

    return () => {
      // Ensure asteroid is removed when unmounting
      if (app.stage.children.includes(asteroid)) {
        app.stage.removeChild(asteroid);
      }
      app.ticker.remove(moveAsteroid);
    };
  }, [app]);

  return null;
};

export default Asteroid;
