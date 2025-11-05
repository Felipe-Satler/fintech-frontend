export interface User {
  idUsuario: number;
  nomeUsuario: string;
  senhaUsuario: string;
  data_nasc: string;
}

export interface Conta {
  idConta: number;
  idUsuario: number;
  nomeConta: string;
  saldoAtual: number;
  dataCriacao: string;
}

export interface Despesa {
  idDespesa: number;
  idConta: number;
  nomeDespesa: string;
  valorDespesa: number;
  dataDespesa: string;
  descricaoDespesa?: string;
}

export interface Receita {
  idReceita: number;
  idConta: number;
  nomeReceita: string;
  valorReceita: number;
  dataReceita: string;
  descricaoReceita?: string;
}
