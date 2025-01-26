---
title: "GitHub & Git: branch와 remote에 대한 자세한 설명"
date: 2025-01-27 00:22:00 +09:00
categories: [GitHub]
tags: [GitHub, Git]
math: true
---



작성중인 포스팅임

---



원격 저장소에 연결하기:

```bash
git remote add origin [GitHub 저장소 URL]
```



원격 저장소 URL을 잘못 입력했거나 수정하고 싶다면, **삭제하지 않고 바로 수정할 수도 있고**, 필요하면 **삭제 후 다시 설정**할 수도 있다.

#### 1. URL 수정하기 (set-url)

기존 원격 저장소를 삭제하지 않고 URL만 수정하려면 아래 명령어를 사용:

```bash
git remote set-url origin [수정된 URL]
```

수정 후 확인:

```bash
git remote -v
```

예시 결과:

```bash
origin  https://github.com/username/test_ws.git (fetch)
origin  https://github.com/username/test_ws.git (push)
```



#### 2. 원격 저장소 삭제 후 다시 추가하기

잘못 설정된 origin을 삭제하고 새로 추가하려면:

```bash
git remote remove origin
```

새로운 원격 저장소 추가:

```
git remote add origin [새로운 URL]
```

추가 확인:

```bash
git remote -v
```

예시 결과:

```bash
origin  https://github.com/username/test_ws.git (fetch)
origin  https://github.com/username/test_ws.git (push)
```

