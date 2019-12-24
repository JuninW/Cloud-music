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
    marginTop: 0,
    storyContent: [],
    lrcDir:'',
    currentIndex222: 0,
    viewId:'el-00:00',
   
    show: 'rotation 81s forwards cubic-bezier(0.22, 0.61, 0.36, 1) '
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.audioCtx = wx.createInnerAudioContext('myAudio')

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
        that.off()
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
        that.audioCtx.src = res.data[0].url
      }
      
    })
  },
  off: function () {
    let num =!this.data.play
    this.setData({
      play: num
    })
    if (num == true) {
      this.setData({
        show: 'paused',
        stop: 'block',
      
      })
      this.audioCtx.pause()
    } else {
      this.setData({
        show: 'running',
        stop: 'none',
       
      })
      this.audioCtx.play()
      let that = this
      console.log()
      that.audioCtx.onTimeUpdate(function () {
         let duration = that.audioCtx.duration; //时长
         let currentTime = that.audioCtx.currentTime; //当前播放位置
         var start = that.turnTime(currentTime);
         var end = that.turnTime(duration);
         if (start in that.data.storyContent && 'el-' + start != that.data.viewId) {
            that.setData({
              viewId: 'el-' + start
            })
          }
      })
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
        
      }
    })
  },
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
  },


  /**
   * 生命周期函数--监听页面显示
   */

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