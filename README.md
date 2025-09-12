# Desafio Técnico AiqFome

## Justificativa de escolhas
### Stack
- Linguagem: (Typescript)
Optei pelo TypeScript por oferecer tipagem estática robusta, o que aumenta a confiabilidade e reduz erros comuns em tempo de execução. Além disso, o ecossistema voltado a desenvolvimento de APIs (com frameworks como NestJS e Express) favorece a criação de soluções escaláveis, seguras e bem estruturadas, alinhadas com os requisitos do desafio.

Os recursos de decorators, middlewares e validações fortemente tipadas tornam o desenvolvimento mais ágil sem abrir mão da clareza e manutenibilidade do código. Embora alternativas como FastAPI com Python também fossem possíveis, o TypeScript foi escolhido por estar mais alinhado ao meu fluxo de trabalho e por oferecer uma arquitetura mais adequada para evoluir a aplicação em escala.

- Framework: (NestJS)
Embora o ExpressJS seja mais leve e rápido de configurar, o NestJS se destaca neste projeto por oferecer uma arquitetura opinada e recursos nativos que favorecem a escalabilidade e a manutenção. O suporte integrado a documentação (Swagger), validações (class-validator) e injeção de dependências tornam a API mais robusta e fácil de evoluir. Considerando ainda que este sistema pode futuramente compor um ambiente de microsserviços, a modularidade nativa do NestJS será importante.

Além disso, minha familiaridade com o NestJS acelera o desenvolvimento sem comprometer a qualidade do código. Reconheço que sua curva de aprendizado pode ser um obstáculo em alguns contextos, mas para este desafio, os benefícios superam a complexidade inicial.

- Gerenciador de Pacotes: (pnpm)
O pnpm foi escolhido por oferecer uma gestão mais eficiente de dependências em comparação ao npm ou yarn. Diferente do npm, que duplica pacotes em cada projeto e pode gerar pastas node_modules gigantes, o pnpm utiliza um repositório global compartilhado, criando links simbólicos para cada projeto.

Desta forma, reduzimos drasticamente o uso de espaço em disco, melhora a performance na instalação e evita redundâncias. Para um projeto que pode crescer em módulos e integrações, essa eficiência no gerenciamento de dependências é um diferencial importante.

- Banco de Dados: (postgres)
O PostgreSQL foi escolhido não apenas por ser o preferencial do desafio, mas também por suas vantagens técnicas sobre alternativas como MongoDB e MySQL. Em relação a bancos NoSQL como o MongoDB, ele oferece suporte a transações ACID, garantindo consistência e confiabilidade dos dados, o que é fundamental para que os produtos favoritos de um cliente estejam sempre corretos.

Comparado ao MySQL, o PostgreSQL suporta tipos avançados como JSONB, arrays e enums, possui excelente capacidade de otimização de consultas e é amplamente adotado em ambientes de alta escalabilidade. Essa combinação de maturidade, flexibilidade e performance o torna a escolha ideal para este projeto.

- Docker
---
> A escrever.