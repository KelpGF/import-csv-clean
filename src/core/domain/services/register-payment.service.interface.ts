import { PaymentEntity } from "../entity/payment/payment.entity";
import { Either } from "../shared/either";
import { DomainError } from "../shared/errors";

export interface RegisterPayment {
  register(input: RegisterPayment.Input): Promise<RegisterPayment.Output>;
}

export namespace RegisterPayment {
  export type Input = {
    payment: {
      name: string;
      governmentId: string;
      email: string;
      debtAmount: number;
      debtDueDate: Date;
      debtID: string;
    };
  };
  export type Output = Either<DomainError[], PaymentEntity>;
}
