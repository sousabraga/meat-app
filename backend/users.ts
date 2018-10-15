export class User {

  constructor(
    public email: string,
    public name: string,
    private password: string
  ) {}

  matches(another: User): boolean {
    return another !== undefined &&
      another.email === this.email &&
      another.password === this.password;
  }

}

export const users: {[key: string]: User} = {
  "admin@gmail.com": new User("admin@gmail.com", "admin", "admin"),
  "user@gmail.com": new User("user@gmail.com", "user", "user"),
};
