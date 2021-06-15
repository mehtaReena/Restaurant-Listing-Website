import { useEffect, useRef, useState } from 'react';
import './App.css';
import TableData from './components/TableData'
import './styles.css';


function App() {
  let [loading, setLoading] = useState(true)
  let [data, setData] = useState([])
  let [searchData, setSearchData] = useState([])
  let [filterData, setFilterData] = useState([])
  let [option, setOption] = useState('');
  let [page, setPage] = useState(7)
  let [searkKey, setSearckKey] = useState('')
  let inputRef = useRef();
  let selectRef = useRef();
  let pageRef = useRef();
  let [citySort, setCitySort] = useState(true)


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
    let count = data.length;
    setFilterData(data.filter((data, index) => index >= start && index < end))
    setStart(start + page);
    setEnd(Math.min(end + page, count));

    setLoading(false)

  }





  const clickhandler = (option) => {
    console.log(option)
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

    setFilterData(data.filter((data, index) => index >= start && index < end))
  };



  const SearchHandler = async () => {
    if (inputRef.current.value){
    let searchText = inputRef.current.value
    let filtered = [];
    filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.city.toLowerCase().includes(searchText.toLowerCase()) ||
        item.genre.toLowerCase().includes(searchText.toLowerCase())
    );

    console.log(filtered)
    setSearchData(filtered);
    setPage(filtered.length)
    }
    else{
      setSearchData([]);
      setFilterData(data.filter((data, index) => index >= start && index < end))
      setStart(start + page);
      // (Math.min(end + page, count));
    }

    }



  useEffect(() => {
    getData()

  }, [])


  const filter = () => {
    let filterText = selectRef.current.value;
    let filtered = [];
    filtered = data.filter(
      (item) =>
        item.genre.toLowerCase().includes(filterText.toLowerCase())
    );
    setFilterData(filtered);
  }

  const sortByCity = () => {

    if (citySort) {
      function compare(a, b) {
        if (a.city < b.city) {
          return -1;
        }
        if (a.city > b.city) {
          return 1;
        }
        return 0;
      }
      filterData.sort( compare );
    }
    else {

      function compare(a, b) {
        if (a.city > b.city) {
          return -1;
        }
        if (a.city > b.city) {
          return 1;
        }
        return 0;
      }
      filterData.sort( compare );

    }

    setFilterData(filterData)
    console.log(data)
    setCitySort(pre => !pre)


  }
  const sortByName = () => {

  }






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
          <select onChange={filter} ref={selectRef}>

            <option value="all">All</option>
            <option value="seafood">Seafood</option>
            <option value="steak">Steak</option>
            <option value="american">American</option>
            <option value="french,">French,</option>
            <option value="italian,">Italian,</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="european">European</option>
            <option value="Japanese">Japanese</option>
            <option value="pasta">Pasta</option>
            <option value="Continenta">Continenta</option>


          </select>

          <input
            type="text"
            ref={inputRef}
            placeholder="searching ..."
            onChange={SearchHandler}
          />

        </div>

        <table id='rest'>
          <tr>
            <th onClick={sortByName}>Name ⬆⬇</th>
            <th onClick={sortByCity}>City ⬆⬇</th>
            <th>State</th>
            <th>Phone Number</th>
            <th>Geners</th>
          </tr>
          <tbody>
            {
              searchData.length > 0 ?
                searchData.map((item, idx) =>
                  <TableData
                    id={idx}
                    name={item.name}
                    city={item.city}
                    state={item.state}
                    telephone={item.telephone}
                    genre={item.genre}
                  ></TableData>
                )

                : filterData.map((item, idx) => {
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
                })
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
