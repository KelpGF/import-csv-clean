export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainError";
  }

  static create(message: string): DomainError {
    return new DomainError(message);
  }
}
