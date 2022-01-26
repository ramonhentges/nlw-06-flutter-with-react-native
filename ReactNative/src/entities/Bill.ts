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

  formatedValue = () => {
    return new Intl.NumberFormat(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.value);
  };
}
