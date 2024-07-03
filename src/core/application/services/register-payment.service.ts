import { RegisterPaymentAbstract } from "@/domain/services/register-payment.service.abstract";
import { RegisterPayment } from "@/domain/services/register-payment.service.interface";
import { EitherFactory } from "@/domain/shared/either";
import { GeneratePaymentFileProtocol } from "../protocols/generate-payment-file.protocol";
import { SendMailProtocol } from "../protocols/send-mail.protocol";
import { DomainError } from "@/domain/shared/errors";

export class RegisterPaymentImpl
  extends RegisterPaymentAbstract
  implements RegisterPayment
{
  constructor(
    private readonly generatePaymentFile: GeneratePaymentFileProtocol,
    private readonly sendMail: SendMailProtocol,
  ) {
    super();
  }

  async register({
    payment,
  }: RegisterPayment.Input): Promise<RegisterPayment.Output> {
    try {
      const entityResult = this.createPaymentEntity(payment);
      if (entityResult.isLeft()) {
        const errors = entityResult.value.errors;
        return EitherFactory.left(errors);
      }

      const paymentEntity = entityResult.value;

      const fileResult = await this.generatePaymentFile.generateFile({
        payment: paymentEntity,
      });
      if (fileResult.fileUrl) {
        await this.sendMail.sendMail({
          to: paymentEntity.email,
          subject: "Payment file",
          message: `Your payment file is ready to download: ${fileResult.fileUrl}`,
        });
      }

      return EitherFactory.right(paymentEntity);
    } catch (error) {
      const errors = [
        new DomainError(`Error registering payment: ${error.message}`),
      ];
      return EitherFactory.left(errors);
    }
  }
}
