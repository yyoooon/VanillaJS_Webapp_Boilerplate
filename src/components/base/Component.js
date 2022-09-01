export default class Component {
  $node
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
    if (this.$node) {
      this.$node.innerHTML = this.template();
      this.$target.appendChild(this.$node);
    } else {
      this.$target.innerHTML = this.template();
    }
    this.mounted();
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

  fetch() {
    return;
  }
}
