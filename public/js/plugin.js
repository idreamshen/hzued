//生成插件框
if ($) {
  var modal = $('<div></div>');
  modal.css({
    'width': '300px',
    'height': '210px',
    'border': '3px solid #800000',
    'background-color': '#fff',
    'box-shadow': '0 0 10px #800000',
    'text-align': 'center',
    'border-radius': '5px',
    'position': 'fixed',
    'left': '50%',
    'top': '50%',
    'margin-left': '-150px',
    'margin-top': '-105px',
    'z-index':'999999'
  });
  //标题
  var title = $('<h2></h2>');
  title.text('VP市场抢购工具').css({
    'margin': '20px 0 10px',
    'font-size': '16px',
    'text-align': 'center',
    'font-weight': '700',
    'color': '#333'
  });
  modal.append(title);
  //说明
  var explain = $('<p></p>');
  explain.text('本插件只能在饰品详情页使用,输入价格数量后按下购买会自动购买饰品').css({
    'padding': '0 20px 10px',
    'text-align': 'left'
  });
  modal.append(explain);
  var input1 = $('<input type="text">');
  var input2 = $('<input type="text">');
  input1.css({
    'padding': '5px 12px',
    'width': '100px',
    'border-radius': '3px',
    'border': '1px solid #800000',
    'margin-right': '10px',
    'margin-bottom':'5px',
    'text-align': 'center',
    'color': '#800000',
    'font-weight': '700',
    'font-size': '14px'
  });
  input2.css({
    'padding': '5px 12px',
    'width': '100px',
    'border-radius': '3px',
    'border': '1px solid #800000',
    'margin-right': '10px',
    'text-align': 'center',
    'color': '#800000',
    'font-weight': '700',
    'font-size': '14px'
  });
  var maxspan = $('<span></span>');
  maxspan.text('最大价格  ').css('margin-left','10px');
  var maxnumber = $('<span></span>')
  maxnumber.text('购买数量  ').css('margin-left','10px');
  //购买价格
  var btn = $('<button></button>');
  var total = $('<p></p>');
  btn.text('购买').css({
    'background-color': '#800000',
    'padding': '7px 12px',
    'border-radius': '3px',
    'width': '100px',
    'height':'65px',
    'border': '0',
    'color': '#fff',
    'line-height': '17px',
    'vertical-align': 'top',
    'float':'right',
    'font-size':'20px',
    'margin-right':'15px'
  });
  modal.append(btn,maxspan,input1,maxnumber,input2);
  total.css({
    'padding-top': '10px',
    'font-weight': '700'
  });
  modal.append(total);
  //购买请求
  var newsItem;
  var buynumber = 0;
  btn.click(function () {
    var price = input1.val();
    var number = input2.val();
    var item = $('[name=buyButton]');
    //判断是否有最新页饰品如果有购买对象改成最新的饰品页
    if(newsItem == 'object'){
      item = newsItem.find(item);
    }
    //判断当前页是否有想购买的饰品，如果有继续购买，否则提示
    if (item.length > 0) {
      getAjax(item,number,price);
    } else {
      total.text('当前页面无此价格饰品！').css({
        'color': '#c83636'
      });
    }
  });
  $('body').append(modal);

  function getAjax(item,number,price){
    var item = item;
    var thisnumber = number;//当前购买数量
    var number = number;
    var itemid = window.location.href.match(/\d{2,20}/g);
    item.each(function(i){
      number --;
      //数量大于0时执行购买请求
      if (number >= 0) {
        var $this = $(this);
        var thisPrice = $this.attr("data-price");
        //判断该价格是否大于最大价格如果不是，执行购买请求
        if(thisPrice <= price){
          var url = $this.attr('url');
          var res = /\d{7}/g;
          var id = url.match(res);

          $.ajax({
            url: 'user/sell-pay.html',
            type: 'post',
            data: 'id=' + id + '&itemId=' + itemid + '&agreeMent=on',
            success: function (data) {
              var password = '$.popModal("请先验证交易密码")' || '$.popModal("Please verify the trading password")';
              var poor = '$.popModal("余额不足")' || '$.popModal("No balance")';
              var box = $(data);
              if(data.indexOf(password) != -1){
                total.text('请先在原来的功能上购买,验证一次交易密码').css("color","#c83636");
              }else if(data.indexOf(poor) != -1){
                total.text('余额不足').css("color","#c83636");
              }else{
                if (box.find($this).length == 0) {
                  buynumber++;
                  thisnumber --;
                }
                total.text('已购买:' + buynumber).css({
                  'color': '#689021'
                });
              }
              //判断是否循环结束购买数量是否完成如果没有继续购买
              if(i >=item.length - 1 && thisnumber >= 0){
                var items = box.find('[name=buyButton]');
                getAjax(items,number,price);
              }

            }
          });



        }
      }
    });
  }
}