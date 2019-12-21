// pages/pic_info/info.js
import http from '../../utils/api/play_list.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    bgClover:{},
    scrollHeight:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfo(options.id)
    var that = this

    //抓取到第一屏设备高度方便css操作
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight 
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  getInfo:function(id){
    wx.showLoading({
      title: '加载中',
    })
    http.personalized_info({
      data:{
        id:id
      },
      success: res => {
          wx.hideLoading()
        
        this.setData({
          info : res.playlist,
          bgClover :{
            'background': res.playlist.coverImgUrl
          } 
        })
      }
    })
  },

  play_music:function(e){
    wx.showLoading({
      title: '加载中',
    })
    wx.navigateTo({
      url: '/pages/play_music/music?id=' + e.currentTarget.dataset.id,
    },
    wx.hideLoading()
    )
  }
})