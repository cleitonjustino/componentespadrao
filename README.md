# ComponentesPadroes - Padrão React + TypeScript para Devs .NET

 Este é um guia feito por um iniciante em Design Patterns para devs .NET que estão começando com React. Se você programa em C# ou .NET, vai achar bastante coisa familiar aqui! 🚀

> **⭐ Agora com TypeScript!** Este projeto usa TypeScript para type-safety e melhor experiência de desenvolvimento, assim como você está acostumado com C#/VB.NET.

## 🤔 Ok, mas o que é React?

Se você vem de .NET:
- **React é como uma engine de renderização de componentes** que atualiza automaticamente a UI quando os dados mudam
- **JSX/TSX é tipo uma template com C# inline** - você escreve HTML+JavaScript (ou TypeScript) junto
- **Estado (State) é como propriedades de uma classe** que quando mudam, a UI se atualiza automaticamente
- **Props são como parâmetros de método** - você passa dados de componentes pais para filhos
- **TypeScript é como C#** - adiciona tipagem forte e intellisense ao JavaScript

## ⚙️ TypeScript neste Projeto

Todo o código foi migrado para TypeScript (.tsx e .ts). Você terá:

✅ **Type safety** - Erros de tipo detectados em tempo de compilação  
✅ **Intellisense completo** - Sua IDE sabe exatamente quais props cada componente aceita  
✅ **Interfaces tipadas** - Como interfaces em C#  
✅ **Refatoração segura** - Mude um tipo e veja todos os erros imediatamente  

### Exemplo de Tipagem

```tsx
// Componente tipado
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "default", size = "md", ...props }, ref) => {
    return <button ref={ref} {...props} />;
  }
);
```

## 📁 Estrutura do Projeto

```
src/
├── components/
│   └── ui/                    # Componentes reutilizáveis (como seu repositório de padrões)
│       ├── Button.tsx         # ✨ Agora em TypeScript!
│       ├── Card.tsx
│       ├── Grid.tsx
│       └── ... (mais componentes)
├── lib/
│   ├── utils.ts              # Funções utilitárias tipadas
│   └── index.ts
├── styles/
│   └── tokens.css            # Variáveis de design (cores, espaçamentos)
├── App.tsx                   # Componente principal
└── main.tsx                  # Ponto de entrada
├── tsconfig.json             # Configuração do TypeScript
└── vite.config.ts            # Configuração do Vite em TypeScript
```

## 🎯 Padrões Principais

### 1️⃣ Componentes Simples (Stateless)

São como métodos que retornam HTML. Recebem **props** (parâmetros) e renderizam.

```tsx
// src/components/ui/Button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "default", size = "md", ...props }, ref) => (
    <button ref={ref} className={`btn btn-${variant} btn-${size}`} {...props}>
      {children}
    </button>
  )
);

Button.displayName = "Button";

export { Button };
```

**Usando o componente:**
```jsx
import Button from "./components/ui/Button";

function App() {
  return (
    <Button variant="primary" size="lg">
      Clique aqui
    </Button>
  );
}
```

### 2️⃣ Componentes com Estado (Stateful)

Use `useState` quando precisar armazenar dados que mudam (tipo uma variável de instância).

```tsx
import { useState } from "react";

interface CounterState {
  count: number;
}

function Counter(): JSX.Element {
  const [count, setCount] = useState<number>(0);  // Estado inicial = 0
  
  const increment = (): void => {
    setCount(count + 1);  // Atualiza o estado e re-renderiza
  };
  
  return (
    <div>
      <p>Contagem: {count}</p>
      <button onClick={increment}>Incrementar</button>
    </div>
  );
}

export default Counter;
```

### 3️⃣ Props: Passando Dados Entre Componentes

Props são **imutáveis** (tipo `readonly` em C#).

```tsx
// Tipos tipados
interface User {
  name: string;
  email: string;
}

interface UserCardProps {
  user: User;
  theme: "light" | "dark";
}

// Componente Pai
function App(): JSX.Element {
  const user: User = { name: "João", email: "joao@example.com" };
  return <UserCard user={user} theme="dark" />;
}

// Componente Filho
function UserCard({ user, theme }: UserCardProps): JSX.Element {
  return (
    <div className={`card card-${theme}`}>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### 4️⃣ Componentes Compostos (Compound Components)

Use quando um componente é feito de múltiplas partes que trabalham juntas.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./components/ui";

// Como Card funciona
function App(): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meu Título</CardTitle>
        <CardDescription>Descrição aqui</CardDescription>
      </CardHeader>
      <CardContent>
        Conteúdo principal
      </CardContent>
      <CardFooter>
        Rodapé
      </CardFooter>
    </Card>
  );
}
```

### 5️⃣ Renderização Condicional

```tsx
interface UserProfileProps {
  user?: { name: string };
  isLoading: boolean;
}

function UserProfile({ user, isLoading }: UserProfileProps): JSX.Element {
  if (isLoading) {
    return <div>Carregando...</div>;
  }
  
  if (!user) {
    return <div>Usuário não encontrado</div>;
  }
  
  return <div>Nome: {user.name}</div>;
}
```

### 6️⃣ Listas (map)

Em React, use `.map()` para renderizar listas (como `foreach` do C#).

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserListProps {
  users: User[];
}

function UserList({ users }: UserListProps): JSX.Element {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}
```

**⚠️ Importante:** Sempre use uma `key` única para cada item da lista!

## 🎨 Grid com Breakpoints

O Grid funciona com breakpoints responsivos (como Media Queries do CSS).

```tsx
import { Grid, GridItem } from "./components/ui";

function Dashboard(): JSX.Element {
  return (
    <Grid 
      cols={{ 
        initial: 1,    // 1 coluna em phones
        sm: 2,         // 2 colunas em tablets
        md: 3,         // 3 colunas em desktop
        lg: 4          // 4 colunas em telas grandes
      }}
      gap={{ 
        initial: 2,    // Gap pequeno em phones
        md: 4          // Gap maior em desktop
      }}
    >
      <GridItem>Card 1</GridItem>
      <GridItem>Card 2</GridItem>
      <GridItem>Card 3</GridItem>
      <GridItem>Card 4</GridItem>
    </Grid>
  );
}
```

**Breakpoints disponíveis:**
- `initial`: 0px (Phones portrait)
- `xs`: 520px (Phones landscape)
- `sm`: 768px (Tablets)
- `md`: 1024px (Tablets landscape)
- `lg`: 1280px (Laptops)
- `xl`: 1640px (Desktops)

## 🧩 Componentes Disponíveis

### Básicos
- **Button** - Botões com variantes (default, primary, ghost, link)
- **Input** - Campos de texto
- **Label** - Rótulos para formulários
- **Textarea** - Áreas de texto

### Contenedores
- **Card** - Container com header, content, footer
- **Grid/GridItem** - Layout responsivo
- **Separator** - Divisor horizontal

### Feedback
- **Badge** - Tags/etiquetas
- **Avatar** - Imagens de perfil
- **Skeleton** - Placeholder de carregamento

### Interativos
- **Dialog** - Modal/popup
- **Tabs** - Abas
- **Select** - Dropdown (como `<select>`)
- **Checkbox** - Checkboxes
- **Switch** - Toggle switches
- **Tooltip** - Dicas ao passar mouse
- **DropdownMenu** - Menu suspenso

## 🚀 Começando

### 1. Instalação

```bash
npm install
```

### 2. Rodando localmente

```bash
npm run dev
```

Acesse `http://localhost:5173`

### 3. Build para produção

```bash
npm run build
```

### 4. Lint (verificar erros)

```bash
npm run lint
```

## 📚 Exemplo Completo: Formulário Simples

```tsx
import { useState, ChangeEvent, FormEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  Button,
  Input,
  Label,
  Grid,
  GridItem,
} from "./components/ui";

interface FormDataState {
  name: string;
  email: string;
}

function FormExample(): JSX.Element {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
    // Aqui você faria uma chamada à API
  };

  return (
    <Grid cols={{ initial: 1, sm: 2 }} gap={4}>
      <GridItem colSpanResponsive={{ initial: 1, sm: 2 }}>
        <Card>
          <CardHeader>
            <CardTitle>Novo Usuário</CardTitle>
            <CardDescription>Preencha os dados abaixo</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent>
              <div style={{ marginBottom: "1rem" }}>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="João Silva"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="joao@example.com"
                />
              </div>
            </CardContent>

            <CardFooter>
              <Button type="submit" variant="default">
                Salvar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default FormExample;
```

## 🔗 Recursos Úteis

- [React Docs Oficial](https://react.dev) - Documentação completa
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Documentação TypeScript
- [Radix UI](https://www.radix-ui.com) - Biblioteca de componentes que usamos
- [MDN - JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) - Referência JavaScript
- [Vite Docs](https://vitejs.dev) - Build tool que usamos

## 💡 Dicas para Devs .NET

| .NET | React/TypeScript |
|-----|-------|
| `class Component { }` | `function Component(): JSX.Element { return <div> }` |
| Propriedades (Properties) | Props (com tipagem via interfaces) |
| Campos privados | Estado com `useState<T>` |
| `IEnumerable<T>.ForEach()` | `.map((item) => ...)` |
| Herança (Inheritance) | Composição (Composition) |
| Data binding | `onChange={handleChange}` |
| `async/await` | Igual em JavaScript |
| Injeção de dependência | Context API ou props |
| Interfaces | Interfaces TypeScript |
| `null` / `undefined` | `null` / `undefined` com type narrowing |

## ❓ Perguntas Frequentes

**P: Por que meu componente não está atualizando?**
R: Você provavelmente modificou uma variável normal. Use `useState` para dados que mudam!

**P: Qual é a diferença entre Props e State?**
R: Props são como parâmetros (imutáveis), State é dados internos do componente que mudam.

**P: Como faço chamadas à API?**
R: Use `fetch()` ou `axios` dentro de `useEffect()` (para efeitos colaterais).

**P: Como uso TypeScript no React?**
R: Todos os componentes já estão em TypeScript (.tsx). Use interfaces para tipar props e state:
```tsx
interface MyComponentProps {
  title: string;
  count: number;
  onSubmit: (value: string) => void;
}
```

**P: Qual é a diferença entre .jsx e .tsx?**
R: Iguais, mas `.tsx` suporta TypeScript. Nosso projeto usa `.tsx` para type-safety.

## 📝 Notas

- Este projeto usa **React 19** + **TypeScript** para máxima type-safety
- **Radix UI** para componentes acessíveis
- Estilos com **CSS Modules** (evita conflito de nomes)
- Componentes com interface tipadas e JSDoc
- **Grid com breakpoints responsivos** como Radix UI Themes
- Todas as dependências têm `@types/*` instaladas para TypeScript

