---
title: "라즈베리파이 핀 설정: BOARD와 BCM 차이"
author: In-Seong Paik
date: 2024-06-07 00:22:00 +09:00
categories: [RaspberryPi]
tags: [Raspberry Pi]
---

# 라즈베리파이 핀 설정: BOARD와 BCM 차이
코드에서 라즈베리파이 GPIO 핀 번호 설정을 할 때, 아래와 같이 두 가지 종류로 구분해서 핀 설정을 할 수 있다.
```python
GPIO.setmode(GPIO.BOARD)  # 보드의 핀 번호로 설정

GPIO.setmode(GPIO.BCM)  # GPIO 핀 번호로 설정
```

BOARD 설정은 말 그대로 보드 기준 핀 번호로 생각하겠다는 뜻이고, BCM 설정은 GPIO의 번호로 생각하겠다는 말이다. 아래 사진을 보면 보드의 모든 핀이 GPIO가 아님을 알 수 있다.
예를 들어 GPIO 17번과 보드 핀 11번은 같은 핀인 것이다.
![raspberrypi4_pinmap](/assets/img/raspberrypi4_pinmap.png)

