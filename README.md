<h1 align='center'> :rocket: Processo seletivo Academia do Desenvolvedor :rocket:</h1>

<h2 align='center'> :writing_hand:Descrição</h1>

O projeto é um aplicativo móvel desenvolvido em React Native, utilizando a biblioteca Expo. Ele oferece funcionalidades de autenticação, permitindo que os usuários realizem login, criem contas e acessem seus perfis. A navegação entre telas é gerenciada pelo React Navigation.

## :gear: Funcionalidades Principais
### Autenticação:

<p float="left" align="middle">
  <img width="300" src='https://github.com/Luisfp0/react-native-registration-app/assets/122934447/4f2cfc15-8715-46b1-a160-68aba728148b'/>
  <img width="300" src="https://github.com/Luisfp0/react-native-registration-app/assets/122934447/23361863-e378-4f86-ae7c-1f30fbb13210"/>!
</p>

Login e criação de conta, com validação de e-mail e validação de senha forte.
O estado do usuário é mantido usando a Context API do React e com um banco de dados no supabase.

### Perfil do Usuário:
<p float="left" align="middle">
  <img width="300" src='https://github.com/Luisfp0/react-native-registration-app/assets/122934447/9bc172e1-6ca7-4317-8bb3-d4e0fd4ae927'/>
</p>

Exibição de informações do perfil. Com opção de fazer logout, excluir conta e de alterar a imagem do perfil com uma foto da galeria, salvando a mesma no storage do supabase.

### Integração com Supabase:
O Supabase é utilizado para armazenar todos os dados do usuário em um banco de dados e a imagem de perfil no storage.

## 🛠️ Construído com

* [React Native](https://reactnative.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Supabase](https://supabase.com/)


## 🔧 Rodando o projeto localmente
### Clonando o Repositório

```bash
git clone git@github.com:Luisfp0/react-native-registration-app.git
ou
git clone https://github.com/Luisfp0/react-native-registration-app.git

cd react-native-registration-app
```
### Instalando dependências

```bash
yarn
```

### Executando o projeto
```bash
yarn start
```
Isso iniciará o aplicativo em um ambiente de desenvolvimento. Siga as instruções adicionais que aparecerão no console.
