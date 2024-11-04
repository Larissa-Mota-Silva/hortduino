# Plant Tracker (HORTDUINO) 🌱

Um aplicativo web simples para monitoramento de plantas que exibe informações sobre umidade e última rega. Este projeto usa HTML, CSS e JavaScript para criar uma interface dinâmica que renderiza as informações de cada planta com base em dados simulados do backend.

## 📋 Funcionalidades

- Exibe uma lista de plantas, incluindo tipo, umidade e última rega.
- Interface responsiva que adapta o layout para dispositivos móveis e desktops.
- Renderização dinâmica dos dados de plantas com JavaScript, facilitando a atualização dos dados sem modificar o HTML diretamente.

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura básica da aplicação.
- **CSS3**: Estilização e layout responsivo.
- **JavaScript**: Renderização dinâmica de dados JSON simulados.

## 📂 Estrutura do Projeto

```plaintext
.
├── index.html        # Página principal com o contêiner das plantas
├── style.css         # Estilos para o layout e formatação
├── script.js         # Lógica de renderização das plantas com JavaScript
├── images/           # Imagens usadas no projeto (vasos, plantas)
│   ├── pot.png       # Imagem do vaso
│   ├── strawberry.png  # Imagem da planta "morango"
│   ├── mint.png        # Imagem da planta "hortelã"
│   ├── coffee.png      # Imagem da planta "café"
│   └── jamelao.png     # Imagem da planta "jamelão"
└── README.md          # Documentação do projeto
```

## 📦 Instalação

1. **Clone este repositório**:
    ```bash
    git clone https://github.com/seu-usuario/plant-tracker.git
    ```
2. **Navegue até o diretório do projeto**:
    ```bash
    cd plant-tracker
    ```
3. **Abra o arquivo `index.html` no navegador** para visualizar o projeto.

## 🛠️ Como Funciona

1. O arquivo `script.js` contém um array `plantsData` que simula dados de um backend com informações de cada planta.
   
2. A função `renderPlants` lê esses dados e gera HTML automaticamente para cada planta, adicionando-o ao contêiner `#plants-container`.

3. As imagens das plantas e do vaso são definidas dinamicamente com base no `type` de cada planta, para que cada planta tenha sua imagem correspondente.

## 🔧 Personalização

- **Adicionar novas plantas**: Para incluir mais plantas, basta adicionar objetos no array `plantsData` no `script.js`. Siga o modelo:
    ```javascript
    { id: 5, type: 'basil', humidity: '40%', lastWatered: '4 dias atrás' }
    ```
    - **Nota**: Se você adicionar uma nova planta, certifique-se de incluir a imagem correspondente na pasta `images` e nomeá-la com o mesmo `type` (ex.: `basil.png`).

- **Conectar ao Backend**: Quando disponível, substitua `plantsData` pela resposta real do backend para atualizar os dados dinamicamente.

## 🖼️ Capturas de Tela

![Plant Tracker](images/screenshot.png)

## 📝 Contribuindo

1. Faça um fork deste repositório.
2. Crie uma nova branch para suas alterações:
    ```bash
    git checkout -b minha-nova-funcionalidade
    ```
3. Commit suas alterações:
    ```bash
    git commit -m "Adiciona nova funcionalidade"
    ```
4. Faça push para a branch:
    ```bash
    git push origin minha-nova-funcionalidade
    ```
5. Abra um Pull Request para revisão.

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
