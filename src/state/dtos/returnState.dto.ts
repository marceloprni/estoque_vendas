import { StateEntity } from '../entities/state.entity';

export class ReturnStateDTO {
  name: string;

  constructor(stateEntity: StateEntity) {
    this.name = stateEntity.name;
  }
}
