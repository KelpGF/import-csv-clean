import { SendMailProtocol } from "@/application/protocols/send-mail.protocol";

export class SendMailAdapter implements SendMailProtocol {
  async sendMail(
    input: SendMailProtocol.Input,
  ): Promise<SendMailProtocol.Output> {
    console.log(
      `Sending mail to ${input.to} with subject ${input.subject}. Message: ${input.message}`,
    );
  }
}
