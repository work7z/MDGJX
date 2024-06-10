let ScrollMemWrapper = observer((props = {}) => {
  let cREF = React.useRef({
    crtTop: 0,
    loadFinish: false,
  });
  const [mid2] = React.useState(_.uniqueId("mid"));

  return (
    <div
      id={mid2}
      onScroll={(e) => {
        console.log(e);
        window.tmp1 = e;
        let scrollTop = e.target.scrollTop;
        console.log(`run mid: ${props.mid}`);
        if (cREF.current.loadFinish) {
          gstore.scroll_mem_obj[props.mid] = scrollTop;
        }
        // cREF.current.crtTop = scrollTop;
      }}
      {...props}
      ref={(e) => {
        console.log("running here", e);
        try {
          if (props.ref) {
            props.ref(e);
          }
        } catch (e) {
          console.log("err", e);
        }
        if (e != null) {
          gstore.scroll_mem_obj[e + "ele"] = e;
          try {
            $(e).scrollTop(gstore.scroll_mem_obj[props.mid] || 0);
          } catch (e) {
            console.log(e);
          }
          cREF.current.loadFinish = true;
          setTimeout(() => {
            try {
              $(`#${mid2}`).scrollTop(gstore.scroll_mem_obj[props.mid] || 0);
            } catch (e) {
              console.log(e);
            }
            cREF.current.loadFinish = true;
          }, 0);
        }
      }}
    >
      {props.children}
    </div>
  );
});
window.ScrollMemWrapper = ScrollMemWrapper;

export default ScrollMemWrapper;
