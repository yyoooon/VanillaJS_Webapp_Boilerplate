const ROUTE_PUSH_EVENT_NAME = 'route-push';
const ROUTE_REPLACE_EVENT_NAME = 'route-replace';

export const pushRouter = onRoute => {
  window.addEventListener(ROUTE_PUSH_EVENT_NAME, e => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

export const replaceRouter = onRoute => {
  window.addEventListener(ROUTE_REPLACE_EVENT_NAME, e => {
    const { nextUrl } = e.detail;
    if (nextUrl) {
      history.replaceState(null, null, nextUrl);

      onRoute();
    }
  });
};

export const popStateRouter = onRoute => {
  window.addEventListener('popstate', () => {
    onRoute();
  });
};

export const push = nextUrl => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_PUSH_EVENT_NAME, {
      detail: {
        nextUrl,
      },
    }),
  );
};

export const replace = nextUrl => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_REPLACE_EVENT_NAME, {
      detail: {
        nextUrl,
      },
    }),
  );
};
