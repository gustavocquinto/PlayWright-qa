# 🧪 Playwright QA Automation Project

Automação de testes **E2E** desenvolvida com **Playwright + TypeScript**, seguindo boas práticas modernas de QA e arquitetura escalável.  
Este projeto foi criado para demonstrar domínio em automação de testes, organização de código e uso de padrões profissionais aplicados a cenários reais.

---

## 🚀 Tecnologias e Ferramentas

- **Playwright** → Framework de testes E2E moderno e rápido  
- **TypeScript** → Tipagem estática e melhor manutenção de código  
- **Faker.js** → Geração dinâmica de dados para testes  
- **Dotenv** → Gerenciamento de variáveis de ambiente  
- **Node.js / NPM** → Ambiente e gerenciador de pacotes  

---




🧠 **Padrões aplicados:**
- Page Object Model (POM)
- Test Data Factory (Faker)
- Separação entre camadas (Page, Factory, Model, Test)
- Configuração centralizada e escalável
- Geração automática de relatórios

---

## ▶️ Como Executar o Projeto

1. **Clonar o repositório**
```bash
    git clone https://github.com/gustavocquinto
    cd PlayWright-qa
```

2. **Instalar dependências**

```bash
    npm install
```   
3. **Configurar o ambiente**

```bash
    Copie o arquivo .env.example e transforme em .env

    Ajuste as variáveis conforme necessário (credenciais etc.)
```
4. **Executar os testes**

```bash
    npx playwright test
```

5. **Visualizar relatório**

```bash
    npx playwright show-report
```

### 📊 Relatórios e Resultados
Os relatórios HTML são gerados automaticamente após a execução, localizados em:

```bash
/playwright-report/index.html
```
<p>
    <img src="/assets/playwright-report.png">
</p>

### 🧠 Conceitos e Boas Práticas Aplicadas
<p> ✅ Arquitetura modular e reutilizável </p>
<p> ✅ Geração de dados dinâmicos (evita dependência de massa fixa)</p>
<p>✅ Separação clara entre camadas de teste</p>
<p> ✅ Configuração flexível via .env</p>
<p> ✅ Testes limpos e legíveis com Arrange → Act → Assert</p>
<p> ✅ Estrutura pronta para CI/CD (GitHub Actions, Jenkins, etc.)</p>

-----

### 💡 Próximos Passos (roadmap pessoal)
 Adicionar integração com Allure Report - Todo

 Adicionar execução automática em GitHub Actions - Done  ✅

 Incluir fixtures personalizadas (ex: login reutilizável) - Done ✅

 Melhorar README com prints e GIFs de execução real - To do

---

## 👨‍💻 Autor
<p>Gustavo Quinto</p>
<p> QA Pleno | Especialista em Automação de Testes</p>
<p>📧 gustavo.carneiro.quinto10@gmail.com</p>
<p> 🌐 [LinkedIn](https://www.linkedin.com/in/gustavo-quinto/) • [GitHub](https://github.com/gustavocquinto)</p>

<hr>

🧩 _Este projeto tem como objetivo demonstrar domínio técnico em automação de testes com Playwright, boas práticas de arquitetura e aplicação de padrões profissionais utilizados em times de QA modernos._