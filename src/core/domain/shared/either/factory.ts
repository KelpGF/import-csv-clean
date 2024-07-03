import { Left } from "./left.class";
import { Right } from "./right.class";

export type Either<L, R> = Left<L, R> | Right<L, R>;

export class EitherFactory {
  static left<L, R>(l: L): Either<L, R> {
    return new Left(l);
  }
  static right<L, R>(r: R): Either<L, R> {
    return new Right(r);
  }
}
