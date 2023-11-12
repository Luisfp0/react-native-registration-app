# Aplicativo de cadastro

## Descrição

O projeto é um aplicativo móvel desenvolvido em React Native, utilizando a biblioteca Expo. Ele oferece funcionalidades de autenticação, permitindo que os usuários realizem login, criem contas e acessem seus perfis. A navegação entre telas é gerenciada pelo React Navigation.

## Funcionalidades Principais
### Autenticação:

Login e criação de conta, com validação de e-mail.
O estado do usuário é mantido usando a Context API do React e com um banco de dados no supabase.

### Perfil do Usuário:

Exibição de informações do perfil.
Upload de imagens de perfil, com opção de escolher da galeria.

### Integração com Supabase:
O Supabase é utilizado para armazenar dados de usuário e imagens de perfil.

## Rodando o projeto localmente
### Clonando o Repositório

```bash
git clone git@github.com:Luisfp0/react-native-registration-app.git
ou
git clone https://github.com/Luisfp0/react-native-registration-app.git

cd react-native-registration-app
```
## Instalando dependências

```bash
yarn
```

## Executando o projeto
### Para ambientes de desenvolvimento
```bash
yarn start
```
Isso iniciará o aplicativo em um ambiente de desenvolvimento. Siga as instruções adicionais que aparecerão no console.
