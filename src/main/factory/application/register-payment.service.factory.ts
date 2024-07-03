import { RegisterPaymentImpl } from "@/application/services/register-payment.service";
import { RegisterPayment } from "@/domain/services/register-payment.service.interface";
import {
  generatePaymentFileServiceFactory,
  sendMailFactory,
} from "../infrastructure";

export const registerPaymentServiceFactory = (): RegisterPayment => {
  const registerPaymentService = new RegisterPaymentImpl(
    generatePaymentFileServiceFactory(),
    sendMailFactory(),
  );

  return registerPaymentService;
};
