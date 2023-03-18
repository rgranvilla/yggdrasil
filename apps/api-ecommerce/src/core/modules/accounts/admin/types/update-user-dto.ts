export interface UpdateUserProps {
  name: string;
  phone?: string | null;
  role: 'ADMIN' | 'CUSTOMER';
  type: 'PERSON' | 'ENTITY';
}
