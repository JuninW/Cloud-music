import http from '../../utils/api/play_list.js'
Page({
  data:{
    windowHeight:'',
    show:true,
    animation:'',
    showPhone:'',
    myphone:'',
    toastText:'',
    ispass:true,
    password:'',
    psw:false,
    phone:false
    
  },
  onHide: function (e) {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  onReady:function(){
     this.animation = wx.createAnimation({
       duration: 500,
       timingFunction: 'ease',
       delay:20
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

  //点击手机登录
  logoin_phon:function(){
   this.setData({
     show:false,
     phone:true
   })
   this.show_phon()
  },
  //确定密码
  logoIn:function(){
    if (this.data.password == '') {
      wx.showModal({
        content: '请输入密码',
        showCancel: false,
      })
    }else{
      let that = this
      http.logoin({
        data:{
          phone:that.data.myphone,
          password: that.data.password
        },
        success:function(res){
         if(res.code==502){
           wx.showModal({
             content: '密码错误！',
             showCancel: false,
           })
         }
         if(res.code==200){
            wx.setStorage({
              key: 'Token',
              data: res.token,
            }),
            wx.setStorage({
              key: 'uid',
              data: res.account.id,
            })
           wx.navigateBack()
         }
        },
        fail:function(err){
          console.log(err)
        }
      })
      
    }
  },
  //监听手机号输入
  getUser:function(e){
    let value = e.detail.value
    this.setData({
      myphone:value
    })
  },

  //监听密码
  getpass:function(e){
    let value = e.detail.value
    this.setData({
      password: value
    })
  },
  //下一步
  next:function(){
    if (this.data.myphone==''){
      wx.showModal({
        content:'请输入手机号',
        showCancel:false,
       
      })

    }else{
      this.setData({
        psw:true,
        phone: false
      })
    }
   
  },
  //展示登录inp
  show_phon:function(){
    var that = this
    // that.animation.opacity(0).step()
    that.animation.opacity(1).step()
    that.setData({
      showPhone: that.animation
    })
  },
})