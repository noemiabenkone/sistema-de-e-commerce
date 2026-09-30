Entidades e Atributos

1. Usuário

Responsável pela administração do sistema.

- id

- nome

- sobrenome

- email

- senha

- cpf

- dataNascimento

2. Cliente

Responsável pelas compras realizadas na loja.

- id

- nome

- sobrenome

- email

- senha

- cpf

- dataNascimento

- celular

3. Produto

Representa os produtos disponibilizados para venda.

- id

- nome

- descricao

- preco

4. Estoque

Responsável pelo controle da quantidade disponível de cada produto.

- id

- quantidade

5. Carrinho

Representa o carrinho de compras do cliente.

- id

6. ItemCarrinho

Representa cada produto e sua quantidade dentro do carrinho.

- id

- quantidade

7. Pedido

Representa uma compra realizada pelo cliente.

- id

- data

- status

- valorTotal

**Dados do endereço utilizado no pedido**

O pedido deverá preservar os dados do endereço utilizado no momento da compra.

## tipoLogradouro:

## nomeLogradouro,

## numero,

## complemento,

## bairro,

## cidade,

## estado,

## cep

8. ItemPedido

Representa cada produto incluído em um pedido.

- id

- quantidade

- preco

9. Pagamento

Registra as informações relacionadas às tentativas e aos pagamentos do pedido.

- id

- metodo

- valor

- status

- dataPagamento

10. Endereço

Representa um endereço cadastrado pelo cliente.

- id

- tipoLogradouro

- nomeLogradouro

- numero

- complemento

- bairro

- cidade

- estado

- cep

- padrao

11. Frete

Representa as informações relacionadas à entrega do pedido.

- id

- valor

- prazoEntrega

12. Desconto

Representa descontos e promoções aplicados aos produtos ou pedidos.

- id

- tipo

- valor

- dataInicio

- dataFim

- status

13. Devolução

Representa uma solicitação de devolução realizada pelo cliente.

- id

- descricao

- valor

- status

- dataSolicitacao

14. Avaliação

Representa a avaliação realizada pelo cliente sobre um produto comprado.

- id

- mensagem

- nota

- data