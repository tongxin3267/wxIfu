// detail.js
var Api = require('../../../utils/api.js');
var Req = require('../../../utils/req.js');
const App = getApp()

Page({
  data: {
    customer: {},
    resultList: [],
    customerId: '',
    customerExtHosp: ''
  },

  onLoad: function (option) {
    var that = this;
    console.log(option.customerId + "/" + option.customerExtHosp);
    if (option.customerId) {
      this.getCustomerInfo(option.customerId, option.customerExtHosp);
      //this.getTemplateIng(option.customerId);
      console.log("存选中患者id------------" + option.customerId);
      //存选中患者id
      wx.setStorageSync('customerId', option.customerId);
      that.setData({
        customerId: option.customerId,
        customerExtHosp: option.customerExtHosp
      })
    }
  },
  //分配方案
  sendTemplate() {
    wx.navigateTo({
      url: "/pages/template/mytemplate/index"
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var customerId = this.data.customerId;
    var customerExtHosp = this.data.customerExtHosp;
    this.getCustomerInfo(customerId, customerExtHosp);
  },
  //取患者信息
  getCustomerInfo: function (id, customerExtHosp) {
    var that = this;
    if (!customerExtHosp) {
      customerExtHosp = "";
    }
    Req.req_post(Api.getCustomerInfo(id, {
      token: Api.getToken(),
      customerExtHosp: customerExtHosp
    }), "", function success(res) {
      that.setData({
        customer: res.data.model
      })
     
    }, function fail(res) {

    })
  },
  
  navigateTo(e) {
    var customerId = this.data.customerId;
    console.log("customerid=====" + customerId + "&customerExtHospitalId=" + e.currentTarget.dataset.exthospitalid);
    wx.navigateTo({
      url: "/pages/template/detail/index?customerId=" + customerId + "&exthospitalId=" + e.currentTarget.dataset.exthospitalid
    })
  },//进入病程录
  jumpToRecord(e) {
    var customerId = this.data.customerId;
    wx.navigateTo({
      url: "/pages/mycustomer/record/index?customerId=" + customerId + "&templateId=" + e.currentTarget.dataset.templateid
    })
  }

})