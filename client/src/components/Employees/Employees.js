import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmps, getEmpsBySearch } from "../../actions/empsAction";
import ReactPaginate from 'react-paginate';

import Employee from './Employee/Employee.js'

function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <Employee emp={item} key={item.SSN}/>
          ))}
      </>
    );
}

function PaginatedItems({ itemsPerPage, items }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
  
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };
  
    return (
      <>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Company</th>
                    <th scope="col">Birth</th>
                    <th scope="col">SSN</th>
                    <th scope="col">Photo</th>
                </tr>
            </thead>
            <tbody>
            <Items currentItems={currentItems} />
            </tbody>
        </table>
        <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
        />
      </>
    );
  }

const Employees = () => {
    const initialState = {name: '', role: ''};
    const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getEmps());
	}, [dispatch]);
    
    const {emps} = useSelector((state) => state.emps);
    const [searchQuery, setSearchQuery] = useState(initialState)

    useEffect(() => {
        dispatch(getEmpsBySearch(searchQuery));   
    }, [])

    const handleChange = (e) => {
        setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value});
        
    }
    const clear = () => {
        setSearchQuery(initialState);
    }
    
    return (
    <>
        <h1>Employees List</h1>
        <div class="input-group mb-3" style={{width:"50vw"}}>
        <input type="text" class="form-control" name="name" value={searchQuery.search} onChange={handleChange}/>
            <div class="input-group-append">
                <span class="input-group-text"><i class="bi bi-x" role="button" onClick={clear}/></span>
            </div>
        </div>
        {!emps.length ? <div>No Trainee</div> :
            <PaginatedItems itemsPerPage={8} items={emps} />
        }     
    </>)
};

export default Employees;