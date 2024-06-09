---
title: "[Project] Ball & Beam | PID control with Arduino"
date: 2024-06-09 8:44:10 +09:00
categories: [Project]
tags: [Control mechanism,  Arduino]
---


![BallAndBeam.png](/assets/img/BallAndBeam.png)

[`https://www.youtube.com/watch?v=ehPzKYCmSYc`](https://www.youtube.com/watch?v=ehPzKYCmSYc)


---

## Arduino Code
```cpp

#include <Servo.h>
#include <PID_v1.h>

#define TRIG_PIN 20
#define ECHO_PIN 21

#define TRIG2_PIN 4
#define ECHO2_PIN 5

#define SERVO_PIN 6

double distance;

const int UPDATE_INTERVAL = 35;
unsigned long currentMillis = 0;
unsigned long previousMillis = 0;

int maxDist = 49;
int minDist = 5;
double targetDist = 30;
double input, output;
PID pid(&input, &output, &targetDist, 0, 0, 0, DIRECT);

Servo myServo;
int minServoPos = 40;
int maxServoPos = 200;
int homeServoPos = 105;

// Moving average filter parameters
const int BUFFER_SIZE = 10;
int distanceBuffer[BUFFER_SIZE];
int bufferIndex = 0;
int bufferSum = 0;
int bufferCount = 0;

/// Setup:
void setup() {
  Serial.begin(9600);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  pinMode(TRIG2_PIN, OUTPUT);
  pinMode(ECHO2_PIN, INPUT);

  myServo.attach(SERVO_PIN);
  myServo.write(homeServoPos);

  double Kp = 3.3;
  double Ki = 1;
  double Kd = 0.15;
  pid.SetTunings(Kp, Ki, Kd);
  pid.SetMode(AUTOMATIC);
  pid.SetSampleTime(30);
  pid.SetOutputLimits(minServoPos, maxServoPos);
}

void loop() {
  currentMillis = millis();

  if (currentMillis - previousMillis >= UPDATE_INTERVAL) {
    previousMillis = currentMillis;

    distance = getDistance();
    //targetDist = getTarget();
    targetDist = getFilteredDistance2();
    if (targetDist >= maxDist) targetDist = maxDist;
    else if (targetDist <= minDist) targetDist = minDist;

    // Use the direct distance as the input to the PID
    input = distance;
    pid.Compute();
    myServo.write(200 - output);

    // Print the direct distance and target distance
    Serial.print(distance);
    Serial.print(",");
    Serial.println(targetDist);
  }
}

double getDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH);
  double distance = (duration * 0.0343) / 2;

  return distance;
}

int getDistance2() {
  digitalWrite(TRIG2_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG2_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG2_PIN, LOW);

  long duration = pulseIn(ECHO2_PIN, HIGH);
  int distance = (int)(duration * 0.0343) / 2;

  return distance;
}



int getFilteredDistance2() {
  int newDistance = getDistance2();

  // Update the buffer
  if (bufferCount < BUFFER_SIZE) {
    bufferSum += newDistance;
    distanceBuffer[bufferIndex++] = newDistance;
    bufferCount++;
  } else {
    bufferIndex %= BUFFER_SIZE;
    bufferSum = bufferSum - distanceBuffer[bufferIndex] + newDistance;
    distanceBuffer[bufferIndex++] = newDistance;
  }

  // Calculate the moving average
  return bufferSum / bufferCount;
}

```