## Sobre o projeto
Foi desenvolvido uma mini plataforma de cadastro de contatos, o usuário pode se cadastrar e efetuar o login, e em seguida cadastrar seus contatos, e poder lista-los e ver no mapa o endereço de cada um conforme o preenchido.
### [Video de demonstração](https://youtu.be/VFGH9LS0bG0)
## Tecnologias usadas
- [React](https://pt-br.legacy.reactjs.org/) - A base do projeto
- [Next.js](https://nextjs.org/docs) - Framework escolhido para rodar no React
- [MockAPI](https://mockapi.io/) - Para armazenar os contatos
- [Typescript](https://www.typescriptlang.org/) - O Javascript com tipagem
- [Google Maps Platform](https://developers.google.com/maps/apis-by-platform) - Para gerar os mapas de cada contato
  
## Rodando o projeto
Antes de iniciar o servidor de desenvolvimento, certifique-se de incluir a variável de ambiente do Google necessária para o funcionamento correto do projeto. Você pode fazer isso criando um arquivo .env.local na raiz do seu projeto e adicionando a variável de ambiente conforme abaixo:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=SuaChaveDeAPIAqui
```
Em seguida, execute o servidor de desenvolvimento:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

Você pode começar a editar a página modificando app/page.tsx. A página se atualiza automaticamente conforme você edita o arquivo.
