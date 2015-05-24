$(function() {
  socket = io('http://127.0.0.1:9001');

  login(socket);

  socket.on('login', onLogin);
  socket.on('chat', onChat);

  var userid = $('#my-userid').val();
  $('#btn-send').click(function () {
    var msg = $('#txt-msg').val();
    var data = {
      user_id: userid,
      message: msg
    };
    console.log('发送', data);
    socket.emit('chat', data);
  });
});

/**
 * @desc 登陆
 * @param socket
 */
function login (socket) {
  var userid = $('#my-userid').val();
  if (!userid) {
    console.log('userid为空');
    return;
  }

  var data = {
    user_id: userid
  };
  socket.emit('login', data);
}

/**
 * @desc 当登陆时
 * @param data
 */
function onLogin (data) {
  if (data.success === true) {
    console.log('登陆成功');
  }
}

/**
 * @desc 当有聊天消息时
 * @param data
 */
function onChat (data) {
  console.log('收到', data);
  $('#chat-list').append('<li>' + data.create_at + ' ' + data.nickname + ':' + data.message + '</li>')
}