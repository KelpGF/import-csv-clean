import { DomainError } from "@/domain/shared/errors";
import {
  BaseEntityAbstract,
  Params as BaseEntityAbstractParams,
} from "../../shared/entities/base-entity.abstract";
import { CreateEntityResult } from "@/domain/shared/entities/create-entity.type";
import { entityErrorHandling } from "@/domain/shared/errors/entities-handling.error";

type Params = {
  name: string;
  governmentId: string;
  email: string;
  debtAmount: number;
  debtDueDate: Date;
  debtID: string;
} & BaseEntityAbstractParams;

export class PaymentEntity extends BaseEntityAbstract {
  private _name: string;
  private _governmentId: string;
  private _email: string;
  private _debtAmount: number;
  private _debtDueDate: Date;
  private _debtID: string;

  private constructor(params: Params) {
    super({
      id: params.id,
      createdAt: params.createdAt,
      updatedAt: params.updatedAt,
      context: PaymentEntity.name,
    });
    this._name = params.name;
    this._governmentId = params.governmentId;
    this._email = params.email;
    this._debtAmount = params.debtAmount;
    this._debtDueDate = params.debtDueDate;
    this._debtID = params.debtID;

    this.validate();
  }

  get email() {
    return this._email;
  }

  get debtID() {
    return this._debtID;
  }

  validate() {
    if (!this._name) {
      this.addNotification(DomainError.create("Name is required"));
    }

    if (!this._governmentId) {
      this.addNotification(DomainError.create("Government ID is required"));
    }

    if (!this._email) {
      this.addNotification(DomainError.create("Email is required"));
    }

    if (!this._debtAmount || this._debtAmount <= 0) {
      this.addNotification(DomainError.create("Debt amount is required"));
    }

    if (!this._debtDueDate) {
      this.addNotification(DomainError.create("Debt due date is required"));
    }

    if (!this._debtID) {
      this.addNotification(DomainError.create("Debt ID is required"));
    }
  }

  toObject() {
    return {
      id: this.id,
      name: this._name,
      governmentId: this._governmentId,
      email: this._email,
      debtAmount: this._debtAmount,
      debtDueDate: this._debtDueDate,
      debtID: this._debtID,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static create(params: Params): CreateEntityResult<PaymentEntity> {
    const entity = new PaymentEntity(params);

    return entityErrorHandling(entity);
  }
}
