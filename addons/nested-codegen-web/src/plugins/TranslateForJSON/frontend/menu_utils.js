const menuUtils = {
  menu_1st: {
    network_analysis: {
      label: "Network Analysis",
      icon: "cell-tower",
      pid: "sys_network",
    },
    util_server: {
      pid: "server",
    },
  },
  menu_2rd: {
    server_base_services: {
      label: `Basic Service`,
      pid: "base_service",
    },
    server_file_services: {
      label: `File Service`,
      pid: "file_service",
    },
    network_local: {
      label: `Local Service`,
      icon: `data-lineage`,
      pid: `local`,
    },
  },
};
export default menuUtils;
