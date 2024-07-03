import { GeneratePaymentFileProtocol } from "@/application/protocols/generate-payment-file.protocol";
import { GeneratePaymentFileAdapter } from "@/infrastructure/generate-payment-file.adapter";

export const generatePaymentFileServiceFactory =
  (): GeneratePaymentFileProtocol => {
    return new GeneratePaymentFileAdapter();
  };
