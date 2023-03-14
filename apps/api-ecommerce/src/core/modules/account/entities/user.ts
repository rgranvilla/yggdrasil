import { Replace } from '@/shared/helpers/Replace';
import { randomUUID } from 'crypto';

interface UserProps {
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'CUSTOMER';
  createdAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(
    props: Replace<
      UserProps,
      {
        role?: 'ADMIN' | 'CUSTOMER';
        createdAt?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      role: props.role ?? 'CUSTOMER',
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

  public set role(role: 'ADMIN' | 'CUSTOMER') {
    this.props.role = role;
  }

  public get role(): 'ADMIN' | 'CUSTOMER' {
    return this.props.role;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
