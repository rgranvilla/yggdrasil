export interface GetUserProfileDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'ADMIN' | 'CUSTOMER';
  createdAt: Date;
}
