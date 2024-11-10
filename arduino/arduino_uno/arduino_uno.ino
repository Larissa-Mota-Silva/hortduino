#include <SoftwareSerial.h>

#define POTS_NUM 2
#define WATER_PUMP_PIN 7
#define SENSOR_PIN_1 A0
#define SENSOR_PIN_2 A1

int sensorsHumidity[POTS_NUM];
int dryLevel = 600;
long lastIrrigation = -1; 
long secondsLastIrrigation = 0;
int minutesLastIrrigation = -1;


SoftwareSerial espSerial(2, 3); 

void setup() {
  Serial.begin(9600);  
  espSerial.begin(9600);  

  pinMode(WATER_PUMP_PIN, OUTPUT);
}

void loop() {
  readSensors();
  if (checkHumidity()) {
    irrigate();
    lastIrrigation = millis();
  }

  int humidityPercentPot1 = map(sensorsHumidity[0], 1500, 0, 0, 100);
  int humidityPercentPot2 = map(sensorsHumidity[1], 1500, 0, 0, 100);
  if (lastIrrigation > -1){
    secondsLastIrrigation = (millis() - lastIrrigation) / 1000;
    minutesLastIrrigation = secondsLastIrrigation / 60;
  }

  espSerial.print(humidityPercentPot1);
  espSerial.print(",");
  espSerial.print(humidityPercentPot2);
  espSerial.print(",");
  espSerial.println(minutesLastIrrigation);
  delay(2000);
}

bool checkHumidity() {
  if (sensorsHumidity[0] > dryLevel && sensorsHumidity[1] > dryLevel) {
    return true;
  }
  return false;
}

void readSensors() {
  sensorsHumidity[0] = analogRead(SENSOR_PIN_1);
  sensorsHumidity[1] = analogRead(SENSOR_PIN_2);
  Serial.print("\nSensor 1: ");
  Serial.print(sensorsHumidity[0]);
  Serial.print("\nSensor 2: ");
  Serial.print(sensorsHumidity[1]);
}

void irrigate() {
  Serial.print("\nRegando \n");
  digitalWrite(WATER_PUMP_PIN, HIGH);
  delay(2000);
  digitalWrite(WATER_PUMP_PIN, LOW);
}
