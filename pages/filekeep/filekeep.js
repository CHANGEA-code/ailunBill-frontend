// pages/filekeep/filekeep.js
import {
  BASEURL
} from "../../service/config";
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  uploadAction: function (e) {
    var userId = wx.getStorageSync('userId');
    var that = this;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success(res) {
        wx.showNavigationBarLoading();
        // tempFilePath可以作为 img 标签的 src 属性显示图片
        const tempFilePaths = res.tempFiles;
        wx.uploadFile({
          url: BASEURL + "/money/excel/import/" + userId,
          filePath: tempFilePaths[0].path,
          name: 'file',
          success: function (res) {
            var data = JSON.parse(res.data);
            if (data.code === 200) {
              wx.setStorageSync('excelBills', data.data);
              wx.navigateTo({
                url: '/pages/filekeep-res/filekeep-res'
              })
            } else {
              wx.showToast({
                title: '导入失败',
                icon: 'error',
                duration: 1500
              })
            }
            wx.hideNavigationBarLoading();
          },
          fail: function (res) {
            wx.hideNavigationBarLoading();
            wx.showToast({
              title: '导入失败',
              icon: 'error',
              duration: 1500
            });
          }
        })
      }
    })
  },
  toWanye: function () {
    wx.navigateTo({
      url: '/pages/outwebview/outwebview'
    })
  }
})