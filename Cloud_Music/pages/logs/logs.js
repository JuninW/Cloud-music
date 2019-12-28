
import http from '../../utils/api/user.js'
Page({
      data:{

      },
  onLoad: function (e){
  },
  onReady:function(e){

  },
  onShow:function(e){
    wx.getStorage({
      key: 'uid',
      success: function (res) {
        console.log(res)
        console.log('获取uid成功')

        http.userInfo({
          data:{
            uid:res.data
          }
        })
      },
      fail: function (err) {
        console.log('获取uid失败')
        wx.navigateTo({
          url: '/pages/logoIn/logoin'
        })
      }
    })
  }
})
