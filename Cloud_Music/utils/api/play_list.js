// 在这里面定义所有接口，一个文件管理所有接口，易于维护
import { http } from '../http'; // 引入刚刚封装好的http模块，import属于ES6的语法，微信开发者工具必须打开ES6转ES5选项


// 推荐歌曲
 function inxeList(params) {
   http('/personalized/newsong', 'get', params)  // 接口请求的路由地址以及请求方法在此处传递
}


//推荐歌单
function personalized(params) {
  http('/personalized','get',params)
}

//歌单详情
function personalized_info(params){
  http('/playlist/detail','get',params)
}

//歌曲详情
function music_info(params){
  http('/song/detail','get',params)
}

//歌曲播放路径
function music_play(params){
  http('/song/url','get',params)
}
//获取歌词
function getlyric(params){
  http('/lyric','get',params)
}

export default { // 暴露接口
  inxeList,
  personalized,
  personalized_info,
  music_info,
  music_play,
  getlyric
}




//inxeList 推荐歌曲 /personalized/newsong
//personalized 推荐歌单  /personalized