ControlFlow - Sistema Fintech

Sistema de controle financeiro pessoal relativo à atividade do Capítulo 14 da Fase 7.

---

Antes de começar, certifique-se de ter instalado:

- Java JDK 17 ou superior
- Maven 3.8+
- Node.js 20.9+ (LTS)
- npm ou pnpm
- Acesso à instância Oracle da FIAP 

---

Backend

1. Descompacte o arquivo zip exportado e abra na sua IDE 


2. Configure o banco de dados:
Edite o arquivo "src/main/resources/application.properties":

spring.datasource.url=jdbc:oracle:thin:@oracle.fiap.com.br:1521:ORCL
spring.datasource.username=seu_usuario_fiap
spring.datasource.password=sua_senha_fiap
(no meu caso, RM561557, 200306)
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true


3. Compile e execute:
bash
mvn clean install
mvn spring-boot:run


O backend estará disponível em: http://localhost:8080

---

Frontend

1. Descompacte o arquivo zip exportado e abra na sua IDE

2. Instale as dependências:
bash
npm install
(ou)
pnpm install

3. Execute:

bash
npm run dev
(ou)
pnpm dev

---

Dados de Autenticação:
Para acessar o sistema, utilize os dados a seguir:

Usuário: "admin"  
Senha: "admin123"

---

Em caso de dúvidas ou problemas:
1. Verifique se todas as dependências estão instaladas
2. Confirme que o backend está rodando antes do frontend
3. Verifique as variáveis de ambiente no ".env.local"

