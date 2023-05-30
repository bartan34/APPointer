import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import {
  Database,
  child,
  get,
  getDatabase,
  onValue,
  ref,
} from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  // private path = '/records';
  // ref: AngularFireList<any>;
  // constructor(private db: AngularFireDatabase) {
  //   this.ref = db.list(this.path);
  // }
  // getAllRecords() {
  //   return this.ref;
  // }

  private data$ = new BehaviorSubject<any>(null);

  constructor(public database: Database) {
    this.getRecrods();
  }

  getRecords$() {
    return this.data$.asObservable();
  }

  getRecrods() {
    const db = getDatabase();

    const starCountRef = ref(db, 'records');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      this.data$.next(data);
    });
  }

  getRecord(id: string) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `records/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
