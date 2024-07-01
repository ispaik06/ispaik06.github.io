---
title: "[Project] WiFi remote control car with webcam using Raspberry Pi"
date: 2024-06-10 11:34:00 +09:00
lastmod: 2024-06-11 16:54:30 +09:00
categories: [Project]
tags: [Raspberry Pi, Arduino, Flask, Server]
sitemap:
  changefreq: daily
  priority: 1.0
---

이 프로젝트에 대한 모든 소스코드는 [https://github.com/ispaik06/WiFi_RC_car_webcam](https://github.com/ispaik06/WiFi_RC_car_webcam)에 있습니다.


## 프로젝트 동기 및 목적

일반적으로 아두이노를 배우는 기초 과정에서 아두이노로 RC카를 만들어 본다고 하면, `HC-06` 같은 블루투스 모듈을 사용해 무선 시리얼 통신을 한다. 나는 앱인벤터(AppInventor)를 통해 직접 앱을 만들기도 했고, 블루투스 통신 활동은 충분히 많이 했다. 다른 방식의 또는 좀 더 개선된 RC카를 만들어보고 싶어 이 프로젝트를 진행하게 되었다.

아두이노에서 `SoftwareSerial`을 이용한 블루투스 통신은 구현이 매우 간단하지만 통신 가능 거리가 짧다는 것이 매우 큰 단점이다. 드론의 FPV처럼 사용자는 가만히 있고 멀리까지 조종 가능한 그런 RC카를 제작해보고 싶어 통신 방식에 대해서 여러 프로젝트들을 찾아보고 고민했다. 내가 찾아본 결과, 아두이노로 구현할 수 있는 장거리 통신 모듈로 대표적인 것들로는 `LoRa 모듈`, `NRF24L01 모듈`, `Zigbee` 등이 있다. 

사실 이 프로젝트는 '인터렉티브 디자인 및 테크놀로지'라는 과목을 수강 중에 진행하였다. 과목이 추구하는 방향으로 프로젝트 진행을 해야 했기 때문에 인터렉션을 위한 몇 가지 기능(한 학기 동안 구현 가능할 것 같은 범주 내에서)들을 추려보았다.

* 2륜 구동 차 
* 웹캠이 달린 2-DOF 구동 관절
* 웹캠 스트리밍을 통한 FPV(First Person View) 조종 
* 특정 컨트롤러가 없고, 웹 페이지 형태의 컨트롤 패널

통신 방법으로 WiFi 통신을 채택하여 위의 기능들을 구현하면 오로지 장거리 통신을 메인 목표로 설정해서 프로젝트 하는 것 보다 인터렉티브 하다고 생각한다. 그리고 웹서버, 웹 페이지 제작과 웹캠 스트리밍을 한 번도 안 해봤기 때문에 새로운 것을 공부하는 의미있는 활동이 될 것이라고 생각한다. 웹 서버 구축 공부를 가볍게 시작할 수 있는 `Flask`를 활용해 진행하려고 한다.


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



이 프로젝트는 목표하는 RC카 제작을 위한 기본 예제들을 공부하는 과정과 최종 산출물을 만드는 과정으로 나누어 진행하였다. 기본적인 내용 학습 파트는 각각의 포스트로 작성하였다. 이 글에서는 '**최종 구현**'에 대한 내용을 작성하였으므로 이 글을 읽기 전에 아래 '**기본적인 내용 학습**'의 글들을 읽고 오기 바란다.

* **기본적인 내용 학습**

	* [라즈베리파이 DC모터 제어](https://ispaik06.github.io/posts/raspberrypi_dc_motor_control/)

	* [라즈베리파이 서보모터 제어](https://ispaik06.github.io/posts/Raspberry_Pi_Servo_motor_control/)
	
	* [Flask를 이용한 웹 서버 구축](https://ispaik06.github.io/posts/flask%EB%A5%BC_%EC%9D%B4%EC%9A%A9%ED%95%9C_%EC%9B%B9%EC%84%9C%EB%B2%84_%EA%B5%AC%EC%B6%95/)
	
	* [라즈베리파이 motion을 이용한 웹캠 스트리밍](https://ispaik06.github.io/posts/%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%ED%8C%8C%EC%9D%B4_motion%EC%9D%84_%EC%9D%B4%EC%9A%A9%ED%95%9C_%EC%9B%B9%EC%BA%A0_%EC%8A%A4%ED%8A%B8%EB%A6%AC%EB%B0%8D/)
	
	* [OpenCV, Flask를 이용한 웹캠 스트리밍](https://ispaik06.github.io/posts/OpenCV_Flask%EC%9D%84_%ED%99%9C%EC%9A%A9%ED%95%9C_%EC%9B%B9%EC%BA%A0_%EC%8A%A4%ED%8A%B8%EB%A6%AC%EB%B0%8D_(python)/)
	
	* [ngrok 사용하기](https://ispaik06.github.io/posts/Ngrok_-_%EB%A1%9C%EC%BB%AC_%EC%84%9C%EB%B2%84%EB%A5%BC_%EC%99%B8%EB%B6%80%EC%99%80_%ED%86%B5%EC%8B%A0%EC%9D%B4_%EA%B0%80%EB%8A%A5%ED%95%98%EA%B2%8C_%ED%95%B4%EC%A3%BC%EB%8A%94_%ED%88%B4/)
	
	* [pyserial을 이용한 아두이노와 라즈베리파이 시리얼 통신](https://ispaik06.github.io/posts/pyserial%EC%9D%84_%EC%9D%B4%EC%9A%A9%ED%95%9C_%EC%95%84%EB%91%90%EC%9D%B4%EB%85%B8%EC%99%80_%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%ED%8C%8C%EC%9D%B4_%EC%8B%9C%EB%A6%AC%EC%96%BC_%ED%86%B5%EC%8B%A0/)


* **최종 구현**
	1. [하드웨어 설계 및 제작](#하드웨어-설계-및-제작)
	
	2. [구동 컨트롤 패널 웹 서버 구축](#구동-컨트롤-패널-웹-서버-구축)

	3. [라즈베리파이 제어와 웹서버 연동](#라즈베리파이-제어와-웹서버-연동)
	
	4. [서보모터 떨림 해결을 위한 아두이노 연동](#서보모터-떨림-해결을-위한-아두이노-연동)
	
	5. [프로젝트 최종 결과](#프로젝트-최종-결과)


---


## 하드웨어 설계 및 제작

### 회로도 구성
라즈베리파이에 모터 드라이버, 서보모터, 웹캠이 모두 연결되어 있다. 전원으로 11.1V 2200mAh 리포 배터리를 사용한다.
원래 라즈베리파이의 전원은 GPIO 핀이 아닌, 꼭 전원 입력 단자로만 공급하는 것이 좋다.

>5V 핀은 퓨즈 이후에 위치하기에 전원 입력용으로 사용하는 것은 권장되지 않는다. 이곳에 외부의 전원을 통해 전원을 공급하면 아무런 보호 장치가 없기에 완벽하게 정류 된 전원이 아니라면 라즈베리파이를 영구적으로 손상시킬 수 있다.(USB, LAN, HDMI 관련 부품들의 VCC에 직결되어 있기 때문에 1차적으로 이들 부품에 직접적인 손상을 입힌다.)
>[출처](https://blog.naver.com/amos42/222040330497)

그러나 라즈베리파이 4는 GPIO 5V핀이 DC단자와 직결되도록 전원 회로가 변경되었기 때문에 보드의 5V핀으로 전원 공급을 해도 된다.
~~그래서 리포 배터리를 두 갈래로 나눠서 하나는 DC-DC 스텝다운을 통해 라즈베리파이에 연결하였고 스텝다운이 없는 선은 바로 모터드라이버의 외부전원에 연결하였다.~~

아래 그림에는 없지만 웹캠도 라즈베리파이에 연결되어 있다.
![rccar_without_arduino.ps.png](/assets/img/rccar_without_arduino.ps.png){: width="40%" height="40%"}*아두이노 없는 버전. 라즈베리파이 전류 부족*

이런식으로 하면 라즈베리파이에 흐르는 전류가 부족하기 때문에 작동에 지장이 생긴다. 프로젝트 중간에 서보모터를 아두이노에 연결하는 방식으로 바꾸는데, 이때 스텝다운을 두 개를 써서 라즈베리파이와 아두이노 각각에 연결하였다. 스텝다운 자체에도 전류 제한이 있다는 것이 가장 큰 원인이었던 것 같다.

그래서 만들어진 최종 회로는 아래와 같다.

![rccar_with_arduino.ps.png](/assets/img/rccar_with_arduino.ps.png){: width="90%" height="90%"}*최종 버전*

(라즈베리파이, 아두이노), (라즈베리파이, 웹캠)은 각각 usb 케이블로 서로 연결하면 된다.


### RC카 프레임 제작

[여기에서 확인하세요](https://ispaik06.github.io/posts/RC%EC%B9%B4_%ED%94%84%EB%A0%88%EC%9E%84_%EC%84%A4%EA%B3%84_-_MDF-%EC%A0%9C%EC%9E%91/)

### 웹캠 브라켓 제작

[여기에서 확인하세요](https://ispaik06.github.io/posts/Rhino_%EC%9B%B9%EC%BA%A0_%EB%B8%8C%EB%9D%BC%EC%BC%93_%EC%84%A4%EA%B3%84/)

---



## 구동 컨트롤 패널 웹 서버 구축
RC카의 하드웨어 제작을 모두 마쳤다. 이제부터 코드만 구현하면 된다.
그전에 라즈베리파이로 DC 모터 제어와 서보모터 제어 테스트를 해보고 문제가 없는지 확인하였다.

가장 먼저 해야 할 일은 차를 조종할 웹 서버를 구현하는 것이다. 파이썬과 Flask 라이브러리를 이용해 구현하고, 웹 페이지는 html로 작성할 예정이다. 필요한 웹 페이지의 기능을 정리해보자면 다음과 같다:

* 키보드의 방향키(4방향)으로 RC카 조종
* 구동 속도 조절 기능
* 키보드의 'i', 'j', 'k','l' 키로 웹캠 브라켓 관절 조종
* 실시간 웹캠 스트리밍


우선 키보드의 방향키로 RC카를 조종하는 것부터 구현해보았다.



### 1. 키보드의 방향키(4방향)으로 RC카 조종 & 속도 조절 기능
Flask를 이용해 서버를 구축하고, 웹 페이지에서 키보드가 눌리면 파이썬이 실행되고 있는 터미널에 방향에 해당하는 문자열을 출력하는 코드를 먼저 작성하였다. 속도 조절은 슬라이더를 이용해 구현하였다.

파이썬 코드는 다음과 같다.

```python
from flask import Flask, render_template, request

app = Flask(__name__)

current_speed = None

# Define routes and functionalities
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/move', methods=['POST'])
def move():
    global current_speed
    direction = request.form['direction']
    speed = int(request.form['speed'])

    if speed != current_speed:
        print(f'Speed: {speed}')
        current_speed = speed

    print(f'Direction: {direction}')
    return "Received"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
```


위 코드에서 방향은 방향키를 누를 때마다, 속도는 새로 업데이트 될 때마다 출력하도록 하였다.

다음은 `index.html`이다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Control Panel</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        #directionDisplay {
            font-size: 24px;
            color: blue;
        }
        #directionText {
            font-weight: bold;
        }
        #speedValue {
            font-size: 20px;
        }
        #speedControl {
            width: 300px;
            height: 20px;
        }
        .spacer {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Raspberry Pi WiFi Controlled Car: Control Panel</h1>
    <div id="directionDisplay">Direction: <span id="directionText"></span></div>
    <div class="spacer"></div>
    <div>
        <label for="speedControl">Speed: <span id="speedValue">255</span></label>
        <input type="range" id="speedControl" min="0" max="255" value="255">
    </div>
    <script>
        $(document).ready(function() {
            var directionText = $('#directionText');
            var direction = '';
            var speed = $('#speedControl').val();
    
            $('#speedControl').on('input', function() {
                speed = $(this).val();
                $('#speedValue').text(speed);
                sendDirection(direction, speed);
            });

            $(document).on('keydown', function(e) {
                switch (e.keyCode) {
                    case 37: // 좌 화살표
                        direction = 'Turn left';
                        break;
                    case 38: // 상 화살표
                        direction = 'Forward';
                        break;
                    case 39: // 우 화살표
                        direction = 'Turn right';
                        break;
                    case 40: // 하 화살표
                        direction = 'Backward';
                        break;
                }
                sendDirection(direction, speed);
            });
    
            $(document).on('keyup', function(e) {
                if (e.keyCode >= 37 && e.keyCode <= 40) {
                    direction = 'Stop';
                    sendDirection(direction, speed);
                }
            });
    
            function sendDirection(direction, speed) {
                $.ajax({
                    url: '/move',
                    type: 'POST',
                    data: {direction: direction, speed: speed},
                    success: function(response) {
                        console.log('Direction:', direction, 'Speed:', speed);
                        directionText.text(direction);
                    }
                });
            }
        });
    </script>    
</body>
</html>

```


`index.html`은 파이썬 코드와 같은 디렉토리에 있는 `templates` 디렉토리 안에 있어야 한다.


이제 파이썬 코드를 실행하자. 터미널에 아래와 같이 뜨면 잘 되고 있는 것이다.

![project1_1.png](/assets/img/project1_1.png)

그 다음 웹 브라우저에 `http://127.0.0.1:포트번호`를 입력하여 로컬 서버로 접속하면 아래와 같이 뜬다.

![project1_2.png](/assets/img/project1_2.png)


웹 페이지에서 방향키를 눌러보고, 슬라이더를 조절하면 터미널에 문자열이 출력되는 것을 확인할 수 있을 것이다.


![project1_3.gif](/assets/img/project1_3.gif)*실행하면 위와 같이 뜬다 (gif file)*



### 2. 키보드의 'i', 'j', 'k','l' 키로 웹캠 브라켓 관절 조종

웹캠 브라켓 관절은 2-DOF로 상하, 좌우로만 관절을 움직일 수 있다. 이를 조종하기 위해 상, 하, 좌, 우 를 각각 키보드 'i', 'k', 'j','l' 키에 대응시키기로 했다. 파이썬 코드는 변동사항이 없고, `index.html`만 잘 수정해주면 된다.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Control Panel</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        #directionDisplay {
            font-size: 24px;
            color: blue;
        }
        #directionText {
            font-weight: bold;
        }
        #speedValue {
            font-size: 20px;
        }
        #speedControl {
            width: 300px;
            height: 20px;
        }
        .spacer {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Raspberry Pi WiFi Controlled Car: Control Panel</h1>
    <div id="directionDisplay">Direction: <span id="directionText"></span></div>
    <div class="spacer"></div>
    <div>
        <label for="speedControl">Speed: <span id="speedValue">255</span></label>
        <input type="range" id="speedControl" min="0" max="255" value="255">
    </div>
    <script>
        $(document).ready(function() {
            var directionText = $('#directionText');
            var direction = '';
            var speed = $('#speedControl').val();
    
            $('#speedControl').on('input', function() {
                speed = $(this).val();
                $('#speedValue').text(speed);
                sendDirection(direction, speed);
            });

            $(document).on('keydown', function(e) {
                switch (e.keyCode) {
                    case 37: // 좌 화살표
                        direction = 'Turn left';
                        break;
                    case 38: // 상 화살표
                        direction = 'Forward';
                        break;
                    case 39: // 우 화살표
                        direction = 'Turn right';
                        break;
                    case 40: // 하 화살표
                        direction = 'Backward';
                        break;
                    case 74: // 'j' 키
                        direction = 'Servo turn left';
                        break;
                    case 76: // 'l' 키
                        direction = 'Servo turn right';
                        break;
                    case 73: // 'i' 키
                        direction = 'Servo up';
                        break;
                    case 75: // 'k' 키
                        direction = 'Servo down';
                        break;
                }
                sendDirection(direction, speed);
            });
    
            $(document).on('keyup', function(e) {
                if ((e.keyCode >= 37 && e.keyCode <= 40) || [74, 76, 73, 75].includes(e.keyCode)) {
                    direction = 'Stop';
                    sendDirection(direction, speed);
                }
            });
    
            function sendDirection(direction, speed) {
                $.ajax({
                    url: '/move',
                    type: 'POST',
                    data: {direction: direction, speed: speed},
                    success: function(response) {
                        console.log('Direction:', direction, 'Speed:', speed);
                        directionText.text(direction);
                    }
                });
            }
        });
    </script>    
</body>
</html>

```


코드를 실행하면, i, j, k, l을 눌렀을 때 Servo에 관련된 문자열이 뜰 것이다.




### 3. 실시간 웹캠 스트리밍
라즈베리파이로 웹캠 스트리밍을 하는 방법은 여러 가지가 있다. 우리는 파이썬으로 코딩하고 있으므로 `Flask`와 `OpenCV`를 이용해 웹캠 스트리밍을 구현하려고 한다.


사실 우리는 라즈베리파이에서 `motion` 프로그램을 이용해 웹캠 스트리밍을 하려고 했었다.

 [라즈베리파이 motion을 이용한 웹캠 스트리밍](https://ispaik06.github.io/posts/%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%ED%8C%8C%EC%9D%B4-motion%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%9B%B9%EC%BA%A0-%EC%8A%A4%ED%8A%B8%EB%A6%AC%EB%B0%8D/)

motion 사용법을 공부하고 웹캠 스트리밍 구현을 마친 뒤에 계획을 잘못 설정했다는 것을 깨달았다.

> **motion을 사용하지 못한 이유**
> 
> Motion 소프트웨어를 사용하여 웹켐 스트리밍에 성공하였다. 하지만 굉장히 큰 문제가 있었다. Flask를 이용해 제작한 웹 서버의 로컬 서버와 motion을 이용해 스트리밍하는 서버의 주소(URL)가 동일한 것이다. 이 부분을 전혀 예상하지 못했는데 두 서버 모두 접속해야 스트리밍 화면은 보고 제어가 가능한데 둘 중 하나만 접속 가능한 것이다. 그래서 우리는 과감히 Motion을 버리고 openCV으로 python을 이용해 웹 서버에 제어 가능한 부분과 스트리밍 화면을 동시에 띄울 수 있도록 하였다.



웹캠 스트리밍 구현 방법은 [OpenCV, Flask를 이용한 웹캠 스트리밍](https://ispaik06.github.io/posts/OpenCV,-Flask%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%9B%B9%EC%BA%A0-%EC%8A%A4%ED%8A%B8%EB%A6%AC%EB%B0%8D-(python)/)에서 확인할 수 있다.


---


## 라즈베리파이 제어와 웹서버 연동

이제 RC카 컨트롤 패널 웹 페이지를 만들었으니, 실제 모터가 구동되도록 코드를 추가해주면 된다. 라즈베리파이에서 DC 모터와 서보모터를 사용하는 방법에 대해서는 아래 글에 작성해두었다. 웹 페이지로부터 특정 문자열이 왔을 때, 위에서는 단순히 터미널에 내용을 출력했지만 아래 글을 참고해서 해당하는 작업을 수행하도록 코딩하면 된다.

[라즈베리파이 DC모터 제어](https://ispaik06.github.io/posts/raspberrypi_dc_motor_control/)

[라즈베리파이 서보모터 제어](https://ispaik06.github.io/posts/Raspberry-Pi-Servo-motor-control/)




아래는 파이썬 코드의 일부이다. DC 모터와 서보모터 제어를 위한 코드가 추가되어 윗부분이 너무 길어져 Flask 관련 코드만 가져왔다.
전체 코드는 아래 링크에서 확인할 수 있다.

[main_without_arduino.py](https://github.com/ispaik06/WiFi_RC_car_webcam/blob/main/main_without_arduino/main_without_arduino.py)


```python
# Flask setup
app = Flask(__name__)

current_direction = None
current_speed = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/move', methods=['POST'])
def move():
    global current_direction, current_speed
    global angle1, angle2
    global spd
    direction = request.form.get('direction')
    speed = int(request.form.get('speed', 255)) 
    spd = int(speed / 255.0 * 100)
    if direction :
        current_direction = direction
        print(f'Direction: {direction}')

    if speed != current_speed:
        current_speed = speed
        print(f'Speed: {speed}')

    if direction == 'Forward':
        forward(spd)
    elif direction == 'Backward':
        backward(spd)
    elif direction == 'Turn left':
        left_turn(spd)
    elif direction == 'Turn right':
        right_turn(spd)
    elif direction == 'Servo up':
        angle1 += 5
        angle1 = constrain(angle1)
        setServo1Pos(angle1)
    elif direction == 'Servo down':
        angle1 -= 5
        angle1 = constrain(angle1)
        setServo1Pos(angle1)
    elif direction == 'Servo turn left':
        angle2 += 5
        angle2 = constrain(angle2)
        setServo2Pos(angle2)
    elif direction == 'Servo turn right':
        angle2 -= 5
        angle2 = constrain(angle2)
        setServo2Pos(angle2)
    elif direction == 'Stop':
        stop()

    return 'OK'

if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', port=80)
    finally:
        GPIO.cleanup()

```


`index.html`은 변동 사항이 없다.(웹캠 스트리밍 기능 없는 버전)

이제 코드를 라즈베리파이에서 실행하고, 로컬 서버에 접속하여 테스트하여 잘 작동되는 것을 확인할 수 있다.


---



## 서보모터 떨림 해결을 위한 아두이노 연동

지금까진 라즈베리파이에서 DC 모터와 서보모터를 모두 제어하였다. 실제로 작동해보니 한 가지 문제점이 있었다. 서보모터 조종 키를 누르지 않아도 서보모터가 계속 떨리는 현상이었다. 서보모터 떨림에 대해 찾아보니 이를 해결하기 위한 라이브러리도 있었다. (아래 블로그 참고)

* [라즈베리파이4 서보모터 SG-90 떨림,흔들림, jitter,shaking 파이썬 해결 GPIO라이브러리](https://luigibox.tistory.com/entry/%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%ED%8C%8C%EC%9D%B44-%EC%84%9C%EB%B3%B4%EB%AA%A8%ED%84%B0-SG-90-%EB%96%A8%EB%A6%BC%ED%9D%94%EB%93%A4%EB%A6%BC-jittershaking-%ED%8C%8C%EC%9D%B4%EC%8D%AC-%ED%95%B4%EA%B2%B0-GPIO%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC?category=779251)


* `pigpio library`
https://abyz.me.uk/rpi/pigpio/index.html





우리도 `pigpio`를 다운받아 시도해봤지만, 이유는 모르겠지만 상황이 개선되진 않았다. 다른 사람들은 대부분 잘 된다는데..
그래서 서보모터는 아두이노로 제어해야겠다고 생각해서 아두이노를 추가하기로 하였다. 메인 파이썬 코드는 라즈베리파이에서 실행하고 있으니, 서보모터는 아두이노를 라즈베리파이와 시리얼 통신시켜 제어하면 된다.

라즈베리파이와 아두이노 간의 유선 통신 방법은 여러 가지가 있는데 우리는 usb 케이블로 연결하고 `pyserial` 라이브러리를 이용해 통신하기로 하였다. 기본적인 사용법은 아래 글에 작성했다.

[pyserial을 이용한 아두이노와 라즈베리파이 시리얼 통신](https://ispaik06.github.io/posts/pyserial%EC%9D%84_%EC%9D%B4%EC%9A%A9%ED%95%9C_%EC%95%84%EB%91%90%EC%9D%B4%EB%85%B8%EC%99%80_%EB%9D%BC%EC%A6%88%EB%B2%A0%EB%A6%AC%ED%8C%8C%EC%9D%B4_%EC%8B%9C%EB%A6%AC%EC%96%BC_%ED%86%B5%EC%8B%A0/)

아두이노 연결 이후 파이썬 코드에서 서보모터 관련 부분은 다 없애고, 시리얼 통신으로 아두이노에 문자를 보내는 코드로 대체하였다.
아두이노에서는 특정 문자에 따라 서보모터를 제어하는 코드를 업로드하였다.

자세한 코드는 아래에서 확인할 수 있다.

[serial_example.ino](https://github.com/ispaik06/WiFi_RC_car_webcam/blob/main/Arduino/serial_example.ino)

[main_without_webcam.py](https://github.com/ispaik06/WiFi_RC_car_webcam/blob/main/main_without_webcam/main_without_webcam.py)


아두이노로 서보모터를 제어하는 걸로 바꾼 결과, 웹 페이지에서 i, j, k, l 키를 눌렀을 때 서보모터의 떨림 없이 잘 제어되는 것을 확인할 수 있었다. 물론 100% 떨림이 사라진 것은 아니다.

서보모터 떨림 현상 해결에 대한 자세한 내용은 나중에 따로 공부해볼만 한 것 같다. 이런 현상을 서보모터 지터, Jittering(지터링) 이라고 한다.

참고: [【아두이노에러해결#4】 서보모터 떨림, 흔들림, 불안정 현상 해결!](https://rasino.tistory.com/entry/%E3%80%90-%EC%95%84%EB%91%90%EC%9D%B4%EB%85%B8%EC%97%90%EB%9F%AC%ED%95%B4%EA%B2%B04%E3%80%91-%EC%84%9C%EB%B3%B4%EB%AA%A8%ED%84%B0-%EB%96%A8%EB%A6%BC-%ED%9D%94%EB%93%A4%EB%A6%BC-%EB%B6%88%EC%95%88%EC%A0%95-%ED%98%84%EC%83%81-%ED%95%B4%EA%B2%B0-servo-shaking-problem-SG-90)


---



## 웹캠 스트리밍 기능 합치기

지금까지 웹캠 스트리밍 빼고 RC카의 라즈베리파이에서 모두 구현하였다. [3. 실시간 웹캠 스트리밍](#3-실시간-웹캠-스트리밍)에서 구현한 것을 라즈베리파이에 합치기만 하면 된다. 합친 최종 파이썬 코드와 `index.html`은 아래에서 확인할 수 있다.

[main_final](https://github.com/ispaik06/WiFi_RC_car_webcam/tree/main/main_final)

이전에 만들었던 구동 컨트롤 패널을 스마트폰에서도 사용할 수 있도록 버튼을 추가하고, 전체적으로 배치와 슬라이더 디자인을 수정하였다. 이 부분은 8기 박하준이 구현하였다. 

![project1_4.png](/assets/img/project1_4.png)


다음은 이에 대한 설명이다:

> **작성자: 8기 박하준**
> ##### 웹 서버 모바일 터치 기능 구현
> 모바일 환경에서도 RC카를 원활히 제어할 수 있도록 터치 이벤트를 처리하는 코드를 추가했다. 아래 작성한 코드는 JavaScript와 jQuery를 사용하여 터치 이벤트를 처리한다.
> ##### JavaScript를 이용한 모바일 터치 이벤트 처리
> 다음 코드는 모바일 터치 이벤트를 처리하여 RC카를 제어하는 기능을 구현한다. 각 방향 버튼에 대해 터치 이벤트를 감지하고, 해당 방향에 맞는 키보드 이벤트를 트리거한다.


```html
// 모바일 터치 이벤트 처리
$('.arrow-key').on('mousedown touchstart', function() {
    var arrowId = $(this).attr('id');
    var keyCode;
    switch (arrowId) {
        case 'arrowUp':
            keyCode = 38;
            break;
        case 'arrowDown':
            keyCode = 40;
            break;
        case 'arrowLeft':
            keyCode = 37;
            break;
        case 'arrowRight':
            keyCode = 39;
            break;
    }
    if (keyCode) {
        $(document).trigger($.Event('keydown', { keyCode: keyCode }));
    }
});

$('.arrow-key').on('mouseup touchend', function() {
    var arrowId = $(this).attr('id');
    var keyCode;
    switch (arrowId) {
        case 'arrowUp':
            keyCode = 38;
            break;
        case 'arrowDown':
            keyCode = 40;
            break;
        case 'arrowLeft':
            keyCode = 37;
            break;
        case 'arrowRight':
            keyCode = 39;
            break;
    }
    if (keyCode) {
        $(document).trigger($.Event('keyup', { keyCode: keyCode }));
    }
});

```


---






## 프로젝트 최종 결과

![project1_5.png](/assets/img/project1_5.png)

RC카를 다 만들고 학교 1층에서 조종해보았다. 양쪽 DC 모터의 속도를 PID 제어같이 피드백 제어해주지 않아서 앞으로 갈 때 옆으로 휘는 경향이 있으나 생각보다 조종이 잘 되어서 만족스러웠다.

[Youtube link](https://www.youtube.com/watch?v=Slz54CVW0aA)



---

그러나 완벽하진 않았다 . . .


### 시간 지연 문제
라즈베리파이가 내 아이폰의 핫스팟에 연결하고, 내 Mac은 학교 WiFi에 연결하여 조종해보았다. 내 아이폰은 RC카에 고정시켰다. 이렇게 하면 학교의 모든 곳으로 조종해서 도달할 수 있다고 생각했다. WiFi 연결만 되면 가능한 통신이니까.

테스트 하면서 잘 된다고 생각해서 엄청 멀리까지 조종해보려는데, 문제가 생겼다. 웹캠 스트리밍의 시간 지연 때문에 실제로 RC카를 보면서 조종하는 것이 아니라면 조종이 불가능할 정도였다. 스트리밍 시간 지연 문제를 해결하기 위해 원인과 해결방법 등 많은 것들을 찾아보았는데, 가장 큰 이유는 `OpenCV`와 `Ngrok`를 사용했다는 것이라고 생각한다.


#### OpenCV와 시간 지연 문제

`OpenCV`는 이미지와 비디오 처리에 매우 강력한 라이브러리지만, 실시간 스트리밍에는 몇 가지 제한이 있다. `OpenCV`는 **한 프레임씩 데이터를 전송**하기 때문에 시간 지연이 걸리기 마련이다. `OpenCV`는 주로 이미지 처리와 컴퓨터 비전 작업을 위해 설계되었기 때문에 비디오 스트리밍에 최적화되어 있지 않다. 따라서 프레임 전송 간에 지연이 발생하여 실시간 조종이 어렵게 만드는 원인이 된 것이다.


이 문제를 해결하기 위해 다른 사람들의 사례를 찾아보다가 `WebRTC`(Web Real-Time Communication)라는 기술을 알게 되었다. `WebRTC`는 웹 애플리케이션과 사이트가 직접 브라우저 간에 오디오, 비디오, 데이터 스트리밍을 할 수 있도록 하는 기술이다. 구글 Meet, Zoom, Facebook 등에서 쓰이고 있다. `WebRTC`는 다음과 같은 주요 장점이 있다:

* 낮은 지연 시간: `WebRTC`는 실시간 통신을 위해 설계되었기 때문에, 매우 낮은 지연 시간을 제공한다. 이는 RC카와 같은 실시간 조종이 필요한 애플리케이션에 적합하다.

* P2P 연결: `WebRTC`는 브라우저 간의 P2P(피어 투 피어) 연결을 통해 데이터 전송을 수행한다. 이를 통해 중간 서버를 거치지 않고 직접 연결하여 지연 시간을 최소화할 수 있다.

* 강력한 네트워크 최적화: `WebRTC`는 네트워크 상태에 따라 자동으로 비트레이트를 조절하고, 패킷 손실 복구 메커니즘을 내장하고 있어 안정적인 스트리밍을 지원한다.


**`WebRTC`는 프레임을 한 번에 전송하는 대신, 지속적인 스트림을 유지하여 실시간 비디오 피드를 제공**한다. 그리고 낮은 지연 시간 덕분에 RC카의 시점을 즉각적으로 확인할 수 있다.


#### Ngrok의 시간 지연 요인
`ngrok`를 사용한 것도 시간 지연에 영향을 끼쳤을 가능성이 있다. `ngrok`는 로컬 서버를 인터넷에서 접근할 수 있도록 터널링 서비스를 제공하지만, 이러한 터널링 과정에서 추가적인 지연이 발생할 수 있다. 특히 다음과 같은 요인들이 시간 지연에 기여할 수 있다:

* 중계 서버: `ngrok`는 로컬 서버와 외부 클라이언트 간의 데이터를 중계 서버를 통해 전달한다. 이 과정에서 데이터가 추가적으로 왕복하는 시간이 필요하게 된다.

* 네트워크 대역폭 및 혼잡도: ngrok의 서버가 위치한 데이터 센터의 네트워크 상태와 혼잡도에 따라 지연 시간이 달라질 수 있습니다. 그리고 `ngrok`의 무료 플랜을 사용할 경우 대역폭 제한이나 서버 혼잡도가 더 높을 수 있다.

* 암호화 및 복호화: `ngrok`는 보안된 연결을 제공하기 위해 데이터 암호화 및 복호화 과정을 거친다. 이 과정 역시 미세하지만 추가적인 지연을 발생시킬 수 있다.


#### WebRTC와 Ngrok 비교

>WebRTC는 P2P 연결을 통해 직접 브라우저 간의 데이터를 전송하기 때문에 중간 서버를 거치지 않는다. 이로 인해 지연 시간이 최소화되며, ngrok와 같은 중계 서비스를 사용할 필요가 없다. WebRTC를 사용하면 네트워크 상태에 따라 자동으로 비트레이트를 조절하고 패킷 손실 복구 메커니즘을 통해 안정적인 스트리밍을 지원하므로, ngrok보다 더 낮은 지연 시간을 기대할 수 있다.

>**실시간 스트리밍이나 조종과 같이 낮은 지연 시간이 필요한 경우에는 WebRTC와 같은 P2P 기반의 실시간 통신 기술을 사용해야 한다는 것을 알게 되었다. WebRTC를 통해 직접적인 브라우저 간 연결을 사용하면 ngrok를 통해 발생하는 추가적인 지연 시간을 피할 수 있습니다.**

애초에 `Ngrok`를 쓰지 않고 `WebRTC`로 스트리밍을 했어야 했다. 한 프레임씩 전송하는 `OpenCV`와 중계 서버를 사용하는 터널링 프로그램인 `Ngrok`를 동시에 사용해서 시간 지연을 일으킬만한 요인들만 모아서 쓴 것이다.


---


## 마무리하며

### 추가 아이디어

#### 1. 조이스틱 컨트롤러

현재 조종 방식은 키보드이다. 조이스틱 컨트롤러(조이 패드)를 연동시켜서 좀 더 높은 차원의 조종이 가능하도록 하면 좋을 것 같다.

#### 2. FPV or VR
현재 웹캠 스트리밍을 웹 페이지에 송출하고 있다. FPV 드론이나 VR 기기 처럼 사용자가 고글 형태로 껴서 FPV RC카로 변형하면 더 재미있을 것이다.

---

### 느낀 점 (백인성)
이 프로젝트를 통해 나는 여러 가지 중요한 공학적 경험과 깨달음을 얻었다. 가장 큰 성과는 프로젝트 이전에 상상했던 것을 만들기 위해 다양한 기술과 장비를 통합해서 실제로 작동하는 시스템을 구축한 것이다. 단순한 이론 학습이 아닌, 실제로 만들어보면서 문제를 해결하고 코드를 작성하여 결과물을 만들어 내는 과정에서 많은 것을 배울 수 있었다.

처음에 다양한 통신 방식을 비교하고 실제 프로젝트에 적합한 방식을 선택하는 과정에서 블루투스, Wifi, LoRa 통신, Zigbee 등의 통신 방식의 장단점을 깊이 이해할 수 있었다. 특히 이번에는 Wifi를 이용한 장거리 통신의 가능성과 한계를 직접 경험하며 실습할 수 있었다. Flask를 이용한 웹 서버 구축과 OpenCV를 이용한 실시간 웹캠 스트리밍을 통해 웹 기술에 대한 실질적인 이해를 높였다. 나중에 더 복잡한 웹 애플리케이션 관련 프로젝트를 할 때 도움이 될 것이다.

프로젝트 진행 중 발생한 여러 문제들을 해결하는 과정에서 많은 시행착오가 있었다. 각 문제에 대해 상황과 근본적인 원인 판단을 정확히 하고 모든 경우에 대해 될 때까지 시도하였다. 서보 모터의 떨림 문제를 해결하기 위해 다양한 시도를 하고, 우리가 바로 할 수 있는 최적의 해결책을 찾아갔다. 웹캠 스트리밍을 OpenCV와 ngrok로 한 것은 큰 실수라고 볼 수도 있지만 이 문제를 통해 WebRTC 기술을 새롭게 알게 되었다. 이 경험을 통해 공학 프로젝트의 계획 단계에서 결과에 미칠 영향을 정말 섬세하고 구체적으로 고려하는 것이 중요함을 깨달았다. 다음에 스트리밍 관련 프로젝트를 위해 WebRTC에 대해서 자세히 공부해 봐야겠다.

----

### 느낀 점 (이서준)
이번 프로젝트의 핵심은 라즈베리파이라고 생각을 한다. 2학년 여름방학 현장연구에서 조금 다뤘본 이후로 라즈베리파이를 이용한 첫 번째 프로젝트였는데 많은 지식을 얻어갈 수 있어서 정말 뜻깊은 프로젝트라고 생각한다. 라즈베리파이, 아두이노, 웹켐을 활용한 RC카 제작은 단순한 기술적 도전을 넘어 창의력과 문제 해결 능력을 기를 수 있는 기회였다. Motion을 성공했을 때의 기쁨을 느낀 후 얼마 지나지 않아 무용지물이 되었을 때 느낀 그 절망이 이번 프로젝트의 재미라고 생각한다. 짦은 시간 안에 일희일비가 겪으며 창의력, 문제 해결 능력 등이 발휘되며 얻은 것이 정말 많은 프로젝트였다. 

정말 많은 긴 코드들을 작성해야하는 프로젝트를 처음 시도해보았는데 생각보다 어렵지 않았다. 이 프로젝트를 하기 이전에 긴 코드와 터미널을 이용하는 것에 대한 두려움이 존재했던 것 같다. 이번 프로젝트를 통해 그러한 두려움을 떨쳐낼 수 있었다.

이번 프로젝트의 여러 시행착오를 통해 느낀 점도 많다. 서보모터의 떨림, Motion 등을 사용한 것들의 실패를 통해 더 좋은 방안을 찾아보고 해결하는데 성공하긴 했지만, 진정한 공학자는 이러한 실패 요소까지 생각하며 완벽한 설계를 하는 것이라고 생각한다. 그러면서 절약한 시간을 통해 더 나은 결과물을 제작하는데 사용했으면 더 좋았을 것 같다. 서보모터의 떨림 등은 충분히 예상 가능한 부분이었다. 이래서 배경지식과 자료조사, 선행 연구 조사 등이 굉장히 중요하다는 것을 깨닫게 되었다.

---

### 느낀 점 (박하준)
이번 RC카 제작 프로젝트에서 하드웨어 및 웹서버를  담당하면서 많은 것을 배울 수 있었다. 가장 큰 성과는 웹캠을 사용해 다양한 기기에서 사용자와 인터렉티브한 상호작용을 구현할 수 있었던 점이다. 터치 이벤트와 마우스 이벤트를 동시에 처리할 수 있도록 코드를 작성하면서, 모바일 환경과 데스크톱 환경의 차이를 깊이 이해할 수 있었다.

JavaScript와 jQuery를 활용하여 터치 이벤트를 처리하는 과정에서, 이벤트 리스너를 적절하게 설정하고, 각 방향 버튼의 ID를 통해 키보드 이벤트를 트리거하는 부분이 특히 흥미로웠다. 이러한 작업을 통해 사용자 입력을 효율적으로 처리하고, RC카의 방향을 제어하는 데 있어 높은 정확도를 유지할 수 있었다.

하드웨어 측면에서도 많은 것을 배우고 경험할 수 있었다. 우선 차체 설계 단계에서 부품들의 크기와 배치를 고려하여 구조를 계획하는 것이 얼마나 중요한지 깨달았다. 이륜구동에 볼 캐스터를 사용한 결정은 배터리 사용량과 무게를 줄이는 데 큰 도움이 되었고, 결과적으로 RC카의 제어를 더 쉽게 만들었다.

또한, 웹캠을 설치하면서 시야 문제를 해결하기 위해 2층 판을 분리하고 따로 연결하는 등의 조정 작업을 통해, 하드웨어 설계의 유연성과 문제 해결 능력이 얼마나 중요한지 깨달았다.


---

### 느낀 점 (이종원)

    아직 안씀



---
질문이나 조언은 댓글 또는 메일로 부탁드립니다! 🙇