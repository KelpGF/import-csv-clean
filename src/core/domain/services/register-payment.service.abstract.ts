import { PaymentEntity } from "../entity/payment/payment.entity";
import { RegisterPayment } from "./register-payment.service.interface";

export abstract class RegisterPaymentAbstract implements RegisterPayment {
  abstract register(
    input: RegisterPayment.Input,
  ): Promise<RegisterPayment.Output>;

  protected createPaymentEntity(payment: RegisterPayment.Input["payment"]) {
    const entityResult = PaymentEntity.create({
      name: payment.name,
      governmentId: payment.governmentId,
      email: payment.email,
      debtAmount: payment.debtAmount,
      debtDueDate: payment.debtDueDate,
      debtID: payment.debtID,
    });

    return entityResult;
  }
}
