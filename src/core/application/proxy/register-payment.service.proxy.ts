import { RegisterPaymentAbstract } from "@/domain/services/register-payment.service.abstract";
import { RegisterPayment } from "@/domain/services/register-payment.service.interface";
import { EitherFactory } from "@/domain/shared/either";
import { CacheProtocol } from "../protocols/cache.protocol";
import { PaymentEntity } from "@/domain/entity/payment/payment.entity";

export class RegisterPaymentProxy
  extends RegisterPaymentAbstract
  implements RegisterPayment
{
  constructor(
    private readonly registerPayment: RegisterPayment,
    private readonly cache: CacheProtocol,
  ) {
    super();
  }

  async register({
    payment,
  }: RegisterPayment.Input): Promise<RegisterPayment.Output> {
    const cachedPayment = await this.checkIfPaymentIsAlreadyRegistered(
      payment.email,
      payment.debtID,
    );

    if (cachedPayment) {
      console.log(`Payment ${payment.debtID} already registered`);
      return EitherFactory.right(undefined);
    }

    const result = await this.registerPayment.register({ payment });
    if (result.isRight()) {
      this.setPaymentCache(result.value);
    }

    return result;
  }

  private async checkIfPaymentIsAlreadyRegistered(
    email: string,
    debtID: string,
  ): Promise<boolean> {
    const cachedPayment = await this.cache.get(
      this.makeCacheKey(email, debtID),
    );
    return !!cachedPayment;
  }

  private async setPaymentCache(payment: PaymentEntity) {
    await this.cache.set(
      this.makeCacheKey(payment.email, payment.debtID),
      JSON.stringify(payment.toObject()),
    );
  }

  private makeCacheKey(email: string, debtID: string) {
    return `payment:email:${email}:debt-id:${debtID}`;
  }
}
