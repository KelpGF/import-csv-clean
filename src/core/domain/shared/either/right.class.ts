import { Left } from "./left.class";

export class Right<L, R> {
  constructor(private readonly _value: R) {}

  get value() {
    return this._value;
  }

  isLeft(): this is Left<L, R> {
    return false;
  }

  isRight(): this is Right<L, R> {
    return true;
  }
}
