import { UserStore } from '../../modules/user/user.model';

const store = new UserStore();
describe('Test user Model', () => {
  let id = 0;
  const user = {
    username: 'mnaguibmodel',
    firstName: 'Mohammedmodel',
    lastName: 'Naguibmodel',
    password: 'passwordmodel',
  };

  it('User Model create : should create user ', async () => {
    try {
      const result = await store.create(user);
      id = result.id as number;
      expect(result.id).toBeTruthy();
      expect(result.password).toBeUndefined();
    } catch (err) {
      console.error(err);
    }
  });
  it('User Model index: should return array ', async () => {
    try {
      const result = await store.index();
      expect(Array.isArray(result)).toBe(true);
    } catch (err) {
      console.error(err);
    }
  });

  it('User Model show: should return user with id', async () => {
    try {
      const result = await store.show(id);
      expect(result).toBeTruthy();
    } catch (err) {
      console.error(err);
    }
  });

  it('User Model authenticate: should return user username/password', async () => {
    try {
      const result = await store.authenticate(user.username, user.password);
      expect(result).toBeTruthy();
    } catch (err) {
      console.error(err);
    }
  });
});
