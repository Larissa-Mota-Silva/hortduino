#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <SoftwareSerial.h>

const char* ssid = "_ssid";           
const char* password = "_password";


ESP8266WebServer server(80);

int humidityPercentPot1 = 0;
int humidityPercentPot2 = 0;
long minutesLastIrrigation = -1;

void setup() {
  Serial.begin(9600); 

  WiFi.begin(ssid, password); 

  Serial.println("Conectando-se ao Wi-Fi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConectado!");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP()); 

  
  server.on("/", []() {
    String response = "{";
    response += "\"humidity\":[" + String(humidityPercentPot1) + "," + String(humidityPercentPot2) + "],";
    response += "\"minutesLastIrrigation\":" + String(minutesLastIrrigation);
    response += "}";
    server.sendHeader("Access-Control-Allow-Origin", "*"); 
    server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
    
    server.send(200, "application/json", response);
  });

  server.begin(); 
  Serial.println("Servidor iniciado");
}

void loop() {
  server.handleClient(); 

  if (Serial.available() > 0) {
    String data = Serial.readStringUntil('\n'); 
    Serial.println("Dados recebidos: " + data); 
    updateHumidity(data); 
  }

  delay(100);  
}

void updateHumidity(String data) {
  int firstComma = data.indexOf(',');
  int secondComma = data.indexOf(',', firstComma + 1);

  if (firstComma != -1 && secondComma != -1) {

    String humidity1Str = data.substring(0, firstComma);
    String humidity2Str = data.substring(firstComma + 1, secondComma);
    String minutesStr = data.substring(secondComma + 1);

    humidityPercentPot1 = humidity1Str.toInt();
    humidityPercentPot2 = humidity2Str.toInt();
    minutesLastIrrigation = minutesStr.toInt();

    Serial.println("Umidade Vaso 1: " + String(humidityPercentPot1) + "%"); // Debug
    Serial.println("Umidade Vaso 2: " + String(humidityPercentPot2) + "%"); // Debug
    Serial.println("Minutos desde a última rega: " + String(minutesLastIrrigation) + " minutos"); // Debug
  } else {
    Serial.println("Erro ao processar os dados: " + data); // Caso o formato não seja encontrado
  }
}
