$(document).ready(function() {
    function fetchPlantData() {
        $.ajax({
            url: "http://192.168.206.63/",
            method: "GET",
            dataType: "json",
            success: function(data) {
                const plantsData = [
                    { id: 1, type: 'strawberry', humidity: `${data.humidity[0]}%`, lastWatered: `${verifyLastWatering(data.minutesLastIrrigation)}` },
                    { id: 2, type: 'jamelao', humidity: `${data.humidity[1]}%`, lastWatered: `${verifyLastWatering(data.minutesLastIrrigation)}` }
                ];
                updatePlants(plantsData);
            },
            error: function(xhr, status, error) {
                console.error("Erro ao buscar dados do ESP01:", error);
            }
        });
    }
    
    function verifyLastWatering(minutesLastWatering) {
        if (minutesLastWatering === 1) {
            return minutesLastWatering + " minuto atrás";
        }
        else if (minutesLastWatering > 1) {
            return minutesLastWatering + " minutos atrás";
        }
        else if (minutesLastWatering === -1)
        {
            return "não foi regado"
        }
        return "agora";
    }
    
    function initializePlants(plants) {
        const container = document.getElementById('plants-container');
        container.innerHTML = ''; 
        plants.forEach(plant => {
            const plantBox = document.createElement('div');
            plantBox.className = 'col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center';
            plantBox.id = `plant-${plant.id}`;
            
            plantBox.innerHTML = `
                <div class="plant-box">
                    <img class="pot" src="images/pot.png" alt="Vaso de barro" />
                    <img class="plants ${plant.type}" src="images/${plant.type}.png" alt="${plant.type}" />
                    <h3>${plant.id}</h3>
                    <h4 class="plant-info humidity">${plant.humidity}</h4>
                    <p class="plant-info last-watered">Última rega: ${plant.lastWatered}</p>
                </div>
            `;
            container.appendChild(plantBox);
        });
    }
    
    function updatePlants(plants) {
        plants.forEach(plant => {
            const plantBox = document.getElementById(`plant-${plant.id}`);
            if (plantBox) {
                plantBox.querySelector('.humidity').textContent = plant.humidity;
                plantBox.querySelector('.last-watered').textContent = `Última rega: ${plant.lastWatered}`;
            }
        });
    }
    
    const initialData = [
        { id: 1, type: 'strawberry', humidity: "0%", lastWatered: "agora" },
        { id: 2, type: 'jamelao', humidity: "0%", lastWatered: "agora" }
    ];
    initializePlants(initialData);
    setInterval(fetchPlantData, 500); 
    fetchPlantData();
});
