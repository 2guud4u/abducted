import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { alienCopTexture } from './textures';
 const Cops = ({ app, charIndex }) => {
//   const copsRef = useRef([]);

//   useEffect(() => {
//     const moveCop = (cop) => {
//       let char = app.stage.children[charIndex]
//       if(char.x !== 0){
//         if (char.x != 0&& char.x > cop.x) {
//           cop.x += 1;
//         } else{
//           cop.x -= 1;
//         }
//         if (char.y > cop.y) {
//           cop.y += 1;
//         } else{
//           cop.y -= 1;
//       }
//       } else{
//         cop.x += 1;
//       }
      
      
    
//     };

//     const removeCop = (cop) => {
//       if (cop.x >= app.screen.width + cop.width / 2) {
//         app.ticker.remove(() => moveCop(cop));
//         app.ticker.remove(() => removeCop(cop));
//         app.stage.removeChild(cop);
//         copsRef.current = copsRef.current.filter((ref) => ref !== cop);
//       }
//     };

//     const spawnCop = () => {
//       const cop = new PIXI.Sprite(alienCopTexture);
//       cop.anchor.set(0.5); // Set the anchor point to the middle of the sprite
//       cop.x = -cop.width / 2; // Spawn outside of the left screen
//       do{
//         cop.y = Math.random() * app.screen.height; // Random y-coordinate
//         }while(cop.y > 500 );
//       app.stage.addChild(cop);

//       copsRef.current.push(cop);

//       app.ticker.add(() => moveCop(cop));
//       app.ticker.add(() => removeCop(cop));

//       // Schedule the creation of the next cop
//       setTimeout(spawnCop, Math.random() * 2000 + 10000); // random interval between 1 and 3 seconds
//     };

//     spawnCop();

//     return () => {
//       copsRef.current.forEach((cop) => {
//         app.ticker.remove(() => moveCop(cop));
//         app.ticker.remove(() => removeCop(cop));
//         app.stage.removeChild(cop);
//       });
//       copsRef.current = [];
//     };
//   }, [app, charIndex]);

//   return null;
// };
const copRef = useRef(new PIXI.Graphics());
useEffect(() => {
  // const cop = copRef.current;

  // cop.beginFill(0x00ff00); // Green
  // cop.drawCircle(0, 0, 20); // Draw a circle
  // cop.endFill();
  const cop = new PIXI.Sprite(alienCopTexture);
  cop.width = 100;
  cop.height = 50;
  copRef.current = cop;

  cop.x = 0; // Start from the right edge of the screen
  //keep cop within the air
  do{
      cop.y = Math.random() * app.screen.height; // Random y-coordinate
  }while(cop.y > 500 );
  
  app.stage.addChild(cop);

  const movecop = () => {
    let char = app.stage.children[charIndex]
      if(char.x !== 0){
        if (char.x != 0&& char.x > cop.x) {
          cop.x += 1;
        } else{
          cop.x -= 1;
        }
        if (char.y > cop.y) {
          cop.y += 1;
        } else{
          cop.y -= 1;
      }
      } else{
        cop.x += 1;
      }
      

    for (let i = 0; i < app.stage.children.length; i++) {
      const sprite = app.stage.children[i];
      // Check if the sprite is a bullet and if it collides with the cop
      if (sprite !== cop && sprite.getBounds().intersects(cop.getBounds())) {
        app.stage.removeChild(sprite); // Remove bullet
        app.stage.removeChild(cop); // Remove cop
        app.ticker.remove(movecop); // Stop moving the cop
        break;
      }
    }
  };

  app.ticker.add(movecop);

  return () => {
    // Ensure cop is removed when unmounting
    if (app.stage.children.includes(cop)) {
      app.stage.removeChild(cop);
    }
    app.ticker.remove(movecop);
  };
}, [app, charIndex]);

return null;
};
export default Cops;
