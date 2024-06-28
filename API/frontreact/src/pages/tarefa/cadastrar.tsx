import React, { useState } from "react";
import { Tarefas } from "../../interface/Tarefas";

function TarefaCadastrar() {
    const [titulo, setTitulo] = useState ("")
    const [descricao, setDescricao] = useState("");
    const [categoriaId, setCategoriaId] = useState("");

    function cadastrarTarefa() {
        const tarefa: Tarefas = {
            Titulo: titulo,
            descricao: descricao,
            CategoriaId: categoriaId,
            Status: ""
        };

        // Fetch para enviar os dados para a API
        fetch("http://localhost:5134/api/tarefas/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tarefa)
        })
        .then((resposta) => resposta.json())
        .then((dados) => {
            console.log("Tarefa cadastrada com sucesso:", dados);
            // Limpar os campos após o cadastro
            setTitulo("");
            setDescricao("");
            setCategoriaId("");
        })
        .catch((error) => {
            console.error("Erro ao cadastrar tarefa:", error);
        });
    }

    return (
        <div>
            <h1>Cadastrar Tarefa</h1>
            <form onSubmit={cadastrarTarefa}>
                <label>
                    Título:
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Descrição:
                    <textarea
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Categoria ID:
                    <input
                        type="text"
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Cadastrar Tarefa</button>
            </form>
        </div>
    );
}

export default TarefaCadastrar;
