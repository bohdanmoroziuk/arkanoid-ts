import { Vector } from '../types';

export default class Ball {
  private _speed: Vector;
  private _image = new Image();

  constructor(
    private _size: number,
    private _position: Vector,
    speed: number,
    image: string,
  ) {
    this._speed = {
      x: speed,
      y: -speed
    };

    this._image.src = image;
  }

  get width() {
    return this._size;
  }

  get height() {
    return this._size;
  }

  get position() {
    return this._position;
  }

  get image() {
    return this._image;
  }

  changeXDirection() {
    this._speed.x *= -1;
  }

  changeYDirection() {
    this._speed.y *= -1;
  }

  move() {
    this._position.x += this._speed.x;
    this._position.y += this._speed.y;
  }
}
