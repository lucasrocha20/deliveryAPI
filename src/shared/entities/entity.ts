import { UniqueEntityUUID } from './uniqueEntityUuid';

export abstract class Entity<Props> {
  private _uuid: UniqueEntityUUID;
  protected props: Props;

  get uuid() {
    return this._uuid;
  }

  protected constructor(props: Props, uuid?: UniqueEntityUUID) {
    this.props = props;
    this._uuid = uuid ?? new UniqueEntityUUID();
  }

  public equalsUUID(entity: Entity<unknown>) {
    if (entity === this) {
      return true;
    }

    if (entity.uuid === this._uuid) {
      return true;
    }

    return false;
  }
}
