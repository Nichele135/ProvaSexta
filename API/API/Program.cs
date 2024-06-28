using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

var app = builder.Build();


app.MapGet("/", () => "Prova A1");

//ENDPOINTS DE CATEGORIA
//GET: http://localhost:5273/api/categoria/listar
app.MapGet("/api/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

//POST: http://localhost:5273/api/categoria/cadastrar
app.MapPost("/api/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

//ENDPOINTS DE TAREFA
//GET: http://localhost:5273/api/tarefas/listar
app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

//POST: http://localhost:5273/api/tarefas/cadastrar
app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

//PUT: http://localhost:5273/api/tarefas/alterar/{id}
app.MapPut("/api/tarefas/alterar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id, [FromBody] Tarefa tarefaAlterada) =>
{
    Tarefa? tarefa = ctx.Tarefas.Find(id);

    if (tarefa == null){
        return Results.NotFound("Tarefa não encontrada!");
    }
    if (tarefa.Status == "Não iniciada"){
        tarefa.Status = "Em andamento";
    }
    else if (tarefa.Status == "Em andamento"){
        tarefa.Status = "Concluida";
    }

    ctx.Tarefas.Update(tarefa);
    ctx.SaveChanges();

    return Results.Ok("Status da tarefa alterado com sucesso!");
});

//GET: http://localhost:5273/api/tarefas/naoconcluidas
app.MapGet("/api/tarefas/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefasNaoConcluidas = ctx.Tarefas
        .Where(t => t.Status == "Não iniciada" || t.Status == "Em andamento")
        .Include(x => x.Categoria)
        .ToList();

    if (tarefasNaoConcluidas.Any())
    {
        return Results.Ok(tarefasNaoConcluidas);
    }
    else
    {
        return Results.NotFound("Não há tarefas não concluídas!");
    }
});

//GET: http://localhost:5273/tarefas/concluidas
app.MapGet("/api/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefasConcluidas = ctx.Tarefas
        .Where(tarefa => tarefa.Status == "Concluída")
        .Include(x => x.Categoria)
        .ToList();

    if (tarefasConcluidas.Any())
    {
        return Results.Ok(tarefasConcluidas);
    }
    else
    {
        return Results.NotFound("Não há tarefas concluídas!");
    }
});


app.Run();