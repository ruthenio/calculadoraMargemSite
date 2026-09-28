# CalculaMargem

Site estático de calculadora de margem de lucro, markup e preço de venda, hospedado no **GitHub Pages** com domínio personalizado `calculamargem.com.br`.

---

## Estrutura do projeto

```
calculadoraMargemSite/
├── index.html                    # Página principal (calculadora + guia completo)
├── css/style.css                 # Estilos globais
├── js/calculadora.js             # Lógica das calculadoras
├── ads.txt                       # Autorização Google AdSense
├── robots.txt                    # Diretivas para crawlers
├── sitemap.xml                   # Mapa do site para SEO
├── CNAME                         # Domínio personalizado (calculamargem.com.br)
├── calculadora-markup/           # Página: Calculadora de Markup
├── calculadora-desconto/         # Página: Calculadora de Desconto
├── calculadora-lucro/            # Página: Calculadora de Lucro
├── calculadora-preco-venda/      # Página: Calculadora de Preço de Venda
├── margem-bruta/                 # Artigo: O que é Margem Bruta
├── margem-liquida/               # Artigo: O que é Margem Líquida
├── formacao-de-preco/            # Guia: Formação de Preço
├── como-calcular-markup/         # Tutorial: Como Calcular Markup
└── como-definir-preco-de-venda/  # Guia: Como Definir Preço de Venda
```

---

## Implantação: GitHub Pages

O site é publicado diretamente pelo GitHub Pages a partir da branch `master`, sem nenhum processo de build.

### 1. Configurar o GitHub Pages

Acesse: **https://github.com/ruthenio/calculadoraMargemSite/settings/pages**

| Campo | Valor |
|---|---|
| **Source** | Deploy from a branch |
| **Branch** | `master` |
| **Folder** | `/ (root)` |

Clique em **Save**.

### 2. Configurar o domínio personalizado

Na mesma página, na seção **Custom domain**:

1. Digite `calculamargem.com.br`
2. Clique em **Save**
3. O GitHub vai verificar o DNS — aguarde alguns minutos

> O arquivo `CNAME` na raiz do repositório já contém `calculamargem.com.br` e é criado/atualizado automaticamente pelo GitHub ao salvar o domínio personalizado.

### 3. Ativar HTTPS

Após o DNS propagar, marque a opção **Enforce HTTPS** na mesma página.

O GitHub emite o certificado SSL automaticamente via Let's Encrypt. Se a opção estiver cinza, aguarde a propagação do DNS (pode levar até 24 horas).

---

## Configuração de DNS

Configure os seguintes registros no painel do seu registrador de domínio (ex.: Registro.br, GoDaddy, Cloudflare):

### Registros A (apex domain `calculamargem.com.br`)

| Tipo | Nome | Valor |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

### Registro CNAME (`www`)

| Tipo | Nome | Valor |
|---|---|---|
| CNAME | `www` | `ruthenio.github.io` |

> Os IPs dos registros A são os endereços fixos do GitHub Pages. O CNAME do `www` aponta para o usuário do GitHub.

---

## Publicar atualizações

Não há pipeline de CI/CD. Basta fazer commit e push para a branch `master`:

```bash
git add .
git commit -m "descrição da alteração"
git push origin master
```

O GitHub Pages publica automaticamente em até 1–2 minutos após o push.

---

## Serviços externos configurados

| Serviço | Identificador | Onde configurar |
|---|---|---|
| Google AdSense | `ca-pub-3304555597181143` | `ads.txt` + script no `<head>` do `index.html` |
| Google Analytics 4 | `G-L3J38JGCBN` | Script no `<head>` de todas as páginas |

> **Importante:** o script do AdSense está presente **apenas no `index.html`** — a página com conteúdo editorial completo. As páginas internas não carregam o AdSense enquanto não tiverem conteúdo suficiente.
