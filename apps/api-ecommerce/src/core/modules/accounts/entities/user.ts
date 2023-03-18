import { Replace } from '@/shared/helpers/Replace';
import { randomUUID } from 'crypto';

interface IUserProps {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  role: 'ADMIN' | 'CUSTOMER';
  type: 'PERSON' | 'ENTITY';
  createdAt: Date;
}

export class User {
  private _id: string;
  private props: IUserProps;

  constructor(
    props: Replace<
      IUserProps,
      {
        role?: 'ADMIN' | 'CUSTOMER';
        type?: 'PERSON' | 'ENTITY';
        createdAt?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      phone: props.phone ?? null,
      role: props.role ?? 'CUSTOMER',
      type: props.type ?? 'PERSON',
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }

  public set phone(phone: string | null | undefined) {
    this.props.phone = phone;
  }

  public get phone(): string | null | undefined {
    return this.props.phone;
  }

  public set role(role: 'ADMIN' | 'CUSTOMER') {
    this.props.role = role;
  }

  public get role(): 'ADMIN' | 'CUSTOMER' {
    return this.props.role;
  }

  public set type(type: 'PERSON' | 'ENTITY') {
    this.props.type = type;
  }

  public get type(): 'PERSON' | 'ENTITY' {
    return this.props.type;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
