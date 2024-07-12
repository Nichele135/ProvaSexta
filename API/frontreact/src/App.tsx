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
<div>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/pages/produto/listar"}>
                Listar Produtos{" "}
              </Link>
            </li>
            <li>
              <Link to={"/pages/produto/cadastrar"}>
                Cadastrar Produtos{" "}
              </Link>
            </li>
            <li>
              <Link to={"/pages/cep/consultar"}>Consultar CEP </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<ProdutoListar />} />
          <Route
            path="/pages/produto/listar"
            element={<ProdutoListar />}
          />
          <Route
            path="/pages/produto/cadastrar"
            element={<ProdutoCadastrar />}
          />
          <Route
            path="/pages/cep/consultar"
            element={<CepConsultar />}
          />
          <Route
            path="/pages/produto/alterar/:id"
            element={<ProdutoAlterar />}
          />
        </Routes>
        <footer>
          <p>Desenvolvido por Diogo Steinke Deconto</p>
        </footer>
      </BrowserRouter>
    </div>

</div>   
  );
}
//4 - OBRIGATORIAMENTE o componente DEVE ser exportado
export default App;
