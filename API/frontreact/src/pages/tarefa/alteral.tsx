import React, { useState } from 'react';
import { Tarefas } from '../../interface/Tarefas';

const AlterarTarefa = () => {
  const [tarefa, setTarefas] = useState<Tarefas>({ TarefaId: "0", descricao: '', Status: '' })

  const verificarStatus = async () => {
    try {
      let novoStatus = '';
      switch (tarefa.Status) {
        case 'Não iniciada':
          novoStatus = 'Em andamento';
          break;
        case 'Em andamento':
          novoStatus = 'Concluída';
          break;
        default:
          throw new Error('Status inválido');
      }


      //usei alert pq nao estava conseguindo usar o outro
      alert('Status da tarefa alterado com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao alterar o status da tarefa');
    }
  };

  return (
    <div>
      <h2>Alterar Status da Tarefa</h2>
      <p>ID da Tarefa: {tarefa.TarefaId}</p>
      <p>Descrição: {tarefa.descricao}</p>
      <p>Status Atual: {tarefa.Status}</p>

      <button onClick={verificarStatus}>Alterar Status</button>
    </div>
  );
};

export default AlterarTarefa;
