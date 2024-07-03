import { ProcessFileImpl } from "@/application/services/process-file.service";
import { ProcessFileService } from "@/domain/services/process-file.service.interface";
import { registerPaymentServiceProxyFactory } from "./register-payment.service.proxy.factory";

export const processFileServiceFactory = (): ProcessFileService => {
  return new ProcessFileImpl(registerPaymentServiceProxyFactory());
};
