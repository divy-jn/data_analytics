// Match Results Scraper
// Match Results Scraper
// Navigate to the tournament page
navigate('https://stats.espncricinfo.com/ci/engine/records/team/match_results.html?id=14450;type=tournament');
collect(parse());

// Parser Code
// Step1: create an array to store all the records
// list for data
let arr = []

// getting rows
const rows = $('table.engineTable > tbody > tr.data1');

// loop
rows.each((index, element) => {
  const d = $(element).find('td');   //find the td
  arr.push({
    'team1': $(d[0]).text(),
    'team2': $(d[1]).text(),
    'winner': $(d[2]).text(),
    'margin': $(d[3]).text(),
    'ground': $(d[4]).text(),
    'matchDate': $(d[5]).text(),
    'scorecard': $(d[6]).text()
  })
})


// return data
return {
  "matchSummary": arr
};