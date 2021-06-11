
import { useEffect, useRef, useState } from 'react';
import './App.css';
import TableData from './components/TableData'
import './styles.css';
import Pagination from './components/Pagination';

function App() {
  let [loading, setLoading] = useState(true)
  let [data, setData] = useState([])
  let [searcdata, setSearchData] = useState([])
  let [option, setOption] = useState('');
  let [page, setPage] = useState(5)
  let [searkKey, setSearckKey] = useState('')
  let inputRef = useRef();
  let selectRef = useRef();
  let pageRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);



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



  const changeHandel = () => {
    setOption(selectRef.current.value)
    setPage(pageRef.current.value)
  }

  const updateInput = async () => {
    let input = inputRef.current.value
    let option = selectRef.current.value;
    console.log(option)
    let filtered = [];

      filtered = data.filter(item => {
        return item.genre.toLowerCase().includes(option.toLowerCase())

      })


    setSearckKey(input);
    setData(filtered);
    setPage(filtered.length)
  }

  useEffect(() => {
    let intervalId = setInterval(() => { getData() }, 3000)
    return () => clearInterval(intervalId)
  }, [])




  const indexOfLastPost = currentPage * page;
  const indexOfFirstPost = indexOfLastPost - page;
  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
    <div className='container'>
      <div className='restinfo-wrapper'>

        <h2>List of Restaurant</h2>
        {loading && <h3> Fetching...</h3>}
        <div className="pagination" >

            <select className ="pageBox"onChange={changeHandel} ref={pageRef}>
              <option value="5" >5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>



          </div>

          <div className="serachBox">
            <select onChange={updateInput} ref={selectRef}>
              <option value="all">ALL</option>
              <option value="steak">Steak</option>
              <option value="seafood">Seafood</option>
              <option value="Coffee">Coffee</option>
              <option value="Pasta">Pasta</option>
              <option value="Italian">Italian</option>
              <option value="Grill">Grill</option>
              <option value="Bakery">Bakery</option>
              <option value="Sushi">Sushi</option>
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
                currentPosts.map((item) =>
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
          <Pagination
              postsPerPage={page}
              totalPosts={data.length}
              paginate={paginate}
            />

        </div>


      </div>

      )

}


      export default App;
