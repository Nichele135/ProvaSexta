import { useEffect, useState } from "react";
import { Tarefas } from "../../interface/Tarefas";

function TarefaListar(){

    const[tarefas, setTarefas] = useState<Tarefas[]>([]);

    useEffect(() => {

        carregarTarefas();

    }, []);

    function carregarTarefas(){
        //FETCH ou AXIOS
        fetch("http://localhost:5134/api/produto/listar").then((resposta) => 

            resposta.json()

        ).then((tarefas : Tarefas[]) => {

            console.table(tarefas);
            setTarefas(tarefas);
        });
    }

    return(
        <div>

            <h1>Listar Tarefas</h1>

            <table border={1}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Titulo</th>
                        <th>Descrição</th>
                        <th>CriadoEm</th>
                        <th>CategoriaId</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {tarefas.map(tarefa => (

                        <tr key={tarefa.TarefaId}>
                            <td>{tarefa.TarefaId}</td>
                            <td>{tarefa.Titulo}</td>
                            <td>{tarefa.descricao}</td>
                            <td>{tarefa.criadoEm}</td>
                            <td>{tarefa.CategoriaId}</td>
                            <td>{tarefa.Status}</td>
                        </tr>

                    ))}
                </tbody>

            </table>

        </div>
    )
}