const fs = require('fs');
const path = require('path');

const writepath = path.join('src', 'data', 'images', 'logos');
try {
   // create directory
    await fs.mkdir(writepath, { recursive: true });
// Il read leagues file into an array of lines / "leagues.txt" => Change the location to your own convenience
const content = await fs.readFile("leagues.txt", "utf8");
const data = content.split("\n");
    data.forEach((elem, idx) => {
        const url = 'https://playfootball.games/media/competitions/${elem}.png';
        fetch(url)
        .then(res => {
        // check status
            if (res.status === 200) {
            res.body.pipe(fs.createWriteStream('$|writepath)${elem}.png'))

    } else {
        console.log('status: ${res.status} line: ${idx} elem:${elem} not found')
    }})
    .catch (err => console.log(err))
    });
} catch(err) {
    console.error(err);
}