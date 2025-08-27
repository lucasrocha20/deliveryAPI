# 🍕 Projeto Delivery (E-commerce Simplificado com IA e DevOps)

## 🎯 Objetivo
Criar um sistema backend em **Node.js** para simular um **plataforma de pedidos (delivery/e-commerce)**, explorando:
- Arquitetura de microsserviços
- Padrões de mensageria com RabbitMQ
- Proxy reverso e API Gateway com Nginx
- Orquestração com Kubernetes
- Monitoramento com Prometheus & Grafana
- Integração com IA (recomendações e chatbot interno)

---

# 🛣️ Roadmap de Implementação – Projeto Delivery

Este roadmap organiza os passos para construir o **sistema de Delivery/E-commerce** com microsserviços, mensageria, monitoramento, orquestração em Kubernetes e integração com IA.

---

## ✅ Etapa 1 – MVP Backend (Monolito/Serviços Simples)
- [ ] Criar API de **Usuários** (CRUD + autenticação simples).
- [ ] Criar API de **Pedidos** (criar/listar pedidos).
- [ ] Criar API de **Estoque** (cadastro e decremento de produtos).
- [ ] Criar API de **Pagamentos** (processamento fake).
- [ ] Integrar **PostgreSQL** como banco principal.
- [ ] Subir tudo com **Docker Compose** para desenvolvimento local.

---

## 🐇 Etapa 2 – Mensageria com RabbitMQ
- [ ] Configurar **RabbitMQ** no `docker-compose`.
- [ ] API Pedidos → publicar evento `PedidoCriado`.
- [ ] API Estoque → consumir evento `PedidoCriado` e atualizar estoque.
- [ ] API Pagamentos → consumir evento `PedidoCriado` e simular cobrança.
- [ ] Adicionar fila de **Dead Letter** para erros.

---

## 🌐 Etapa 3 – Infraestrutura & Nginx
- [ ] Configurar **Nginx** como API Gateway.
- [ ] Criar rotas: `/usuarios`, `/pedidos`, `/estoque`, `/pagamentos`.
- [ ] Testar load balancing simples com múltiplas instâncias da API de Pedidos.

---

## ☸️ Etapa 4 – Kubernetes
- [ ] Migrar cada serviço para **Kubernetes** (YAMLs em `/infra/k8s`).
- [ ] Criar **Deployments** e **Services** para cada API.
- [ ] Configurar **Ingress Controller (Nginx Ingress)**.
- [ ] Testar comunicação entre serviços no cluster.
- [ ] Subir RabbitMQ e PostgreSQL no cluster.

---

## 📊 Etapa 5 – Monitoramento
- [ ] Configurar **Prometheus** no cluster.
- [ ] Expor métricas dos serviços (ex: `/metrics`).
- [ ] Criar dashboards no **Grafana**:
  - Vendas por dia
  - Pedidos em processamento
  - Taxa de falha de pagamentos
  - Estoque baixo

---

## 🤖 Etapa 6 – Integração de IA (Primeira Feature)
- [ ] Criar microserviço **IA Recommender**.
- [ ] Usar **LangChain + LLM (OpenAI ou modelo open-source)**.
- [ ] Integrar com **Vector DB (Qdrant/Pinecone/Weaviate)** para recomendações.
- [ ] Endpoint: `GET /recommendations/:userId` → sugere produtos.

---

## 💬 Etapa 7 – IA Chatbot Interno
- [ ] Criar microserviço **IA Chatbot**.
- [ ] Conectar ao banco de dados (usuários, pedidos, estoque).
- [ ] Implementar queries inteligentes via LLM:
  - "Quais foram os produtos mais vendidos esta semana?"
  - "Quantos pedidos falharam por falta de estoque?"
- [ ] Integrar com frontend/admin (opcional).

---

## 🔐 Etapa 8 – Resiliência e Escalabilidade
- [ ] Adicionar **Retry** e **Circuit Breaker** nos consumidores RabbitMQ.
- [ ] Implementar **Saga Pattern** para fluxo de pagamentos e estoque.
- [ ] Configurar **Horizontal Pod Autoscaler (HPA)** no Kubernetes.
- [ ] Adicionar **Testes E2E** para o fluxo de pedido completo.

---

## 🚀 Etapa 9 – Extras Futuro
- [ ] Adicionar autenticação JWT/OAuth2.
- [ ] Implementar **CQRS** (separação de leitura/escrita em pedidos).
- [ ] Criar **Frontend simples** (React ou Next.js).
- [ ] Deploy em **nuvem (AWS/GCP/Azure)**.
