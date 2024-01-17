import axios from "axios";

const API_ENDPIONT ="https://itunes.apple.com/search?term=";
const fetchSongs = async (songName)=>
axios.get(`${API_ENDPIONT}${songName}`);

export {fetchSongs};