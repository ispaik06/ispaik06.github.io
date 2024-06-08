---
title: "Wifi remote control car with webcam using Raspberry Pi Project"
date: 2024-06-07 15:22:00 +09:00
categories: [Project]
tags: [Raspberry Pi, Arduino, DC motor, Servo, Flask, Server]
---



## 프로젝트 동기 및 목적

일반적으로 아두이노를 배우는 기초 과정에서 아두이노로 RC카를 만들어 본다고 하면, `HC-06` 같은 블루투스 모듈을 사용해 무선 시리얼 통신을 한다. 나는 앱인벤터(AppInventor)를 통해 직접 앱을 만들기도 했고, 블루투스 통신 활동은 충분히 많이 했다. 다른 방식의 또는 좀 더 개선된 RC카를 만들어보고 싶어 이 프로젝트를 진행하게 되었다.

아두이노에서 `SoftwareSerial`을 이용한 블루투스 통신은 구현이 매우 간단하지만 통신 가능 거리가 짧다는 것이 매우 큰 단점이다. 드론의 FPV처럼 사용자는 가만히 있고 멀리까지 조종 가능한 그런 RC카를 제작해보고 싶어 통신 방식에 대해서 여러 프로젝트들을 찾아보고 고민했다. 내가 찾아본 결과, 아두이노로 구현할 수 있는 장거리 통신 모듈로 대표적인 것들로는 `LoRa 모듈`, `NRF24L01 모듈`, `Zigbee` 등이 있다. 

사실 이 프로젝트는 '인터렉티브 디자인 및 테크놀로지'라는 과목을 수강 중에 진행하였다. 과목이 추구하는 방향으로 프로젝트 진행을 해야 했기 때문에 인터렉션을 위한 몇 가지 기능(한 학기 동안 구현 가능할 것 같은 범주 내에서)들을 추려보았다.

* 2륜 구동 차 
* 웹캠이 달린 2-DOF 구동 관절
* 웹캠 스트리밍을 통한 FPV(First Person View) 조종 
* 특정 컨트롤러가 없고, 웹페이지 형태의 컨트롤 패널

통신 방법으로 Wifi 통신을 채택하여 위의 기능들을 구현하면 오로지 장거리 통신을 메인 목표로 설정해서 프로젝트 하는 것 보다 인터렉티브 하다고 생각한다. 그리고 웹서버, 웹페이지 제작과 웹캠 스트리밍을 한 번도 안 해봤기 때문에 새로운 것을 공부하는 의미있는 활동이 될 것이라고 생각한다.


---


## 진행 계획
웹캠을 사용과 웹 서버 제작을 모두 해야 하기 때문에 라즈베리파이 기반으로 RC카를 제작하기로 하였다. 구동 모터로는 2개의 DC 모터를, 카메라 브라켓 관절을 제어하는 2개의 서보모터를 사용할 예정이다. 사용할 부품 목록은 아래와 같다.

* [Raspberry Pi 4 Model B 8GB](https://www.devicemart.co.kr/goods/view?no=12553062)

* [JGA25-371 DC motor](https://www.devicemart.co.kr/goods/view?no=1329802)

* [L298 motor driver](https://www.devicemart.co.kr/goods/view?no=1278835)

* [HS-311 Servo motor](https://www.devicemart.co.kr/goods/view?no=11225)

* [11.1V 2200mAh Lipo battery](https://www.devicemart.co.kr/goods/view?no=11860)

* [XL4015 dc-dc step down converter](https://www.devicemart.co.kr/goods/view?no=1321262)

* [Logitech C310 HD WEBCAM](https://www.logitech.com/ko-kr/products/webcams/c310-hd-webcam.960-000631.html)

* [Arduino UNO](https://www.devicemart.co.kr/goods/view?no=1245596) (아두이노는 프로젝트 중간에 추가됨) 



이 프로젝트는 목표하는 RC카 제작을 위한 기본 예제들을 공부하는 과정과 최종 산출물을 만드는 과정으로 나누어 진행하였다. 기본적인 내용 학습 파트는 각각의 포스트로 작성하였다. 이 글에서는 최종 구현에 대한 내용을 작성하였다.

* **기본적인 내용 학습**

	* [라즈베리파이 DC모터 제어](https://ispaik06.github.io/posts/raspberrypi_dc_motor_control/)

	* [라즈베리파이 서보모터 제어] 
	
	* [Flask를 이용한 웹 서버 구축](https://ispaik06.github.io/posts/flask%EB%A5%BC_%EC%9D%B4%EC%9A%A9%ED%95%9C_%EC%9B%B9%EC%84%9C%EB%B2%84_%EA%B5%AC%EC%B6%95/)
	
	* [라즈베리파이 motion을 이용한 웹캠 스트리밍] 
	
	* [Python OpenCV를 이용한 웹캠 스트리밍] 
	
	* [ngrok 사용하기] 
	
	* [아두이노와 라즈베리파이 시리얼 통신] 


* **최종 구현**
	1. [하드웨어 설계 및 제작](#하드웨어-설계-및-제작)
	
	2. [구동 컨트롤 패널 웹 서버 구축](#구동-컨트롤-패널-웹-서버-구축)
	
	3. [서보모터 떨림 해결을 위한 아두이노 연동](#서보모터-떨림-해결을-위한-아두이노-연동)
	
	4. [프로젝트 최종 결과](#프로젝트-최종-결과)


---


## 하드웨어 설계 및 제작



## 구동 컨트롤 패널 웹 서버 구축


## 서보모터 떨림 해결을 위한 아두이노 연동


## 프로젝트 최종 결과

