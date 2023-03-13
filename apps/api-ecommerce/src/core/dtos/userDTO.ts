export interface UserDTO {
  id?: string;
  name: string;
  email: string;
  password_hash: string;
  role?: 'ADMIN' | 'CUSTOMER';
  created_at?: Date;
}
