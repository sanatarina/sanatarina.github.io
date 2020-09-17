const fs = require('fs');

const source = fs.readFileSync('./sanat.txt', 'utf8');

const MatchTime = /^\[(?<hour>\d+):(?<minute>\d+) (?<ampm>AM|PM)\] (?<nick>[a-zö' ]+): (?<word>.*)/i;

const TemplateDocument = (content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sanatarina</title>
  <style>
  body {
    margin: 0;
    font-size: 20px;
    font-family: sans-serif;
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
  </style>
</head>
<body>
  <section class="content">
    <h1>Sanatarina</h1>
    ${ content }
  </section>
</body>
</html>
`;

const TemplateLine = ({hour, minute, ampm, nick, word}) => {
  if(!word) return '';
  let html = `<span class="word"><span class="word__word">${ word }</span><span class="word__author">${nick}</span></span>`;
  if(word && word.slice(-1) === '.') html += '</p><p>';
  return html;
}

function process(textData) {
  return '<p>' + textData.split('\n').map(processLine).join('\n') + '(jatkuu...)</p>';
}

function processLine(line) {
  return TemplateLine(getParts(line));
}

function getParts(line) {
  return (line.match(MatchTime) || { groups: {} }).groups;
}


const html = TemplateDocument(process(source));

fs.writeFileSync('index.html', html, 'utf8');