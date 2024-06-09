---
title: "OpenCV, Flask을 활용한 웹캠 스트리밍 (python)"
date: 2024-06-09 14:39:00 +09:00
categories: [Python]
tags: [Python, OpenCV, Webcam]
---

**작성자: 8기 이서준**

## Python OpenCV를 이용한 웹켐 스트리밍

여기서는 Python OpenCV를 이용한 웹켐 스트리밍 방법에 대해 다룬다. 앞서 Motion을 이용해 웹켐 스트리밍했을 때 발생한 문제에 대해 설명하였다. 하지만, OpenCV는 Python으로 실행시킬 수 있어 같은 웹 서버에 추가만 하면 같은 서버로 제어와 스트리밍이 가능한 것이다.


## 사용한 장치

노트북이라면 내장되어 있는 카메라가 있으니 따로 준비물은 필요 없다.

- [Logitech C310 HD WEBCAM](https://www.logitech.com/ko-kr/products/webcams/c310-hd-webcam.960-000631.html)


## OpenCV란?

OpenCV(Open Source Computer Vision Library)는 컴퓨터 비전 및 이미지 처리 응용 프로그램을 개발하기 위한 오픈소스 라이브러리이다. Intel에서 개발되었으며, 현재 다양한 플랫폼에서 사용 가능하다. OpenCV는 실시간 이미지 처리에 최적화되어 있으며, 다양한 기능을 제공한다.


## OpenCV 설치

먼저 Flask와 OpenCV 라이브러리를 설치한다. 다음 명령어를 터미널에 입력하여 설치한다.

```bash
pip install opencv-python
```

## 1. HTML 템플릿

스트리밍을 표시할 간단한 HTML 파일을 작성한다. 이 파일은 `index.html`로 저장한다.

```html
<!DOCTYPE html>
<html>
<head>
    <title>Webcam Stream</title>
</head>
<body>
    <h1>Webcam Live Stream</h1>
    <img src="{{ url_for('video_feed') }}" width="100%">
</body>
</html>
```

## 2. Flask 애플리케이션

Flask 애플리케이션을 작성하여 웹켐에서 캡처한 영상을 스트리밍한다.

```python
from flask import Flask, render_template, Response
import cv2

app = Flask(__name__)

# 웹캠 캡처를 위한 함수
def gen_frames():
    camera = cv2.VideoCapture(0)  # 웹캠을 열기
    while True:
        success, frame = camera.read()  # 프레임 읽기
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # 프레임 반환

@app.route('/')
def index():
    return render_template('index.html')  # HTML 페이지 렌더링

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')  # 스트리밍 응답

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081)  # 웹 서버 실행
```

### (1) 라이브러리 임포트

```python
from flask import Flask, render_template, Response
import cv2
```

### (2) Flask 애플리케이션 초기화

```python
app = Flask(__name__)
```

### (3) 웹켐 프레임 생성 함수

```python
def gen_frames():
    camera = cv2.VideoCapture(0)  # 웹캠을 열기
    while True:
        success, frame = camera.read()  # 프레임 읽기
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # 프레임 반환
```

`gen_frames` 함수는 웹캠에서 프레임을 캡처하고, 이를 JPEG 형식으로 인코딩하여 반환한다.

### (4) 라우팅 설정

```python
   @app.route('/')
   def index():
       return render_template('index.html')
   
   @app.route('/video_feed')
   def video_feed():
       return Response(gen_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')
```

- `/` 경로는 HTML 페이지를 렌더링한다.
- `/video_feed` 경로는 스트리밍 데이터를 제공한다.

### (5) 애플리케이션 실행

```python
   if __name__ == '__main__':
       app.run(host='0.0.0.0', port=8081)
```

Flask 서버를 8081 포트에서 실행한다.

이제 브라우저에서 `http://127.0.0.1:8081`에 접속하여 웹캠 스트리밍을 확인할 수 있다. 이 설정을 통해 실시간으로 웹캠 영상을 스트리밍과 함께 DC 모터, 서보 모터를 함께 제어할 수 있게 되었다.

## 참고사항

1. 웹켐 인식 확인
    - `cv2.VideoCapture(0)`에서 `0`은 첫 번째 웹캠을 의미한다. 웹캠이 여러 대 있는 경우 적절한 인덱스를 사용해야 한다.
    - 웹캠이 정상적으로 인식되었는지 `ret` 값을 확인한다. `False`일 경우 웹캠이 정상적으로 연결되었는지 확인해야한다.
2. 성능 최적화
    - 실시간 처리가 필요한 경우 프레임 크기를 조정하거나 특정 색상 공간으로 변환하여 성능을 최적화할 수 있다.


## 문제 해결

OpenCV를 통해 Motion을 사용했을 때 발생한 문제점을 해결하였다. 또한 Motion을 사용했을 때, 2초 넘게 딜레이가 발생하였는데 이 또한 훨씬 개선되었다. 딜레이가 거의 없다고 해도 될 정도로 빨라진 것을 확인할 수 있었다. 또한 만약 Motion을 사용했다면 발생했을 두 사이트에 동시에 접속하야하며 두 사이트 모두 띄워놓아야하는 번거로움이 해결되는 장점 또한 있었다.