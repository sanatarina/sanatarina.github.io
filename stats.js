const fs = require('fs');

const wordsFilePath = process.argv[2] || './sanat.txt';

const source = fs.readFileSync(wordsFilePath, 'utf8');

const MatchTime = /^\[(?<hour>\d+):(?<minute>\d+) (?<ampm>AM|PM)\] (?<nick>[a-zö' 0-9]+): (?<word>.*)/i;

const processText = source => {
  return source.split('\n')
    .filter(line=>line)
    .map(line=>line.match(MatchTime).groups)
    .reduce((acc, {nick, word}, index, arr) => {
      if(!acc[nick]) {
        acc[nick] = {
          words: 0,
          longest: '',
          shortest: word
        }
      }
      acc[nick].words += 1
      acc[nick].longest = acc[nick].longest.length < word.length ? word : acc[nick].longest
      acc[nick].shortest = acc[nick].shortest.length > word.length ? word : acc[nick].shortest
      return acc
    }, {});
}

stats = JSON.stringify(processText(source),null,2);

fs.writeFileSync('stats.json', stats, 'utf8');