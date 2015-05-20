
//生成插件框
 var modal = $('<div></div>');
 modal.css({
    'width':'300px',
    'height':'150px',
    'border':'3px solid #800000',
    'background-color':'#fff',
    'box-shadow':'0 0 10px #800000',
    'text-align':'center',
    'border-radius':'5px',
    'position':'fixed',
    'left':'50%',
    'top':'50%',
    'margin-left':'-150px',
    'margin-top':'-75px'
 });
  //标题
  var title = $('<h2></h2>');
  title.text('hzued购买插件').css({
    'margin':'20px 0 10px',
    'font-size':'16px',
    'text-align':'center',
    'font-weight':'700',
    'color':'#333'
  });
  modal.append(title);
  //说明
  var explain = $('<p></p>');
  explain.text('本插件只能在饰品详情页使用,输入价格后按下购买会购买当前页面的等价饰品').css({
    'padding':'0 20px 10px',
    'text-align':'left'
  });
  modal.append(explain);
 var input = $('<input type="text">');
  input.css({
    'padding':'5px 12px',
    'width':'100px',
    'border-radius':'3px',
    'border':'1px solid #800000',
    'margin-right':'10px',
    'text-align':'center',
    'color':'#800000',
    'font-weight':'700',
    'font-size':'14px'
  });
  //购买价格
  modal.append(input);
  var btn = $('<button></button>');
  var brbtn = $('<p></p>');
  btn.text('购买').css({
    'background-color':'#800000',
    'padding':'7px 12px',
    'border-radius':'3px',
    'width':'100px',
    'border':'0',
    'color':'#fff',
    'line-height':'17px',
    'vertical-align':'top'
  });
  modal.append(btn);
  //购买请求
  btn.click(function(){
    var price = input.val();
    var itemid = window.location.href.match(/\d{2,20}/g);
    $('[name=buyButton][data-price='+price+']').each(function(i){
      if(i==0){
        var url = $(this).attr('url');
        var res = /\d{7}/g;
        var id = url.match(res);
        $.ajax({
          url:'/user/sell-pay.html',
          type:'post',
          data:'id=' + id + '&itemId=' + itemid + '&agreeMent=on'
        });
      }
    });
  });
$('body').append(modal);