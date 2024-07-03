import { RegisterPayment } from "@/domain/services/register-payment.service.interface";
import { RegisterPaymentImpl } from "./register-payment.service";
import { PaymentEntity } from "@/domain/entity/payment/payment.entity";

const makePaymentInput = () => ({
  name: "valid_name",
  governmentId: "valid_government_id",
  email: "valid_email",
  debtAmount: 100,
  debtDueDate: new Date(),
  debtID: "valid_debt_id",
});

describe("RegisterPaymentService", () => {
  let sut: RegisterPayment;
  const generatePaymentFileStub = {
    generateFile: jest.fn(),
  };
  const sendEmailStub = {
    sendMail: jest.fn(),
  };

  beforeEach(() => {
    sut = new RegisterPaymentImpl(generatePaymentFileStub, sendEmailStub);
  });

  it("should return a domain error if payment entity is invalid", async () => {
    const payment = makePaymentInput();
    payment.name = "";

    const result = await sut.register({ payment });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toEqual([
      new Error("PaymentEntity: Name is required"),
    ]);
  });

  it("should return a right with undefined if payment is already registered", async () => {
    const payment = makePaymentInput();

    generatePaymentFileStub.generateFile.mockResolvedValueOnce({
      fileUrl: "valid_url",
    });

    const result = await sut.register({ payment });

    expect(result.isRight()).toBe(true);
    expect(result.value).toBeInstanceOf(PaymentEntity);
    expect(sendEmailStub.sendMail).toHaveBeenCalledWith({
      to: payment.email,
      subject: "Payment file",
      message: `Your payment file is ready to download: valid_url`,
    });
  });

  it("should return a domain error if an error occurs", async () => {
    const payment = makePaymentInput();

    generatePaymentFileStub.generateFile.mockRejectedValueOnce(
      new Error("Error generating file"),
    );

    const result = await sut.register({ payment });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toEqual([
      new Error("Error registering payment: Error generating file"),
    ]);
  });
});
