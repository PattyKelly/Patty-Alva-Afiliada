
## Deploy

- O Netlify está conectado ao GitHub. Toda alteração na branch `main` dispara um novo deploy.
- Diretório publicado: raiz do projeto (`publish = "."` no `netlify.toml`).

## Variáveis de ambiente (se usar a função do chat)

- Configure em **Netlify ▸ Site settings ▸ Environment variables**:
  - `OPENAI_API_KEY`: sua chave da OpenAI.

## Rebuild manual

Se precisar, em **Netlify ▸ Deploys** clique **Trigger deploy ▸ Clear cache and deploy site**.

## Contato

Dúvidas ou melhorias, abrir uma _issue_ no GitHub ou falar comigo. 🙂
