export class User {
  constructor() {
    this.uid = '';
    this.fullName = '';
  }
  uid: string;
  fullName: string;
  email?: string;
  photoUrl?: string;
}
