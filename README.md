# Vanilla_JS_Component_Template

## 베이스 컴포넌트 구성
```js
export default class Component {
  $target
  props
  state
  constructor({ $target, props }) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.render();
    this.setEvent();
    this.fetch();
  }

  setup() {
    return;
  }

  template() {
    return '';
  }

  connectChild() {
    return;
  }

  mounted() {
    return;
  }

  setEvent() {
    return;
  }

  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
  }

  fetch() {
    return;
  }

  childUpdate() {
    return;
  }

  checkNeedUpdateState(newState) {
    if (!this.state) return false;

    let needUpdateState = false;
    const newStateKeys = Object.keys(newState);

    for (const key of newStateKeys) {
      if (
        !(
          JSON.stringify(this.state[key]) ===
          JSON.stringify(newState[key])
        )
      ) {
        needUpdateState = true
        return needUpdateState;
      }
    }

    return needUpdateState;
  }

  setState(newState, childUpdate = false) {
    if (!this.checkNeedUpdateState(newState)) return;

    this.state = {...this.state, ...newState}
    childUpdate ? this.childUpdate() : this.render();
  }
}

```

### **프로퍼티**

- `$target`: 부모(내 돔을 연결할) 돔
- `props`: 부모에게 받은 데이터
- `state`: 나의 상태

### **메소드**

- `setup()`: 컴포넌트가 첫 생성 될 때 실행됩니다.
- `template()`: target에 삽입할 template을 작성합니다.
- `mounted()`: 돔 생성 이후의 로직을 실행합니다.
- `connectChild()`: 생성된 돔을 가져와 자식 컴포넌트와 연결합니다. (mounted메소드 내부에서 실행)
- `render()`: target과 template를 연결해 돔을 생성합니다.
- `setEvent()`: 생성된 돔에 이벤트를 거는 로직을 실행합니다.
- `childUpdate()`: 상태 변경 시 일부 자식 컴포넌트만 업데이트(setState) 하는 로직을 작성합니다.
- `checkNeedRender()`: 이전 상태와 새로운 상태를 비교해 상태 변경 및 리렌더링이 필요한 지 판단합니다.(setState 메소드 내부에서 실행)
- `setState()`: 상태 변경 후 컴포넌트를 업데이트 합니다. 두번째 인자로 true가 들어갈 경우 childUpdate메소드 실행, 들어가지 않은 경우 render메소드를 실행합니다.
- `fetch()`: 외부 데이터를 비동기로 불러와서 setState를 실행시킵니다.

### **라이프 사이클**

```js
 constructor({ $target, props }) {
    this.$target = $target; // 부모 돔 저장
    this.props = props;     // props 저장
    this.setup();           // 초기 셋팅(주로 초기 상태 설정)
    this.render();          // target돔에 template 생성(렌더링), 렌더링 이후 실행되어야할 로직 실행
    this.setEvent();        // 돔에 이벤트 부착
    this.fetch();           // 외부 데이터를 비동기로 불러온 후, 그 값으로 setState
  }
```

### 컴포넌트 사용 규칙

- **template literal 작성 규칙**
    
    1. 부모 컴포넌트 템플릿 리터럴에서 자식 컴포넌트를 연결할 태그를 작성합니다.
    컴포넌트를 연결할 태그은 data-component 속성을 이용해 연결할 컴포넌트를 명시합니다.
    
    2. connectChild메소드에서 자식 컴포넌트와 해당 태그를 연결시켜줍니다.

```js
// 부모 컴포넌트
 template() {
    return `
      <div data-component="ItemList"></div> // 자식 컴포넌트를 연결할 태그
      <div data-component="Form"></div>
    `;
  }
  
  connectChild() {
    const $ItemList = this.$target.querySelector('[data-component="HistoryList"]');
    const $Form = this.$target.querySelector('[data-component="Form"]')

    if ($ItemList) {
      this.HistoryList = new HistoryList({
        $target: $ItemList,
      });
    }
    
    if ($Form) {
      this.Form = new Form({
        $target: $Form,
      });
    }
   
  }
```
    
- **setState 사용 규칙**
    
    2번째 인자로 true를 넣어주면 등록한 자식 컴포넌트만 업데이트, 넣지 않으면 모든 자식 돔을 새로 생성합니다.
    
---

### 예외
1. input - state 직접 변경
2. item을 따로 만들어서 리스트로 만들어야 할 때 
   - item컴포넌트에서 본인 돔을 만들고 거기에 template를 삽입한 다음 타겟에 appendChild 함(render에서)
   - 부모 컴포넌트에서는 mounted메소드에서 item을 실행시켜 줌

- 부모 상태 변경 로직을 자식에서 해야할 경우 - 부모 컴포넌트에서 이벤트 handeler메소드를 만들어 그 안에 상태 조작 로직을 적어주고, 자식 컴포넌트에 props으로 전달해 실행시킴
- 범위를 변경시켜야 할 시 slice를 애용하자
- 모든 ui관련 데이터는 상태에 저장한다.
- 로컬 스토리지 캐시 사용법
  - 캐시 데이터 변수를 만들어서 초기값을 넣는다.
  - api 부를 때 세션 스토리지에 담는다.
  - api부르기 전에 세션 스토리지에서 먼저 확인하고 있으면 가져온다.
