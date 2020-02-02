// pages/play_music/music.js
import http from '../../utils/api/play_list.js'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    play: true,
    stop: 'none',
    marginTop: 0,
    storyContent: [],
    lrcDir:'',
    currentIndex222: 0,
    viewId:'el-00:00',
    isNow: 'false',
    show: 'rotation 81s forwards cubic-bezier(0.22, 0.61, 0.36, 1) '
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.audioCtx = app.audioCtx

    let that = this
    http.music_info({
      data: {
        ids: that.options.id
      },
      success: function (res) {
        that.setData({
          info: res.songs
        })

        //判断是否在后台有播放
        wx.getStorage({
          key: 'mid',
          success: function (res) {
            if (res.data != that.options.id) {
              that.getInfo()
            }
          },
          fail:function(res) {
            that.getInfo()
          }

        })
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
    var that = this
    that.setData({
      play: num
    })
    if (num == true) {
      that.setData({
        show: 'paused',
        stop: 'block',
      
      })
      that.audioCtx.pause()
    } else {
      that.setData({
        show: 'running',
        stop: 'none',
       
      })
      that.audioCtx.onPlay(()=>{})
      
      setTimeout(()=>{
        that.audioCtx.play()
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
      },500)
      
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
    var that = this
    wx.setStorage({
      key: 'mid',
      data: this.options.id ,
    })
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