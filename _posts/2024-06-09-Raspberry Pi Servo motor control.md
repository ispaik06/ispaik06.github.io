---
title: "Raspberry Pi Servo motor control"
date: 2024-06-09 14:32:00 +09:00
categories: [Raspberry Pi]
tags: [Raspberry Pi, Servo]
---

**작성자: 8기 이서준**

## 라즈베리파이 서보모터 제어

이 글은 라즈베리파이로 서보모터를 제어하는 방법에 대해 다룬다.

아래에 자세한 설명이 있지만, 라즈베리파이에서 DC 모터와 서보모터를 함께 제어하는 것에 실패하였다. 처음에는 두 모터 모두 시도해보았기 때문에 라즈베리파이를 이용해 서보모터를 제어하는 방법에 대해 작성해보았다.

서보모터는 시스템이 요구하는 특정 위치로 이동시키거나, 특정 속도 및 토크로 정확히 가동시킬 수 있다. 하지만 180도 밖에 회전하지 못한다는 점이 있다.

## 사용한 부품

- [Raspberry Pi 4 Model B 8GB](https://www.devicemart.co.kr/goods/view?no=12553062)
- [HS-311 Servo motor](https://www.devicemart.co.kr/goods/view?no=11225)



### Python 예제 코드

아래 코드는 서보모터를 0도, 90도, 50도, 120도, 180도로 순차적으로 회전시키며 각 단계마다 1초씩 대기하는 코드이다. 

크게 복잡한 로직이 없어서 자세한 설명은 생략한다.

```python
import RPi.GPIO as GPIO
from time import sleep

# Disable warnings
GPIO.setwarnings(False)

# Constants
servoPin          = 17
SERVO_MAX_DUTY    = 12
SERVO_MIN_DUTY    = 3

# Set up GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(servoPin, GPIO.OUT)

# Start PWM on the servo pin
servo = GPIO.PWM(servoPin, 50)
servo.start(0)

# Function to set servo position
def setServoPos(degree):
  if degree > 180:
    degree = 180

  duty = SERVO_MIN_DUTY + (degree * (SERVO_MAX_DUTY - SERVO_MIN_DUTY) / 180.0)
  # Uncomment for debugging: print("Degree: {} to {}(Duty)".format(degree, duty))
  servo.ChangeDutyCycle(duty)

# Main program
if __name__ == "__main__":
  setServoPos(0)
  sleep(1)
  
  setServoPos(90)
  sleep(1)

  setServoPos(50)
  sleep(1)

  setServoPos(120)
  sleep(1)
  
  setServoPos(180)
  sleep(1)
  
  # Stop PWM and clean up GPIO
  servo.stop()
  GPIO.cleanup()

```



### 참고사항

1. 서보모터의 전력 요구사항 (GPIO 핀)
    
    Raspberry Pi의 GPIO 핀은 최대 전류 제한이 있다. 하나의 핀에서 너무 많은 전류를 소모하면 Raspberry Pi가 손상될 수 있다. 따라서 서보모터가 Raspberry Pi의 GPIO 핀에서 직접 충분한 전력을 공급받지 못할 수 있으므로 외부 전원 공급을 사용하는 것이 좋다. 우리는 이 부분에서 문제점을 느끼고 아두이노를 이용해 서보모터를 제어하였다. (뒷부분에 자세한 설명 나옴)
    
2. PWM 신호의 주파수
    
    서보 모터는 일반적으로 50Hz 주파수의 PWM 신호를 필요로 한다. 코드를 작성할 때 이 점을 고려해야 하며, 다른 주파수를 사용할 경우 서보 모터가 제대로 동작하지 않을 수 있다.
    
3. 정확한 각도 제어
    
    서보 모터의 각도 제어는 듀티 사이클에 따라 달라진다. 서보 모터의 사양에 따라 최소 및 최대 듀티 사이클 값을 조정해야 정확한 각도 제어가 가능하다. 서보 모터의 데이터 시트를 참고하여 SERVO_MIN_DUTY와 SERVO_MAX_DUTY 값을 정확하게 설정하는 것이 중요하다.