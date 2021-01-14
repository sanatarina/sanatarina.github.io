# Sanatarina

Node.js tool for converting word story* chat logs into a web page.

**word story: participants take turns to add a new word into a dedicated channel, forming a collaborative story.*

## Usage

1. Copy the chat logs into a new file in the project folder.

1. Make sure the format matches [sanat.example.txt](https://github.com/thykka/sanatarina/blob/master/sanat.example.txt)

1. Run the script with `$ npm start filename.txt` replacing `filename.txt` with your chat log's filename. If no argument is given, it defaults to `sanat.txt`.

1. You should now have an `index.html` file in the project folder.

1. Commit and push. `git push sanatarina master:master`