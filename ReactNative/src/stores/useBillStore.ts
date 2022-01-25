import create from 'zustand';
import { Bill } from '../entities';
import { Response } from '../types';
import database from '@react-native-firebase/database';
import { billToFirebase, firebaseToBill } from '../converter';
import auth from '@react-native-firebase/auth';

const userId = auth().currentUser?.uid || '';

const billsRef = database().ref('bills').child(userId);

export const useBillStore = create<BillStoreProps>(set => ({
  paidBills: [],
  unpaidBills: [],
  addBill: (bill: Bill) => {
    const key = billsRef.push(billToFirebase(bill)).key;

    bill.id = key || '';
    set(state => ({
      paidBills: state.paidBills,
      unpaidBills: [bill, ...state.unpaidBills],
    }));

    return { status: 'ok', data: bill };
  },
  getBills: () => {
    billsRef.on('value', data => {
      const values: any = data.toJSON() || {};
      const keys = Object.keys(values);
      const unpaid: Bill[] = [];
      const paid: Bill[] = [];
      for (const key of keys) {
        const bill = firebaseToBill(key, values[key]);
        if (bill?.payDate) {
          paid.push(bill);
        } else {
          unpaid.push(bill);
        }
      }
      billsRef.off('value');
      set({ paidBills: paid, unpaidBills: unpaid });
    });
  },
  resetStore: () => {
    billsRef.off('value');
    set({ paidBills: [], unpaidBills: [] });
  },
  payBill: (bill: Bill) => {
    bill.payDate = new Date();
    billsRef.child(bill.id).set(billToFirebase(bill));
    set(state => ({
      paidBills: [bill, ...state.paidBills],
      unpaidBills: state.unpaidBills.filter(val => val.id !== bill.id),
    }));
    return { status: 'ok', data: bill };
  },
}));

type BillStoreProps = {
  paidBills: Bill[];
  unpaidBills: Bill[];
  addBill: (bill: Bill) => Response;
  getBills: () => void;
  resetStore: () => void;
  payBill: (bill: Bill) => Response;
};
