import { Right } from "./right.class";

export class Left<L, R> {
  constructor(private readonly _value: L) {}

  get value() {
    return this._value;
  }

  isLeft(): this is Left<L, R> {
    return true;
  }

  isRight(): this is Right<L, R> {
    return false;
  }
}
