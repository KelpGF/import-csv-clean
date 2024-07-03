import { SendMailProtocol } from "@/application/protocols/send-mail.protocol";
import { SendMailAdapter } from "@/infrastructure/send-mail.adapter";

export const sendMailFactory = (): SendMailProtocol => {
  return new SendMailAdapter();
};
