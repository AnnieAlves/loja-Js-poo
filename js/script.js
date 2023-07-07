class Produto{
    
    constructor(){
        this.id = 1;
        this.arrayProdutos = [];
        this.valor = 0;
        this.editId = null;
    }
    
    salvar(){
        let produto = this.lerDados(); 

        if(this.validaCampos(produto)){
            if(this.editId ==null){
                this.adicionar(produto);
            }else{
                this.atualizar(this.editId, produto);
            }
            
        }        
        this.listaTabela();
        this.cancelar();
    }


    
    listaTabela(){
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++){
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;            
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;  
            td_valor.innerText = parseFloat(this.arrayProdutos[i].valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            
            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/edit.svg';
            imgEdit.setAttribute("onclick", "produto.preparaEdicao(" + JSON.stringify(this.arrayProdutos[i]) +")");

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/delete.svg';
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id +")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);

            td_acoes.classList.add('center');
        }
    }


    adicionar(produto){
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto){
        for(let i = 0; i <this.arrayProdutos.length; i++){
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].valor = produto.valor;
            }
        }       


    }

    preparaEdicao(dados){

        this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('valor').value = dados.valor;

        document.getElementById('btn1').innerText = "Atualizar";

    }


    lerDados(){
        let produto = {}


        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.valor = document.getElementById('valor').value;

        return produto;
    }




    validaCampos(produto){

        let msg = '';

        if(produto.nomeProduto == ''){
            msg += ' Informe o nome do produto \n';
        }

        if(produto.valor == ''){
            msg += ' Informe o preço do produto \n';
        }
        
        if(msg != ''){
            alert(msg);
            return false;
        }

        return true;
    }



    cancelar(){
        document.getElementById('produto').value = '';
        document.getElementById('valor').value = '';
        
        document.getElementById('btn1').innerText = "Salvar";
        this.editId = null;
    }


    deletar(id) {
        if (confirm('Deseja realmente deletar o produto de ID ' + id + '?')) {
          let index = -1;
          
          for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id === id) {
              index = i;
              break;
            }
          }
      
          if (index !== -1) {
            this.arrayProdutos.splice(index, 1);          
      
           
            for (let i = index; i < this.arrayProdutos.length; i++) {
              this.arrayProdutos[i].id = i + 1;
            }
      
            this.listaTabela();
          }
        }
      }
}


var produto = new Produto();


document.querySelector('.add-btn').addEventListener('click', () =>{
    produto.salvar();
});

document.querySelector('.remove-btn').addEventListener('click', () =>{
    produto.cancelar();
})