import { RegisterPaymentProxy } from "@/application/proxy/register-payment.service.proxy";
import { RegisterPayment } from "@/domain/services/register-payment.service.interface";
import { registerPaymentServiceFactory } from "./register-payment.service.factory";
import { cacheAdapterFactory } from "../infrastructure";

export const registerPaymentServiceProxyFactory = (): RegisterPayment => {
  const registerPaymentService = new RegisterPaymentProxy(
    registerPaymentServiceFactory(),
    cacheAdapterFactory(),
  );

  return registerPaymentService;
};
