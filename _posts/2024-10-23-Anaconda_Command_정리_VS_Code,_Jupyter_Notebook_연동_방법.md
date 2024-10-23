---
title: "Anaconda: Command 정리 & VS Code, Jupyter Notebook 연동 방법"
date: 2024-10-23 21:45:00 +09:00
categories: [Python]
tags: [Python]
---

Anaconda는 공식 홈페이지에서 쉽게 설치할 수 있으니 알아서 하자.

설치를 했으면 다음 명령어들을 따라하면서 특정 파이썬 버전의 가상환경을 생성할 수 있다.

## Anaconda Virtual Environment Command

- 존재하는 가상환경 목록 확인

```zsh
conda env list

or

conda info --envs
```

<br>

- 설정 가능한 모든 파이썬 버전 확인

```zsh
conda search python
```

<br>

- 가상환경 생성. 파이썬 버전 설정 가능.

```zsh
conda create --name [생성할 가상환경 이름] python=3.13.0
```

<br>

- 특정 가상환경 활성화

```zsh
conda activate [가상환경 이름]
```

<br>

- 현재 가상환경에 설치된 패키지 목록 확인

```zsh
conda list
```

<br>

- 현재 가상환경에 패키지 설치

```zsh
conda install numpy
```


pip을 이용해서 패키지를 설치해도 된다. 그러나 anaconda 환경에서는 conda를 쓰는게 나은 듯 하다.

> ###### `conda install` 특징
> Conda는 파이썬뿐만 아니라 다양한 언어와 라이브러리(예: R, Ruby, C/C++)를 설치하고 관리할 수 있는 범용 패키지 관리자이자 환경 관리자이다. Conda는 패키지 설치 시, 해당 환경 내의 종속성을 자동으로 관리하고, 패키지와 함께 필요한 라이브러리들을 설치해준다.
> 
> 특정 Conda 가상환경 내에서 `conda install` 명령어를 사용하면 해당 환경에만 패키지가 설치된다.
> 
> Conda는 Conda 전용 패키지 리포지토리(Anaconda Repository 또는 conda-forge)에서 패키지를 다운로드해 설치한다. Conda의 패키지들은 종속성 충돌을 최소화하기 위해 철저하게 관리되므로, 안정성이 높다.
> 
> Conda는 파이썬뿐만 아니라 다양한 언어의 패키지도 관리할 수 있다.
>

<br>

> ##### `pip install` 특징
> Pip은 파이썬 전용 패키지 관리자이다. 주로 PyPI(Python Package Index)에서 파이썬 라이브러리를 다운로드해 설치한다. Pip은 파이썬 언어에만 집중한 패키지 관리자이다.
> 
> Pip은 종속성 관리가 Conda보다 약하다. 따라서 종속성 충돌이 발생할 가능성이 있고, 이를 해결하려면 수동으로 종속성을 관리해야 할 때도 있다.
> 
> Pip은 파이썬 2.x, 3.x 모두에서 사용할 수 있지만, 기본적으로 어떤 파이썬 버전을 사용하는지에 따라 다르게 작동할 수 있다. 일반적으로 파이썬 3.x 버전에서는 `pip install`이 `pip3 install`과 동일하게 작동한다.
> 

<br>


- 가상환경 비활성화. 이름을 적지 않아도 된다.

```zsh
conda deactivate
```

<br>

- 특정 가상환경 삭제

```zsh
(base)> conda remove --name [가상환경 이름] --all
```

<br>

- 특정 가상환경의 파이썬 버전을 다른 버전으로 변경하기. 
변경 후 deactivate 후 다시 activate 해야 버전이 바뀐걸 확인할 수 있음!

```zsh
conda install python=[변경할 버전]
```

<br>

- 현재 가상환경의 파이썬 버전 확인

```zsh
python -V
```

<br>

- 가상환경의 이름을 변경할 순 없다. 
그러나 변경하고 싶은 가상환경을 새로운 이름의 가상환경에 복제해두고 기존 가상환경을 삭제하면 된다.

```zsh
conda create --name [변경할 이름] --clone [기존 환경 이름]

conda activate [변경할 이름]

conda remove --name [기존 환경 이름] --all
```

<br>

---

<br>

## python 명령어와 python3 명령어가 다른 버전을 가리킬 때. python 명령어의 alias 설정 수정하기.

가상환경 생성할 때, python 버전을 3.9.6으로 설정했지만

python -V 으로 확인하면 Python 3.11.0이라고 뜨고, python3 -V 으로 확인하면 Python 3.9.6이라고 뜨는 현상을 발견했다.

which 명령어로 각 파이썬이 어디서 실행되는지 확인해보면 다음과 같았다. 

![스크린샷 2024-10-23 오전 1.10.11.png](/assets/img/2024-10-23-2/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-10-23_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_1.10.11.png)

결론적으로 `python -V`와 `python3 -V` 명령어에서 서로 다른 파이썬 버전이 뜨는 이유는 시스템에서 **alias** 설정이 다르게 되어 있었기 때문이다.

내 Mac 시스템에서 `python` 명령어가 `/opt/homebrew/bin/python3` 에 연결되어 있어서 Homebrew로 설치된 Python 3.11.0을 가리켰던 것이고, 

`python3` 명령어는 Conda 가상환경 안에 설치된 python을 가리키고 있어서 내가 만든 ML_STUDY 가상환경의 `/opt/anaconda3/envs/ML_STUDY/bin/python3`에 있는 파이썬 3.9.6 버전을 사용했던 것이다.

이 불일치를 해결하려면 

- 가상환경 안에서는 일관되게 `python3` 명령어를 사용하거나,
- `python` 명령어가 올바른 파이썬 버전을 가리키도록 alias 설정을 수정하는 방법이 있다. 이를 위해 `.bashrc`나 `.zshrc` 같은 셸 설정 파일에서 `python`에 관련된 alias 설정을 확인하거나 수정할 수 있다.

나는 그냥 `python` 명령어의 alias를 `python3` 로 설정하여 두 명령어가 같은 역할을 하도록 설정했다.

nano 편집기로 `.zshrc` 파일을 열어서, 다음과 같이 alias 설정을 추가해주면 된다. 기존의 설정은 주석처리를 해주자.

```zsh
nano ~/.bashrc    # bash 셸일 때
nano ~/.zshrc     # zsh 셸일 때
```

```zsh
alias python="python3"
```

특정 경로를 가리키게 하고 싶으면 아래와 같이 경로를 입력해도 된다.

```zsh
alias python="/opt/anaconda3/envs/ML_STUDY/bin/python3"
```

변경사항을 저장한 후, 아래 명령어로 설정 파일을 재실행시켜야 한다.

```zsh
source ~/.bashrc    # bash 셸일 때
source ~/.zshrc     # zsh 셸일 때
```

이렇게 하면 아래 사진처럼 문제를 해결할 수 있다!

![스크린샷 2024-10-23 오전 1.18.19.png](/assets/img/2024-10-23-2/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-10-23_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_1.18.19.png)

<br>

---

<br>


## Visual Studio Code에서 Anaconda 가상환경 설정

Visual Studio Code에서는 `Shift+P` 를 눌러서 `Python: Select Interpreter` 를 입력해서 가상환경 설정을 해주면 된다.

그런데, 나는 아나콘다 가상환경이 뜨지 않았다.  

구글링 결과 ‘아나콘다 설치시 Path 등록 체크를 안했으면 수동으로 이 위치를 잡아주어야하지만, 등록 체크를 했다면 자동으로 위치가 잡힌다.’ 라고 한다.

경로 입력은 어렵지 않다. 가상환경이 활성된 터미널에 아래 명령어를 입력하여 경로를 얻을 수 있다. 

```zsh
where python
```

얻은 경로를 vs code에 넣어주면 된다.

![스크린샷 2024-10-23 오전 1.43.23.png](/assets/img/2024-10-23-2/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-10-23_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_1.43.23.png)

<br>

---

<br>

## Jupyter Notebook에서 Anaconda 가상환경 커널 추가

가상환경 커널을 추가하는 이유는 아래 포스팅에서 자세히 설명해줌:

[jupyter notebook에 가상환경 커널 추가 이유 및 방법(python ipykernel 이용)](https://kkw-da.tistory.com/entry/jupyter-notebook에-가상환경-커널-추가-이유-및-방법python-ipykernel-이용)

우선 가상환경에 진입한 후, ipykernel을 설치해주자.

```zsh
pip install ipykernel
```

커널 추가 명령어는 다음과 같다.

```zsh
python -m ipykernel install --user --name [활성화한 가상환경 이름] --display-name "[커널에 보일 이름]"
```

커널에 보일 이름에는 큰따옴표 “ ”를 빼먹지 말자.

나는 아래와 같이 입력했다.

```zsh
python -m ipykernel install --user --name ML_STUDY --display-name "ML_STUDY_kernel"
```

이후 jupyter notebook을 실행하면 다음과 같이 커널이 추가된 것을 확인할 수 있다.

![스크린샷 2024-10-23 오전 1.58.11.png](/assets/img/2024-10-23-2/%25E1%2584%2589%25E1%2585%25B3%25E1%2584%258F%25E1%2585%25B3%25E1%2584%2585%25E1%2585%25B5%25E1%2586%25AB%25E1%2584%2589%25E1%2585%25A3%25E1%2586%25BA_2024-10-23_%25E1%2584%258B%25E1%2585%25A9%25E1%2584%258C%25E1%2585%25A5%25E1%2586%25AB_1.58.11.png)

참고로, 커널 목록 확인과 커널 삭제 방법도 적어둔다.

커널 목록 확인

```zsh
jupyter kernelspec list
```

커널의 이름이 아닌 커널을 추가할 때 추가된 가상환경의 이름이 소문자로 출력된다.

특정 커널 삭제

```zsh
jupyter kernelspec uninstall [삭제할 가상환경 이름]
```

이제 마음껏 아나콘다를 활용하면 버전 충돌 문제는 쉽게 해결할 수 있겠다 🫠

다음 단계는 Docker…?

---