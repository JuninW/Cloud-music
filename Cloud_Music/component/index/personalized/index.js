// component/index/personalized/index.js
import http from '../../../utils/api/play_list.js'
var app = getApp()
Component({
  /**
   * 
   * 组件的属性列表
   */
  created: function() {
    var that = this
    wx.removeStorageSync('mid')
    wx.getStorage({
      key: 'mid',
      success: function(res) {
        
      },
    })
    wx.showLoading({
      title: '加载中...',
    })
    http.personalized({
        data: {
          limit: 6
        },
        success: res => {
          for (let key in res.result) {
            res.result[key].playCount = this.tranNumber(res.result[key].playCount, 2)
            if (res.result[key].playCount == undefined) {
              res.result[key].playCount = '401万'
            }
          }
          this.setData({
            tabList: res.result
          })
        },
        fail: err => {
          wx.showToast({
            title: '请求歌单列表失败',
            icon: 'none',
            image: '/img/error.png',
            size: '5px',
            duration: 1000,
          })
        }
      }),
      http.inxeList({
        success: res => {
          var list = res.result
          var i = 1
          for(const key in list){
            list[key].index = i++
          }
          this.setData({
            newSongList: list
          })
        
        },
        fail: err => {
          wx.showToast({
            title: '请求歌曲列表失败',
            icon: 'none',
            image: '/img/error.png',
            size: '5px',
            duration: 1000,
          })
        }
      })
    setTimeout(function() {
      wx.hideLoading()
    }, 2000)


  },
  /**
   * 组件的初始数据
   */
  data: {
    tabList: [],
    newSongList: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //跳转至音乐播放界面
    play_music: function(e) {
      console.log(e.currentTarget)
       wx.showLoading({
         title: '加载中',
       })
       wx.navigateTo({
           url: '/pages/play_music/music?id=' + e.currentTarget.dataset.id,
         },
         wx.hideLoading()
       )
    },
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
      else if (numStr.length > 5 && numStr.length < 8) {
        let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point)
        return parseFloat(parseInt(num / 10000) + '.' + decimal) + '万';
      }
    },

    //歌单详情
    infoPic(e) {
      wx.showLoading({
        title: '加载中',
      })
      wx.navigateTo({
        url: '/pages/pic_info/info?id=' + e.currentTarget.dataset.id
      }, wx.hideLoading())
    },

    //播放按钮
    isPlay(e) {
      console.log(this.data)
      var that = this
      var list = this.data.newSongList
       for(const key in list){
         if (list[key].id == e.currentTarget.dataset.id){
            list[key].isPlayNow = !list[key].isPlayNow 
            
         }else{
           list[key].isPlayNow = false
         }
       }
      that.setData({
        newSongList: list
      })
      
       
    }

  }
})