import { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
  Checkbox,
  Badge,
  Separator,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Skeleton,
  Switch,
  Grid,
  GridItem,
} from "./components/ui";
import { Info } from "lucide-react";

const App = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "1.875rem", fontWeight: 700, marginBottom: "1.5rem" }}>
        Design System - Componentes Padronizados
      </h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList style={{ marginBottom: "1.5rem" }}>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="forms">Formulários</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="extras">Extras</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Variações de botões</CardDescription>
              </CardHeader>
              <CardContent style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card Component</CardTitle>
                <CardDescription>Estrutura de card padronizada</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Conteúdo do card com espaçamento consistente.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Cancelar</Button>
                <Button>Confirmar</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tooltip</CardTitle>
                <CardDescription>Informações contextuais</CardDescription>
              </CardHeader>
              <CardContent>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Info size={16} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Esta é uma dica informativa!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dropdown Menu</CardTitle>
                <CardDescription>Menu suspenso interativo</CardDescription>
              </CardHeader>
              <CardContent>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Abrir Menu</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Perfil</DropdownMenuItem>
                    <DropdownMenuItem>Configurações</DropdownMenuItem>
                    <DropdownMenuItem>Sair</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forms">
          <Card style={{ maxWidth: "500px" }}>
            <CardHeader>
              <CardTitle>Formulário de Exemplo</CardTitle>
              <CardDescription>Usando componentes padronizados</CardDescription>
            </CardHeader>
            <CardContent style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem", fontWeight: 500 }}>
                  Nome
                </label>
                <Input placeholder="Digite seu nome" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem", fontWeight: 500 }}>
                  Email
                </label>
                <Input type="email" placeholder="exemplo@email.com" />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.875rem", fontWeight: 500 }}>
                  Categoria
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Opção 1</SelectItem>
                    <SelectItem value="option2">Opção 2</SelectItem>
                    <SelectItem value="option3">Opção 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Cancelar</Button>
              <Button>Salvar</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Dialog (Modal)</CardTitle>
                <CardDescription>Caixa de diálogo interativa</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>Abrir Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Título do Dialog</DialogTitle>
                      <DialogDescription>
                        Esta é uma descrição do dialog. Você pode adicionar qualquer conteúdo aqui.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={() => setDialogOpen(false)}>Confirmar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estados de Botão</CardTitle>
                <CardDescription>Variações de estado</CardDescription>
              </CardHeader>
              <CardContent style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <Button disabled>Desabilitado</Button>
                <Button variant="outline" disabled>
                  Outline Desabilitado
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="extras">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>Tags de status</CardDescription>
              </CardHeader>
              <CardContent style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Error</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Avatar</CardTitle>
                <CardDescription>Fotos de perfil</CardDescription>
              </CardHeader>
              <CardContent style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skeleton</CardTitle>
                <CardDescription>Estado de carregamento</CardDescription>
              </CardHeader>
              <CardContent style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <Skeleton style={{ width: "100%", height: "1rem" }} />
                <Skeleton style={{ width: "75%", height: "1rem" }} />
                <Skeleton style={{ width: "50%", height: "1rem" }} />
                <Skeleton style={{ width: "100%", height: "4rem", marginTop: "0.5rem" }} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Controls</CardTitle>
                <CardDescription>Checkbox e Switch</CardDescription>
              </CardHeader>
              <CardContent style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Checkbox
                    id="terms"
                    checked={checkboxChecked}
                    onCheckedChange={setCheckboxChecked}
                  />
                  <Label htmlFor="terms">Aceitar termos</Label>
                </div>
                <Separator />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Label htmlFor="notifications">Notificações</Label>
                  <Switch
                    id="notifications"
                    checked={switchOn}
                    onCheckedChange={setSwitchOn}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Textarea</CardTitle>
                <CardDescription>Campo de texto multi-linha</CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="message" style={{ display: "block", marginBottom: "0.5rem" }}>Mensagem</Label>
                <Textarea id="message" placeholder="Digite sua mensagem aqui..." rows={4} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grid System</CardTitle>
                <CardDescription>Layout em grade responsivo</CardDescription>
              </CardHeader>
              <CardContent>
                <Grid cols={3} gap={2}>
                  <GridItem>
                    <div style={{ padding: "1rem", background: "var(--color-primary-100)", borderRadius: "0.375rem", textAlign: "center" }}>1</div>
                  </GridItem>
                  <GridItem>
                    <div style={{ padding: "1rem", background: "var(--color-primary-100)", borderRadius: "0.375rem", textAlign: "center" }}>2</div>
                  </GridItem>
                  <GridItem>
                    <div style={{ padding: "1rem", background: "var(--color-primary-100)", borderRadius: "0.375rem", textAlign: "center" }}>3</div>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <div style={{ padding: "1rem", background: "var(--color-secondary-100, #f3f4f6)", borderRadius: "0.375rem", textAlign: "center" }}>Span 2</div>
                  </GridItem>
                  <GridItem>
                    <div style={{ padding: "1rem", background: "var(--color-primary-100)", borderRadius: "0.375rem", textAlign: "center" }}>4</div>
                  </GridItem>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;
