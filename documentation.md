Problema atual:
Pedidos desorganizados: Recebo pedidos pelo telefone, WhatsApp e presencialmente, e isso gera erros, atrasos e confusão na cozinha.

Estoque difícil de controlar: Não sei exatamente quanto de cada ingrediente tenho, quando preciso repor ou quais produtos estão acabando rápido, o que causa desperdício ou falta de itens.

Pagamentos e finanças confusas: Os pagamentos ficam espalhados entre dinheiro, cartão presencial e delivery apps, e não tenho uma visão consolidada do faturamento diário ou mensal.

Falta de integração: Cada canal de pedido funciona isoladamente, então é difícil cruzar dados de vendas, estoque e entregas.

Relatórios limitados: Não consigo saber quais pizzas são mais vendidas, quais horários têm maior demanda ou se estou tendo lucro real por produto.


MVP:
- Criação de pedido
- Atualização de estoque conforme os pedidos gerados
- Geração de pagamento

Melhorias:
- Atualização em tempo real para cozinha
- Notificação para o cliente

Domains:
    entities:
        pedido
            Código do pedido
            Cliente (nome, telefone, endereço)
            Itens do pedido (pizzas, bebidas, adicionais)
            Quantidade de cada item
            Status do pedido (recebido, em preparo, pronto, entregue, cancelado)
            Forma de pagamento
            Horário de criação e entrega
        produto
            Nome e descrição
            Ingredientes
            Preço
            Categoria (pizza, bebida, sobremesa, adicional)
            Estoque mínimo recomendado (para alertas)
        ingrediente/INSUMO
            Nome
            Quantidade disponível
            Unidade de medida (kg, litros, unidades)
            Data de validade
            Fornecedor
            Alertas de estoque baixo
        cliente
            Nome completo
            Telefone / e-mail
            Endereço de entrega
            Histórico de pedidos
            Preferências ou observações
        pagamento/transação
            Pedido associado
            Valor pago
            Forma de pagamento (dinheiro, cartão, app de delivery)
            Status (pago, pendente, cancelado)
        funcionário
            Nome e contato
            Função (cozinha, entrega, caixa)
            Pedidos atribuídos
            Desempenho (tempo de preparo, entregas realizadas)

    Agregados:
    - Pedido - PedidoItem (Produto + Quantidade + Preço), StatusPedido
    - Pagamento (Status, metodo de pagamento, valoe)
    - Estoque (Produto, QUantidade)


O que muda ?
1. Pedidos
Status do pedido: recebido → em preparo → pronto → entregue → cancelado
Hora de criação e atualização: precisamos rastrear quando cada mudança de status acontece
Itens do pedido: podem ser alterados ou personalizados antes de finalizar

2. Estoque / Ingredientes
Quantidade disponível: diminui conforme os pedidos são feitos e aumenta quando novos suprimentos chegam
Data de validade: ingredientes podem expirar, então precisamos monitorar constantemente
Alertas de baixo estoque: mudar conforme o consumo

3. Pagamentos
Status do pagamento: pendente → confirmado → cancelado → estornado
Valores pagos: podem ser ajustados em caso de desconto, erro ou reembolso

4. Clientes
Dados de contato e endereço: podem mudar, então é importante manter histórico para rastrear entregas passadas
Histórico de pedidos: cresce continuamente e precisa ser armazenado para análises e recompra

5. Produtos / Cardápio
Preço: pode mudar por promoções ou reajustes
Disponibilidade: alguns produtos podem ser temporariamente indisponíveis
Ingredientes associados: podem mudar se a receita for alterada

6. Funcionários / Entregadores
Pedidos atribuídos: mudam ao longo do turno
Desempenho / histórico de entregas: cresce com o tempo e deve ser rastreado

Cenarios de uso
Criar pedido
atualizar estoque
processar pagamento