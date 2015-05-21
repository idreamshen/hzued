//生成插件框
if ($) {
  var modal = $('<div></div>');
  modal.css({
    'width': '300px',
    'height': '170px',
    'border': '3px solid #800000',
    'background-color': '#fff',
    'box-shadow': '0 0 10px #800000',
    'text-align': 'center',
    'border-radius': '5px',
    'position': 'fixed',
    'left': '50%',
    'top': '50%',
    'margin-left': '-150px',
    'margin-top': '-75px',
    'z-index':'999999'
  });
  //标题
  var title = $('<h2></h2>');
  title.text('hZUEd购买插件').css({
    'margin': '20px 0 10px',
    'font-size': '16px',
    'text-align': 'center',
    'font-weight': '700',
    'color': '#333'
  });
  modal.append(title);
  //说明
  var explain = $('<p></p>');
  explain.text('本插件只能在饰品详情页使用,输入价格后按下购买会购买当前页面的等价饰品').css({
    'padding': '0 20px 10px',
    'text-align': 'left'
  });
  modal.append(explain);
  var input = $('<input type="text">');
  input.css({
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
  //购买价格
  modal.append(input);
  var btn = $('<button></button>');
  var total = $('<p></p>');
  btn.text('购买').css({
    'background-color': '#800000',
    'padding': '7px 12px',
    'border-radius': '3px',
    'width': '100px',
    'border': '0',
    'color': '#fff',
    'line-height': '17px',
    'vertical-align': 'top'
  });
  modal.append(btn);
  total.css({
    'padding-top': '10px',
    'font-weight': '700'
  });
  modal.append(total);
  //购买请求
  var newsItem;
  var buynumber = 0;
  btn.click(function () {
    var price = input.val();
    var itemid = window.location.href.match(/\d{2,20}/g);
    var item = $('[name=buyButton][data-price=' + price + ']');
    //判断是否有最新页饰品如果有购买对象改成最新的饰品页
    if(newsItem == 'object'){
      item = newsItem.find(item);
    }
    //判断当前页是否有想购买的饰品，如果有继续购买，否则提示
    if (item.length > 0) {
      item.each(function (i) {
        if (i == 0) {
          var $this = $(this);
          var url = $(this).attr('url');
          var res = /\d{7}/g;
          var id = url.match(res);
          $.ajax({
            url: 'user/sell-pay.html',
            type: 'post',
            data: 'id=' + id + '&itemId=' + itemid + '&agreeMent=on',
            success: function (data) {
              var password = '$.popModal("请先验证交易密码")' || '$.popModal("Please verify the trading password")';
              var poor = '$.popModal("余额不足")' || '$.popModal("No balance")';
              newsItem = $(data);
              if(data.indexOf(password) != -1){
                total.text('请先在原来的功能上购买,验证一次交易密码').css("color","#c83636");
              }else if(data.indexOf(poor) != -1){
                total.text('余额不足').css("color","#c83636");
              }else{
                if (newsItem.find($this).length == 0) {
                  buynumber++;
                }
                total.text('已购买:' + buynumber).css({
                  'color': '#689021'
                });
              }
            }
          });
        }
      });
    } else {
      total.text('当前页面无此价格饰品！').css({
        'color': '#c83636'
      });
    }
  });
  $('body').append(modal);
}