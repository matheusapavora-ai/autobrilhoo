# AutoBrilho

Site institucional da AutoBrilho Estética Automotiva, em Ponta Grossa, com informações sobre serviços, localização e contato direto pelo WhatsApp. O workspace também contém um serviço API Express e bibliotecas compartilhadas.

## Requisitos

- Node.js 24
- pnpm 10.26.1 (Corepack é recomendado)

## Instalação

```bash
corepack enable
corepack prepare pnpm@10.26.1 --activate
pnpm install --frozen-lockfile
```

## Desenvolvimento

Inicie o site em um terminal:

```bash
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/autobrilho run dev
```

Para iniciar a API em outro terminal:

```bash
PORT=8080 pnpm --filter @workspace/api-server run dev
```

A API responde em `/api` quando servida pelo roteador do workspace. Fora do Replit, configure o host ou proxy para encaminhar `/api/*` ao processo Express. `PORT` é fornecida automaticamente por algumas plataformas; em execução local, defina-a como nos exemplos.

## Verificação de build

O comando abaixo executa a verificação de tipos e os builds disponíveis no workspace:

```bash
PORT=5173 BASE_PATH=/ pnpm run build
```

O frontend pronto para hospedagem estática é gerado em `artifacts/autobrilho/dist/public`. A API é um processo Node separado; GitHub Pages não executa serviços Express. Este repositório não configura publicação automática no GitHub Pages.

## GitHub

O workflow em `.github/workflows/ci.yml` instala as dependências com o lockfile e valida o workspace em pushes e pull requests. Para criar um repositório a partir do ZIP:

```bash
git init -b main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USUARIO/REPOSITORIO.git
git push -u origin main
```

Não coloque arquivos `.env`, senhas, tokens, chaves ou outros secrets no repositório. Configure valores sensíveis na área de secrets do host que executar a API. O `.gitignore` já exclui arquivos de ambiente e saídas geradas.

## Licença

O `package.json` raiz informa MIT, mas não há um arquivo `LICENSE` neste workspace. Confirme a licença e inclua o arquivo correspondente antes de tornar o repositório público.