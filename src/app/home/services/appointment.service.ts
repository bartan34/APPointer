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

  constructor(public database: Database) {}

  getRecrods() {
    // const dbRef = ref(this.database);
    // get(child(dbRef, `records`))
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       console.log(snapshot.val());
    //     } else {
    //       console.log('No data available');
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    const db = getDatabase();

    const starCountRef = ref(db, 'records');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
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
