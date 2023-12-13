import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,useSearchParams,useNavigate  } from 'react-router-dom';
import './PagesBtns.css'

export default function PagesBtns(props) {
  const [pages,setPages] = useState(0);
const [query] = useSearchParams()
const navigate = useNavigate();


  useEffect(() => {
    doApi();
  },[query])

  const doApi = async() => {
    try{
      const url = props.apiUrl;
      const resp = await axios.get(url);
      console.log(resp.data);
      setPages(resp.data.pages);
    }
    catch(err){
      console.log(err);
    }
  }

  const goBack = () => {
    // Navigate to the previous page or a specific route
    navigate("/"); // This goes back to the previous page
    // navigate('/your-specific-route'); // Use this for a specific route
  };


  return (
    <div>
      <button onClick={goBack} className="back-button">Back</button>

      <span>Page: </span>
      {[...Array(pages)].map((item,i) => {
        return (
          <Link key={i} to={props.linkTo + (i + 1)}
           className={`pagination-link ${query.get('page') === String(i + 1) ? 'active' : ''}`}>
            {i + 1}
          </Link>
        )
      })}
    </div>
  )
}
