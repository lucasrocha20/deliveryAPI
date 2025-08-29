# 🏗️ DDD (Domain-Driven Design) – Guia Essencial para Iniciar Projetos

## 1. O que é DDD?
DDD (Domain-Driven Design) é uma abordagem para desenvolvimento de software focada em entender e modelar o domínio do negócio, promovendo código organizado, escalável e alinhado com as regras de negócio.

---

## 2. Conceitos Fundamentais

- **Domínio:** Área de conhecimento ou atividade central do negócio.
- **Entidade:** Objeto com identidade única (ex: Pedido, Usuário).
- **Value Object:** Objeto sem identidade, definido apenas por seus atributos (ex: Endereço).
- **Agregado:** Grupo de entidades e value objects tratados como uma unidade (ex: Pedido + Itens).
- **Repositório:** Interface para acesso e persistência de agregados.
- **Serviço de Domínio:** Operações que não pertencem a uma entidade específica, mas ao domínio.
- **Fábrica:** Criação complexa de objetos/agregados.
- **Camada de Aplicação:** Orquestra casos de uso do sistema.
- **Camada de Infraestrutura:** Implementações técnicas (DB, APIs, etc).

---

## 3. Estrutura de Pastas Sugerida

```
src/
  ├── domain/
  │     ├── entities/
  │     ├── value-objects/
  │     ├── aggregates/
  │     ├── repositories/
  │     └── services/
  ├── application/
  │     ├── use-cases/
  │     └── dtos/
  ├── infrastructure/
  │     ├── orm/
  │     ├── api/
  │     └── messaging/
  └── presentation/
        └── controllers/
```

---

## 4. Exemplo Prático – Pedido

### Entidade Pedido

```typescript
// src/domain/entities/Pedido.ts
export class Pedido {
  constructor(
    public id: string,
    public usuarioId: string,
    public itens: ItemPedido[],
    public status: PedidoStatus,
    public criadoEm: Date
  ) {}
}
```

### Value Object – ItemPedido

```typescript
// src/domain/value-objects/ItemPedido.ts
export class ItemPedido {
  constructor(
    public produtoId: string,
    public quantidade: number,
    public precoUnitario: number
  ) {}
}
```

### Repositório

```typescript
// src/domain/repositories/PedidoRepository.ts
export interface PedidoRepository {
  salvar(pedido: Pedido): Promise<void>;
  buscarPorId(id: string): Promise<Pedido | null>;
}
```

### Use Case

```typescript
// src/application/use-cases/CriarPedido.ts
export class CriarPedido {
  constructor(private pedidoRepo: PedidoRepository) {}

  async executar(dados: CriarPedidoDTO) {
    // regras de negócio aqui
    const pedido = new Pedido(/* ... */);
    await this.pedidoRepo.salvar(pedido);
    return pedido;
  }
}
```

---

## 5. Dicas para Começar

- **Converse com especialistas do domínio** para entender regras e processos.
- **Modele entidades e value objects** antes de pensar em banco de dados.
- **Separe responsabilidades**: domínio ≠ infraestrutura.
- **Teste regras de negócio** com unit tests.
- **Refatore sempre que aprender algo novo sobre o domínio.**

---

## 6. Referências

- Livro: *Domain-Driven Design* – Eric Evans
- Livro: *Implementing DDD* – Vaughn Vernon
-