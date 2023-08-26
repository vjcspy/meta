import { DataObject } from 'chitility';

export abstract class AbstractModel extends DataObject {
  async save(data: any) {
    if (data.id) {
      // update
      console.log('update');
    } else {
      // insert
      console.log('insert');
    }
  }
}
