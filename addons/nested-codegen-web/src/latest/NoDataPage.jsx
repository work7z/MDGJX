import React from "react";
const NoDataPage = observer(() => {
  console.log("no data page");
  const hist = useHistory();
  window.hist = hist;
  setTimeout(
    () => {
      window.jump_before = true;
      hist.push("/");
    },
    window.jump_before ? 0 : 0
  );

  return <div>{t(`Redirecting...`)}</div>;
});
export default NoDataPage;
