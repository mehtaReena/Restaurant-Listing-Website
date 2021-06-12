import { useEffect, useRef, useState } from 'react';
import './App.css';
import TableData from './components/TableData'
import './styles.css';


function App() {
  let [loading, setLoading] = useState(true)
  let [data, setData] = useState([])
  let [searchData, setSearchData] = useState([])
  let [option, setOption] = useState('');
  let [page, setPage] = useState(5)
  let [searkKey, setSearckKey] = useState('')
  let inputRef = useRef();
  let selectRef = useRef();
  let pageRef = useRef();


  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(10);




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

  }

  const clickhandler = (option) => {
    setSearchData([]);
    inputRef.current.value = '';

    if (option) {
      let count = data.length;
      if (start + page >= count) return;
      setStart(start + page);
      setEnd(Math.min(end + page, count));
    } else {
      if (start === 0) return;
      setStart(start - page);
      setEnd(start);
    }
  };

  const updateInput = async () => {

    let input = inputRef.current.value
    let option = selectRef.current.value;
    console.log(option)
    let filtered = [];


    if (option === 'Name') {
      filtered = data.filter(item => {
        return item.name.toLowerCase().includes(input.toLowerCase())

      })
    }
    else if (option === 'City') {
      filtered = data.filter(item => {
        return item.city.toLowerCase().includes(input.toLowerCase())

      })
    }
    else if (option === 'State') {
      filtered = data.filter(item => {
        return item.state.toLowerCase().includes(input.toLowerCase())

      })
    }
    else if (option === 'Geners') {
      filtered = data.filter(item => {
        return item.genre.toLowerCase().includes(input.toLowerCase())

      })
    }


    console.log(filtered)
    setSearckKey(input);
    setSearchData(filtered);
    setPage(filtered.length)
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

        <div className="pagination">
          <button onClick={() => clickhandler(0)}><a href=".#" class="previous">&laquo; Previous</a></button>
          <button onClick={() => clickhandler(1)}><a href=".#" class="next">Next &raquo;</a></button>
        </div>


        <div className="serachBox">
          <select onChange={changeHandel} ref={selectRef}>

            <option value="Name">Name</option>
            <option value="City">City</option>
            <option value="State">State</option>
            <option value="Geners">Geners</option>


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
            <th>Sno:</th>
            <th>Name</th>
            <th>City</th>
            <th>State</th>
            <th>Phone Number</th>
            <th>Geners</th>
          </tr>
          <tbody>
            {
              searchData.length > 0 ?
                searchData.map((item ,idx) =>
                  <TableData
                    id={idx}
                    name={item.name}
                    city={item.city}
                    state={item.state}
                    telephone={item.telephone}
                    genre={item.genre}
                  ></TableData>
                )

                : data.map((item ,idx) => {
                  return (
                    <TableData
                      id={idx}
                      name={item.name}
                      city={item.city}
                      state={item.state}
                      telephone={item.telephone}
                      genre={item.genre}
                    ></TableData>

                  )
                }).filter((data, index) => index >= start && index < end)
            }

          </tbody>

        </table>
        {/*  <Pagination
              postsPerPage={page}
              totalPosts={data.length}
              paginate={paginate}
            />
 */}
      </div>


    </div>

  )

}


export default App;
