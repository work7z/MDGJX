var myapi = {
    getfilelist: async ()=>{
      var res =  await gutils.ajax({
         url: '/fileapp/fileserve/list',
      })
      return res;
    }
}
export default myapi