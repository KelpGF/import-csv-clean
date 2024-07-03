import { EitherFactory } from "@/domain/shared/either";
import { RegisterPaymentProxy } from "./register-payment.service.proxy";
import { PaymentEntity } from "@/domain/entity/payment/payment.entity";

const makePaymentInput = () => ({
  name: "valid_name",
  governmentId: "valid_government_id",
  email: "valid_email",
  debtAmount: 100,
  debtDueDate: new Date(),
  debtID: "valid_debt_id",
});

describe("RegisterPaymentServiceProxy", () => {
  let sut: RegisterPaymentProxy;
  const registerPaymentStub = {
    register: jest
      .fn()
      .mockResolvedValue(
        EitherFactory.right(PaymentEntity.create(makePaymentInput()).value),
      ),
  };
  const cacheStub = {
    get: jest.fn().mockReturnValue(null),
    set: jest.fn(),
  };

  beforeEach(() => {
    sut = new RegisterPaymentProxy(registerPaymentStub, cacheStub);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a right with undefined if payment is already registered", async () => {
    const payment = makePaymentInput();

    cacheStub.get.mockResolvedValueOnce(JSON.stringify(payment));
    const result = await sut.register({ payment });

    expect(result.isRight()).toBe(true);
    expect(result.value).toBeUndefined();
  });

  it("should call registerPayment with correct values", async () => {
    const payment = makePaymentInput();

    await sut.register({ payment });

    expect(registerPaymentStub.register).toHaveBeenCalledWith({ payment });
    expect(cacheStub.set).toHaveBeenCalledTimes(1);
  });
});
