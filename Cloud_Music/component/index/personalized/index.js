// component/index/personalized/index.js
import http from '../../../utils/api/play_list.js'
Component({
  /**
   * 
   * 组件的属性列表
   */
  created: function () {
    http.personalized({
      data: {
        limit: 6
      },
      success: res => {
        for (let key in res.result) {
          res.result[key].playCount= this.tranNumber(res.result[key].playCount, 2)
          if (res.result[key].playCount==undefined){
            res.result[key].playCount= '401万'
          }
        }
        this.setData({
          tabList: res.result
        },
        )
      }
    }),
    http.inxeList({
      success: res=>{
        this.setData({
          newSongList:res.result
        })
      }
    })


  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    tabList: [],
    newSongList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
        * 数字转整数 如 100000 转为10万
        * @param {需要转化的数} num 
        * @param {需要保留的小数位数} point 
        */
    tranNumber(num, point) {
      let numStr = num.toString()
      // 十万以内直接返回 
      if (numStr.length < 6) {
        return numStr;
      }
      //大于8位数是亿
      else if (numStr.length > 8) {
        let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
        return parseFloat(parseInt(num / 100000000) + '.' + decimal) + '亿';
        
      }
      //大于6位数是十万 (以10W分割 10W以下全部显示)
      else if (numStr.length > 5&&numStr.length<8) {
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        console.log(parseFloat(parseInt(num / 10000) + '.' + decimal) + '万')
        return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
      }
    },
  }
})
