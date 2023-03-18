import { User } from '../entities/user';

type Override = Partial<User>;

interface MakeNewUserProps extends Override {
  id?: string;
}

export async function makeNewUser(override: MakeNewUserProps = {}) {
  return new User(
    {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      type: 'PERSON',
      ...override,
    },
    override?.id,
  );
}
