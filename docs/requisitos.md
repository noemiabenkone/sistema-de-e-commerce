# Sistema de E-commerce

## Objetivo
O sistema terá como objetivo oferecer ao cliente um processo completo de compra e, ao administrador, ferramentas para gerenciar os produtos, estoques e pedidos da loja, aplicando regras de negócio que garantam o funcionamento adequado do processo de compra.

## Usuarios do Sistema 

- Cliente 
- Administrador

## Problemas Identificados

A gestão de uma loja virtual envolve diversas informações e processos, como cadastro de produtos, controle de estoque, gerenciamento de carrinho, pedidos, pagamentos, entregas, descontos e devoluções.

Quando essas informações não são centralizadas e organizadas em um único sistema, podem ocorrer problemas como:

- dificuldade para controlar o estoque disponível;

- informações de produtos desatualizadas;

- erros na quantidade de produtos disponíveis para venda;

- dificuldade para acompanhar os pedidos dos clientes;

- falta de controle sobre o status dos pedidos;

- problemas no cálculo e registro dos valores das compras;

- dificuldade para gerenciar descontos e promoções;

- falta de organização das solicitações de devolução;

- dificuldade para o cliente acompanhar suas compras.

Diante disso, surge a necessidade de um sistema que centralize e organize essas operações, permitindo que o cliente realize suas compras e que o administrador gerencie os principais processos da loja.

## Requisitos Funcionais 

- RF01 — Cadastro de cliente
O sistema deve permitir que o cliente crie uma conta informando seus dados pessoais.
- RF02 — Autenticação
O sistema deve permitir que o cliente faça login e logout de sua conta.
- RF03 — Visualização de produtos
O sistema deve permitir que o cliente visualize os produtos disponíveis para venda.
- RF04 — Pesquisa de produtos
O sistema deve permitir que o cliente pesquise produtos por nome.
- RF05 — Carrinho de compras
O sistema deve permitir que o cliente adicione produtos ao carrinho.
- RF06 — Gerenciamento do carrinho
O sistema deve permitir que o cliente altere a quantidade ou remova produtos do carrinho.
- RF07 — Endereço de entrega
O sistema deve permitir que o cliente cadastre e informe o endereço para entrega.
- RF08 — Cálculo do frete
O sistema deve calcular o valor do frete de acordo com as informações de entrega definidas pelo sistema.
- RF09 — Finalização da compra
O sistema deve permitir que o cliente revise os produtos, quantidades, descontos, frete e valor total antes de confirmar o pedido.
- RF10 — Pagamento
O sistema deve permitir que o cliente selecione uma forma de pagamento e registre o pagamento do pedido.
- RF11 — Acompanhamento do pedido
O sistema deve permitir que o cliente consulte seus pedidos e acompanhe seus respectivos status.
- RF12 — Solicitação de devolução
O sistema deve permitir que o cliente solicite a devolução de um pedido, quando atender às regras definidas pelo sistema.
- RF13 — Avaliação
O sistema deve permitir que o cliente avalie um produto após a compra, conforme as regras definidas pelo sistema.

## Requisitos não Funcionais 

- RNF01 — Segurança
O sistema deve proteger os dados dos usuários e impedir acesso não autorizado às informações.
- RNF02 — Senhas
As senhas dos usuários devem ser armazenadas de forma segura, utilizando técnicas de criptografia/hash adequadas.
- RNF03 — Autenticação e autorização
O sistema deve verificar a identidade do usuário e controlar o acesso de acordo com seu perfil, diferenciando Cliente e Administrador.
- RNF04 — Validação de dados
Os dados recebidos pela API devem ser validados antes de serem processados ou armazenados.
- RNF05 — Integridade dos dados
O sistema deve garantir que os dados relacionados a produtos, estoque, pedidos e pagamentos permaneçam consistentes.
- RNF06 — Desempenho
A API deve responder às solicitações em tempo adequado, evitando processamento desnecessário.
- RNF07 — Disponibilidade
O sistema deve estar disponível para que os usuários possam consultar produtos e realizar operações de compra.
- RNF08 — Escalabilidade
A arquitetura deve permitir que o sistema possa crescer em quantidade de usuários, produtos e pedidos sem exigir uma reestruturação completa.
- RNF09 — Manutenibilidade
O código deve ser organizado em módulos e seguir uma estrutura que facilite manutenção, correções e futuras alterações.
- RNF10 — Testabilidade
As principais funcionalidades e regras de negócio devem possuir testes automatizados.
- RNF11 — Comunicação segura
A comunicação entre cliente e API deve utilizar HTTPS em ambiente de produção.
- RNF12 — Rastreabilidade
Operações importantes, como alterações de estoque e atualização do status de pedidos, devem poder ser identificadas por meio de registros adequados.

## Regras de Negócio

- RB01 — Cadastro do cliente

O cliente deve fornecer os dados obrigatórios para criar uma conta. O e-mail deve ser único no sistema.

- RB02 — Acesso ao sistema

Somente clientes autenticados podem realizar compras e acessar seus próprios pedidos.

- RB03 — Permissões do administrador

Somente o administrador pode cadastrar, alterar e desativar produtos, gerenciar estoque, descontos, pedidos e devoluções.

- RB04 — Cadastro de produto

Todo produto deve possuir nome, descrição, preço e um registro de estoque. O preço não pode ser negativo e a quantidade em estoque não pode ser menor que zero.

- RB05 — Produto disponível para compra

Um produto somente poderá ser adicionado ao carrinho se estiver ativo e possuir estoque disponível.

- RB06 — Disponibilidade no carrinho

O cliente poderá adicionar produtos ao carrinho enquanto houver disponibilidade de estoque. A disponibilidade deverá ser validada novamente no momento da finalização da compra.

- RB07 — Controle de estoque

O estoque do produto será reduzido somente após a aprovação do pagamento do pedido.

O sistema deverá verificar a disponibilidade do estoque antes de efetivar a baixa.

O estoque não poderá assumir valores negativos.

Em caso de devolução, o produto somente poderá retornar ao estoque após a devolução ser aprovada e o produto ser considerado apto para nova venda.

- RB08 — Preço do pedido

O pedido deverá registrar o preço do produto no momento da compra. Alterações futuras no preço do produto não deverão modificar pedidos já realizados.

- RB09 — Desconto

Um desconto somente poderá ser aplicado quando estiver ativo e dentro das condições definidas pelo administrador. O valor final do produto ou pedido não poderá ficar negativo.

- RB10 — Cálculo do total

O valor final da compra será calculado considerando:

Subtotal − descontos + frete = total do pedido

- RB11 — Pagamento

O pagamento deverá estar associado a um pedido e possuir um status. O pedido somente poderá avançar para a etapa de processamento da compra quando o pagamento for aprovado.

- RB12 — Status do pedido

O pedido deverá seguir as etapas:

Pendente → Pago → Em preparação → Enviado → Entregue

O pedido também poderá assumir os status Cancelado ou Devolução, conforme as regras estabelecidas pelo sistema.

- RB13 — Cancelamento

Um pedido somente poderá ser cancelado enquanto estiver em uma etapa que permita cancelamento, conforme as regras definidas pelo sistema.

- RB14 — Devolução

O cliente poderá solicitar uma devolução somente quando o pedido atender às condições estabelecidas pelo sistema, como ter sido entregue e estar dentro do prazo de devolução.

- RB15 — Reembolso

O reembolso somente poderá ser realizado após a devolução ser analisada e aprovada pelo administrador.

- RB16 — Avaliação do produto

O cliente somente poderá avaliar um produto que tenha comprado e recebido. Cada compra poderá gerar uma avaliação conforme a regra definida pelo sistema.

- RB17 — Cadastro de endereços

O cliente poderá cadastrar vários endereços. Cada endereço deverá pertencer a um único cliente.

- RB18 — Endereço padrão

Um cliente poderá possuir vários endereços cadastrados, porém somente um endereço poderá estar definido como padrão por vez.

- RB19 — Seleção do endereço na compra

Durante a finalização da compra, o cliente deverá confirmar o endereço que será utilizado no pedido.

Caso o cliente possua um endereço padrão, esse endereço deverá ser selecionado inicialmente pelo sistema.

- RB20 — Uso temporário de endereço

O cliente poderá utilizar um endereço diferente do endereço padrão somente para o pedido atual, sem alterar seu endereço padrão.

- RB21 — Alteração do endereço padrão

O cliente poderá definir outro endereço como padrão. Ao definir um novo endereço como padrão, o endereço anteriormente definido como padrão deverá deixar de ser o padrão.

- RB22 — Preservação do endereço do pedido

O pedido deverá preservar os dados do endereço utilizado no momento da compra.

Alterações, inclusões ou remoções de endereços cadastrados posteriormente pelo cliente não deverão modificar o endereço registrado em pedidos já realizados.

- RB23 — Alteração do endereço após o pagamento

O cliente poderá solicitar a alteração do endereço de entrega enquanto o pedido estiver com status Pago e ainda não tiver sido enviado.

Após o pedido assumir o status Enviado, o endereço de entrega não poderá mais ser alterado.

- RB24 — Confirmação dos dados antes do pagamento

Antes de finalizar a compra e realizar o pagamento, o sistema deverá apresentar ao cliente os principais dados do pedido para confirmação, incluindo produtos, quantidades, endereço, frete, descontos, forma de pagamento e valor total.

- RB25 — Preservação dos dados do pedido

Os dados relevantes utilizados na realização da compra deverão ser preservados no pedido, mesmo que o cliente altere posteriormente seus dados cadastrais, endereços, produtos, preços ou descontos.

## Decisões Pendentes

- Cadastro: o cliente pode cadastrar mais de um endereço de entrega?
- Carrinho: o cliente pode colocar várias unidades do mesmo produto?
- Estoque: se o produto estiver no carrinho, mas o pagamento ainda não foi aprovado, ele continua disponível para outros clientes?
- Pagamento: quais formas vamos aceitar? Pix, cartão, boleto?
- Pagamento recusado: o pedido fica como cancelado ou permite tentar pagar novamente?
- Cancelamento: até qual momento o cliente pode cancelar um pedido?
- Devolução: quantos dias o cliente terá para solicitar uma devolução depois de receber o produto?
- Frete: o cliente paga o frete ou podemos ter frete grátis em determinadas condições?
- Avaliação: o cliente pode avaliar somente produtos que realmente comprou e recebeu?
- Conta: o cliente pode alterar seus dados e endereço depois do cadastro?