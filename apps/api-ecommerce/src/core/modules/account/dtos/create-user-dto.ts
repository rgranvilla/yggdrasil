export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
  type?: 'PERSON' | 'ENTITY';
}
