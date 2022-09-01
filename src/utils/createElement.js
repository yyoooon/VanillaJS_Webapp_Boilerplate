export const createElement = tagName => {
  return document.createElement(tagName);
};

export const addClass = ($targetDom, classArr = []) => {
  if (!classArr.length) {
    return;
  }

  classArr.map(className => {
    $targetDom.classList.add(className);
  });
};

export const addDataset = ($targetDom, dataObj = {}) => {
  if (!Object.keys(dataObj).length) {
    return;
  }
  for (let [key, value] of Object.entries(dataObj)) {
    $targetDom.dataset[key] = value;
  }
};
