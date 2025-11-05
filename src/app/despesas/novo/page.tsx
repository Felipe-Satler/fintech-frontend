import { useState } from "react";

export default function NovaDespesaPage() {
    const [nomeDespesa, setNomeDespesa] = useState('');
    const [valorDespesa, setValorDespesa] = useState('');
    const [dataDespesa, setDataDespesa] = useState('');
    const [descricaoDespesa, setDescricaoDespesa] = useState('');

    return (
    <main>
        <h1>Nova Receita</h1>
        <form>
            <div>
                <label>Nome da Despesa</label>
                <input type="text" value={nomeDespesa} onChange={(e) => setNomeDespesa(e.target.value)} required/>
            </div>
            <div>
                <label>Valor da Despesa</label>
                <input type="text" value={valorDespesa} onChange={(e) => setValorDespesa(e.target.value)} required/>
            </div>
            <div>
                <label>Data da Despesa</label>
                <input type="text" value={dataDespesa} onChange={(e) => setDataDespesa(e.target.value)} required/>
            </div>
            <div>
                <label>Descrição da Despesa</label>
                <input type="text" value={descricaoDespesa} onChange={(e) => setDescricaoDespesa(e.target.value)}/>
            </div>
        </form>
    </main>
);
}