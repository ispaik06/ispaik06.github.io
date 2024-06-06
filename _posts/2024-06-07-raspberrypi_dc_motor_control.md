---
title: "Raspberry Pi DC motor control with L298"
author: In-Seong Paik
date: 2024-06-07 02:10:00 +09:00
categories: [RaspberryPi]
tags: [Raspberry Pi, DC motor]
---

# RaspberryP i DC motor control with L298
이 글은 라즈베리파이로 DC모터를 제어하는 방법에 대해 다룬다.
DC 모터는 서보모터나 스텝모터와 달리 연속적인 회전을 하고, 방향과 속도를 지정하여 구동시킬 수 있다. DC 모터의 방향과 속도를 제어하기 위해서는 모터 드라이버가 필요하다. 이번 포스팅에서는 L298N이 탑재된 모터 드라이버 `L298`을 사용한다.


## 사용한 부품
* [Raspberry Pi 4 Model B 8GB](https://www.devicemart.co.kr/goods/view?no=12553062)
* [JGA25-371 DC motor](https://www.devicemart.co.kr/goods/view?no=1329802)
* [L298 motor driver](https://www.devicemart.co.kr/goods/view?no=1278835)


## 회로도 구성
아래 그림과 같이 회로를 연결하면 된다.
![circuit_raspberrypi_dcmotor](/assets/img/circuit_raspberrypi_dcmotor.png)

## Python 예제 코드
아래 코드는 두 개의 DC 모터로 2륜 구동 차를 만들었을 때, forward, backward, left turn, right turn 기능을 구현한 코드이다.

크게 복잡한 로직은 없어서 이해하기에 무리가 없을 것 같아 자세한 설명은 생략한다.

```python
import RPi.GPIO as GPIO
import time

GPIO.setwarnings(False)  # Disable GPIO warnings

# Motor state definitions
STOP = 0
FORWARD = 1
BACKWARD = 2

# Motor channel definitions
CH1 = 0
CH2 = 1

# Pin mode definitions
OUTPUT = 1
INPUT = 0

# Pin state definitions
HIGH = 1
LOW = 0

# Motor driver pin assignments
ENA = 26
ENB = 16
IN1 = 19
IN2 = 13
IN3 = 6
IN4 = 5

spd = 100  # Default speed for motors (%)

# GPIO pin setup function
def set_pin_config():
    GPIO.setmode(GPIO.BCM)  # Set GPIO mode to BCM
    GPIO.setup(ENA, GPIO.OUT)
    GPIO.setup(ENB, GPIO.OUT)
    GPIO.setup(IN1, GPIO.OUT)
    GPIO.setup(IN2, GPIO.OUT)
    GPIO.setup(IN3, GPIO.OUT)
    GPIO.setup(IN4, GPIO.OUT)

    pwm_a = GPIO.PWM(ENA, 100)  # Create PWM instance for motor A with 100Hz frequency
    pwm_b = GPIO.PWM(ENB, 100)  # Create PWM instance for motor B with 100Hz frequency
    pwm_a.start(0)  # Start PWM with 0% duty cycle
    pwm_b.start(0)  # Start PWM with 0% duty cycle
    return pwm_a, pwm_b

# Motor control function
def control_motor(pwm, INA, INB, speed, state):
    pwm.ChangeDutyCycle(speed)  # Set motor speed

    if state == FORWARD:
        GPIO.output(INA, HIGH)
        GPIO.output(INB, LOW)
    elif state == BACKWARD:
        GPIO.output(INA, LOW)
        GPIO.output(INB, HIGH)
    elif state == STOP:
        GPIO.output(INA, LOW)
        GPIO.output(INB, LOW)

# Direction control function
def control_direction(ch, speed, state):
    if ch == CH1:
        control_motor(pwm_a, IN1, IN2, speed, state)
    elif ch == CH2:
        control_motor(pwm_b, IN3, IN4, speed, state)


def forward(speed):
    control_direction(CH1, speed, FORWARD)
    control_direction(CH2, speed, FORWARD)

def backward(speed):
    control_direction(CH1, speed, BACKWARD)
    control_direction(CH2, speed, BACKWARD)

def right_turn(speed):
    control_direction(CH1, speed, BACKWARD)
    control_direction(CH2, speed, FORWARD)

def left_turn(speed):
    control_direction(CH1, speed, FORWARD)
    control_direction(CH2, speed, BACKWARD)

# Stop function
def stop():
    control_direction(CH1, 0, STOP)
    control_direction(CH2, 0, STOP)

# GPIO pin setup
pwm_a, pwm_b = set_pin_config()

if __name__ == '__main__':
    forward(spd)
    time.sleep(2)
    backward(spd)
    time.sleep(2)
    left_turn(spd)
    time.sleep(2)
    right_turn(spd)
    time.sleep(2)
    stop()
    GPIO.cleanup()
```


## 참고 사항
### 1. GPIO.setwarnings(False)
라즈베리파이에서 GPIO를 사용하는 코드를 실행하면 에러가 뜨는 경우가 있다. 오류를 해결하고자 열심히 구글링 해본 결과 그냥 코드에 `GPIO.setwarnings(False)`를 추가해주면 된다.

라즈베리파이의 GPIO 라이브러리인 RPi.GPIO에서 경고 메시지를 비활성화하는 코드이다. 이를 사용하지 않으면 여러 가지 상황에서 경고 메시지가 출력될 수 있다. 주로 발생하는 경고 중 하나는 GPIO 핀을 설정하거나 사용 중에 이미 다른 프로세스에서 해당 핀을 사용하고 있을 때 발생하는 경고이다.

### 2. 라즈베리파이 핀 설정
라즈베리파이의 핀을 처음 사용해보는 사람은 `GPIO.setmode(GPIO.BCM)`이 어떤 코드인지 궁금할 것이다. 이에 대한 자세한 내용은 [라즈베리파이 핀 설정: BOARD와 BCM 차이](/_posts/2024-06-07-raspberrypi_board_bcm.md)을 확인해보자.