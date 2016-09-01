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

  getFirstName() {
    return this.firstName;
  }

  getId() {
    return this.id;
  }

  getLastName() {
    return this.lastName;
  }

  getTeamId() {
    return this.team;
  }

  getUsername() {
    return this.username;
  }

  isAdmin() {
    return !!this.admin;
  }

}
