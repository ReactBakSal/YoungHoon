# 1장 리엑트 첫 단계

## index

-   [리엑트 이해](#리엑트이해) ★
-   [Virtual Dom](#리엑트의특징) ★
-   [출처](#출처) ★

## 리엑트이해
![리엑트](https://github.com/ReactBakSal/YoungHoon/tree/master/imgae/React.jpg) 

### 리엑트 는 오직 V(view)만 신경쓰는 라이브러리

리엑트 라이브러리는 사용자 인터페이스를 만드는데 주로 사용을 한다.
MVC, MVW와 같은 구조를 가지는 프레임워크와는 달리 오직 V(View) 에만 신경을 쓴다.
```컴포넌트```는 리엑트에서 특정 부분이 어떻게 생길지 정하는 선언체인데. 리엑트는 이 ```컴포넌트```를 이용하여 재사용이 가능한 API로 수많은 기능들을 내장하고 있다.

> 조화과정
리엑트의 뷰를 업데이트 할 때는 "업데이트의 과정을 거친다" 라는 표현보다 "조화 과정"을 거친다라는 표현이 더 적합하다.
컴포넌트에서의 데이터가 변경될때 사용자들이 보기에는 뷰가 새롭게 업데이트 되는것 처럼 보이겠지만, ```render```의 호출에 의해서 새로운 요소를 갈아 끼우는 것이다. 이 ```render```가 실행될때는 그 내부에 이쓴 컴포넌트들도 재귀적으로 렌더링 된다.

[목차로 돌아가기](#index)

## 리엑트의특징

리엑트의 가장 큰 특징은 가상돔(Virtual Dom)을 이용한다는 것입니다. DOM은 Document Object Model의 약어로써 XML 이나 HTML로 작성합니다.
![DOM](https://github.com/ReactBakSal/YoungHoon/tree/master/imgae/DOM.jpg)

### Virtual Dom

그렇다면 이 Virtual Dom이 하는 역할은 무엇일까요?
대게 DOM은 웹브라우저 단에서 DOM에 변화가 일어나면 웹 브라우저가 CSS를 다시 연산하고, 레이아웃을 구성하고, 페이지를 리페인트 합니다. DOM을 조작할때마다 엔진이 웹 페이지를 새로 그리기 때문에 비교적 많은 비용이 발생하게 됩니다. 반면에 Virtual DOM 방식은 기존에 있던 DOM에서 Virtual DOM 을 리 렌더링 하여서 이전 Virtual DOM에 있던 내용과 현재 내용을 비교하여서 업데이트 된 부분만 변경 해 줍니다. 
정리하자면

1. 데이터를 업데이트하면 전체 UI를 Virtual DOM에 리렌더링 합니다.
2. 이전 Virtual DOM에 있던 내용과 현재 내용을 비교합니다.
3. 바뀐 부분만 실제 DOM에 적용합니다.

![VirtualDOM](https://github.com/ReactBakSal/YoungHoon/tree/master/imgae/VirtualDom.png "가상돔과 브라우저돔이 리렌더링되는 과정")

하지만 Virtual DOM이 무조건 빠른것은 아닙니다. 상황에 따라서 간단한 작업에는 react를 사용하지 않는것이 더 좋은 성능을 발휘할때가 있습니다.
React와 Virtual DOM이 언제나 제공할 수 있는 것은 바로 ***업데이트 처리 간결성*** 입니다.

[목차로 돌아가기](#index)

## 출처

https://www.oreilly.com/library/view/learning-react-native/9781491929049/ch02.html