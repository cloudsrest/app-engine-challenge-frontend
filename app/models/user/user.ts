export class User {
  private admin: boolean;
  private firstName: string;
  private id: number;
  private lastName: string;
  private team: number;
  private username: string;

  constructor(data: any) {
    this.admin = data.admin;
    this.firstName = data.firstName;
    this.id = data.id;
    this.lastName = data.lastName;
    this.team = data.team;
    this.username = data.username;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getId(): number {
    return this.id;
  }

  getLastName(): string {
    return this.lastName;
  }

  getTeamId(): number {
    return this.team;
  }

  getUsername(): string {
    return this.username;
  }

  isAdmin(): boolean {
    return !!this.admin;
  }

  toJson(): string {
    return JSON.stringify(this.asJson());
  }

  asJson(): any {
    return {
      firstName: this.getFirstName(),
      lastName: this.getLastName(),
      username: this.getUsername(),
      admin: this.isAdmin(),
      team: this.getTeamId(),
      id: this.getId()
    };
  }

  static asUsers(users: any[]) {
    return users.map((user: any) => {
      return new User(user);
    });
  }

}
