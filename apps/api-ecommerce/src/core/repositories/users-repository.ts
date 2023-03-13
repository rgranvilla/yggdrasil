import { UserDTO } from '../dtos/userDTO';

export abstract class UsersRepository {
  abstract findById(id: string): Promise<UserDTO | null>;
  abstract findByEmail(email: string): Promise<UserDTO | null>;
  abstract create(data: UserDTO): Promise<UserDTO>;
}
