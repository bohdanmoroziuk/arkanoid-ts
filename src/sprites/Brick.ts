import { Vector } from '../types';

export default class Brick {
  private _image = new Image();  

  constructor(
    private _width: number,
    private _height: number,
    private _position: Vector,
    private _energy: number,
    image: string
  ) {
    this.image.src = image;
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

  get energy() {
    return this._energy;
  }

  set energy(value: number) {
    this._energy = value;
  }
}
