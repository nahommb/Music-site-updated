import React from "react";
import { useEffect ,useState} from "react";
import { useSelector ,useDispatch} from "react-redux";
import { getSongsFetch } from "../redux/songState";
import { space,color} from "styled-system";
import { styled } from "styled-components";
import Header from "../Header";
import { addSongs } from "../redux/songState";
import { useNavigate } from "react-router-dom";
import { Search } from "@mui/icons-material";

function Add(){

    const Body = styled.div`
    ${space}
     padding:30px;
     background-color:#0F0F0F;
     border:none;
     border-radius:15px;
    
    
     display:flex;
     justify-content:center;
     align-items:end;
   `;
   const Button = styled.button`
 
  ${space}
  ${color}

  
  padding: 10px 10px;
  border-radius: 5px;
  border:none;
  font-size: 16px;
  cursor: pointer;
  width:100px;
  height:40px;
  background-color:#65B741;
  color:white;
  &:hover{
    background-color:green;
  }
`;

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
};

const Audio = styled.audio`
 width: 180px;

@media(min-width:${breakpoints.tablet}){
    
    width:300px;
 
}
`;
const Image = styled.img`
width:200;
border-radius:50%
`;

const Ptext = styled.p`
${space}
 
  color:#ECB365;
  font-size:17px
`;    
const Input = styled.input`
text-align:center;
font-size:20px;
height:38px;
width:300px;
border:none;
border-radius:8px;
`; 
const SearchDiv = styled.div`
display:flex;
align-items:center;
justify-content:center;

`;
        
       
        const [songName,setSongName] = useState('beutiful');

        const dispatch = useDispatch();
        
        useEffect(()=>{
           dispatch(getSongsFetch(songName));
        },[songName]);
  
        var name = 'love'
        function search(){
          
            dispatch(getSongsFetch(name));
         
        }
    
       const songs = useSelector((state)=>state.songs.songs);
        const navigate = useNavigate();

        function addHandler(id,title,artistName,img,audioUrl){
         dispatch(addSongs({
            trackId:id,
            trackCensordName:title,
            artistName:artistName,
            artworkUrl100:img,
            previewUrl:audioUrl

         }))
         navigate("/")
        }
        
           return (
            <center>
              <Header title={"Music Site"}/>
              <form onSubmit={e=>e.preventDefault()}>
                <SearchDiv>
                
                 <Input type="text" placeholder="Search" onChange={e=>{name = e.target.value}}></Input> 
                 <Button type="submit" onClick={search} ml={2}> <Search style={{color:'white'}}></Search></Button>
              
              </SearchDiv>
              </form>  
             
                 <Body>
                 {songs.length > 0? (
                    <div>
               <table>
                 <thead>
                    <tr>
                       
                        <th></th>
                        <th></th> 
                        <th></th>

                    </tr>
                 </thead>
                <tbody> {songs.map((song,index)=>(
                    <tr key={index}style={{color:"#ECB365"}}>
                        <td>
                        <Image width={50}  src={song.artworkUrl100} alt='img'></Image>
                        </td>
                        <td>{song.trackCensoredName}{':'}{song.artistName}<br></br>
                        {/* <Audio src={song.previewUrl} controls></Audio>  */}
                           </td>
            
                        <td>
                            <Button onClick={()=>addHandler(
                                song.trackId,
                                song.trackCensoredName,
                                song.artistName,
                                song.artworkUrl100,
                                song.previewUrl
                                )}>Add</Button>
                        </td>
                    </tr>
                    
                    ))}
                    
                </tbody>
               </table>
                  
              
           </div>
                 ):<Ptext>Loading...</Ptext>
                 
                 }
    
           </Body>
            </center>
          
          
           )
    
}

export default Add;


