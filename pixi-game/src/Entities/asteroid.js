import { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';

const Asteroid = ({ app, appStarted }) => {
  const asteroidRef = useRef(new PIXI.Graphics());

  useEffect(() => {
    // const asteroid = asteroidRef.current;

    // asteroid.beginFill(0x00ff00); // Green
    // asteroid.drawCircle(0, 0, 20); // Draw a circle
    // asteroid.endFill();
    const asteroidTexture = PIXI.Texture.from('https://raw.githubusercontent.com/2guud4u/abducted/4f211bf5d7b3baf2af18806f062e8572d53ef87f/pixi-game/src/Entities/skins/asteroid.png');
    const asteroid = new PIXI.Sprite(asteroidTexture);
    asteroid.width = 100;
    asteroid.height = 50;
    asteroidRef.current = asteroid;

    asteroid.x = app.screen.width; // Start from the right edge of the screen
    //keep asteroid within the air
    do{
        asteroid.y = Math.random() * app.screen.height; // Random y-coordinate
    }while(asteroid.y > 500 );
    
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
