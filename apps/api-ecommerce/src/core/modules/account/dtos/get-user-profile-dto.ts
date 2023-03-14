export interface GetUserProfileDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  role: 'ADMIN' | 'CUSTOMER';
  type: 'PERSON' | 'ENTITY';
  createdAt: Date;
}
