import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import './Form/index.css';

import { useDispatch, useSelector } from 'react-redux';
import { getTrainees, getTrnsBySearch, getTrnById } from "../../actions/trnsAction";
import ReactPaginate from 'react-paginate';

import Trainee from './Trainee/Trainee.js'
import TraineeForm from './Form/TraineeForm';

function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item) => (
            <Trainee trn={item} key={item.SSN}/>
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
        setItemOffset(newOffset);
    };
  
    return (
      <>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">SSN</th>
                    <th scope="col">Name</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Address</th>
                    <th scope="col"></th>
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

const Trainees = () => {
    const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTrainees());
	}, [dispatch]);
    
    const {trns} = useSelector((state) => state.trns);

    const [searchQuery, setSearchQuery] = useState({value:''})

    const [open, setOpen] = useState(false);  
    const closeForm = () => setOpen(false);

    useEffect(() => {
        dispatch(getTrnsBySearch(searchQuery.value));   
    }, [searchQuery])

    const handleChange = (e) => {
        setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value});
        
    }
    const clear = () => {
        setSearchQuery({value:''});
    }
    
    return (
    <>
        <p class="h1 text-center my-2">Trainees List</p>
        <hr/>
        <div class="input-group mb-3">
            <input type="text" class="form-control" name="value" value={searchQuery.value} onChange={handleChange}/>
                <div class="input-group-append">
                    <span class="input-group-text"><i class="bi bi-x" role="button" onClick={clear}/></span>
                </div>
                <span>
                <button type="button" class="ms-3 btn btn-primary" onClick={() => setOpen(o => !o)}>+ Add Trainee</button>
                <Popup open={open} modal onClose={closeForm}>
                    <TraineeForm closeForm={closeForm}/>
                </Popup>
                </span>
        </div> 
        {!trns.length ? <div>No Trainee</div> :
            <PaginatedItems itemsPerPage={8} items={trns} />
        }     
    </>)
};

export default Trainees;