import { Either } from "../shared/either";
import { DomainError } from "../shared/errors";

export interface ProcessFileService {
  processFile(filename: string): Promise<Either<DomainError, void>>;
}
