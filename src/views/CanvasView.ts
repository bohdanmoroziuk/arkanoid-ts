import Ball from '../sprites/Ball';
import Brick from '../sprites/Brick';
import Paddle from '../sprites/Paddle';

type StartFunction = (view: CanvasView) => void;

type Sprite = Ball | Brick | Paddle;

export default class CanvasView {
  private canvas: HTMLCanvasElement | null;
  private context: CanvasRenderingContext2D | null | undefined;
  private scoreDisplay: HTMLObjectElement | null;
  private startButton: HTMLObjectElement | null;
  private infoBoard: HTMLObjectElement | null;

  constructor(canvasId: string) {
    this.canvas = document.querySelector(canvasId);
    this.context = this.canvas?.getContext('2d');
    this.scoreDisplay = document.querySelector('#score');
    this.startButton = document.querySelector('#start');
    this.infoBoard = document.querySelector('#info');
  }

  get width() {
    return this.canvas?.width ?? 0;
  }

  get height() {
    return this.canvas?.height ?? 0;
  }

  clear() {
    this.context?.clearRect(0, 0, this.width, this.height);
  }

  initializeStartButton(onStart: StartFunction) {
    this.startButton?.addEventListener('click', () => onStart(this));
  }

  drawScore(score: number) {
    if (this.scoreDisplay) {
      this.scoreDisplay.innerHTML = score.toString();
    }
  }

  drawInfo(text: string) {
    if (this.infoBoard) {
      this.infoBoard.innerHTML = text;
    }
  }

  drawSprite(sprite: Sprite) {
    if (!sprite) return;

    this.context?.drawImage(
      sprite.image,
      sprite.position.x,
      sprite.position.y,
      sprite.width,
      sprite.height
    );
  }

  drawBricks(bricks: Brick[]) {
    bricks.forEach(brick => {
      this.drawSprite(brick)
    });
  }
}
