# Salão Eternity — site institucional

Site do Salão Eternity (salão de beleza, público 15–40 anos), feito em Next.js 16 (App Router) + TypeScript estrito + Tailwind CSS 4.

## Rodando localmente

Requisitos: Node.js 20.9 ou superior.

```bash
npm install
cp .env.example .env.local   # preencha o que for usar
npm run dev                  # http://localhost:3000
```

Outros comandos:

| Comando             | O que faz                          |
| ------------------- | ---------------------------------- |
| `npm run build`     | Build de produção                  |
| `npm run start`     | Sobe o build de produção           |
| `npm run lint`      | ESLint (regras do Next + TS)       |
| `npm run typecheck` | Checagem de tipos sem gerar build  |
| `npm run format`    | Prettier (ordena classes Tailwind) |

## Variáveis de ambiente

| Variável               | Obrigatória | Para que serve                                                                           |
| ---------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Sim (prod)  | URL pública sem barra final. Usada em canonical, sitemap, robots, Open Graph e JSON-LD.  |
| `NEXT_PUBLIC_GA_ID`    | Não         | ID do GA4 (`G-XXXX`). Só carrega depois que a visitante aceita os cookies.               |
| `RESEND_API_KEY`       | Não         | Chave do Resend para receber os pedidos de horário por e-mail.                           |
| `BOOKING_EMAIL_TO`     | Não         | E-mail do salão que recebe os pedidos.                                                   |
| `BOOKING_EMAIL_FROM`   | Não         | Remetente verificado no Resend, ex.: `Site Eternity <agendamento@salaoeternity.com.br>`. |

Sem o Resend configurado o formulário continua funcionando: a cliente conclui o pedido pelo WhatsApp com a mensagem já preenchida.

## Onde editar o conteúdo

Tudo que é do cliente fica em `content/` — não é preciso mexer em componentes.

- `content/site.ts` — nome, WhatsApp, telefone, endereço, horários, Instagram, nota do Google, palavras-chave.
- `content/services.ts` — serviços, categorias e preços (sem `price` aparece "Valor sob consulta"). Cada serviço gera uma página em `/servicos/[slug]`.
- `content/home.ts` — textos da home, fotos, depoimentos, FAQ, passos de agendamento.

**Tudo entre `[COLCHETES]` é placeholder** e precisa ser confirmado com o salão antes de publicar. Para listar:

```bash
grep -rn "\[" content/ app/politica-de-privacidade/
```

### Fotos

Salve as imagens em `public/images/` e preencha o `src` correspondente em `content/home.ts` (ex.: `src: "/images/mechas-01.jpg"`). Use JPG/PNG grandes; o `next/image` converte para AVIF/WebP e gera os tamanhos. Sem `src`, o site mostra um espaço reservado na identidade visual.

## Estrutura

```
app/                  rotas, metadata, sitemap, robots, OG image, ícones, 404/erro
components/ui/        peças visuais reutilizáveis (botão, mídia, ícones, logo ∞)
components/sections/  seções da home e da página de serviço
components/layout/    header, footer, barra mobile, cookies, analytics
content/              conteúdo do cliente (único lugar a editar por cliente)
lib/                  WhatsApp, analytics, consentimento, validação, JSON-LD, rate limit
lib/actions/          Server Action do agendamento
services/             integrações externas (Resend)
types/                tipos do conteúdo
```

## Decisões técnicas

- **Fontes auto-hospedadas** (`next/font/local`, Gloock + Bricolage Grotesque só com eixo de peso): sem requisição ao Google, build determinístico e LCP menor.
- **Formulário carregado sob demanda**: Zod + React Hook Form só baixam quando a seção de agendamento se aproxima (~75 KB a menos no carregamento inicial).
- **Mapa do Google só com clique**: evita cookies de terceiros sem consentimento (LGPD) e ~1 MB de JS.
- **GA4 só após consentimento**. Eventos: `whatsapp_click`, `phone_click`, `instagram_click`, `cta_click`, `map_load`, `booking_submit`, `booking_success`, `booking_error` (parâmetro `location` indica de onde veio o clique).
- **Antispam**: honeypot, tempo mínimo de preenchimento e rate limit por IP (em memória; para tráfego alto, trocar por Upstash Redis). Validação Zod no cliente e no servidor.
- **Cabeçalhos de segurança** (CSP, HSTS, X-Frame-Options etc.) em `next.config.ts`.
- **JSON-LD**: `BeautySalon`, `FAQPage`, `Service` e `BreadcrumbList`. Sem `aggregateRating` próprio (o Google ignora e pode penalizar); as estrelas vêm do Google Meu Negócio.

## Deploy (Vercel)

1. Suba o repositório no GitHub e importe na Vercel.
2. Cadastre as variáveis de ambiente (no mínimo `NEXT_PUBLIC_SITE_URL`).
3. Configure o domínio. HTTPS é automático.
4. Depois do deploy: envie o sitemap (`/sitemap.xml`) no Google Search Console e coloque o link do site no perfil do Google Meu Negócio e na bio do Instagram.
