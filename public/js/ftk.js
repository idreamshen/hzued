$(function() {
  socket = io('http://192.168.18.50:9000');
  var userid = $('#user-id').val();
  socket.emit('login', {user_id:userid});
  socket.emit('list_lobby');
  socket.on('login', function () {
    console.log('success');
  });
  socket.on('kickoff', function () {
    console.log('kickoff');
  });
  socket.on('list_lobby', function (lobbies) {
    console.log(lobbies);
    lobbies.forEach(function (lobby) {
      $('ul').append('<li>房间名:' + lobby.name + ', 创建者:' + lobby.leader_id + '</li>')
    })
  });
  socket.on('create_lobby', function (lobby) {
    $('ul').append('<li>房间名:' + lobby.name + ', 创建者:' + lobby.leader_id + '</li>');
  });
  $('#create-lobby').click(function () {
    if (userid) {
      socket.emit('create_lobby', {user_id:userid,lobby_name:$('#lobby-name').val()});
    } else {
      alert('您尚未登陆');
    }
  });
});
