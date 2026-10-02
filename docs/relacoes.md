# Relacionamentos entre Entidades

1. Cliente → Carrinho

Cliente 1:1 Carrinho

Um cliente possui um carrinho, e cada carrinho pertence a um único cliente.

2. Carrinho → ItemCarrinho

Carrinho 1 ItemCarrinho

Um carrinho pode possuir vários itens, e cada item pertence a um único carrinho.

3. Produto → ItemCarrinho

Produto 1 ItemCarrinho

Um produto pode estar associado a vários itens de carrinho, e cada item de carrinho representa um único produto.

4. Cliente → Pedido

Cliente 1 Pedido

Um cliente pode realizar vários pedidos, e cada pedido pertence a um único cliente.

5. Pedido → ItemPedido

Pedido 1 ItemPedido

Um pedido pode possuir vários itens, e cada item pertence a um único pedido.

6. Produto → ItemPedido

Produto 1 ItemPedido

Um produto pode aparecer em vários pedidos, e cada item do pedido representa um único produto.

7. Pedido → Pagamento

Pedido 1 Pagamento

Um pedido pode possuir vários registros de pagamento, permitindo registrar tentativas de pagamento, e cada pagamento pertence a um único pedido.

8. Cliente → Endereço

Cliente 1 Endereço

Um cliente pode cadastrar vários endereços, e cada endereço pertence a um único cliente.

9. Pedido → Frete

Pedido 1:1 Frete

Cada pedido possui um registro de frete, e cada frete pertence a um único pedido.

10. Pedido → Desconto

Pedido N Desconto

Um pedido pode receber vários descontos, e um desconto pode ser aplicado a vários pedidos, conforme as condições definidas pelo administrador.

11. Produto → Estoque

Produto 1:1 Estoque

Cada produto possui um registro de estoque, e cada estoque pertence a um único produto.

12. Produto → Desconto

Produto N Desconto

Um produto pode possuir vários descontos ao longo do tempo, e um desconto pode ser aplicado a vários produtos.

13. Pedido → Devolução

Pedido 1 Devolução

Um pedido pode possuir registros de devolução, e cada devolução pertence a um único pedido.

14. Cliente → Avaliação

Cliente 1 Avaliação

Um cliente pode realizar várias avaliações, e cada avaliação pertence a um único cliente.

15. Produto → Avaliação

Produto 1 Avaliação

Um produto pode receber várias avaliações, e cada avaliação pertence a um único produto.