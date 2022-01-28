import create from 'zustand';
import { Bill } from '../entities';
import { Response } from '../types';
import database from '@react-native-firebase/database';
import { billToFirebase, firebaseToBill } from '../converter';
import auth from '@react-native-firebase/auth';

let userId = '';

let billsRef = database().ref('bills').child(userId);

auth().onAuthStateChanged(user => {
  useBillStore.getState().resetStore();
  userId = user?.uid || '';
  if (user) {
    billsRef = database().ref('bills').child(userId);
    useBillStore.getState().getBills();
  }
});

export const useBillStore = create<BillStoreProps>(set => ({
  paidBills: [],
  unpaidBills: [],
  loading: true,
  addBill: (bill: Bill) => {
    const ref = billsRef.push();

    bill.id = ref.key || '';
    set(state => ({
      paidBills: state.paidBills,
      unpaidBills: [bill, ...state.unpaidBills],
    }));

    ref.set(billToFirebase(bill)).then(() => {
      bill.sended = true;

      set(state => ({
        paidBills: state.paidBills,
        unpaidBills: state.unpaidBills.map(cur =>
          cur.id === bill.id ? bill : cur,
        ),
      }));
    });

    return { status: 'ok', data: bill };
  },
  getBills: () => {
    billsRef.on('value', data => {
      billsRef.off('value');
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
      set({ loading: false, paidBills: paid, unpaidBills: unpaid });
    });
  },
  resetStore: () => {
    set({ loading: true, paidBills: [], unpaidBills: [] });
  },
  payBill: (bill: Bill) => {
    bill.payDate = new Date();
    bill.sended = false;

    set(state => ({
      ...state,
      paidBills: [bill, ...state.paidBills],
      unpaidBills: state.unpaidBills.filter(val => val.id !== bill.id),
    }));

    billsRef
      .child(bill.id)
      .set(billToFirebase(bill))
      .then(() => {
        bill.sended = true;

        set(state => ({
          paidBills: state.paidBills.map(cur =>
            cur.id === bill.id ? bill : cur,
          ),
          unpaidBills: state.unpaidBills,
        }));
      });
    return { status: 'ok', data: bill };
  },
  removeBill: (bill: Bill) => {
    bill.payDate = new Date();
    billsRef.child(bill.id).remove();
    set(state => ({
      ...state,
      paidBills: state.paidBills.filter(val => val.id !== bill.id),
      unpaidBills: state.unpaidBills.filter(val => val.id !== bill.id),
    }));
    return { status: 'ok', data: bill };
  },
}));

type BillStoreProps = {
  paidBills: Bill[];
  unpaidBills: Bill[];
  loading: boolean;
  addBill: (bill: Bill) => Response;
  getBills: () => void;
  resetStore: () => void;
  payBill: (bill: Bill) => Response;
  removeBill: (bill: Bill) => Response;
};
