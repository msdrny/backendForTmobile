	var SSH = require('simple-ssh');
var command="ps -eo pid,time |grep $(ps ax  |grep hackrf  | awk '{ print $1; exit }') | awk '{print $2;}'"
//var command="sh mesud.sh"
var ssh = new SSH({
    host: '192.168.10.62',
    user: 'vpn',
    pass: 'testhouse2021'
});

ssh.exec(command, {
    out:  function(stdout) {
      //ssh.end();
      res.status(200).json(stdout)
    }


}).start();
ssh.on('error', function(err) {
    console.log('Oops, something went wrong.');
    console.log(err);
    ssh.end();
});
