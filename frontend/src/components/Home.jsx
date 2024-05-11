import React,{useEffect} from 'react'
import MetaData from './layout/MetaData'
import { useGetProductsQuery } from '../redux/api/productsApi';
import ProductItem from "./product/productItem";
import Loader from './layout/Loader';
import toast from 'react-hot-toast';
import Filter from './layout/Filter';
import CustomPagination from './layout/CustomPagination';
import { useSearchParams } from 'react-router-dom';
const Home = () => {
  let [searchParams] = useSearchParams();
  
  const page =searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") ||"";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");

  const params ={ page,keyword };
  
  min !== null && (params.min = min);
  max !== null && (params.max = max);
  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);


  const { data,isLoading, error, isError } = useGetProductsQuery(params);
  
  useEffect(() => {
    if(isError){
      toast.error(error?.data?.message);
    }
  }, [isError] );
  if(isLoading) return <Loader />

  const columnSize = keyword ? 4 : 3;

  return (
    <>
    <MetaData title={"Home"} />
    <div className="row">
      {keyword && (
        <div className="col-6 col-md-3 mt-5">
          <Filter />
        </div>
      )}
      <div className={keyword ? "col-6 col-md-9" :"col-6  col-md-12"}>
        <h1 id="products_heading" className="text-secondary">
          { keyword ? 
           `${data?.products?.length} Products found with the keyword : ${keyword}` 
           
           :"Latest Products"
          }
        </h1>
        <section id="products" className="mt-5">
          <div className="row">
            { data?.products?.map((product) => (
                <ProductItem product = {product} columnSize={columnSize}/>
            ))}
           
          </div>
        </section>
        <CustomPagination 
          resPerPage={data?.resPerPage} 
          filteredProductsCount={data?.filteredProductsCount}
        />
      </div>
    </div>
    </>
  )
}

export default Home