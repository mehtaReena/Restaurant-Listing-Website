
import { useEffect, useState } from 'react';
import './App.css';
import TableData from './TableData'
import './styles.css';

function App() {
  let [loading, setLoading] = useState(true)
  let [data, setData] = useState([])

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
    console.log(data)
    setData(data)
    setLoading(false)
  }

  useEffect(() => {
    let intervalId = setInterval(() => { getData() }, 3000)
    return () => clearInterval(intervalId)
  }, [])



  return (
    <div className='container'>
      <div className='userinfo-wrapper'>

        <h3></h3>
        {loading && <h3> Fetching...</h3>}

        <table id='users'>
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
