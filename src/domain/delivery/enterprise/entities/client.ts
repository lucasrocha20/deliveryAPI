import type { Optional } from '@/shared/types/optional';
import { Entity } from '../../../../shared/entities/entity';
import type { UniqueEntityUUID } from '@/shared/entities/uniqueEntityUuid'

export interface ClientProps {
  name: string
  email: string
  phone: string
  address: string
  password: string
  isActive?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export class Client extends Entity<ClientProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get address() {
    return this.props.address
  }

  get phone() {
    return this.props.phone
  }

  get isActive() {
    return this.props.isActive;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: Optional<ClientProps, 'createdAt' | 'updatedAt' | 'isActive'>, uuid?: UniqueEntityUUID) {
    const client = new Client({
      ...props,
      isActive: props.isActive ?? true,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    }, uuid
  );

    return client
  }
}
