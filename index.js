const fs = require('fs');

const wordsFilePath = process.argv[2] || './sanat.txt';

const source = fs.readFileSync(wordsFilePath, 'utf8');

const MatchTime = /^\[(?<hour>\d+):(?<minute>\d+) (?<ampm>AM|PM)\] (?<nick>[a-zö' 0-9]+): (?<word>.*)/i;

const TemplateDocument = (content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sanatarina</title>
  <style>
  @font-face {
    font-family: 'communis';
    src: url('static/COMMUNIS-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }
  body {
    margin: 0;
    font-size: 20px;
    font-family: 'communis', sans-serif;
    letter-spacing: -0.075em;
    line-height: 1.5;
  }
  .content {
    max-width: 40em;
    margin: 0 auto;
  }
  .word__author {
    display: none;
  }
  .word:hover {
    background-color: yellow;
  }
  .word:hover .word__author {
    display: inline;
    position: absolute;
    background: #eee;
    padding: 0.5em;
  }
  #togglecolors:not(:checked) ~ p .word__word {
    color: #111 !important;
  }
  </style>
</head>
<body>
  <section class="content">
    <h1>Sanatarina</h1>
    <input type="checkbox" id="togglecolors"> <label for="togglecolors">Näytä värit</label>
    ${ content }
  </section>
</body>
</html>
`;

const TemplateLine = ({hour, minute, ampm, nick, word}) => {
  if(!word) return '';
  let html = `<span class="word"><span class="word__word" style="color: ${ nickToColor(nick) }">${ word }</span><span class="word__author" style="background-color: ${ nickToColor(nick, true) }">${nick}</span></span>`;
  if(word && word.slice(-1) === '.') html += '</p><p>';
  return html;
}

function processText(textData) {
  return '<p>' + textData.split('\n').map(processLine).join('\n') + '(jatkuu...)</p>';
}

function processLine(line) {
  return TemplateLine(getParts(line));
}

function getParts(line) {
  return (line.match(MatchTime) || { groups: {} }).groups;
}

function nickToColor(nick, background) {
  return `hsl(${
    parseInt(nick, 36) % 360
  }, 75%, ${
    background ? 75 : 45
  }%)`;
}


const html = TemplateDocument(processText(source));

fs.writeFileSync('index.html', html, 'utf8');