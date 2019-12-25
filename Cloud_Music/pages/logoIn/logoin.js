
Page({
  data:{
    windowHeight:'',
    show:'block',
    animation:''
  },
  onHide: function (e) {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  onLoad:function(){
    var that = this
    wx.getSystemInfo({
      success: function (res){
        that.setData({
          windowHeight: res.windowHeight
        })
      }
    })
  },
  logoin_phon:function(){
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'linear'
    })
    var that = this
   animation.opacity(0).step()
    that.setData({
      animation:animation
    })
  },
})