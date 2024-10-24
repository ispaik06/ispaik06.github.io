---
title: "Jekyll Chirpy 테마에서 수식을 표현하기 위해 필요한 설정 (MathJax)"
date: 2024-10-24 01:20:00 +09:00
categories: [Github Pages]
tags: [Chirpy, MathJax, LaTeX]
math: true
---


<br>
<br>

Github Pages 블로그에 포스팅 하기 위해 마크다운 파일을 업로드 한다. 이때 `LaTeX` 문법을 이용해 수식을 입력하기 위해서 `MathJax`를 설정해줘야 한다.!!

<br>

## MathJax

![image.png](/assets/img/2024-10-24-1/1.png)

- MathJax는 MathML, LaTex를 활용해 마크 업 종류의 언어로 웹 페이지에 수학식을 표기해주는 자바스크립트 라이브러리이다.
- 자바스크립트 라이브러리이다.
- 블로그마다 js 라이브러리 코드를 입력하는 파일이 달라서 잘 찾아서 넣어야 한다!! 나는 chirpy 테마에 맞게 설정할 것이다.

<br>

<br>

### MathJax Setting

#### 1. `_config.yaml` 파일 수정

`_config.yaml` 에 다음 내용을 추가해주자. 기존에 있던 내용이라면 잘 찾아서 수정해줘야 한다. chirpy의 경우 아마 기존에 없는 내용이라 새로 추가해주면 된다.

```yaml
# Conversion
markdown: kramdown
highlighter: rouge
lsi: false
excerpt_separator: "\n\n"
incremental: false
```

<br>

#### 2. **`_includes/js-selector.html` 파일 수정**

처음에 `js-selector.html` 파일을 보면 수학 관련 내용인 부분이 있을 것이다. 그 부분을 아래 내용으로 대체하자.

```html
{% if page.math %}
  <!-- MathJax -->
  <script type="text/javascript">
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
        processEnvironments: true
      },
      options: {
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
      }
    };
  </script>
  <script type="text/javascript" id="MathJax-script" async
    src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
  </script>
{% endif %}
```

다음과 같이 수정해야 한다.

![이미지](/assets/img/2024-10-24-1/2.png)

<br>

여기서 가장 중요한 내용은 `tex:` 부분이다. 이 부분에서 `inlineMath`와 `displayMath`의 명령어 설정을 진행한다.

- `inlineMath` 란 글에 적으면서 수식을 쓸 때 필요한 방식이다.
예를 들어, $|x+y| \leq |x| + |y|$ 지금 적힌 것처럼 말이다. 수식 양쪽에 `$`, `$` 또는 `\\(` , `\\)` 로 묶어주면 된다.
- `$|x+y| \leq |x| + |y|$` 를 입력하면, $|x+y| \leq |x| + |y|$ 으로 나타난다!

<br>
<br>

- `displayMath` 는 다음과 같이 글과 글 사이에 공간을 넓게 잡아 수식을 표현하는 방식이다. 수식 양쪽에 `$$`, `$$`또는 `\\[` , `\\]`로 묶어주면 된다.
- `$$ 1 + 2 = 3 $$`을 입력하면

$$ 1 + 2 = 3 $$

<br>
<br>

#### 3. 수식을 사용하려는 포스트의 Front Matter에 `math: true`를 추가한다.

예시:

```markdown
---
title: "Test file"
date: 2024-10-23 20:5:00 +09:00
categories: [Study]
tags: [Study, Physics]
math: true
---
```

<br>

<br>

여기까지 작업했으면 수식이 잘 표현되는 것을 확인할 수 있을 것이다. `LaTeX` 문법 관련해서는 이 [PDF 파일](https://github.com/ispaik06/ispaik06.github.io/blob/main/assets/other%20files/The%20Comprehensive%20LaTex%20Symbol%20List.pdf)을 참고하자. 아니면 잘 정리된 블로그들 많으니 검색 ㄱㄱ

<br>

---

<br>

## 몇 가지 문제?

내 Github Pages에서만 안되는건진 모르겠지만 몇 가지 맘에 안드는 점들이 있다.

- `inlineMath` 명령어가 #으로 지정하는 제목에는 적용이 안되는 것 같다. 딴게 아니라 `\vec` 명령어두 개 이상이 안된다. `\vec`  에 밑첨자 쓰고, 다른 문자에 밑첨자 해도 안됨..
- `displayMath`를 쓰기 위해 쓰는 `$$`를 한 줄 띄어 놓고 쓰지 않으면 글과 글 사이가 아닌 문장 옆으로 수식이 작성된다.

<br>

---

---
