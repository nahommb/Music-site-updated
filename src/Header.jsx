import React from "react";
import { space , color, marginTop} from "styled-system";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Headingbar = styled.div `
${color}
${space}
  background-color:332941;
  border:none;
  border-radius:15px;
  height:80px;
  padding :0px 20px 0px 20px;
  display:flex;

  
`;

const InnerContainer = styled.div`
  display:flex;
  justify-content:space-between;
  width:100px;
  align-items:center;
  margin-left:70px
`;
const NewH3 = styled.h3`

text-decoration:none;
color:white;


`;

function Header(props){

  const songsList = useSelector((state)=>state.songs.userAddedSongs);
  const uploadedList = useSelector((state)=>state.songs.upload);

  var upLength = uploadedList.length;
  var numberofSongs = songsList.length;
    var totalSongs = numberofSongs + upLength;
    return (
      <center>
        <Headingbar mt={props.margin} mb={20} color={"white"}>
          
          <h2>{props.title}</h2>
          <InnerContainer>
            <Link to={'/'} style={{ textDecoration: 'none' }}><NewH3>Home<sup style={{color:'pink'}}>{totalSongs}</sup></NewH3></Link>
            <Link to={'/add'} style={{ textDecoration: 'none', marginTop:'4px'}}><NewH3>Add</NewH3></Link>
          
          </InnerContainer>
          <div>
            
          </div>
       </Headingbar>
      </center>
       
    )
}

export default Header;