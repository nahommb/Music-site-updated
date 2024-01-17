import React from "react";
import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import { styled } from "styled-components";
import { space,color } from "styled-system";
import { updateSongs } from "../redux/songState";
import { useNavigate } from "react-router-dom";
import Header from "../Header";


function Edit(){
    const Body = styled.div`
    ${space}
    ${color}
  
     padding:10px;
     background-color:#182747;
     border:none;
     border-radius:15px;
     padding-bottom:35px;
    
     display:flex;
     justify-content:center; 
     
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
const Input = styled.input`

height:45px;
width:300px;
border:none;
border-radius:10px;
`;
    const songsList = useSelector((state)=>state.songs.userAddedSongs);
 

    const{id} = useParams();
    
   
     const selectedSong = songsList.filter(f=>f.trackId==id);
   
     const title = selectedSong.length > 0 ? selectedSong[0].artistName : "";
 
    
     const[newtitle,setTitle] = useState(title);
   
     
  const dispatch = useDispatch()
  const navigate = useNavigate();
  

  function updateHandler(event){

    event.preventDefault();
    dispatch(updateSongs({
        trackId:id, 
        artistName:newtitle
    }))
   navigate("/")
   
  }
  

    return(
     <center>
       <Header title={"Music Site"} margin={10}/>
       <Body>
      <form onSubmit={updateHandler}>
        
        <label><Ptext>Artist Name:</Ptext> </label>
        <Input type="text" name='title' value={newtitle} onChange={(e)=>{setTitle(e.target.value)}} />
        <Button bg={"blue"} ml={20} type="submit">Update</Button>
       </form>
       
       </Body>
     </center>
    );

}

export default Edit;