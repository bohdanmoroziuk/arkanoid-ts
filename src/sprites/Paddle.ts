import { Vector } from '../types';
import { isMovingLeft, isMovingRight } from '../utils';

export default class Paddle {
  private _image = new Image();

  private _moveLeft: boolean;
  private _moveRight: boolean;

  constructor(
    private _speed: number,
    private _width: number,
    private _height: number,
    private _position: Vector,
    image: string
  ) {
    this._image.src = image;
    this._moveLeft = false;
    this._moveRight = false;

    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get position() {
    return this._position;
  }

  get image() {
    return this._image;
  }

  get moveLeft() {
    return this._moveLeft;
  }

  get moveRight() {
    return this._moveRight;
  }

  move() {
    if (this._moveLeft) this._position.x -= this._speed;
    if (this._moveRight) this._position.x += this._speed;
  }

  handleKeyUp = (event: KeyboardEvent) => {
    if (isMovingLeft(event)) this._moveLeft = false;
    if (isMovingRight(event)) this._moveRight = false;
  }

  handleKeyDown = (event: KeyboardEvent) => {
    if (isMovingLeft(event)) this._moveLeft = true;
    if (isMovingRight(event)) this._moveRight = true;
  }
}
