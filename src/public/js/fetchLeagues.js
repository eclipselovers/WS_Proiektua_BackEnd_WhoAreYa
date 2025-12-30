const fs = require('fs').promises;
const path = require('path');
const createWriteStream = require('fs').createWriteStream;



const writepath = path.join(__dirname, '..', '..', 'src', 'data', 'images', 'logos');
async function main() {
    try {
        // create directory
        await fs.mkdir(writepath, {recursive: true});
// Il read leagues file into an array of lines / "leagues.txt" => Change the location to your own convenience
        const content = await fs.readFile("../ligenIzenak.txt", "utf8");
        const data = content.split("\n");
        data.forEach((elem, idx) => {
            const url = `https://playfootball.games/media/competitions/${elem}.png`;
            fetch(url)
                .then(async res => {
                    // check status
                    if (res.status === 200) {
                        const reader = res.body.getReader();
                        const fileStream = createWriteStream(`${writepath}/${elem}.png`);

                        while (true) {
                            const {done, value} = await reader.read();
                            if (done) break;
                            fileStream.write(value);
                        }

                        fileStream.end();

                    } else {
                        console.log(`status: ${res.status} line: ${idx} elem:${elem} not found`)
                    }
                })
                .catch(err => console.log(err))
        });
    } catch (err) {
        console.error(err);
    }
}
main();