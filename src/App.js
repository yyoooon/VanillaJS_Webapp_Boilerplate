import { pushRouter, replaceRouter, popStateRouter } from './routes/router.js';
import Component from './components/base/Component.js';

class App extends Component {
  template() {
    return ``;
  }

  async route() {
    const { pathname } = window.location;
    if (pathname === '/') {
    }
  }

  setInitRouter() {
    this.route();

    pushRouter(() => {
      this.route();
    });
    replaceRouter(() => {
      this.route();
    });
    popStateRouter(() => {
      this.route();
    });
  }

  mounted() {}
}

export default App;
