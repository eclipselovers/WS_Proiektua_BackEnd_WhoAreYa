// loaders.js - BACKEND BERTSIOA
export { fetchJSON, fetchPlayer, fetchSolution };

const API_URL = 'http://localhost:3000/api'; // Edo zure URLa

async function fetchJSON(what) {
    // Orain backend-era deitzen du, fitxategi estatikoen ordez
    let endpoint;

    if (what === 'fullplayers25') {
        endpoint = `${API_URL}/players`;
    } else if (what === 'solution25') {
        // Interfazeak IDen array bat espero du
        // Baina backend-ak eguneko jokalaria itzuli beharko luke
        endpoint = `${API_URL}/solution/${difference_In_Days}`;
    }

    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

async function fetchPlayer(playerId) {
    const response = await fetch(`${API_URL}/players/${playerId}`);
    return await response.json();
}

async function fetchSolution(gameNumber) {
    const response = await fetch(`${API_URL}/solution/${gameNumber}`);
    return await response.json();
}
