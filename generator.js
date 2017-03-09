var players = require('./players');
var imageGenerator = require('./image');

function shuffle(playerNames) {
  var result = [];
  while(playerNames.length > 0) {
    var i = Math.floor((Math.random() * playerNames.length));
    result.push(playerNames[i]);
    playerNames.splice(i, 1);
  }
  return result;
}

function sort(playerNames) {
  return playerNames.sort(function(a, b) {
    return players[b] - players[a];
  });
}

function total(array) {
  return array.reduce(function(currentTotal, playerName) {
    return currentTotal + players[playerName];
  }, 0);
}

function isFull(team) {
  return team.length === (Object.keys(players).length / 2);
}

function dispatchPlayer(playerName, team1, team2) {
  if (isFull(team1)) {
    team2.push(playerName);
  } else if (isFull(team2)) {
    team1.push(playerName);
  } else if (total(team2) > total(team1)) {
    team1.push(playerName);
  } else {
    team2.push(playerName);
  }
}

function generateTeams(sortedPlayerNames) {
  var team1 = [];
  var team2 = [];

  while(sortedPlayerNames.length > 0) {
    dispatchPlayer(sortedPlayerNames.shift(), team1, team2);
  }

  return {
    team1: team1,
    team2: team2
  };
}

function dashLine() {
  console.log('---------------');
}

function displayTeam(teamName, team) {
  dashLine();
  console.log(teamName);
  dashLine();
  team.forEach(function(playerName) {
    console.log(playerName, '->', players[playerName]);
    dashLine();
  });
  console.log('Total', total(team), '\n\n')
}



var playerNames = Object.keys(players);

// 1 - shuffle players
playerNames = shuffle(playerNames);

// 2 - sort them by score (descending)
var sortedPlayerNames = sort(playerNames);

// 3 - generate teams !
var generatedTeams = generateTeams(sortedPlayerNames);

// 4 - display teams with scores
displayTeam('TEAM 1', generatedTeams.team1);
displayTeam('TEAM 2', generatedTeams.team2);

imageGenerator.generateImage(generatedTeams);
