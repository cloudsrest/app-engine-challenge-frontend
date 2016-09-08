import {User} from "../user/user";
export class Recognition {
  private fromUserId: number;
  private toUserId: number;
  private type: string;
  private comment: string;
  private toUser: User;
  private fromUser: User;

  constructor(data: any) {
    this.fromUserId = data.fromUserId;
    this.toUserId = data.toUserId;
    this.type = data.type;
    this.comment = data.comment;
    this.toUser = data.toUser || null;
    this.fromUser = data.fromUser || null;
  }

  getComment(): string {
    return this.comment;
  }

  getFromUserId(): number {
    return this.fromUserId;
  }

  getToUserId(): number {
    return this.toUserId;
  }

  getType(): string {
    return this.type;
  }

  toJson(): string {
    return JSON.stringify(this.asJson());
  }

  setToUser(user: User) {
    this.toUser = user;
  }

  getToUser(): User {
    return this.toUser;
  }

  getFromUser(): User {
    return this.fromUser;
  }

  getCreatedAt(): Date {
    // TODO return the actual recognition timestamp
    return new Date();
  }

  setFromUser(user: User) {
    this.fromUser = user;
  }

  asJson(): any {
    return {
      fromUserId: this.getFromUserId(),
      toUserId: this.getToUserId(),
      type: this.getType(),
      comment: this.getComment()
    };
  }

  static asRecognitions(recognitions: any[]): Recognition[] {
    return recognitions.map((recognition: any) => {
      return new Recognition(recognition);
    });
  }
}
