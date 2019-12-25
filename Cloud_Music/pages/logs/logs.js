Page({
      data:{

      },
  onLoad: function (e){
  },
  onReady:function(e){

  },
  onShow:function(e){
    wx.getStorage({
      key: 'Token',
      success: function (res) {
        console.log(res)
        console.log('获取token成功')
      },
      fail: function (err) {
        console.log('获取token失败')
        wx.navigateTo({
          url: '/pages/logoIn/logoin'
        })
      }
    })
  }
})
