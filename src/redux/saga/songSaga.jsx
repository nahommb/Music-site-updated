import {takeLatest,put,fork,call} from 'redux-saga/effects';
import { getSongsFetch, getSongsSuccess } from '../songState';
import { fetchSongs } from '../Api';

function* doGetSongsFetch({payload}){
   try{
    const songName= payload;
    const response = yield call(fetchSongs,songName);
    console.log(response);
   
        console.log(response.data.results);
        yield put(getSongsSuccess([...response.data.results]))

   } 
   catch (error){
    console.log(error);
   } 
}

function* songsSaga(){
    yield takeLatest(getSongsFetch.type ,doGetSongsFetch)
}

export const songSaga =[fork(songsSaga)];
