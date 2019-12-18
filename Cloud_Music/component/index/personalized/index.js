// component/index/personalized/index.js
import http from '../../../utils/api/play_list.js'
Component({
  /**
   * 
   * 组件的属性列表
   */
  created:function(){
       http.personalized({
         data: {
           limit: 10
         },
         success: res => {
           this.setData({
             tabList: res.result
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
      tabList:[
        {},
        {},
        {}
      ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})