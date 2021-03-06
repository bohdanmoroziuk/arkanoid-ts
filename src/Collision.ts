import Ball from './sprites/Ball';
import Brick from './sprites/Brick';
import Paddle from './sprites/Paddle';
import CanvasView from './views/CanvasView';

export default class Collision {
  isCollidingBrick(ball: Ball, brick: Brick) {
    return (
      ball.position.x < brick.position.x + brick.width &&
      ball.position.x + ball.width > brick.position.x &&
      ball.position.y < brick.position.y + brick.height &&
      ball.position.y + ball.height > brick.position.y
    );
  }

  isCollidingBricks(ball: Ball, bricks: Brick[]) {
    let colliding = false;

    bricks.forEach((brick, index) => {
      if (this.isCollidingBrick(ball, brick)) {
        ball.changeYDirection();

        if (brick.energy === 1) {
          bricks.splice(index, 1);
        } else {
          brick.energy -= 1;
        }

        colliding = true;
      }
    });

    return colliding;
  }

  checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView) {
    if (
      ball.position.x + ball.width > paddle.position.x &&
      ball.position.x < paddle.position.x + paddle.width && 
      ball.position.y + ball.height === paddle.position.y
    ) {
      ball.changeYDirection();
    }

    if (ball.position.x > view.width - ball.width || ball.position.x < 0) {
      ball.changeXDirection();
    }

    if (ball.position.y < 0) {
      ball.changeYDirection();
    }
  }  
}
