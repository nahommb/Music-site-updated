import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";


export const songSlice = createSlice({
    name:"songs",
    initialState:{
        songs:[],
        userAddedSongs:[],
        isLoading : false,
        upload:[],
        playList:[],
        devicePlayList:[]
    },
    reducers:{
        getSongsFetch:(name)=>{
            return name
        },
        getSongsSuccess:(state,action)=>{
            state.songs= action.payload;
            state.isLoading = false;
        },
        getSongsFailure:(state)=>{
            state.isLoading = false;
        },
        addSongs:(state,action)=>{
            const selectedSong = action.payload;
            console.log(selectedSong);
            const container = state.userAddedSongs.find(f=>f.trackCensordName==selectedSong.trackCensordName);
            if(!container){
             state.userAddedSongs.push(selectedSong)
            }
        
        },
        updateSongs:(state,action)=>{
         const { trackId,artistName} = action.payload;
         const container = state.userAddedSongs.find(f=>f.trackId==trackId);
         if(container){
            container.trackId = trackId;
            container.artistName = artistName;
         }
        },
        deleteSongs:(state,action)=>{
            const {trackId,name} = action.payload;
            const findIndex = state.userAddedSongs.findIndex(i=>i.trackId==trackId);
            findIndex !== -1 && state.userAddedSongs.splice(findIndex,1);

            const playListDelete = state.playList.findIndex(i=>i.title==name);
            playListDelete !== -1 && state.playList.splice(playListDelete,1);

        },
        uploadSongs:(state,action)=>{

            const upload = action.payload;
            console.log(upload);
            const container = state.upload.find(f=>f.audio.name==upload.audio.name);
            if(!container){
             state.upload.push(upload)
            }
            
        },
       deleteUpload:(state,action)=>{
        const {name} = action.payload;
        const findIndex = state.upload.findIndex(i=>i.audio.name==name);
        findIndex !== -1 && state.upload.splice(findIndex,1);

        const devicePlayListDelete = state.devicePlayList.findIndex(i=>i.audio.name==name);
        devicePlayListDelete !== -1 && state.devicePlayList.splice(devicePlayListDelete,1);

       },
        playSongs:(state,action)=>{
            const {url,title,index} = action.payload
           const container = state.playList.find(f=>f.url==url);
           if(!container){
            state.playList.push(action.payload);
           }
            
        },
        playFromDevice:(state,action)=>{
            const {audio} = action.payload
           const container = state.devicePlayList.find(f=>f.audio.name==audio.name);
           if(!container){
            state.devicePlayList.push(action.payload);
           }
            
        }
    }
    
})

export const {getSongsFetch,getSongsSuccess,getSongsFailure,addSongs,updateSongs,deleteSongs,uploadSongs,deleteUpload,playSongs,playFromDevice} = songSlice.actions;
export default songSlice.reducer;