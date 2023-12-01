export class ResponseApi {
  ack: number;
  message: string;
  data?: Object[] | Object;
  constructor(ack: number, message?: string, data?: Object[] | Object) {
    this.ack = ack;
    this.message = message;
    this.data = data;
  }
}
