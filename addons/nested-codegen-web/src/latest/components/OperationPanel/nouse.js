/**
                  <MenuItem
                    onClick={() => {
                      if (gstore.localSettings[all_display_optkeys.config]) {
                        delete gstore.localSettings[all_display_optkeys.config];
                      } else {
                        gstore.localSettings[all_display_optkeys.config] =
                          "hidden";
                      }
                    }}
                    intent={"none"}
                    icon={"remove-row-bottom"}
                    text={t(
                      (gstore.localSettings[all_display_optkeys.config] ==
                      "hidden"
                        ? "Show"
                        : "Hide") + " Configuration Panel"
                    )}
                  />
                  <MenuItem
                    onClick={() => {
                      if (gstore.localSettings[all_display_optkeys.tabs]) {
                        delete gstore.localSettings[all_display_optkeys.tabs];
                      } else {
                        gstore.localSettings[all_display_optkeys.tabs] =
                          "hidden";
                      }
                    }}
                    intent={"none"}
                    icon={"remove-row-bottom"}
                    text={t(
                      (gstore.localSettings[all_display_optkeys.tabs] ==
                      "hidden"
                        ? "Show"
                        : "Hide") + " Tabs Panel"
                    )}
                  />
                  <MenuItem
                    onClick={() => {
                      if (isLeftAllHide) {
                        delete gstore.localSettings[all_display_optkeys.tabs];
                        delete gstore.localSettings[all_display_optkeys.config];
                      } else {
                        gstore.localSettings[all_display_optkeys.tabs] =
                          "hidden";
                        gstore.localSettings[all_display_optkeys.config] =
                          "hidden";
                      }
                    }}
                    intent={"none"}
                    icon={"remove-row-bottom"}
                    text={t((isLeftAllHide ? "Show" : "Hide") + " All")}
                  />
 */

// {
//   label: t("Viewer"),
//   children: [
//     {
//       label: t("Create New Tab"),
//       onClick: fn_create_new_tab,
//     },
//     {
//       label: t("Save Content"),
//       onClick: fn_save_content,
//       loading: props.logicRoot.hist.isLoadingForSaveHist,
//     },
//     {
//       label: t("Rename Tab"),
//       onClick: fn_rename_tab,
//     },
//     {
//       label: t("Refresh Tabs"),
//       loading: isLoadingForRefreshHist,
//       onClick: fn_refresh_tabs,
//     },
//     {
//       label: t("Delete Current Tab"),
//       onClick: fn_delete_crt_tab,
//     },
//     {
//       label: t("Delete All Tabs"),
//       onClick: fn_delete_all_tabs,
//     },
//     // more definitions
//   ],
// },
