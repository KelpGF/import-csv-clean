export interface SendMailProtocol {
  sendMail(input: SendMailProtocol.Input): Promise<SendMailProtocol.Output>;
}

export namespace SendMailProtocol {
  export type Input = {
    to: string;
    subject: string;
    message: string;
  };
  export type Output = void;
}
