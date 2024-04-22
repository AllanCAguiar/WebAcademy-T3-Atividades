import { PrismaClient, Cliente } from "@prisma/client";

const prisma = new PrismaClient();

// Função para criar um novo cliente
async function criarCliente(
  cpf: string,
  nome_completo: string,
  num_celular: string,
  email: string,
  data_nascimento: Date,
): Promise<Cliente> {
  // Verificar se o CPF já existe na tabela
  const clienteExistente = await prisma.cliente.findUnique({
    where: {
      cpf: cpf,
    },
  });
  // Se o cliente já existir, lança um erro
  if (clienteExistente) {
    throw new Error("Já existe um cliente com o CPF fornecido.");
  }

  // Se o cliente não existir, cria um novo cliente
  return await prisma.cliente.create({
    data: {
      cpf: cpf,
      nome_completo: nome_completo,
      num_celular: num_celular,
      email: email,
      data_nascimento: data_nascimento,
    },
  });
}

// Função para buscar todos os clientes
async function buscarTodosClientes(): Promise<Cliente[]> {
  return await prisma.cliente.findMany();
}

// Função para buscar um único cliente pelo CPF
async function buscarClientePorCPF(cpf: string): Promise<Cliente | null> {
  return await prisma.cliente.findUnique({
    where: { cpf: cpf },
  });
}

// Função para atualizar um cliente
async function atualizarCliente(
  cpf: string,
  // Pode atualizar todos ou apenas alguns atríbutos
  dadosAtualizados: {
    nome_completo?: string;
    num_celular?: string;
    email?: string;
    data_nascimento?: Date;
  },
): Promise<Cliente | null> {
  // Verifica se o cliente com o CPF fornecido existe
  const clienteExistente = await prisma.cliente.findUnique({
    where: { cpf: cpf },
  });
  // Se o cliente não existir, lança um erro
  if (!clienteExistente) {
    throw new Error("Cliente não encontrado.");
  }
  // Se o cliente existir, procede com a atualização
  return await prisma.cliente.update({
    where: { cpf: cpf },
    data: dadosAtualizados,
  });
}

// Função para excluir um cliente
async function excluirCliente(cpf: string): Promise<Cliente | null> {
  return await prisma.cliente.delete({
    where: { cpf: cpf },
    include: {
      endereco: true,
    },
  });
}

async function main() {
  // const novoCliente1 = await criarCliente(
  //   "40028922123",
  //   "Yudi",
  //   "92940028922",
  //   "yudi@hotmail.com",
  //   new Date("1995-01-01"),
  // );
  // console.log("Novo Cliente:", novoCliente1);

  // const novoCliente2 = await criarCliente(
  //   "32122982004",
  //   "Priscilla",
  //   "92922982004",
  //   "priscilla@hotmail.com",
  //   new Date("1994-01-01"),
  // );
  // console.log("Novo Cliente:", novoCliente2);

  // const todosClientes = await buscarTodosClientes();
  // console.log("Todos os Clientes:", todosClientes);

  // const clienteEspecifico = await buscarClientePorCPF("40028922123");
  // console.log("Cliente Específico:", clienteEspecifico);

  // const clienteAtualizado = await atualizarCliente("40028922123", {
  //   email: "novo@hotmail.com",
  // });
  // console.log("Cliente Atualizado:", clienteAtualizado);

  const clienteExcluido1 = await excluirCliente("40028922123");
  console.log("Cliente Excluído:", clienteExcluido1);

  const clienteExcluido2 = await excluirCliente("32122982004");
  console.log("Cliente Excluído:", clienteExcluido2);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
