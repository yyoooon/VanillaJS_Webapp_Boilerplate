const createObserver = ({ callback }) => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    },
    {
      threshold: 0.5,
    },
  );

  return observer;
};

export default createObserver;
