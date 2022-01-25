export class Bill {
  constructor() {
    this.id = '';
    this.name = '';
    this.dueDate = new Date();
    this.value = 0;
    this.barcode = '';
  }

  id: string;
  name: string;
  dueDate: Date;
  value: number;
  barcode: string;
  payDate?: Date;
}
