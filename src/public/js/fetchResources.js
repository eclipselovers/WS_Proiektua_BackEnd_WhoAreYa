const fs = require('fs').promises;
const path = require('path');
const createWriteStream = require('fs').createWriteStream;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}




const LeaguePath = path.join(__dirname, '..', '..', 'src', 'data', 'images', 'logos');
const NationalityPath = path.join(__dirname, '..', '..', 'src', 'data', 'images', 'flags');
const CrestPath = path.join(__dirname, '..', '..', 'src', 'data', 'images', 'crests');
const PlayerPath = path.join(__dirname, '..', '..', 'src', 'data', 'images', 'players');


const args = process.argv.slice(2);
const mota = args[0];
async function main() {
    try {
        // create directory
        if (mota.toLowerCase() === 'league') {
            await fs.mkdir(LeaguePath, {recursive: true});
        } else if (mota.toLowerCase() === 'nationality') {
            await fs.mkdir(NationalityPath, {recursive: true});
        } else if (mota.toLowerCase() === 'crest') {
            await fs.mkdir(CrestPath, {recursive: true});
        } else if (mota.toLowerCase() === 'player') {
            await fs.mkdir(PlayerPath, {recursive: true});
        }
// Il read leagues file into an array of lines / "leagues.txt" => Change the location to your own convenience
        let filePath;
        if (mota.toLowerCase() === 'league') {
            filePath = path.join(__dirname, '..', 'ligenIzenak.txt');
        } else if (mota.toLowerCase() === 'nationality') {
            filePath = path.join(__dirname, '..', 'nationalities.txt');
        } else if (mota.toLowerCase() === 'crest') {
            filePath = path.join(__dirname, '..', 'teamIDs.txt');
        } else if (mota.toLowerCase() === 'player') {
            filePath = path.join(__dirname, '..', 'players.txt');
        }
        const content = await fs.readFile(filePath, "utf8");
        const data = content.split("\n");
        let url;

        for (const elem of data) {
            const idx = data.indexOf(elem);
            if (mota.toLowerCase() === 'league') {
                url = `https://playfootball.games/media/competitions/${elem}.png`;
            } else if (mota.toLowerCase() === 'nationality') {
                url = `https://playfootball.games/media/nations/${encodeURIComponent(elem)}.svg`;
            } else if (mota.toLowerCase() === 'crest') {
                url = `https://cdn.sportmonks.com/images/soccer/teams/${elem % 32}/${elem}.png`;
            } else if (mota.toLowerCase() === 'player') {
                url = `https://playfootball.games/media/players/${elem % 32}/${elem}.png`;
            } else {
                console.log("Invalid option");
                continue;
            }
            if (idx !== 0 && idx % 10 === 0) {
                await sleep(1000);
            }
            fetch(url)
                .then(async res => {
                    // check status
                    if (res.status === 200) {
                        const reader = res.body.getReader();
                        let fileStream;
                        if (mota.toLowerCase() === 'league') {
                            fileStream = createWriteStream(`${LeaguePath}/${elem}.png`);
                        } else if (mota.toLowerCase() === 'nationality') {
                            fileStream = createWriteStream(`${NationalityPath}/${elem}.svg`);
                        } else if (mota.toLowerCase() === 'crest') {
                            fileStream = createWriteStream(`${CrestPath}/${elem}.png`);
                        } else if (mota.toLowerCase() === 'player') {
                            fileStream = createWriteStream(`${PlayerPath}/${elem}.png`);
                        } else {
                            console.log("Invalid option");
                            return;
                        }


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
        }
    } catch (err) {
        console.error(err);
    }
}

main();