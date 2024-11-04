// Simulação dos dados JSON que viriam do backend
const plantsData = [
    { id: 1, type: 'strawberry', humidity: '50%', lastWatered: '2 dias atrás' },
    { id: 2, type: 'mint', humidity: '75%', lastWatered: '1 dia atrás' },
    { id: 3, type: 'coffee', humidity: '30%', lastWatered: '5 dias atrás' },
    { id: 4, type: 'jamelao', humidity: '60%', lastWatered: '3 dias atrás' }
];

// Função que cria o HTML dinamicamente para exibir cada plantinha
function renderPlants(plants) {
    // Seleciona o contêiner onde as plantas serão exibidas (pelo ID)
    const container = document.getElementById('plants-container');
    
    // Limpa o conteúdo anterior do contêiner para evitar duplicação ao renderizar novamente
    container.innerHTML = ''; 

    // Percorre o array 'plants' e gera o HTML para cada planta
    plants.forEach(plant => {
        // Cria um div para cada planta e define a classe de estilo
        const plantBox = document.createElement('div');
        plantBox.className = 'col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center';

        // Define o conteúdo HTML de cada planta, preenchendo com as informações de 'plant'
        plantBox.innerHTML = `
            <div class="plant-box">
                <!-- Imagem do vaso -->
                <img class="pot" src="images/pot.png" alt="Vaso de barro" />
                
                <!-- Imagem da planta, com a classe e a fonte de imagem baseada no tipo da planta (ex: strawberry) -->
                <img class="plants ${plant.type}" src="images/${plant.type}.png" alt="${plant.type}" />
                
                <!-- ID da planta -->
                <h3>${plant.id}</h3>
                
                <!-- Umidade da planta -->
                <h4 class="plant-info">${plant.humidity}</h4>
                
                <!-- Última data de rega da planta -->
                <p class="plant-info">Última rega: ${plant.lastWatered}</p>
            </div>
        `;

        // Adiciona o elemento da planta ao contêiner principal
        container.appendChild(plantBox);
    });
}

// Chama a função renderPlants para renderizar as plantas na página usando os dados de 'plantsData'
renderPlants(plantsData);
