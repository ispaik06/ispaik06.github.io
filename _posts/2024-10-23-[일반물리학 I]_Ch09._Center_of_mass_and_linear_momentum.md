---
title: "[일반물리학 I] Ch09. Center of mass and linear momentum"
date: 2024-10-23 17:14:00 +09:00
lastmod: 2024-10-23 17:14:00 +09:00
categories: [Physics]
tags: [Study, Physics]
---

**세종과학예술영재학교 박동규 선생님의 `일반물리학 I` 수업 자료 일부입니다.**

수업 필기본 PDF 파일은 여기에서 확인하실 수 있습니다.

시험 기간에 심심해서 마크다운 문법 연습 겸 타이핑쳤던 파일임..


# 1. 질량 중심 (Center of Mass, C.M)
## ① 정의 (Definition)
- 입자 위치의 질량에 대한 가중평균
-  $$\vec{r}_{CM} = { \sum m_i \vec{r_i} \over \sum m_i}$$
### Example 1: Gravitational potential energy
생략

<br><br><br>

## ② 입자계에서 뉴턴 제 2법칙 (Newton's 2nd law for a system of particles)
##### $\vec{F}_{tot} = M \vec{a}_{CM}$ 유도
$$\begin{align}
\vec{F}_{tot} &= \sum_{i} \vec{F_i} = \sum_{i} m_i \vec{a_i}
\\ & = \sum_{i} m_i \ddot{\vec{r_i}} = \sum_{i} {d^2 \over dt^2} (m_i \vec{r_i})
\\ & = {d^2 \over dt^2} (\sum_{i} m_i \vec{r_i}) = {d^2 \over dt^2} M \vec{r}_{CM}
\\ & = M \vec{a}_{CM}
\end{align}$$

<br><br>

### Example 2: Carts - Spring system
![스크린샷 2023-10-12 오후 2.43.25.png](/assets/img/2024-10-23-1/스크린샷%202023-10-12%20오후%202.43.25.png)

- (1) 손을 땐 직후 $a_A,\, a_B, \, a_{CM}$ 는?
- (2) A가 벽에서 분리될 때까지 걸린시간 $t$ 는?
- 계가 등속운동할 때 진동주기 $T'$ 는?

<br><br><br>

### Example 3: 빗면 위의 상자와 공
빗면과 물체 사이의 마찰이 있는 경우(A)와 마찰이 없이 미끄러지는 경우(B)에 대해서 빗면이 밀려난 거리 $d$의 크기를 정량적으로 비교하시오. 빗면과 바닥 사이 마찰은 없다.
![스크린샷 2023-10-12 오후 2.45.38.png](/assets/img/2024-10-23-1/스크린샷%202023-10-12%20오후%202.45.38.png)

<br><br><br>

## ③ 연속 분포된 물질 (Continuous matter)의 질량 중심
- 불연속입자계
$$\vec{r}_{CM} = {\sum m_i \vec{r_i} \over M}$$
- 연속입자계
$$\vec{r}_{CM} = {\int \vec{r} dm \over M}$$

##### (1) 균일한 막대 (rod)
##### (2) 반원 고리 (half-ring)
##### (3) 반원 판 (half-disk)
##### (4) 반구각 (halg-spherical shell)
##### (5) 반구 (hemisphere)

<br><br>

### Example 4: 사람의 질량 중심
생략



# 2. 선운동량 (Linear Momentum)
## ① 입자계의 운동량 (Linear momentum for a system of particles)
##### $\vec{P}_{tot} = M \vec{v}_{CM}$ 유도
$$
\begin{align}
\vec{P}_{tot} &= \sum_{i} \vec{p_i} = \sum_{i} m_i\,\vec{v_i}
\\ &= \sum_{i} m_i {d\vec{r_i} \over dt} = {d \over dt}(\sum_{i} m_i\,\vec{r_i})
\\ &= {d \over dt}M\,\vec{r}_{CM} = M\vec{a}_{CM}
\end{align}
$$

<br><br>

### Example 5: Cart - Spring system 2
- A가 벽에서 분리되는 순간 $\vec{v}_{CM}$은?

<br><br><br>

## ② 입자계의 운동에너지 (Kinetic energy for system of particles)
##### $K_{tot} = K_{CM} + K_{rel}$ 유도
$$
\begin{align}
K_{tot} &= \sum_{i} m_i \, v_{i}^{2} = \sum_{i} {1\over2}m_{i}(\vec{v_i} \cdot \vec{v_i}) \\
&= \sum_{i} {1\over2} m_{i}(\vec{v}_{CM} + \vec{v}_{i,\,CM}) \cdot (\vec{v}_{CM} + \vec{v}_{i,\,CM}) \\
&= \sum_{i} {1\over2} m_{i}\, v_{CM}^{2} + \sum_{i} {1\over2} m_{i}\, v_{i,\,CM}^{2} + \sum_{i} m_i\,\vec{v}_{CM}\cdot \vec{v}_{i,\,CM} \\
&= \sum_{i} {1\over2} m_{i}\, v_{CM}^{2} + \sum_{i} {1\over2} m_{i}\, v_{i,\,CM}^{2} + 0 \\
&= \sum_{i} {1\over2} m_{i}\, v_{CM}^{2} + \sum_{i} {1\over2} m_{i}\, v_{i,\,CM}^{2} = K_{CM} + K_{rel}
\end{align}
$$

<br>

$$
\begin{align}
\because 
\sum_{i} m_i\,\vec{v}_{CM}\cdot \vec{v}_{i,\,CM} &=  \vec{v}_{CM} \cdot \sum_{i}m_i\,\vec{v}_{i,\,CM} \\ 
&= \vec{v}_{CM} \cdot \sum_{i}m_i\,(\vec{v}_{i} - \vec{v}_{CM}) \\ 
&= \vec{v}_{CM} \cdot ( \sum_{i} m_i\,\vec{v_i} - \sum_{i} m_i\,\vec{v}_{CM} ) \\ 
&= \vec{v}_{CM} \cdot ( \vec{P}_{tot} -  M \vec{v}_{CM}) = 0
\end{align}
$$

<br><br>



### Example 5: Cart - Spring system 3
- A가 벽에서 분리된 상태에서, 운동 중에 용수철의 최대 압축 길이 $d$는?


<br><br><br>

# 3. 충돌 (Collision)
## ① 탄성 충돌 (Elastic collision)

$$
\begin{align}
&\begin{cases}
m_{1}v_{1} + m_{2}v_{2} = m_{1}v'_{1} + m_{2}v'_{2} \\
{1\over2}m_{1}v_{1}^{2} + {1\over2}m_{2}v_{2}^{2} = {1\over2}m_{1}{v'}_{1}^{2} + {1\over2}m_{2}{v'}_{2}^{2}
\end{cases} \\
\nonumber \\
&\Rightarrow \begin{cases}
m_{1}(v_{1} - v'_{1}) = m_{2}(v'_{2} - v_{2}) \\
m_{1}(v_{1}^{2} - {v'}_{1}^{2}) = m_{2}({v'}_{2}^{2} - v_{2}^{2})
\end{cases} \\
\nonumber \\
&\Rightarrow \quad v_{1} + v'_{1} = v'_{2} + v_{2}
\end{align}
$$

이므로 아래와 같이 쓸 수 있고,

$$
\begin{align}
&\begin{cases}
\; v'_2 = v_1 + v'_1 - v_2
\\ \\
\; v'_1 = v'_2 + v_2 - v_1
\end{cases}
\end{align}
$$

<br>

이를 운동량 보존 식에 대입하여 $v'_1, \;v'_2$ 를 구하면 다음과 같다.

$$
\begin{align}
v'_{1} = {{(m_1 - m_2)v_1 + 2m_2 v_2}\over{m_1 + m_2}}, \quad 
v'_{2} = {{(m_2 - m_1)v_2 + 2m_1 v_1}\over{m_1 + m_2}}
\end{align}
$$

<br><br>


### Example 6: Slingshot effect (SwingBy)
생략
<br><br><br>



## ② 비탄성 충돌 (Inelastic collision)
**Ref. Frame:**
$$
\begin{align}
\frac{1}{2}m_{1}v_{1}^{2} + \frac{1}{2}m_{2}v_{2}^{2} = \frac{1}{2}m_{1}{v'}_{1}^{2} + \frac{1}{2}m_{2}{v'}_{2}^{2} + Q
\end{align}
$$

**C.M. Frame:**

$$
\begin{align}
\frac{1}{2}m_{1}v_{1,\,CM}^{2} + \frac{1}{2}m_{2}v_{2,\,CM}^{2} = \frac{1}{2}m_{1}{v'}_{1,\,CM}^{2} + \frac{1}{2}m_{2}{v'}_{2,\,CM}^{2} + Q_{CM}
\end{align}
$$

<br>

아래 식들을 고려하여 위 두 식을 빼면 운동량 보존 식이 도출된다.

$$
\begin{align}
\begin{cases}
Q = Q_{CM} \\
v_{i, CM} = v_{i} - v_{CM} \\
{v'}_{i, CM} = {v'}_{i} - {v'}_{CM} 
\end{cases}
\end{align}
$$

$$
\begin{align}
\therefore m_1 v_1 + m_2 v_2 = m_1 {v'}_1 + m_2 {v'}_2
\end{align}
$$

그러므로 비탄성 충돌에서 운동량은 보존된다.

<br><br>


### Example 7: Impulse
#### (1) 계란 던지기
#### (2) 막대 넘어트리기

<br><br><br>

# 4. 질량이 변하는 계 (System of varying mass)
## ① 탁자 위의 줄
### 문제 상황
![스크린샷 2023-10-12 오후 2.02.03.png](/assets/img/2024-10-23-1/스크린샷%202023-10-12%20오후%202.02.03.png)

Mass $M$, length $L$인 동일한 밧줄이 두 개의 탁자 위에 각각 놓여있다. 그림 (A)는 밧줄이 뭉친 상태에서, 그림 (B)는 완전히 펴진 상태에서 낙하하는 상황을 나타낸 것이다.

<br>

### (i) 뭉친 줄
uniform acceleration 운동이다

#### (1) 운동방정식 (equation of motion)
$$
\begin{align}
F = \frac{dp}{dt}\,; \\
(\lambda y )g &= \frac{d}{dt}(\lambda y v) \\
\Rightarrow gy &= \dot{y}\,v + y\frac{dv}{dt} \\
&= v^{2} + vy\frac{dv}{dy}
\end{align}
$$

코시 - 오일러 미분방정식이므로 다음과 같이 해를 가정한다.

$$
\begin{align}
&v = Ay^{n} \quad \text{대입} \\
\nonumber \\
&gy = A^{2}y^{2n} + y(Ay^{n})(Any^{n-1}) \\
&\quad = A^{2}y^{2n} + A^{2}ny^{2n} \\
&\quad = A^{2}(n+1)y^{2n} \\
\nonumber \\
&\Rightarrow n = \frac{1}{2}, \quad A = \sqrt{\frac{2}{3}g} \\
\nonumber \\
&\therefore v = \sqrt{\frac{2}{3}gy}
\end{align}
$$

그러므로 다음과 같이 가속도 $a$를 구할 수 있다.

$$
\begin{align}
& a = {dv\over dt} = v {dv\over dy} \\
\nonumber \\
&\;\;\; = \sqrt{{2\over 3}gy} \;\times\; {1\over2} \Big({2\over3}gy\Big)^{-{1\over2}} \Big({2\over3}g\Big) = {1\over3}g
\end{align}
$$

<br><br>

#### (2) 차원 분석법 (Dimension analysis method)
$$
\begin{align}
&\begin{cases}
\,y = Bgt^{2} \\
\,v = \dot{y} = 2Bgt \\
\,a = \dot{v} = 2Bg 
\end{cases} \\
\end{align}
$$

$$
\begin{align}
& gy = v^{2} + y \dot{v} \quad \text{에 대입} \\
\nonumber \\
& \Rightarrow g(Bgt^{2}) = (2Bg) \cdot (Bgt^{2}) + 4B^{2}g^{2}t^{2} \\
\nonumber \\
& \Rightarrow Bgt^{2} = 6B^{2}g t^{2} \\
\nonumber \\
& \therefore B = \frac{1}{6}
\end{align}
$$



$B = \frac{1}{6}$을 대입하여 $y, v, a$를 구하면 운동방정식을 풀어서 나온 결과와 동일한 결과를 얻을 수 있다.

$$
\begin{align}
&\begin{cases}
\,y ={1\over6} g t^{2} \\
\,v = {1\over3} g t ={1\over3} g \sqrt{{6y \over g}}\\
\,a = {1\over3} g
&\end{cases}\\
\end{align}
$$


아무튼, 구하려는 것은 실이 다 풀렸을 때 줄의 속도이므로 $y=L$을 대입하여 구할 수 있다.
$$
\begin{align}
v = \sqrt{{2\over3}gL}
\end{align}
$$

<br><br>

### (ii) 펴진 줄
가속도가 증가하는 운동이다.

#### (1) 운동방정식 (equation of motion)
$$
\begin{align}
F &= \frac{dp}{dt}\,; \\
\nonumber \\
&(\lambda y)g = \frac{d}{dt}(M v) \\
\nonumber \\
&\Rightarrow \frac{M}{L}gy = Mv\frac{dv}{dy} \\
\nonumber \\
&\Rightarrow \int_{0}^{L} \frac{g}{L}y \, dy = \int_{0}^{v} v \, dv \\
\nonumber \\
&\Rightarrow \frac{g}{2L}L^{2} = \frac{1}{2}v^{2} \\
\nonumber \\
&\therefore v = \sqrt{gL} 
\end{align}
$$

<br><br>

#### (2) 에너지 보존
![스크린샷 2023-10-12 오후 1.41.37.png](/assets/img/2024-10-23-1/스크린샷%202023-10-12%20오후%201.41.37.png)
$$
\begin{align}
K_{i}+U_{i} = K_{f}+U_{f} \;; \\
&0 = {1\over2}Mv^{2} - {1\over2}MgL \\
&\therefore\; v = \sqrt{gL}
\end{align}
$$

- ##### 뭉친 줄 상황에서는 왜 에너지 보존이 안될까?
- 정지해 있던 뭉친 줄에서 아래 풀어진 줄로 줄이 내려가는 과정을 **완전 비탄성 충돌**로 볼 수 있다.
- 따라서 에너지가 보존되지 않는다.

<br><br>

### (iii) 뭉친 줄에서의 에너지 손실 (energy loss)
![스크린샷 2023-10-12 오후 1.42.31.png](/assets/img/2024-10-23-1/스크린샷%202023-10-12%20오후%201.42.31.png)
#### (1 $\rightarrow$ 2) 운동량 보존 ( $\because$ 외력 = 0?)
$$
\begin{align}
&(\lambda n l) \,v_{n} = (\lambda(n+1)l)\,V \\
\nonumber \\
&\Rightarrow \; V = {n \over {n+1}} v_{n}
\end{align}
$$

사실 이러한 상황에서 운동량 보존을 쓰는 것은 굉장히 짧은 시간 안에 일어나는 것을 무시한다는 가정 하에 이뤄진다. 예를 들어 총알이 박히면서 밀리는 과정이 굉장히 짧아서 외력이 없다 하고 운동량 보존 법칙을 사용하는 것과 비슷하다.

#### (2 $\rightarrow$ 3) 에너지 보존 ($\Delta K + \Delta U = 0$)
$$
\begin{align}
& {1\over2}(\lambda(n+1)l)(v_{n+1}^{2} - V^{2})\, - \, (\lambda (n+1)l)gl = 0 \\
\nonumber \\
& \therefore\; v_{n+1}^{2} = V^{2} + 2gl\\
\nonumber \\
&V 대입 \;\Rightarrow \;v_{n+1}^{2} = \Big({n\over{n+1}}\Big)^{2} v_{n}^{2} + 2gl\\
&\qquad\qquad\qquad\;\;=\Big(1+{1\over{n}}\Big)^{-2} v_{n}^{2} \,+\,2gl \\
&\qquad\qquad\qquad\;\;\simeq \Big(1-{2\over{n}}\Big) v_{n}^{2} + 2gl \qquad (n>>1) \\
\end{align}
$$

<br>

$$
\begin{align}
&\Rightarrow\; v_{n+1}^{2} - v_{n}^{2} = -{2\over n}v_{n}^{2} + 2gl  \\
\nonumber \\
&\Rightarrow\; {{v_{n+1}^{2} - v_{n}^{2}}\over{l}} = -{2\over nl}v_{n}^{2} + 2g  \\
\nonumber \\
&\Rightarrow\; {{dv^{2}}\over{dy}} = -{2\over{y}}v^{2} + 2g \\
\nonumber \\
&\Rightarrow\; {1\over2}y {{dv^{2}}\over{dy}} \,+\, v^{2} = gy \\
\end{align}
$$

<br>

에너지 보존 법칙을 적용하면 위와 같은 미분방정식이 도출된다.
그런데
<br>

$$
\begin{align}
v{{dy}\over{dy}} = {1\over2}{{dv^{2}}\over{dy}} \quad(Since, {{dv^2}\over{dy}} = 2v{{dv}\over{dy}})
\end{align}
$$

<br>

이므로 뭉친 줄 상황에서 운동방정식을 통해 구한 미분방정식에 위를 대입하면 동일한 미분방정식이 나온다.

$$
\begin{align}
& gy = v^{2} + vy{{dv}\over{dt}} 에\,대입 \\
\nonumber \\
& \rightarrow \; gy = v^{2} + {1\over2}y{{dv^{2}}\over{dy}}
\end{align}
$$

<br>

- 결론적으로 알아야 할 것은 (1 $\rightarrow$ 2) 과정은 에너지 보존이 안되는 **완전 비탄성 충돌**이고, (2 $\rightarrow$ 3) 과정은 $n+1$ 번째 미소질량이 얹혀진 상태에서 아래로 내려가는 것이므로 에너지가 보존된다. 
- **완전 비탄성 충돌**에서 **운동량 보존 법칙**을 쓰고 (에너지가 손실됨),
- 다음 과정에서 **에너지 보존 법칙**을 써서 
- equation of motion과 같은 결과가 나온다는 것을 보일 수 있었다.


<br><br><br>

## ② 모래 시계 (Sandglass)
### 문제 상황
(A)는 모래 시계의 모래 대부분이 아래쪽에 있고, 모래알에 떨어지고 있는 상황이다.
반면에 (B)는 대부분의 모래가 모래 시계 위쪽에 있어서 아래로 모래알이 떨어지고 있는 상황이다.
**(A)와 (B)의 모래 시계 중, 어느 모래 시계가 더 무겁게 측정될까?**
![스크린샷 2023-10-12 오후 1.41.08.png](/assets/img/2024-10-23-1/스크린샷%202023-10-12%20오후%201.41.08.png)

$$
\begin{align}
&w_{A} = w_{H} + w_{L} + w_{air} \\
&w_{B} = w_{H} + w_{L} + F \\
\end{align}
$$

- $w_{H}$ : 모래 시계 위쪽에 있는 모래의 무게
- $w_{L}$ : 모래 시계 아래쪽에 있는 모래의 무게
- $w_{air}$ : 공중에서 떨어지고 있는 모래알의 무게
- $F$ : 모래알에 의한 충격력
$w_{air}$과 $F$의 크기에 따라 결과가 정해진다.

<br>

### (i) 가정
- 모래알은 바닥에 닿으면 정지한다.
- 모래알은 일정한 비율로 낙하한다.

### (ii) $\Delta t$ 동안 바닥에 작용하는 충격력 $F$
- (1) 모래가 바닥에 닿을 때 속력
$$
\begin{align}
v = \sqrt{2gh}
\end{align}
$$
- (2) 충격력
$$
\begin{align}
F = {{\Delta p}\over{\Delta t}} = {{\Delta m}\over{\Delta t}} \sqrt{2gh}
\end{align}
$$

### (iii) 공기 중에 있는 모래 무게 $w_{air}$

- (1) 모래의 질량
$$
\begin{align}
&\Delta m : \Delta t = \Delta m_{air} : \sqrt{{2h}\over {g}} \\
\nonumber \\
&\rightarrow\, \Delta m_{air} = {{\Delta m}\over{\Delta t}} \sqrt{{2h}\over{g}}
\end{align}
$$
- (2) 모래의 무게
$$
\begin{align}
w_{air} =  {{\Delta m}\over{\Delta t}} \sqrt{2gh}
\end{align}
$$

<br>

$F = w_{air}$ 이므로 $w_{A} = w_{B}$ 이다.
따라서, **(A)와 (B)에서 저울의 눈금은 동일하다.**

<br><br><br>

## ③ 로켓 (Rocket)
### 문제 상황
(A)는 질량 $m$의 연료를 로켓에 대한 상대속도 $u$로 한꺼번에 분사하는 모습이고,
(B)는 총질량 $m$의 연료를 로켓에 대한 상대속도 $u$로 연속으로 분사하는 모습이다.
연료 분사 후, 로켓의 속도가 더 빠른 상황은 (A)와 (B) 중 무엇일까?
![스크린샷 2023-10-12 오후 1.39.43.png](/assets/img/2024-10-23-1/스크린샷%202023-10-12%20오후%201.39.43.png)


### (i) 한꺼번에 분사
![스크린샷 2023-10-12 오후 1.40.46.png](/assets/img/2024-10-23-1/스크린샷%202023-10-12%20오후%201.40.46.png)
운동량 보존 법칙을 사용하여 연료 분사 후 로켓의 속도 $v_{A}$를 구할 수 있다:
$$
\begin{align}
&Mv = m(v_{A} - u) + (M-m)v_{A} \\
\nonumber \\
&\Rightarrow\; v_{A} = {{Mv + mu}\over{M}} = v + {m\over M}u
\end{align}
$$

<br>

### (ii) 연속으로 분사
#### (1) 두 번에 나눠서 분사
##### 1) 첫 번째 분사
![스크린샷 2023-10-12 오후 2.07.24.png](/assets/img/2024-10-23-1/스크린샷%202023-10-12%20오후%202.07.24.png)
$$
\begin{align}
&Mv = {m\over2}(v' - u) + (M-{m\over2})v' \\
\nonumber \\
&\Rightarrow\; v' = {{Mv + {m\over2}u}\over{M}} = v + {m\over 2M}u
\end{align}
$$

##### 2) 두 번째 분사
![스크린샷 2023-10-12 오후 2.07.35.png](/assets/img/2024-10-23-1/스크린샷%202023-10-12%20오후%202.07.35.png)

$$
\begin{align}
&(M-{m\over2})v' = {m\over2}(v' - u) + (M-{m\over2})v'' \\
\nonumber \\
&\Rightarrow\; v'' = {{(M-{m\over2})v' + {m\over2}u}\over{M-{m\over2}}} = v' + {m\over 2M-m}u \\
\nonumber \\
&\qquad\quad = v \,+\, \Big({1\over 2M} + {1\over 2M-m} \Big)mu \\
\end{align} 
$$

<br>

#### (2) 세 번에 나눠서 분사
$$
\begin{align}
v''' = v \,+\, \Big({1\over 3M} + {1\over 2M-m} + {1\over 3M-2m}\Big)mu
\end{align}
$$

<br>

#### (3) $n$ 번에 나눠서 분사
$$
\begin{align}
v_{n} = v\, + \, mu \sum_{k=1}^{n} {1\over nM-(k-1)m}
\end{align}
$$

<br>

#### (4) 연속으로 분사
$$
\begin{align}
&\lim_{n \to \infty} v_{n} = v + mu\int_{0}^{1} {dx\over M-mx} \\
\nonumber \\
&\qquad\quad\;\;= v \,-\,u\ln \Big|{M-m\over M}\Big| \\
\nonumber \\
&\qquad\quad\;\;= v \,+\,u\ln \Big({M\over M-m}\Big) \\
\end{align}
$$

<br>

### (iii) 속력 비교
$$
\begin{align}
&v_{A} = v + {m\over M}u \\
&v_{B} = v + u\ln\Big({M\over M-m}\Big) \\
\end{align}
$$

<br>

$$
\begin{align}
&\ln \Big({M\over M-m}\Big) = -\ln \Big(1-{m\over M}\Big) \\
\nonumber \\
&\qquad\qquad\qquad = -\Big[-{m\over M} - -{m^{2}\over 2M^{2}} - \cdots \Big] \\
\nonumber \\
&\qquad\qquad\qquad = {m\over M} + {m^{2}\over 2M^{2}} + \cdots \\
\nonumber \\
&\qquad\qquad\qquad > {m\over M}
\end{align}
$$

$$
\begin{align}
&\nonumber\Big(Since,\; -1< x\le 1: \\
&\nonumber\qquad\qquad\ln (1+x) = x - {x^{2}\over 2!} + {x^{3}\over 3!} +\cdots \Big)\\
\nonumber \\
&\therefore \, v_{A} < v_{B}
\end{align}
$$

