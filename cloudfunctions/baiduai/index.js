// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

var AipImageClassifyClient = require("baidu-aip-sdk").imageClassify;

  // 设置APPID/AK/SK，修改为自己百度ai的应用信息
  var APP_ID = "23691787";
  var API_KEY = "l3qC5Em1AhOnsvsgazsIG4qe";
  var SECRET_KEY = "rsbjW9pWDo4FOnvjUCxWM8CQv8k91tqX";

  // 新建一个对象，建议只保存一个对象调用服务接口
  var client = new AipImageClassifyClient(APP_ID, API_KEY, SECRET_KEY);
// 云函数入口函数
exports.main = async (event, context) => {
  const {fileID}=event;
  const res=await cloud.downloadFile({
    fileID:fileID
  })
  const buffer=res.fileContent
  let image=buffer.toString("base64")
  const info=await client.plantDetect(image,{"baike_num":4,"top_num":4})
  return {
    info
  }
}