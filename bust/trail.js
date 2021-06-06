var config = {

};

var iterifyArr = function (arr) {
  var cur = 0;
  arr.next = (function () { return (++cur >= this.length) ? false : this[cur]; });
  arr.prev = (function () { return (--cur < 0) ? false : this[cur]; });
  arr.reset = (function () { cur = 0; });
  return arr;
};

log('Simulation begins here...');
/* 100 satoshis (1 bit) */
var wagers = [100,100,200,300,500,800,1300,2100,3400,5400,8100,12200,900];
//var wagers = [100,100,200,300,500,900];
iterifyArr(wagers);

const payout = 3;

engine.on('GAME_STARTING', function (res) {
  log('a game is starting');
  var wager = wagers.next();
  if(wager == 900)
  {
    wagers.reset();
    var wager = wagers.next();
  }  
  engine.bet(wager, payout);
  log(res);  
});


engine.on('GAME_ENDED', function (res) {
  log('a game is edded');  
  log(res);
  var lastGame = engine.history.first(); 
  if (lastGame.cashedAt) 
  {
    // We won
    // iterator = arr.reset();
    wagers.reset();
    log("we won");
  }
  else
  {
    // We loss
    log("we loss");
  }
});
