---
title: "GitHub & Git: 기본 개념과 사용법 정리"
date: 2025-01-26 21:51:00 +09:00
categories: [GitHub]
tags: [GitHub, Git]
math: true
---

프로젝트 중에 무지성으로 중간 과정 저장용으로 Git과 GitHub를 사용했었다. 사실 Git과 GitHub의 개념을 잘 이해하기 않아도 초기 설정만 잘해주면 별 생각 없이 add, commit, push만 해주면 되기 때문에 조금씩 버전 저장하는 것은 쉬운 일이었다. 그러나 중간에 에러가 뜨거나 새로운 환경에서 다시 초기 설정하는 상황이 종종 생겨서 이참에 초기 설정 명령어들과 branch와 remote 같은 개념들을 제대로 짚고 넘어가기로 했다. 


---



## 1. Git과 GitHub란?

- **Git**: 파일 변경 이력을 관리하고 여러 명이 협업할 수 있게 도와주는 **버전 관리 시스템**.
- **GitHub**: Git으로 관리하는 코드를 저장하고 공유할 수 있는 **클라우드 기반 플랫폼**. 다른 사람들과 협업할 때 많이 사용됨.

**Git**은 로컬 컴퓨터 안에 있는 프로그램이고, **GitHub**는 파일을 원격 저장소에 공유할 수 있게 해주는 플랫폼이다.

**Git** 설치는 쉬우니 알아서 하자.



## 2. 기본 설정과 Git 초기화

Git을 처음 설치하면, 컴퓨터에 전역 설정(global config)을 해줘야 한다. 이는 Git을 사용할 때 기본적으로 적용되는 사용자 정보이다.

### 1. 사용자 이름과 이메일 설정 (글로벌 설정)

```bash
git config --global user.name "Inseong Paik"  # 본인 이름 입력
git config --global user.email "ispaik0602@gmail.com"  # 본인 이메일 입력
```

- 이 정보는 commit 할 때 기록된다. 팀원들이 누가 작업했는지 알 수 있게 도와준다. 
- --global을 입력하지 않으면, 저장소(디렉토리)별로 이름과 이메일이 설정된다. <u>저장소 별로 저장된 정보가 글로벌 정보보다 우선으로 사용된다.</u>

### 2. 설정 확인

```bash
git config --global --list
```

- 설정된 이름과 이메일을 확인할 수 있다.

### 3. 작업할 디렉토리에서 Git 초기화

아래 명령어로 디렉토리로 이동해서 Git을 초기화해주면 된다. 나는 test_ws라는 디렉토리에서 Git을 초기화했다.

```bash
cd test_ws
git init
```

`git init`을 실행하면 해당 디렉토리가 Git으로 관리되는 **로컬 저장소**로 변환된다.



## 3. Git의 명령어와 핵심 개념

Git의 명령어에 익숙해지기 전에 자주 나오는 기본 개념들을 알아보자. add, commit, push는 의미만 알아보고 실제 사용법은 [4. Git 워크플로우 (로컬 저장소에서의 작업)](##4.-Git-워크플로우-(로컬-저장소에서의-작업))에서부터 설명한다. 

### 1. git add와 스테이징(Staging) 개념 

`git add` 명령어는 변경된 파일을 **스테이징 상태로 이동**시키는 작업이다. 스테이징은 commit하기 전에 변경된 파일들을 준비하는 중간 단계라고 생각하면 된다.

#### **Staging이란?**

- Staging Area: 변경된 파일들을 **커밋할 준비 상태**로 만들어주는 공간이다.
- 모든 수정 사항을 한꺼번에 커밋하지 않고, 필요한 파일만 선택적으로 커밋할 수 있도록 돕는다.
- `git status` 명령어로 파일의 staged 여부를 확인할 수 있다.



### 2. git commit

`git commit` 명령어는 **스테이징된 변경 사항을 Git 저장소에 “영구적으로 기록”**하는 작업이다. commit은 Git에서 변경 이력을 관리하는 핵심 단위로, **“이 시점의 코드 상태를 저장한다”**는 의미를 갖는다.

**commit 전**: 스테이징된 파일이 커밋 대기 상태.
**commit 후**: 변경 사항이 Git 저장소에 영구적으로 기록.

- **변경 사항을 히스토리에 추가**:
  커밋은 코드 변경 사항의 스냅샷으로 저장된다.
- **commit 확인 방법:**
  `git log` 명령어 실행.



### 3. git push

`git push` 명령어는 로컬 저장소에 commit된 변경 사항을 **원격 저장소(GitHub 등)로 업로드**하는 작업이다. 팀원들과 작업을 공유하거나, 백업을 위해 사용된다.
아래처럼 사용하면 되는데, 이를 이해하기 위해 branch, remote 개념을 알아야 한다.

```bash
git push 원격저장소 브랜치명
# 예:
git push origin main
```



### 4. branch란?

- 하나의 작업 흐름을 분리하기 위한 도구.
- 기본 branch는 main(옛날에는 master). branch 변경 없이 작업하면 기본 branch인 main에서 작업하는 것이다.
- 새로운 기능을 개발하거나 실험할 때 branch를 생성하고 작업 후 main에 병합(merge)한다. (이 포스트 뒤쪽에서 이 내용을 다룬다.)



### 5. remote란?

- 코드를 로컬에만 저장하지 않고 GitHub와 같은 서버(원격 저장소)에 업로드하거나 동기화하기 위한 개념.
- 원격 저장소(remote)는 로컬 저장소와 연결된다.
- origin은 원격 저장소의 기본 이름으로 자주 사용된다.



branch와 remote에 대해서는 [GitHub&Git: branch와 remote에 대한 자세한 설명](https://youtube.com)를 참고하자.

---



## 4. Git 워크플로우 (로컬 저장소에서의 작업)

1. ### **파일 상태 확인**

   ```bash
   git status
   ```

   - 현재 작업 디렉토리의 상태를 확인. 추적되지 않은 파일, staged 상태의 파일 등을 보여줌.

   

2. ### **변경(추가)된 파일 Staging 상태로 전환**

   - 파일을 생성 후 Git으로 관리하려면 add 명령어를 실행.

   ```bash
   git add 파일이름
   ```

   - 모든 파일을 추가하려면

   ```bash
   git add .
   또는
   git add -A
   ```

   

3. ### **commit하기** 

   - 변경 사항을 저장

   ```bash
   git commit -m "커밋 메시지"
   ```

   

---



## 5. GitHub과 연결하기

GitHub에 코드를 업로드하려면 로컬 저장소와 원격 저장소를 연결해야 합니다.

### 1. GitHub에서 새로운 원격 저장소 생성:

- GitHub 웹사이트에서 로그인 후 New Repository 클릭.
- Repository Name에 test_ws 입력하고 저장소 생성.



### 2. 원격 저장소 연결:

- 새로 생성한 GitHub 저장소(repository) URL 복사.
- 로컬 저장소와 연결:

```bash
git remote add origin [GitHub 저장소 URL]
```

- 예시:

```bash
git remote add origin https://github.com/username/test_ws.git
```



### 3. 원격 저장소로 코드 업로드 (push):

```bash
git branch -M main  # 브랜치 이름을 main으로 설정
git push -u origin main  # main 브랜치를 원격 저장소로 푸시
```

- push를 하려고 하면 GitHub 사용자의 아이디와 비밀번호를 묻는다. 이때 중요한 것은 비밀번호가 계정의 비밀번호가 아니라 Token을 입력해야 한다. Token을 발급받는 방법은 다음과 같다. 
  - GitHub에서 프로필 아이콘을 클릭하여 `Settings`으로 이동한다. 왼쪽 하단에 `Developer Settings`를 클릭하고 `Personal access tokens`를 클릭해서 새로운 Token을 만들 수 있다. 나는 `Tokens(classic)`에서 `Generate new token`을 클릭했다. 그러면 권한을 부여하는 체크박스 여러 개가 나올텐데, 거기서는 repository와 user만 체크했다. 자세한 내용은 알아서 구글링 ㄱㄱ.
- push/pull 할 때마다 매번 Token을 입력하기 귀찮으면 GitHub SSH 설정을 해주면 된다. (귀찮으니까 하자.) [7. GitHub SSH 설정](##7.-GitHub-SSH-설정)



---



## 6. 실제 워크플로우 요약

정리하면, 내가 새로운 디렉토리(여기서는 test_ws)에서 프로젝트를 할건데, Git이랑 GitHub을 사용하고 싶으면 아래 **초기 설정**을 해줘야 한다.

### A. 초기 설정:

#### 1. 로컬 디렉토리 생성 및 Git 초기화

```bash
mkdir test_ws && cd test_ws
git init
```

#### 2. 파일 추가 및 commit

```bash
touch README.md
git add README.md
git commit -m "Initial commit"
```

#### 3. GitHub repository 생성 후 원격 연결

```bash
git remote add origin [GitHub 저장소 URL]
git branch -M main
git push -u origin main
```



위 설정을 마치면, 그 이후로 새로운 코드, 파일이 추가됐는데 GitHub에 저장하고 싶다 → add → commit → push 해주면 된다. 그래서 중간 저장용으로만 쓸거면 이 세 명령어만 반복하면 되서 엄청 간단하다.

### B. 워크플로우 요약:

test_ws의 어떤 파일에서 수정을 했다고 가정. 그러면 터미널에서 test_ws로 진입하여 add 명령어 실행.

```bash
git add -A
```

그러면, 수정된 파일들은 자동으로 staged 상태로 전환된다. 다른 말로, commit 대기 상태로 등록된다. 그러면 commit을 하여 Git에 저장하자.
```bash
git commit -m "first commit"
```

이 변경사항들을 서버의 repository에도 저장하기 위해 push를 한다.
```bash
git push origin main
```

사실 branch와 remote가 main과 origin으로 하나씩만 있고 따로 설정을 바꾼 적이 없으면 그냥 git push만 입력해줘도 된다.



---



## 7. GitHub SSH 설정

**SSH**는 GitHub에서 사용하는 보안 프로토콜로 일종의 ''전자열쇠''라고 생각하면 된다. (통신 프로토콜 **SSH(Secure Shell)**이랑은 다른 것이다.)

- **공개 키(public key)**: GitHub에 저장.
- **개인 키(private key)**: 내 컴퓨터에 저장.

두 키가 일치하면 인증이 완료되고, 비밀번호(토큰) 입력 없이도 `git push`, `git pull` 같은 명령어를 사용할 수 있게 된다.

아래는 SSH 키 설정 방법을 정리한 단계별 가이드이다. 터미널에서 Home 디렉토리에서 아래 작업 1~4를 수행해야 한다.

### 1. SSH 키 생성

1. 터미널에서 SSH 키 생성 명령어를 입력:
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```

   - your_email@example.com은 GitHub 계정에 등록된 이메일을 입력.
   - 명령어 실행 후 경로를 묻는다면 그냥 Enter를 눌러 기본 경로(~/.ssh/id_rsa)에 저장하자.

2. 패스프레이즈 설정:

   - 패스프레이즈는 SSH 키의 추가 보안을 위한 비밀번호이다.
   - 설정해도 되고 엔터를 눌러 비밀번호 없이 사용할 수도 있다.

3. 성공 메시지:

   - 아래와 비슷한 메시지가 나오면 키가 성공적으로 생성된 것이다.

   ```bash
   Your identification has been saved in /Users/username/.ssh/id_rsa.
   Your public key has been saved in /Users/username/.ssh/id_rsa.pub.
   ```

   - 정상적으로 진행되면 ~/.ssh/id_rsa와 ~/.ssh/id_rsa.pub 파일이 생성된다. `ls ~/.ssh` 명령어로 확인해보자.

   

### 2. SSH 공개 키(public key) 복사

1. 공개 키 파일을 열어 복사:
   ```bash
   cat ~/.ssh/id_rsa.pub
   ```

   출력된 공개 키를 복사하자. (일반적으로 ssh-rsa로 시작하고 이메일로 끝나는 긴 문자열이다.)



### 3. GitHub에 SSH 키 등록

1. GitHub에 로그인 후 오른쪽 상단 프로필 아이콘 클릭 → Settings로 이동.
2. 좌측 메뉴에서 **“SSH and GPG keys”** 선택.
3. **“New SSH key”** 클릭:
   - Title: 키를 식별하기 위한 이름 (예: “My Laptop”).
   - Key: 앞에서 복사한 공개 키 붙여넣기.
4. **“Add SSH key”** 클릭.



### 4. SSH 키가 잘 연결되었는지 확인

1. 다음 명령어로 GitHub와의 연결 확인:
   ```bash
   ssh -T git@github.com
   ```

   - 출력 예시:

   ```bash
   Hi username! You've successfully authenticated, but GitHub does not provide shell access.
   ```

   이 메시지가 나오면 설정이 완료된 것이다.

   

### 5. 원격 저장소 URL 변경

이제 Git으로 관리하는 디렉토리로 이동하자. (`cd test_ws`)
SSH를 사용하려면 원격 저장소 URL을 HTTP(S)에서 SSH로 변경해야 한다. 

1. 기존 URL 확인:
   ```bash
   git remote -v
   ```

2. SSH URL로 변경:
   ```bash
   git remote set-url origin git@github.com:username/test_ws.git
   ```

   username을 본인의 GitHub 사용자 이름으로 바꿔야 한다.

3. 확인:
   ```bash
   git remote -v
   ```

   - 결과:

   ```bash
   origin  git@github.com:ispaik06/test_ws.git (fetch)
   origin  git@github.com:ispaik06/test_ws.git (push)
   ```



이제부터는 Git 명령어(`git pull`, `git push`)를 사용할 때 매번 비밀번호를 입력할 필요가 없다. SSH 인증이 자동으로 이루어지기 때문이다.



### 6. (optional) 여러 SSH 키 관리

만약 다른 프로젝트나 계정에 여러 SSH 키를 사용해야 한다면 ~/.ssh/config 파일을 생성해서 설정할 수 있다. 여기서는 넘어가겠다.



---



## 8. 자주 쓰는 Git 명령어 모음

새로운 branch 생성, branch 이동, 병합 그리고 버전관리와 관련된 명령어들을 추후 정리할 예정이다.
