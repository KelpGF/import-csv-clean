import { PaymentEntity } from "@/domain/entity/payment/payment.entity";

export interface GeneratePaymentFileProtocol {
  generateFile(
    input: GeneratePaymentFileProtocol.Input,
  ): Promise<GeneratePaymentFileProtocol.Output>;
}

export namespace GeneratePaymentFileProtocol {
  export type Input = {
    payment: PaymentEntity;
  };
  export type Output = {
    fileUrl: string;
  };
}
