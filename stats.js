const fs = require('fs');

const wordsFilePath = process.argv[2] || './sanat.txt';

const source = fs.readFileSync(wordsFilePath, 'utf8');

const MatchTime = /^\[(?<hour>\d+):(?<minute>\d+) (?<ampm>AM|PM)\] (?<nick>[a-zö' 0-9]+): (?<word>.*)/i;

const processText = source => {
  return source.split('\n')
    .filter(line=>line)
    .map(line=>line.match(MatchTime).groups)
    .reduce((acc, {nick, word}) => {
      if(!acc[nick]) acc[nick] = 0
      acc[nick] += 1
      return acc
    }, {});
}

stats = JSON.stringify(processText(source),null,2);

fs.writeFileSync('stats.json', stats, 'utf8');