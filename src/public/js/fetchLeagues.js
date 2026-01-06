const fs = require('fs').promises;
const path = require('path');
const createWriteStream = require('fs').createWriteStream;



const writepath = path.join(__dirname, '..', '..', 'data', 'images', 'logos');
async function main() {
    try {
        // create directory
        await fs.mkdir(writepath, {recursive: true});
// Il read leagues file into an array of lines / "leagues.txt" => Change the location to your own convenience
        const content = await fs.readFile("../ligenIzenak.txt", "utf8");
        const data = content.split(/\r?\n/).filter(Boolean);
        data.forEach((rawElem, idx) => {
            const elem = rawElem.toString().trim().replace(/[\r\n]/g, '');
            if (!elem) return;
            const url = `https://playfootball.games/media/competitions/${elem}.png`;
            fetch(url)
                .then(async res => {
                    // check status
                    if (res.status === 200) {
                        const reader = res.body.getReader();
                        const outPath = path.join(writepath, `${elem}.png`);
                        await fs.mkdir(path.dirname(outPath), { recursive: true });
                        console.log('Writing to:', outPath);
                        const fileStream = createWriteStream(outPath);

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