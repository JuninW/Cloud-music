// pages/play_music/music.js
import http from '../../utils/api/play_list.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    play: false,
    stop: 'none',
    url:'',
    show: 'rotation 81s forwards cubic-bezier(0.22, 0.61, 0.36, 1) '
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    http.music_info({
      data: {
        ids: this.options.id
      },
      success: function(res) {
        that.setData({
          info: res.songs
        })
        that.getInfo()
      }
      
    })
  },
  getInfo:function(){
    let that = this 
    http.music_play({
      data:{
        id: that.options.id
      },
      success:function(res){
        console.log(res)
         that.setData({
          url: res.data[0].url
         })
        that.audioCtx.play()
      }
    })
  },
  off: function() {
    let num = !this.data.play
    this.setData({
      play: num
    })
    if (num == true) {
      this.setData({
        show: 'paused',
        stop: 'block'
      })
      this.audioCtx.pause()
    } else {
      this.setData({
        show: 'running',
        stop: 'none'
      })
      this.audioCtx.play()
    }
  },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.audioCtx = wx.createAudioContext('myAudio')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})