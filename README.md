# TouRio

# -----------
<h2>Comandos básicos de Git</h2>
<p><b>git init </b> --> Inicia o repositorio local.</p>

<p><b>git add .</b>  --> Adiciona todos os documentos para commit. </p>
<p><b>git add nome </b>  --> Adiciona um documento ou diretorio especifico para commit. </p> 

<p><b>git reset</b>  --> Remove todas as alterações do stage para commit. </p>
<p><b>git reset arquivo</b>  --> Remove todas as alterações do stage para commit. </p>

<p><b>git commit -m "comentario aqui"</b>  --> Cria um comentario para o commit.</p>

<p><b>git remote add origin https://github.com/sua_pasta_github.git</b> --> Adiciona o caminho do repositório remoto.</p>
<p><b>git remote -v</b> --> Lista os caminhos remotos existentes no repositório local.</p>
<p><b>git remote rm nome</b> --> Remove o caminho do repositório local.</p>

<p><b>git push</b>  --> Sobe o arquivo para o repositório remoto.</p>
<p><b>git pull</b> --> Recupera os arquivos do repositório remoto.</p>

<p><b>git log --oneline</b> --> Exibe todos os commits já feitos.</p>
# -----------
<h2>Criando e gerenciando Branchs.</h2>
<p><b>git branch -M nome</b> --> Renomeia a branch.</p>
<p><b>git branch</b> --> Lista todas as branchs existentes.</p>
<p><b>git branch nome</b> --> Cria a branch.</p> 
<p><b>git branch -m nome</b> --> Cria a branch com o nome desejado e já alterna para a nova branch.</p>
<p><b> git branch -d nome</b> --> Deleta a branch.</p>

<p><b>git checkout nome</b> --> Alterna entre as branch.</p>
<p><b>git merge nome_da_branch</b> --> Nesse caso é necessario esta na branch de destino para iniciar o merge
Ex: estou na branch MAIN e desejo incorporrar as mudanças da branch TESTE<br>
git merge teste

 # -----------
<h2>Atualizando um repositorio local e remoto</h2>
<p><b>git pull origin nome</b> --> Para puxar os arquivos de uma branch de um repositorio remoto.</p>

<p><b>git push origin nome</b> --> Para subir os arquivos para uma branch espepcífica em um repositorio remoto.</p> 

 # -----------
<h2>Revertendo commits.</h2>
<p><b>git log --oneline</b> --> Para exibir os utlimos commits já realizados.</p>
<p><b>git checkout ID-DA-BRANCH</b> --> Reverte para a versão da branch especificada sem perder tudo o que já foi feito.</p>
