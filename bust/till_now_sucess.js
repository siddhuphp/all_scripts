/* 100 satoshis (1 bit) */

var config = {

};

log('Simulation begins here...');
var arr = [100,100,300,500,800,1300,2100];
var iterator = arr.values(); 

engine.on('GAME_STARTING', function (res) {
  log('a game is starting');
  engine.bet(iterator.next().value, 2);
  log(res);  
});


engine.on('GAME_ENDED', function (res) {
  log('a game is edded');  
  log(res);  
});


