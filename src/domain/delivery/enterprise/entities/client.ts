import { Entity } from '@/shared/entities/entity'
import type { UniqueEntityUUID } from '@/shared/entities/uniqueEntityUuid'

export interface ClientProps {
  name: string
  email: string
  phone: string
  address: string
  password: string
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

  static create(props: ClientProps, uuid?: UniqueEntityUUID) {
    const client = new Client(props, uuid)

    return client
  }
}
