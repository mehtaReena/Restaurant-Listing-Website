
import { useEffect, useRef, useState } from 'react';
import './App.css';
import TableData from './TableData'
import './styles.css';

function App() {
  let [loading, setLoading] = useState(true)
  let [data, setData] = useState([])
  let [searcdata, setSearchData] = useState([])
  let [option, setOption] = useState('')
  let [searkKey, setSearckKey] = useState('')
  let inputRef = useRef();
  let selectRef = useRef();


  const API_key = "Bearer iqi509189dxznal;,ggi";
  const REQUESTED_URL = "http://128.199.195.196:3001/"

  async function getData() {
    let response = await fetch(REQUESTED_URL, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Bearer iqi509189dxznal;,ggi',
        'Content-Type': 'application/json; charset=utf-8'
      }),

    })
    let data = await response.json()
    // console.log(data)
    setData(data)
    setLoading(false)
  }



    const changeHandel=()=>{
      setOption(selectRef.current.value)
    }

    const updateInput = async () => {
      let input =inputRef.current.value
      let option =selectRef.current.value;
      let filtered=[];
      if(option==='City'){
         filtered = data.filter(item => {
          return item.city.toLowerCase().includes(input.toLowerCase())
         })
      }
      else if (option==='Name'){
        filtered = data.filter(item => {
          return item.name.toLowerCase().includes(input.toLowerCase())
         })
        }
         else if (option==='Geners'){
           filtered = data.filter(item => {
            return item.geners.toLowerCase().includes(input.toLowerCase())
           })
         }


      setSearckKey(input);
      setData(filtered);
   }

   useEffect(() => {
    let intervalId = setInterval(() => { getData() }, 3000)
    return () => clearInterval(intervalId)
  }, [])


  return (
    <div className='container'>
      <div className='restinfo-wrapper'>

        <h2>List of Restaurant</h2>
        {loading && <h3> Fetching...</h3>}


        <div className="serachBox">
          <select  onChange={changeHandel}  ref={selectRef}>
            <option value="Name">Name</option>
            <option value="City">City</option>
            <option value="Geners">Geners</option>
            <option value="State">State</option>
          </select>

          <input
            type="text"
            ref={inputRef}
            placeholder="searching ..."
            onChange={updateInput}
          />

        </div>

        <table id='rest'>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Phone Number</th>
            <th>Geners</th>
          </tr>
          <tbody>
            {
              data.map((item) =>
                <TableData
                  name={item.name}
                  city={item.city}
                  state={item.state}
                  telephone={item.telephone}
                  genre={item.genre}
                ></TableData>

              )
            }

          </tbody>

        </table>

      </div>
    </div>

  )

}


export default App;
