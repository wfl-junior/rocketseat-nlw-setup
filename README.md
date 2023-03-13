![App Screenshot](.github/cover.png)

# Rocketseat NLW Setup

Aplicação para controle de hábitos.

## Requisitos

- [Node](https://nodejs.org) versão LTS
- [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com/getting-started/install)
- [Expo](https://docs.expo.dev/get-started/installation)

## Instruções

1. Semeie os hábitos no banco de dados rodando `yarn seed` dentro da pasta `server`
1. Inicie o servidor do backend em um terminal, rodando o comando `npm run dev` ou `yarn dev` dentro da pasta `server`
1. Inicie o servidor da web em outro terminal, rodando `npm run dev` ou `yarn dev` dentro da pasta `web`
1. Para utilizar o aplicativo web, basta abrir [http://localhost:5173](http://localhost:5173) em algum browser
1. Inicie o servidor do app em outro terminal, rodando `npx expo start` dentro da pasta `app`
1. Para iniciar o app, basta seguir as instruções do [Expo](https://docs.expo.dev/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet) para iniciá-lo em um emulador ou dispositivo físico

## Tech Stack

- [TypeScript](https://www.typescriptlang.org)

### Backend

- [Node](https://nodejs.org)
- [Fastify](https://www.fastify.io)
- [Prisma](https://www.prisma.io)
- [SQLite](https://www.sqlite.org/index.html)
- [zod](https://github.com/colinhacks/zod)
- [dayjs](https://day.js.org)

### Web

- [React](https://reactjs.org)
- [Vite](https://vitejs.dev)
- [Tailwind](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [React Query](https://react-query-v3.tanstack.com)
- [Framer Motion](https://www.framer.com/motion)
- [Axios](https://axios-http.com)
- [dayjs](https://day.js.org)

### App

- [React](https://reactjs.org)
- [React Native](https://reactnative.dev)
- [Expo](https://docs.expo.dev/index.html)
- [Tailwind](https://tailwindcss.com)
- [NativeWind](https://www.nativewind.dev)
- [React Navigation](https://reactnavigation.org)
- [React Query](https://react-query-v3.tanstack.com)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated)
- [Axios](https://axios-http.com)
- [dayjs](https://day.js.org)

## Alterações minhas incluem

- Responsividade na web
- Animações na web
- Caching de requisições
- Skeleton screens para estados de loading
