export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  type?: 'PERSON' | 'ENTITY';
}
