export class Recognition {
  private fromUserId: number;
  private toUserId: number;
  private type: string;
  private comment: string;

  constructor(data: any) {
    this.fromUserId = data.fromUserId;
    this.toUserId = data.toUserId;
    this.type = data.type;
    this.comment = data.comment;
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
