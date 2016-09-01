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

  getComment() {
    return this.comment;
  }

  getFromUserId() {
    return this.fromUserId;
  }

  getToUserId() {
    return this.toUserId;
  }

  getType() {
    return this.type;
  }

  toJson() {
    return JSON.stringify({
      fromUserId: this.getFromUserId(),
      toUserId: this.getToUserId(),
      type: this.getType(),
      comment: this.getComment()
    });
  }

  static asRecognitions(recognitions: any[]) {
    return recognitions.map((recognition: any) => {
      return new Recognition(recognition);
    });
  }
}
