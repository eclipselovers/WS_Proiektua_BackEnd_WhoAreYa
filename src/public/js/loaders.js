const API_URL = 'http://localhost:3000/api';

async function fetchJSON(what) {
    let endpoint;

    if (typeof what === 'string' && (what.startsWith('http') || what.startsWith('./') || what.startsWith('../') || what.startsWith('/')) ) {
        endpoint = what;
    } else {
        if (what === 'fullplayers25') {
            endpoint = `${API_URL}/players`;
        } else if (what === 'solution25') {
            endpoint = `${API_URL}/solution`;
        } else {
            endpoint = what;
        }
    }

    const response = await fetch(endpoint);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

async function fetchPlayer(playerId) {
    const response = await fetch(`${API_URL}/players/${playerId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

async function fetchSolution(gameNumber) {
    const url = gameNumber ? `${API_URL}/solution/${gameNumber}` : `${API_URL}/solution`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { fetchJSON, fetchPlayer, fetchSolution };
} else {
    window.fetchJSON = fetchJSON;
    window.fetchPlayer = fetchPlayer;
    window.fetchSolution = fetchSolution;
}
