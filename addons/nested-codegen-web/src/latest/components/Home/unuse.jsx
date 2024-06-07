let NoUseCpt = observer(() => {
  let myfixright = "350px";
  // mycrthome
  // auto-no-force-view
  return (
    <div
      className="sys-card-wrapper"
      style={{ height: "auto!important", maxHeight: "auto!important" }}
    >
      <Card style={{ padding: "0px" }}>
        <div style={{ padding: "8px", width: "100%", height: "100%" }}>
          <div className="root-wrapper">
            <div
              className="root-left-wrapper"
              style={{
                display: "inline-block",
                width: `calc(100% - ${myfixright})`,
              }}
            >
              <h2 className="bar-label">
                {t("Welcome to {0}", gutils.app_name)}
              </h2>
              <div>
                <ul>
                  <li>
                    <a href="https://codegen.cc" target="_blank">
                      {t("Official Website")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0);"
                      onClick={() => {
                        gutils.api.system.openSettingAPI("updates");
                      }}
                    >
                      {t("Software Updates")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/work7z/CodeGen/issues"
                      target="_blank"
                    >
                      {t("Report a Issue")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://codegen.cc/blogs/hist-posted"
                      target="_blank"
                    >
                      {t("Recent News and Blogs")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://codegen.cc/blogs/documentation"
                      target="_blank"
                    >
                      {t(`Usage Documentation`)}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="root-right-wrapper"
              style={{ display: "inline-block", width: `${myfixright}` }}
            >
              <div style={{ textAlign: "right" }}>
                <LocalProject
                  style={{
                    display: "inline-block",
                    marginLeft: "0px",
                    width: myfixright,
                  }}
                ></LocalProject>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "8px" }}>
            {_.isNil(localStorage.getItem("hidemsg")) ? (
              <Callout intent={"primary"}>
                <p>
                  {t(
                    `Hi, thank you for using CodeGen! CodeGen is still under Beta version, for any kinds of issues or suggestion about this software, please kindly tell us via E-Mail or Github Issues, much appreciated.`
                  )}
                </p>
                <Button
                  onClick={() => {
                    localStorage.setItem("hidemsg", "1");
                    location.reload();
                  }}
                  intent={"primary"}
                >
                  {t(`Hide`)}
                </Button>
              </Callout>
            ) : (
              ""
            )}
          </div>
          {/* */}
        </div>
      </Card>
    </div>
  );
});
