import {Cart} from 'cart-model.js'

var cart = new Cart();

Page({
  data:{
    cartData:[],
    selectedTypeCounts:0,        //选中类目
    selectedCounts:0,            //选中产品总个数
    totalPrice:0                 //总价格
  },
  onLoad: function() {
  
  },
  onShow: function(){
    var tempObj = cart.getCartTotalCounts();
    this.setData({
      cartData: cart.getCartDataFromLocal(),
      selectedCounts: tempObj.counts1,
      selectedTypeCounts: tempObj.counts2,
      totalPrice: this._cacuTotalPriceAndCount(cart.getCartDataFromLocal()).totalPrice
    })
  },

  //每次更改购物车数据
  _resertCartData: function(){
    var newData = this._cacuTotalPriceAndCount(this.data.cartData);
    this.setData({
      cartData: this.data.cartData,
      totalPrice: newData.totalPrice,
      selectedCounts: newData.selectedCounts,
      selectedTypeCounts: newData.selectedTypeCounts
    });
  },

  //计算总金额和选择的商品总数
  _cacuTotalPriceAndCount: function(cartData){
    var tPrice = 0,
        selectedCounts = 0,
        selectedTypeCounts = 0;
    let multiple = 100;
    for(var i=0;i<cartData.length;i++){
      if(cartData[i].selectStatus){
        tPrice += cartData[i].price * cartData[i].counts *multiple;
        selectedCounts += cartData[i].counts;
        selectedTypeCounts++;
      }
    }

    return {
      totalPrice: tPrice/multiple,
      selectedCounts: selectedCounts,
      selectedTypeCounts: selectedTypeCounts
    };
  },

  //单选复选
  toggleSelect: function(event){
    var id = cart.getDataSet(event, 'id'),
        status = cart.getDataSet(event, 'status'),
        index = this._getIndexById(id);
    this.data.cartData[index].selectStatus = !status;
    this._resertCartData();
  },

  //根据id拿到商品下标
  _getIndexById: function(id){
    var cartData = this.data.cartData;
    for (var i=0;i<cartData.length; i++){
      if (cartData[i].id == id){
        return i;
      }
    }
  },

  //全选
  toggleSelectAll: function(event){
    var status = cart.getDataSet(event, 'status');
    var cataData = this.data.cartData;
    for(var i=0;i<cataData.length;i++){
      cataData[i].selectStatus = !status;
    }
    this.data.cartData = cataData;
    this._resertCartData();
  },

  //加减商品
  changeCounts: function(){
    var id = cart.getDataSet(event, 'id'),
        type = cart.getDataSet(event, 'type'),
        index = this._getIndexById(id);

  }

})

