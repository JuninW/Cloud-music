//index.js
//获取应用实例
import http from '../../utils/api/play_list.js'
Page({
  data: {
    currentid: ''
  },

  //获取推荐
  recommend: function(e) {
    var that = this
    that.setData({
      currentid: e.target.dataset.tapid
    })
    http.inxeList({
      data:{
        limit:'10'
      },
      sucess:res=>{
        console.log('请求成功')
      }
    })
  },
  onLoad:function(e){
    wx.showLoading({
      title: '请等待...',
    })
    setTimeout(function(){
      wx.hideLoading()
    },1000)
   
  },
  //获取热歌
  getMusic: function(e) {
    var that = this
    that.setData({
      currentid: e.target.dataset.tapid
    })
  },

  //搜索
  sercah: function(e) {
    var that = this
    that.setData({
      currentid: e.target.dataset.tapid
    })
  }

})