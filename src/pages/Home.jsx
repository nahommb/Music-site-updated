import React from "react";
import { Link , useNavigate} from "react-router-dom";
import { space,color,background,} from "styled-system";
import { styled } from "styled-components";
import Header from "../Header";
import { useSelector ,useDispatch} from "react-redux";
import { deleteSongs ,uploadSongs,deleteUpload,playSongs,playFromDevice} from "../redux/songState";
import { Edit,Delete,Add ,PlayCircleFilled} from "@mui/icons-material";
import { useState } from "react";
import musicimage from '../images/music2.jpg'
import AudioPlayer from "react-h5-audio-player";

import "react-h5-audio-player/lib/styles.css";


function Home(){

const Body = styled.div`
 ${space}
${color}
${background}
  padding:10px;
  border:2px dotted gray;
  border-radius:15px;
  padding-bottom:35px;
  
  display:flex;
  justify-content:center; 
  font-family: Arial, Helvetica, sans-serif;
  
`;

const H2text = styled.h2`
  color:#ECB365;
`;

const Ptext = styled.p`
 ${space}
  
   color:#ECB365;
   font-size:17px
`;

const Button = styled.button`

  ${space}
  ${color}

  padding: 10px 10px;
  border-radius: 10px;
  border:none;
  font-size: 16px;
  cursor: pointer;
  width: ${(props)=>props.width};
  height:45px;
  background-color:${(props)=>props.bg};
  color:white;
  &:hover{
    background-color:${(props)=>props.hoverColor}
  }
 
`;
const MusicCont = styled.div`
    justify-content: center;
    display: grid;
    grid-template-columns: 100px;
    grid-template-columns: repeat(auto-fill,minmax(25rem,100px));
    grid-gap:10px;
    width:100%;
    align-items:center;
   
`;

const Image = styled.img`
    width: 150px;
    height:150px;
    border-radius: 20px;
`;


const DivMusic = styled.div`
display:flex;
justify-content:center;
align-items:center;
`;
const MusicImage = styled.img`
width:100%;
height:150px;
border-radius:20px
`;
const StyledFileInput = styled.input`
  padding: 0.5em;
  background-color: #black;
  border: 1px solid #ECB365;
  border-radius: 10px;
  color: #ECB365;
  font-size: 1em;
`;
 const Aud = styled(AudioPlayer)`
 background-color:black;
 width:60%;
 margin:10px 0px 10px;
 .rhap_time {
    color: white; 
  }
  .rhap_play{
    color:red;
  }
 `; 


   const songsList = useSelector((state)=>state.songs.userAddedSongs)

   const uploadedList = useSelector((state)=>state.songs.upload);
   const playList = useSelector((state)=>state.songs.playList);
    console.log(playList);
    const devicePlayList = useSelector((state)=>state.songs.devicePlayList);
    console.log(devicePlayList);

   const dispatch = useDispatch();
   const navigate = useNavigate();

    const [audioFile, setAudioFile] = useState(null);
    const[ index ,setIndex] = useState(0);
    const[ indexDevice ,setIndexDevice] = useState(0);

    function handleDelete(id, name){
       dispatch(deleteSongs({
        trackId:id,
        name:name
       }))
       var findIndex = playList.findIndex(f=>f.title==name);
       if(findIndex !== -1 ){
          setIndex(0)
       }
       //setIndex(0)
       navigate("/");
    }
   

   
  
    
   function upLoad(){
    if(audioFile!==null){
        dispatch(uploadSongs({
        audio:audioFile
    }))
    }
   }
   function deleteUploaded(name){
     dispatch(deleteUpload({
        name:name,
        
     }))
     var findIndex = devicePlayList.findIndex(f=>f.audio.name==name);
      if(findIndex !== -1 ){
         setIndexDevice(0)
      }
     
   }
  

   function addtoPlayList(songUrl,title,index){
      dispatch(playSongs({
        url:songUrl,
        title:title,
        index:index
      }))
      var findIndex = playList.findIndex(f=>f.url==songUrl);
      if(findIndex !== -1){
         setIndex(findIndex)
      }
     
   }
   
  function next(){
    if(index!=(playList.length-1))
    {

    var nextIndex= index+1;
    setIndex(nextIndex)
    }  

    else{
      setIndex(0)
    }
  }

  function previous(){
    if(index!=0)
    {
      
    var nextIndex= index-1;
    setIndex(nextIndex)
    }  

    else{
      setIndex(playList.length-1)
    }
   }


   function deviceNext(){
    if(indexDevice!=(devicePlayList.length-1))
    {

    var nextIndex= indexDevice+1;
    setIndexDevice(nextIndex)
    }  

    else{
      setIndexDevice(0)
    }
  }

  function devicePrevious(){
    if(indexDevice!=0)
    {
      
    var nextIndex= indexDevice-1;
    setIndexDevice(nextIndex)
    }  

    else{
      setIndexDevice(devicePlayList.length-1)
    }
   }

 function addToDevicePlayList(audio){
  if(audio!==null){
    dispatch(playFromDevice({
    audio:audio
}))
}
var findIndex = devicePlayList.findIndex(f=>f.audio.name==audio.name);
      if(findIndex !== -1){
         setIndexDevice(findIndex)
      }
 }

   const [isfromDevice, setIsFromDevice] = useState(false);

 
    return ( 
        
        <center>
            <Header title ="Music Site" margin ={10} mb={0}/> 
            <MusicImage src={musicimage}></MusicImage>
            <div>
              {playList.length > 0? 
              <section>
                 <H2text>{playList[index].title}</H2text>
                 {!isfromDevice ? <Aud
                          autoPlay={true}
                         src={playList[index].url}
                          onPlay={(e) => setIsFromDevice(false)}
                          showFilledVolume={true}
                          showSkipControls={true}
                          onClickNext={next}
                          onClickPrevious={previous}

                        />
                 :<section/>
                 }
                  
              </section>
           :<section></section>
            }

            </div>
            
           

            <DivMusic>
            <Ptext mr={3}>Add from Device</Ptext> 
            <StyledFileInput type="file" accept="audio" onChange={(e) => setAudioFile(e.target.files[0])} />
            {audioFile && <H2text>{audioFile.name.slice(0,10)}</H2text>}
            <Button onClick={upLoad} bg={'#FB8B24'} width={"100px"} hoverColor={"#E36414"} ml={1}>Add</Button>
            </DivMusic>
             
            <div>
              {devicePlayList.length > 0? 
              <section>
                 <H2text>{devicePlayList[indexDevice].audio.name}</H2text>
                {isfromDevice ? 
                <Aud
                          autoPlay={true}
                         src={URL.createObjectURL(devicePlayList[indexDevice].audio)}
                          onPlay={(e) => setIsFromDevice(true)}
                          showFilledVolume={true}
                          showSkipControls={true}
                          onClickNext={deviceNext}
                          onClickPrevious={devicePrevious}

                        />
                :<section/>
                }
                
              </section>
           :<section></section>
            }

            </div>

            <div>
              {uploadedList.length > 0 ? ( 
               <MusicCont >
                { uploadedList.map((upl,index)=>(
                    <div key={index}>
                      <div>
                        <Ptext>{upl.audio.name.slice(0,25)}</Ptext>
                       {/* {upl.audio && <audio src={URL.createObjectURL(upl.audio)} controls ></audio>} <br/> */}
                      </div> 
                      <div style={{alignItems:'center',display:'flex',justifyContent:'center'}}>
                        <Button bg={'red'} onClick={()=>{addToDevicePlayList(upl.audio); setIsFromDevice(true)}}><PlayCircleFilled></PlayCircleFilled></Button>
                    <Button ml={2} bg={"#FF5B00"} hoverColor={"#D21312"} onClick={() => deleteUploaded(upl.audio.name)}>
                      <Delete></Delete>
                    </Button>
                      </div>
                    
                  
                    
                    </div>
                    
                )) 
            }   
              </MusicCont>
               ):<section></section>
            
            }
         </div>
            

            <Body mt={40} mb={20} >
            {songsList.length > 0 ? (
                <MusicCont>
                     {songsList.map((songs,index)=>(
                        <div key={index}>
                        <Ptext>{songs.artistName}</Ptext>
                         <Image src={songs.artworkUrl100} alt="img" /> <br/>
                         <Button bg={'#86A7FC'} mr={2} onClick={()=>{addtoPlayList(songs.previewUrl,songs.artistName ,index); setIsFromDevice(false)}}><PlayCircleFilled></PlayCircleFilled></Button>
            
                       
                        <Link to={`/edit/${songs.trackId}`}>
                            <Button bg={"#3F2305"} hoverColor={"gray"}>
                                <Edit></Edit>
                            </Button>
                        </Link>
                    <Button ml={2} bg={"#FF5B00"} hoverColor={"#D21312"} onClick={() => handleDelete(songs.trackId,songs.artistName)}>
                      <Delete></Delete>
                    </Button>
                </div>
                   
                ))
                }
                </MusicCont>
               
            
            ):<H2text>Add  List of Songs You Want From itunes</H2text>
            
            }
            
            </Body>  
            <div>
            <Link to={"/add"}><Button bg={"#65B741"} hoverColor={"green"} width={"120px"} ><Add></Add></Button></Link>
         
            </div>
         
            </center>
    )
}

export default Home;
