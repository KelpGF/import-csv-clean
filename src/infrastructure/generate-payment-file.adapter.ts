import { GeneratePaymentFileProtocol } from "@/application/protocols/generate-payment-file.protocol";

export class GeneratePaymentFileAdapter implements GeneratePaymentFileProtocol {
  async generateFile(
    input: GeneratePaymentFileProtocol.Input,
  ): Promise<GeneratePaymentFileProtocol.Output> {
    console.log(`Generating payment file for payment ${input.payment.id}`);
    return {
      fileUrl: `https://example.com/payments/${input.payment.id}/file`,
    };
  }
}
