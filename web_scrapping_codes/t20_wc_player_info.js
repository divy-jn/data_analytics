// Player Info Scraper - Stage 1
// Navigate to match results
navigate('https://stats.espncricinfo.com/ci/engine/records/team/match_results.html?id=14450;type=tournament');

let l = parse().matchSummaryLinks;
for (let i of l) {
  next_stage({ url: i })
}


// Parser Code
let l2 = []
const r = $('table.engineTable > tbody > tr.data1');
r.each((index, element) => {
  const d = $(element).find('td');
  const temp = "https://www.espncricinfo.com" + $(d[6]).find('a').attr('href');
  l2.push(temp);
})
return {
  'matchSummaryLinks': l2
};

// Stage 2
// Navigate to specific match
navigate(input.url);


let p_data = parse().playersData;
for (let obj of p_data) {
  name = obj['name']
  team = obj['team']
  url = obj['link']
  next_stage({ name: name, team: team, url: url })
}

//---------- 2.b Parser Code ---------//
//to store all the players in a list
var list = []

var m = $('div').filter(function () {
  return $(this)
    .find('span > span > span').text() === String("Match Details")
}).siblings()
t1 = $(m.eq(0)).find('span > span > span').text().replace(" Innings", "")
t2 = $(m.eq(1)).find('span > span > span').text().replace(" Innings", "")


//for batting players
var tables = $('div > table.ci-scorecard-table');
var r1 = $(tables.eq(0)).find('tbody > tr').filter(function (index, element) {
  return $(this).find("td").length >= 8
})

var r2 = $(tables.eq(1)).find('tbody > tr').filter(function (index, element) {
  return $(this).find("td").length >= 8
});

r1.each((index, element) => {
  var d = $(element).find('td');
  list.push({
    "name": $(d.eq(0)).find('a > span > span').text().replace(' ', ''),
    "team": t1,
    "link": "https://www.espncricinfo.com" + $(d.eq(0)).find('a').attr('href')
  });
});

r2.each((index, element) => {
  var d = $(element).find('td');
  list.push({
    "name": $(d.eq(0)).find('a > span > span').text().replace(' ', ''),
    "team": t2,
    "link": "https://www.espncricinfo.com" + $(d.eq(0)).find('a').attr('href')
  });
});

//for bowling players 

var tables2 = $('div > table.ds-table');
var r3 = $(tables2.eq(1)).find('tbody > tr').filter(function (index, element) {
  return $(this).find("td").length >= 11
})

var r4 = $(tables2.eq(3)).find('tbody > tr').filter(function (index, element) {
  return $(this).find("td").length >= 11
});


r3.each((index, element) => {
  var d = $(element).find('td');
  list.push({
    "name": $(d.eq(0)).find('a > span').text().replace(' ', ''),
    "team": t2.replace(" Innings", ""),
    "link": "https://www.espncricinfo.com" + $(d.eq(0)).find('a').attr('href')

  });
});

r4.each((index, element) => {
  var d = $(element).find('td');
  list.push({
    "name": $(d.eq(0)).find('a > span').text().replace(' ', ''),
    "team": t1.replace(" Innings", ""),
    "link": "https://www.espncricinfo.com" + $(d.eq(0)).find('a').attr('href')
  });
});

return { "playersData": list }


/* ------------- STAGE 3 ------------ */

//------- 3.a Interaction Code ------ //

navigate(input.url);
data = parse()
collect(
  {
    "name": input.name,
    "team": input.team,
    "battingStyle": data.battingStyle,
    "bowlingStyle": data.bowlingStyle,
    "playingRole": data.playingRole,
    "description": data.content,
  });

//---------- 3.b Parser Code ---------//
const battingStyle = $('div.ds-grid > div').filter(function (index) {
  return $(this).find('p').first().text() === String('Batting Style')
})

const bowlingStyle = $('div.ds-grid > div').filter(function (index) {
  return $(this).find('p').first().text() === String('Bowling Style')
})

const playingRole = $('div.ds-grid > div').filter(function (index) {
  return $(this).find('p').first().text() === String('Playing Role')
})



return {
  "battingStyle": battingStyle.find('span').text(),
  "bowlingStyle": bowlingStyle.find('span').text(),
  "playingRole": playingRole.find('span').text(),
  "content": $('div.ci-player-bio-content').find('p').first().text()
}