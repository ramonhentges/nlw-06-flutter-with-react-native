export class Bill {
  constructor() {
    this.id = '';
    this.name = '';
    this.dueDate = new Date();
    this.value = 0;
    this.barcode = '';
    this.sended = false;
  }

  id: string;
  name: string;
  dueDate: Date;
  value: number;
  barcode: string;
  payDate?: Date;
  sended: boolean;

  formatedValue = () => {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(this.value);
  };
}
