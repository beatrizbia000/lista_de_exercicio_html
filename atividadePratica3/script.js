 let filmes = [];
        function carregarFilmes() {
            const filmesSalvos = localStorage.getItem('listaFilmes');
            if (filmesSalvos) {
                filmes = JSON.parse(filmesSalvos);
                mostrarFilmes();
            }
        }

        function salvarFilmes() {
            localStorage.setItem('listaFilmes', JSON.stringify(filmes));
        }

        function adicionarFilme() {
            const input = document.getElementById('nomeFilme');
            const nomeFilme = input.value.trim();
            
            if (nomeFilme === '') {
                alert('Por favor, digite o nome do filme!');
                return;
            }
            const novoFilme = {
                id: Date.now(), 
                nome: nomeFilme,
                assistido: false
            };
            
            filmes.push(novoFilme);
            
            input.value = '';
        
            salvarFilmes();
            mostrarFilmes();
        }

        function mostrarFilmes() {
            const lista = document.getElementById('listaFilmes');
            const contador = document.getElementById('contadorFilmes');
           
            lista.innerHTML = '';
            
            if (filmes.length === 0) {
                lista.innerHTML = '<div class="lista-vazia">Nenhum filme adicionado ainda...</div>';
                contador.textContent = '0 filmes na lista';
                return;
            }
            const assistidos = filmes.filter(filme => filme.assistido).length;
            contador.textContent = `${filmes.length} filmes na lista (${assistidos} assistidos)`;
            
            filmes.forEach(filme => {
                const divFilme = document.createElement('div');
                divFilme.className = 'filme-item';
                
                if (filme.assistido) {
                    divFilme.classList.add('assistido');
                }
                divFilme.innerHTML = `
                    <input type="checkbox" ${filme.assistido ? 'checked' : ''} 
                           onchange="marcarAssistido(${filme.id})">
                    <span class="filme-nome">${filme.nome}</span>
                    <button class="btn-remover" onclick="removerFilme(${filme.id})">Remover</button>
                `;
                
                lista.appendChild(divFilme);
            });
        }
        function marcarAssistido(id) {
            const filme = filmes.find(f => f.id === id);
            if (filme) {
                filme.assistido = !filme.assistido;
                salvarFilmes();
                mostrarFilmes();
            }
        }
        function removerFilme(id) {
            if (confirm('Tem certeza que quer remover este filme?')) {
                filmes = filmes.filter(f => f.id !== id);
                salvarFilmes();
                mostrarFilmes();
            }
        }
        document.getElementById('nomeFilme').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                adicionarFilme();
            }
        });
        window.onload = function() {
            carregarFilmes();
        };