import Ball from './sprites/Ball';
import Brick from './sprites/Brick';
import Paddle from './sprites/Paddle';
import CanvasView from './views/CanvasView';
import Collision from './Collision';

import BALL_IMAGE from './images/ball.png';
import PADDLE_IMAGE from './images/paddle.png';

import { 
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_START_X,
  BALL_SPEED,
  BALL_SIZE,
  BALL_START_X,
  BALL_START_Y
} from './setup';

import { createBricks } from './helpers';

let gameOver = false;
let score = 0;

function setGameOver(view: CanvasView) {
  view.drawInfo('Game Over!');
  gameOver = false;
}

function setGameWin(view: CanvasView) {
  view.drawInfo('Game Won!');
  gameOver = false;
}

function gameLoop(
  view: CanvasView, 
  bricks: Brick[],
  paddle: Paddle,
  ball: Ball,
  collision: Collision
) {
  view.clear();
  view.drawSprite(ball);
  view.drawBricks(bricks);
  view.drawSprite(paddle);

  ball.move();

  if (
    (paddle.moveLeft && paddle.position.x > 0) ||
    (paddle.moveRight && paddle.position.x < view.width - paddle.width)
  ) {
    paddle.move();
  }

  collision.checkBallCollision(ball, paddle, view);

  const colliding = collision.isCollidingBricks(ball, bricks);

  if (colliding) {
    score += 1;
    view.drawScore(score);
  }

  if (ball.position.y > view.height) {
    gameOver = true;
  }

  if (bricks.length === 0) {
    return setGameWin(view);
  }

  if (gameOver) {
    return setGameOver(view);
  }

  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));
}

function startGame(view: CanvasView) {
  score = 0;
  view.drawInfo('');
  view.drawScore(0);

  const collision = new Collision(); 

  const ball = new Ball(
    BALL_SIZE,
    {
      x: BALL_START_X,
      y: BALL_START_Y
    },
    BALL_SPEED,
    BALL_IMAGE
  );

  const bricks = createBricks();

  const paddle = new Paddle(
    PADDLE_SPEED,
    PADDLE_WIDTH,
    PADDLE_HEIGHT,
    { 
      x: PADDLE_START_X,
      y: view.height - PADDLE_HEIGHT - 5
    },
    PADDLE_IMAGE
  );

  gameLoop(view, bricks, paddle, ball, collision);
}

const view = new CanvasView('#playField');

view.initializeStartButton(startGame);
