import { Errors } from "@/domain/shared/entities/create-entity.type";
import { PaymentEntity } from "./payment.entity";
import { DomainError } from "@/domain/shared/errors";

describe("Payment entity", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date("2020-01-01"));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new instance of PaymentEntity", () => {
    const params = {
      name: "John Doe",
      email: "johndoe@mail.com.br",
      governmentId: "11111111111",
      debtAmount: 1000000.0,
      debtDueDate: new Date("2022-10-12"),
      debtID: "1adb6ccf-ff16-467f-bea7-5f05d494280f",
    };

    const result = PaymentEntity.create(params);

    const entity = result.value as PaymentEntity;
    const entityData = entity.toObject();

    expect(result.isLeft()).toBe(entity.hasNotification);
    expect(result.isRight()).toBe(true);
    expect(entity).toBeInstanceOf(PaymentEntity);
    expect(entityData.name).toBe(params.name);
    expect(entityData.email).toBe(params.email);
    expect(entityData.governmentId).toBe(params.governmentId);
    expect(entityData.debtAmount).toBe(params.debtAmount);
    expect(entityData.debtDueDate).toBe(params.debtDueDate);
    expect(entityData.debtID).toBe(params.debtID);
    expect(entityData.createdAt).toEqual(new Date("2020-01-01"));
    expect(entityData.updatedAt).toEqual(new Date("2020-01-01"));
  });

  test("should not create a new instance of PaymentEntity without data", () => {
    const params = {
      name: "",
      email: "",
      governmentId: "",
      debtAmount: 0,
      debtDueDate: null,
      debtID: "",
    };

    const result = PaymentEntity.create(params);
    const value = result.value as Errors;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(value).toEqual({
      errors: [
        new DomainError("PaymentEntity: Name is required"),
        new DomainError("PaymentEntity: Government ID is required"),
        new DomainError("PaymentEntity: Email is required"),
        new DomainError("PaymentEntity: Debt amount is required"),
        new DomainError("PaymentEntity: Debt due date is required"),
        new DomainError("PaymentEntity: Debt ID is required"),
      ],
    });
  });
});
