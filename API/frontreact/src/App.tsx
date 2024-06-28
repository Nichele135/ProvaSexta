import React from "react";
import TarefaCadastrar from "./pages/tarefa/cadastrar";
import AlterarTarefa from "./pages/tarefa/alteral";
//1 - Um componente SEMPRE deve começar com a primeira letra
//maiúscula
//2 - Todo componente DEVE ser uma função do JS
//3 - Todo deve retornar apenas UM elemento HTML
function App() {
  return (
<div>
    <TarefaCadastrar/>
    <TarefaListar/>
    <AlterarTarefa/>

</div>   
  );
}
//4 - OBRIGATORIAMENTE o componente DEVE ser exportado
export default App;
