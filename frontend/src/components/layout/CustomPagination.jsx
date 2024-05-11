import React, { useEffect, useState } from 'react'
import { useSearchParams,useNavigate } from 'react-router-dom'
import Pagination from "react-js-pagination";
const CustomPagination = ({resPerPage, filteredProductsCount}) => {

    const [currentPage, setCurrentPage] = useState();
    
    //useSearchParams hook is used to get values from query and set 
    //the values to the query
    let [searchParams] = useSearchParams();

    //useNavigate hook is used to navigate to the specific url
    const navigate = useNavigate();
    
    const page = Number(searchParams.get('page')) || 1;

    //setting the currenet page as the page value
    useEffect(() =>{
        setCurrentPage(page);
    },[page]);

    //Handling onclick event
    const setCurrentPageNo = (pageNumber) => {
        
        setCurrentPage(pageNumber);

        if(searchParams.has("page")){
            searchParams.set("page",pageNumber);
        }else{
            searchParams.append("page",pageNumber);
        }
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
    }
  return (
    <div className="d-flex justify-content-center my-5">
        {filteredProductsCount > resPerPage && (
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={filteredProductsCount} 
                onChange={setCurrentPageNo}
                prevPageText={"Prev"}
                nextPageText = {"Next"}
                firstPageText ={"First"}
                LastPageText = {"Last"}
                itemsClass = "page-item"
                linkClass="page-link"
          /> 
        )}
    </div>
  )
}

export default CustomPagination