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
    url: '',
    marginTop: 0,
    storyContent: [],
    lrcDir:'',
    currentIndex222: 0,
    show: 'rotation 81s forwards cubic-bezier(0.22, 0.61, 0.36, 1) '
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    http.music_info({
      data: {
        ids: this.options.id
      },
      success: function (res) {
        that.setData({
          info: res.songs
        })
        that.getInfo()
        that.lyric()
      }

    })
  },
  getInfo: function () {
    let that = this
    http.music_play({
      data: {
        id: that.options.id
      },
      success: function (res) {
        that.setData({
          url: res.data[0].url
        })
        that.audioCtx.play()
        
      }
    })
  },
  off: function () {
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
  //获取歌词
  lyric: function () {
    let that = this
    http.getlyric({
      data: {
        id: that.options.id
      },
      success: function (res) {
        
        // that.setData({
        //   storyContent:res.lrc.lyric
        // })
        
        var str = res.lrc.lyric;
          var reg = /\[(.*?)](.*)/g;
          var json = {}
          str.replace(reg, function ($1, $2, $3) {
            $2 = $2.slice(0, 5);
            json[$2] = $3;
          })
          that.setData({
            storyContent: json
          })
        
        console.log(that.data.storyContent)
      }
    })
  },


  //歌词滚动事件
  

  //换算时间
  turnTime:function(num) {
    var minute = Math.floor(num / 60);
    minute = minute < 10 ? '0' + minute : minute;
    var second = Math.floor(num) % 60;
    second = second < 10 ? '0' + second : second;
    return minute + ':' + second;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.audioCtx = wx.createAudioContext('myAudio')
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})