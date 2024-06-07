import all_lang_tempaltes from "./common_lang_template";

const init_model = () => {
  let dft_language_type = "java";
  let x1 = _.find(all_lang_tempaltes, (x) => x.value == dft_language_type);
  let language_template = _.get(x1, "language_template");
  let language_script = _.get(x1, "language_script");
  let language_user_script = [
    `// ${t(
      `If you don't need customize the template and supplyment additional model, please ignore this tab.`
    )}`,
    `// ${t(`You can invoke the {0} function continuously`, `addModel`)}
// addModel({
//   my_test_date_str: ''+new Date().getTime()
// })
// ${t(
      `At the same time, the ability of JavaScript can be useful as well.`
    )}        
// let myval = 1+1;
// addModel({
//   my_test_number: myval
// })
// ${t(`Function is also supported in the model value.`)}
// addModel({
//  fn_realtime_datestr: ()=>{
//    return Date.now()
//  }
// })        
// ${t(
      `After setting the fn_realtime_datestr value above, you can invoke it in template as below.`
    )}
// <h1>The moment is  {{=it.fn_realtime_datestr()}}</h1>
// ${t(`More Examples: {0}`, "https://handlebarsjs.com/")}
// ${t(
      `Lastly, You can check the loggings if the result isn't matched with your expectation.`
    )}
      `,
    // // ${t(
    //   `Last but not least, please write it carefully in case any error occurred. `
    // )}
  ].join(`\n`);
  return {
    json_source: ``,
    option_showing_model_result: null,
    model_gen_result: "",
    language_show_dft_value: "false",
    language_all_in_one: "true",
    language_clazz_result_list: [],
    language_debug_model: "false",
    language_user_script: language_user_script,
    language_format_source: "true",
    language_template: language_template,
    language_type: dft_language_type,
    language_script: language_script,
    model_1: true,
    loggings_array: [],
  };
};

export default init_model;
