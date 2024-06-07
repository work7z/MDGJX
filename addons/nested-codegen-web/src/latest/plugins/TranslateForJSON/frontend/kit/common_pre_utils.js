export default {
  wrapClz(obj) {
    return (key) => {
      return obj[key] || key;
    };
  },
};
