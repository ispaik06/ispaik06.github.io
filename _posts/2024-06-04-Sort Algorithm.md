---
title: "Sort Algorithm"
date: 2024-06-04 10:22:00 +09:00
categories: [Algorithm]
tags: [Sort, Algorithm]

math: true
mermaid: true
---


### 학습목표
- 기본 정렬 알고리즘을 이해한다.
- 정렬을 귀납적 관점에서 볼 수 있도록 한다.
- 2~3장에서 배운 기법을 사용해 각 정렬의 수행시간을 분석할 수 있도록 한다.
- 비교 정렬의 한계를 이해하고, 선형 시간 정렬이 가능한 조건과 선형 시간 정렬 알고리즘을 이해한다.

### 정렬 알고리즘들
- 대부분 $O(n^2)$과 $O(n\log n)$ 사이
- Input이 특수한 성질을 만족하는 경우에는 $O(n)$ sorting도 가능
	- e.g., input이 $-O(n)$과 $O(n)$ 사이의 정수

### 기본 정렬 알고리즘
##### 평균적으로 $\Theta(n^2)$의 시간이 소요되는 정렬 알고리즘들
- Selection sort
- Bubble sort
- Insertion sort

### 고급 정렬 알고리즘
##### 평균적으로 $\Theta(nlogn)$의 시간이 소요되는 정렬 알고리즘들
- Merge sort
- Quick sort
- Heap sort

### 특수 정렬 알고리즘
##### $\Theta(n)$ 정렬
두 원소를 비교하는 것을 기본 연산으로 하는 정렬의 하한선은 $\Omega(n\log n)$이다.
그러나 원소들이 특수한 성질을 만족하면 $\Theta(n)$ 정렬도 가능하다.
- Radix sort
- Counting sort

## 효율성 비교
|                | Worst Case | Average Case |
| -------------- | :--------: | :----------: |
| Selection Sort |   $n^2$    |    $n^2$     |
| Bubble Sort    |   $n^2$    |    $n^2$     |
| Insertion Sort |   $n^2$    |    $n^2$     |
| Merge Sort     | $n\log n$  |  $n\log n$   |
| Quick Sort     |   $n^2$    |  $n\log n$   |
| Heap Sort      | $n\log n$  |  $n\log n$   |
| Counting Sort  |    $n$     |     $n$      |
| Radix Sort     |    $n$     |     $n$      |
