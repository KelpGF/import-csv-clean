import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
import { Either, EitherFactory } from "@/domain/shared/either";
import { ProcessFileService } from "@/domain/services/process-file.service.interface";
import { DomainError } from "@/domain/shared/errors";
import { RegisterPayment } from "@/domain/services/register-payment.service.interface";

// apply clean code
export class ProcessFileImpl implements ProcessFileService {
  constructor(private registerPayment: RegisterPayment) {}

  async processFile(filename: string): Promise<Either<DomainError, void>> {
    const csvFilePath = this.getPath(filename);

    // improve stream logs
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", (row) => {
          this.handlePayment(row);
        })
        .on("end", () => {
          this.removeFile(filename);
          resolve(EitherFactory.right(undefined));
        })
        .on("error", (error) => {
          reject(EitherFactory.left(new DomainError(error.message)));
        });
    });
  }

  private handlePayment(row: string[]) {
    const payment = {
      name: row[0],
      governmentId: row[1],
      email: row[2],
      debtAmount: Number(row[3]),
      debtDueDate: new Date(row[4]),
      debtID: row[5],
    };
    this.registerPayment.register({ payment }).then((result) => {
      if (result.isLeft()) {
        console.error(
          `Payment ERROR [ID ${payment.debtID}]: ${result.value.join(", ")}`,
        );
      }
    });
  }

  private removeFile(filename: string): void {
    const csvFilePath = this.getPath(filename);
    fs.unlinkSync(csvFilePath);
  }

  private getPath(filename: string): string {
    return path.resolve(__dirname, "..", "..", "..", "..", "tmp", filename);
  }
}
