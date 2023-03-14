import { hash } from 'bcryptjs';

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
      password: await hash('123456', 6),
      ...override,
    },
    override?.id,
  );
}
