import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  const {isLoading,isError,error,isFetching,data,hasNextPage,fetchNextPage} = useInfiniteQuery({
    queryKey:['sw-species'],
    queryFn: ({pageParam = initialUrl})=> fetchUrl(pageParam),
    getNextPageParam : (lastPage)=> {
        return lastPage.next || undefined
    }
  })


  if(isLoading) return <h1 className="loading">Loading...</h1>
  if(isError) return <h1 className="loading">Error : {error.message}</h1>
  return <>
    { isFetching && <div className="loading">
        Loading...
    </div>}
    <InfiniteScroll hasMore={hasNextPage} loadMore={()=>{if(!isFetching){fetchNextPage()}}} >
    {data.pages.map((pageData)=>(
        pageData.results.map(({name,language,average_lifespan})=>(
            <Species key={name} name={name} language={language} averageLifespan={average_lifespan}/>
        ))
    ))}
  </InfiniteScroll>;
  </>
}
