---
title: "GitHub & Git: branch와 remote에 대한 자세한 설명"
date: 2025-01-30 00:14:44 +09:00
categories: [GitHub]
tags: [GitHub, Git]
math: true
---



[1. branch와 remote가 무엇인가?](#1)에서는 Git의 초기설정에서 GitHub를 연결하는 초반 워크플로우를 이해하기 위한 branch와 remote의 개념만 정리했다. branch를 추가하고 이를 활용하기 위해 필요한 자세한 내용은 [2. 로컬에서 branch를 추가해서 활용하는 법](#2)에서부터 나온다.

---

---



## 1. branch와 remote가 무엇인가?  {#1}

### 1. branch란?

- 기본적으로 **로컬** 개념이다.
- 브랜치는 **Git의 버전 관리 흐름을 나누는 작업 공간**이다. 
- 예를 들어, 기본적으로 main(main은 branch 이름)이라는 branch에서 작업하고, 새로운 기능 개발을 위해 feature라는 브랜치를 생성해 작업한 뒤 병합할 수 있다.
- branch는 **내 컴퓨터(로컬 저장소)**에 생성된다. 다만, 원격 저장소(remote)에 브랜치를 push하면 원격에서도 그 브랜치를 사용할 수 있다. **branch는 로컬과 원격 모두에 존재**할 수 있는 개념이다. **원격 브랜치는 로컬 브랜치를 push하면 자동으로 생성된다.** ([2) 원격 저장소(origin)으로 push(업로드) 하는 법](#push))

#### 1) branch 이름 강제로 변경하는 법

```bash
git branch -M main
```

- Git을 처음 시작할 때 보통 기본적으로 main(또는 master) branch로 시작된다.
- 위 명령어는 기존에 있던 기본 브랜치 이름(예: master)을 main으로 바꾸는 데 사용된다.
- -M은 --move --force의 약자로, 브랜치 이름이 중복되거나 충돌해도 **강제로 변경**한다.



---



### 2. remote란?

- **서버 개념**이다.
- **원격 저장소**는 로컬 저장소와 연결된 GitHub, GitLab, Bitbucket 같은 서버에 있는 저장소를 말한다.
- **내 컴퓨터와 원격 저장소를 연결**하는 것이 바로 remote 설정이다.
- origin은 원격 저장소의 기본 이름(별칭)으로, 내가 지정한 이름일 뿐이다.
- 작업한 내용을 원격 저장소에 **push**(업로드)하거나, 다른 사람이 작업한 내용을 원격에서 **pull**(다운로드)하는 식으로 협업한다.

#### 1) 내 로컬 저장소와 GitHub 원격 저장소를 연결하는 법

```bash
git remote add origin [GitHub 저장소 URL]
```

- origin은 원격 저장소의 기본 이름(별칭)다. 이름을 마음대로 바꿀 수도 있지만, 관례적으로 origin을 사용한다

- 예시:
  ```bash
  git remote add origin https://github.com/username/test_ws.git
  ```

- 이 명령어를 실행해야 내 파일을 GitHub repository에 저장할 수 있는 것이다. 내 컴퓨터에서는  Git이 버전관리를 해주고, 그걸 서버에 올리기 위해 연결되어 있어야 하기 때문이다.

#### 2) 원격 저장소(origin)으로 push(업로드) 하는 법  {#push}

```bash
git push -u origin main
```

- 로컬의 main 브랜치를 **원격 저장소(origin)의 main 브랜치에 푸시push**(업로드)하는 명령어.
- origin: 푸시할 원격 저장소 이름.
- main: 원격 저장소의 브랜치 이름.
- 이 명령어로 인해 commit한 파일들이 GitHub에 업데이트 되는 것이다.
- -u는 **추적 브랜치 설정(set upstream)**으로 이 옵션을 사용하면 앞으로 `git push`만 입력해도 해당 브랜치로 자동으로 push된다. (branch를 매번 명시하지 않아도 되서 편함). **현재 브랜치와 원격 브랜치를 연결(tracking)**하여 매번 브랜치를 지정하지 않아도 되기 때문이다.
- 이렇게 로컬 브랜치를 원격에 push하면 원격에 동일한 이름의 브랜치가 생성된다. 



----

branch와 remote에 대한 기본 워크플로우는 [5. GitHub과 연결하기](https://ispaik06.github.io/posts/GitHub_&_Git_%EA%B8%B0%EB%B3%B8%EA%B0%9C%EB%85%90%EA%B3%BC_%EC%82%AC%EC%9A%A9%EB%B2%95_%EC%A0%95%EB%A6%AC/#5-github%EA%B3%BC-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0)에 나온다. 일반적으로 처음 git과 GitHub를 설정할 때 이 순서로 세 가지 명령어를 입력한다. 이후로는 branch와 remote에 대한 설정을 건들 필요 없이 add, commit, push만 해주면 중간 과정 업데이트가 된다.





---



그런데, 새로운 기능 개발 또는 테스트를 위해 branch를 새로 만들거나 remote를 추가하는 일이 필요할 수 있다. 이제부터 branch, remote를 추가해서 활용하는 법에 대해서도 알아보자.



---

---



## 2. 로컬에서 branch를 추가해서 활용하는 법  {#2}

로컬에서 브랜치를 여러 개 만들어서 작업을 분리하면 다음과 같은 장점이 있다.

1. **새로운 기능 개발**
   - main 브랜치에서는 안정적인 코드를 유지하고, 새로운 기능을 개발할 때는 별도의 브랜치에서 작업.
2. **버그 수정**
   - 긴급한 버그 수정 작업을 별도의 브랜치에서 처리.
3. **테스트 작업**
   - 기존 코드에 영향을 주지 않고 테스트나 실험을 진행.



### 1. main 이외의 branch를 사용하는 법

새로운 기능 개발을 위한 branch를 만드는 상황이라고 하자. 그러면 아래와 같이 작업할 수 있다.

1. 현재 브랜치 확인:
   ```bash
   git branch
   ```

   - 출력:
     ```bash
     * main
     ```
     
     
   
2. 새로운 브랜치 생성:
   ```bash
   git branch feature/new-feature
   ```

   - feature/new-feature라는 브랜치를 생성. 이름은 자유롭게 설정 가능.
   - **기존 브랜치의 모든 작업 내용**이 새 브랜치에 그대로 복사된다. 기존 브랜치 복제 느낌. 기존의 commit된 작업 상태가 그대로 새 브랜치에 포함됨.
   - 그래서 이후 새로운 브랜치에서 추가한 내용만 따로 commit하면, 기존 작업은 유지하고 새로운 기능만 분리해서 관리 가능함.
     
   
3. 브랜치로 이동:
   ```bash
   git checkout feature/new-feature
   ```

   - 참고:
     ```bash
     git checkout -b feature/new-feature
     ```

     - 이 명령어는 새 브랜치 생성과 동시에 해당 브랜치로 이동하게 해줌.
       
   
4. 브랜치 상태 확인:
   ```bash
   git  branch
   ```

   - 출력:
     ```bash
     main
     * feature/new-feature 
     ```
     
     
   
5. 작업 후 변경 사항 commit:
   ```bash
   git add -A
   git commit -m "Implement new feature"
   ```

   
   
6. main branch로 병합:

   - 작업이 완료되면 main 브랜치로 병합.

   ```bash
   git checkout main
   git merge feature/new-feature
   ```

   - 병합할 브랜치로 이동해서 merge 해야함.

     

7. 원격 저장소에 push:
   ```bash
   git push origin feature/new-feature
   ```

   - 로컬 브랜치를 원격에 push하면 원격에 동일한 이름의 브랜치가 생성됨. 
     
   
8. 브랜치 삭제 (선택):

   - 병합 후 더 이상 필요 없는 브랜치는 삭제.

   ```bash
   git branch -d feature/new-feature
   ```

   - 브랜치를 삭제한다고 해서 그 브랜치에 업데이트 됐었던 수정, 추가 내용들이 로컬에서 지워지진 않음. 기존의 상태로 되돌리는 방법은 아래에 나옴.
     

9. 원격 브랜치를 로컬에 가져오기: 

   - 다른 사람이 만든 원격 브랜치를 가져오려면:

   ```bash
   git fetch origin
   git checkout feature/new-feature
   ```



---



### 2. (참고) `git fetch`, `git pull`이란?

`git fetch`는 원격 저장소에서 **모든 업데이트(새로운 브랜치, 변경된 브랜치 등)를 로컬 저장소로 가져오는 명령어**이다.
하지만, **실제 코드나 브랜치로 체크아웃(전환)**하거나 작업 디렉토리를 업데이트하지는 않는다. 즉, `git fetch`는 로컬의 "원격 브랜치 정보"만 업데이트할 뿐, 아직 **로컬 작업 브랜치**에는 반영되지 않는다.

- 예를 들어, 원격에 새로운 브랜치(`feature/new-feature`)가 생겼을 때, `git fetch origin`을 실행하면 이 브랜치의 정보를 로컬로 가져오지만, 이 브랜치를 로컬에서 작업 가능하게 만들려면 추가로 `git checkout` 같은 명령이 필요하다.

---

**"9. 원격 브랜치를 로컬에 가져오기"** 명령어 동작 과정 설명:

1. **`git fetch origin`**
   - 원격 저장소(`origin`)의 모든 최신 정보를 가져온다. 여기에는 새로운 브랜치, 변경된 커밋 히스토리 등이 포함된다.
   - 이 과정에서 로컬 저장소의 **원격 트래킹 브랜치**가 업데이트된다.
     예를 들어, 원격의 `feature/new-feature`라는 브랜치 정보가 로컬에 생긴다.
     (이 정보는 로컬에 `origin/feature/new-feature`로 저장됨.)
2. **`git checkout feature/new-feature`**
   - 이 명령어는 브랜치를 체크아웃하며, 로컬에 해당 브랜치가 없는 경우 자동으로 생성한다.
   - 만약 로컬에 브랜치가 없었다면, `git checkout`은 **`origin/feature/new-feature`**라는 원격 트래킹 브랜치를 기준으로 새 로컬 브랜치 `feature/new-feature`를 만든다.



---

반면에, `git pull`은 **원격 저장소**에서 최신 변경 사항을 가져오고, 현재 브랜치에 **병합**까지 수행하는 명령어이다.

```bash
git pull origin main
```

- 원격 저장소(origin)의 main 브랜치 변경 사항을 로컬 main 브랜치로 가져오고 병합.



----

### 3. branch에서 이전의 상태로 되돌리는 법

#### 1) 특정 파일 복구하기: `git checkout`

`git checkout`은 특정 브랜치로 전환하는 기능도 있었지만 특정 파일을 이전 상태로 되돌리는 기능도 있다. test01.py 파일에 실수로 코드를 추가했는데, 이전 commit 상태로 되돌리고 싶은 상황이라고 하자. 이럴 때 아래 명령어들을 쓸 수 있다.

- 현재 브랜치의 마지막 commit 상태로 되돌리기:
  ```bash
  git checkout HEAD -- test01.py
  ```

  - 만약 test01.py에 추가로 수정된 내용이 있다면, 해당 내용이 삭제되고 **커밋된 마지막 상태로 복원**된다.

   1. 현재 브랜치의 최신 commit으로 돌아갈거면 HEAD, 
      현재 커밋의 바로 이전 커밋으로 돌아갈거면 HEAD~1, 
      현재 커밋에서 두 단계 이전 커밋으로 돌아갈거면 HEAD~2 를 입력하면 된다.

   2. 만약 현재 브랜치가 아니라 다른 브랜치인 features의 최신 커밋으로 복구하고 싶으면 HEAD 대신 브랜치 이름인 features를 쓰면 된다. 마찬가지로 features~1, features~2처럼 브랜치 이름 뒤에 **~숫자**를 붙여서 이전 커밋을 참조할 수 있다. 

   3. 또 다른 방법으로, 특정 커밋 ID로 복구할 수 있다. `git log features`명령어로 브랜치 features의 커밋 내역을 확인할 수 있다. 
      ```bash
      commit 1234567... (HEAD -> features)
      commit abcdef0...
      ```

      출력이 위와 같이 나왔다고 할 때, 아래 명령어를 실행하여 해당 커밋 상태에서 test01.py를 복구할 수 있다.
      ```bash
      git checkout abcdef0 -- test01.py
      ```

      특정 커밋 ID로 복구하는 것이기 때문에 현재 브랜치가 main이더라도 features의 커밋 ID로 복구할  수 있다.

  

  

---



#### 2) 전체 상태 복구하기: `git checkout`

파일명을 입력하지 않으면 전체 상태를 복구한다.
```bash
git checkout HEAD
```

- 현재 브랜치의 최신 커밋 상태로 **전체 작업 디렉토리**를 복원함.
- 만약 수정한 파일이 있다면, 수정사항이 사라지고 최신 커밋 상태로 돌아간다.
- HEAD가 아니라 다른 브랜치 이름을 입력하면 **해당 브랜치로 전환**한다. 복구 명령어가 아님. 만약 브랜치를 전환하는 도중 수정된 파일이 있다면, Git이 경고를 띄우고 전환을 막을 수도 있다.



**`HEAD~1`, `HEAD~2` 또는 커밋 ID** 같은 **커밋 이동**을 쓰면 윗내용과 마찬가지로 현재 브랜치에서 한 커밋 이전 상태로 전체 작업 디렉토리를 복구한다. 이 경우, 해당 커밋 상태로 **"분리된 HEAD 상태(Detached HEAD)"**가 된다. 새로운 작업을 진행하려면 브랜치를 새로 만들어야 한다. 아래는 새로운 브랜치를 생성 후, 그 브랜치로 전환하는 명령어이다.

```bash
git switch -c new-branch
```



---



#### 3) `git checkout`을 대신할 명령어: `git restore`, `git switch` 

checkout 기능을 살펴보면, 하나의 명령어로 여러 가지 동작을 지원한다. 이러면 편한 부분도 있지만 결국 기능의 정의가 명령어에서 옵션으로 변경되서 오히려 복잡해지는 느낌이다. 그래서 Git 2.23.0을 기점으로 브랜치 안에서의 복구와 브랜치 전환 기능을 지원하는 명령어를 따로 제공한다.

특정 파일을 복구하기 위해서는 `git restore`을 다음과 같이 쓸 수 있다:
```bash
git restore --source=<commit-id> -- test01.py
또는
git restore --source=HEAD -- test01.py
또는
git restore --source={brance name} -- test01.py
```

그리고, 전체 상태를 복구하는 명령어는 아래와 같다:
```bash
git checkout HEAD           # 전체 파일을 HEAD 커밋 상태로 복구
git restore --source=HEAD   # 동일한 작업 (최신 Git에서 권장)
```



브랜치 전환 관련 명령어는 `git switch`를 활용할 수 있다:

```bash
git switch {branch name}          # 특정 브랜치로 전환
git switch -c {branch name}       # 특정 브랜치 생성 후, 전환
```



---



#### 4) 커밋 자체를 되돌리기: `git revert`

- `git revert`는 지정한 커밋의 변경 사항을 되돌리는 **새로운 커밋**을 만든다.
- 기존의 커밋 기록은 삭제되지 않으며, **협업 중인 브랜치에서 안전하게 사용**할 수 있다.

```bash
git revert <commit-id>
```

- Git은 "Revert" 메시지가 포함된 새로운 커밋을 생성한다.

- 기록이 보존되므로 팀 프로젝트에서 **기록을 삭제하지 않고 변경 사항을 되돌릴 때 적합**하다.




---



#### 5) 커밋 기록을 변경하며 복구: `git reset`

- `git reset`은 지정한 커밋 이후의 **커밋 기록 자체를 수정**하거나 삭제한다.
- 기록을 변경하므로 협업 중인 브랜치에서는 신중히 사용해야 한다.

##### **3가지 주요 모드**

1. **`--soft`: 커밋만 되돌림 (Staging Area와 작업 디렉토리는 유지)**

   ```bash
   git reset --soft <commit-id>
   ```

   - 지정한 커밋으로 이동하고, 이후 커밋의 변경 사항은 Staging Area에 남는다.
     

2. **`--mixed` (기본값): 커밋과 Staging Area를 되돌림 (작업 디렉토리는 유지)**

   ```bash
   git reset --mixed <commit-id>
   ```

   - 커밋과 Staging Area를 초기화하며, 변경 사항은 작업 디렉토리에 그대로 남는다.
     

3. **`--hard`: 커밋, Staging Area, 작업 디렉토리 모두 되돌림**

   ```bash
   git reset --hard <commit-id>
   ```

   - 모든 변경 사항을 삭제하고, 지정한 커밋 상태로 완전히 복구한다.
     

##### **예시**

- 마지막 커밋을 완전히 삭제하려면:

  ```bash
  git reset --hard HEAD~1
  ```

  - **결과**: 최신 커밋이 삭제되고, 변경 사항도 모두 제거된다.



---



#### 6) `revert` vs `checkout` vs `reset` 비교

| **기능**           | **`git revert`**                        | **`git checkout` / `git restore`**              | **`git reset`**                              |
| ------------------ | --------------------------------------- | ----------------------------------------------- | -------------------------------------------- |
| **영향 범위**      | 지정된 커밋의 변경 사항만 되돌림        | 파일 또는 전체 작업 디렉토리 복구               | 지정 커밋 이후의 모든 커밋 및 변경 사항 삭제 |
| **기록 보존 여부** | 기록 보존 (새로운 커밋 생성)            | 기록 변경 없음                                  | 기록 삭제                                    |
| **사용 상황**      | 협업 중인 브랜치에서 안전하게 되돌릴 때 | 파일/디렉토리 복구, 특정 커밋으로 이동할 때     | 로컬 작업에서 기록을 수정하거나 초기화할 때  |
| **주요 제한점**    | 되돌리는 커밋이 많으면 복잡해질 수 있음 | 브랜치가 아닌 특정 커밋 이동 시 "Detached HEAD" | 협업 브랜치에서 사용 시 기록 충돌 위험 있음  |

---

---



## 3. remote를 추가해서 활용하는 법

로컬 저장소는 기본적으로 하나의 원격 저장소(보통 origin)만 연결하지만, **다른 원격 저장소도 추가**할 수 있다. 이렇게 하면,

- 같은 프로젝트를 GitHub와 GitLab 등 여러 원격 서버에 동시에 푸시할 수 있음.
- 여러 팀이 다른 원격 저장소를 사용하고 있다면 유용.



##### **예시: 원격 저장소 추가**

1. **현재 원격 저장소 확인**:

   ```bash
   git remote -v
   ```

- 출력 예시:
  ```bash
  origin https://github.com/username/test_ws.git (fetch)
  origin https://github.com/username/test_ws.git (push)
  ```

  

2. **새 원격 저장소 추가**:

   - 예를 들어, 새로운 원격 저장소를 backup이라는 이름으로 추가:

   ```bash
   git remote add backup https://gitlab.com/username/test_ws.git
   ```



3. **추가된 원격 저장소 확인**:

   ```bash
   git remote -v
   ```

   - 출력:

   ```bash
   origin https://github.com/username/test_ws.git (fetch)
   origin https://github.com/username/test_ws.git (push)
   backup https://gitlab.com/username/test_ws.git (fetch)
   backup https://gitlab.com/username/test_ws.git (push)
   ```

   

4. **원격 저장소로 푸시**:

   - origin이 아닌 backup에 푸시:

   ```bash
   git push backup main
   ```



5. **원격 저장소 삭제 (선택)**:

   - 필요 없는 원격 저장소는 삭제 가능:

   ```bash
   git remote remove backup
   ```



----

---



질문이나 조언은 댓글 또는 메일로 부탁드립니다! 🙇
