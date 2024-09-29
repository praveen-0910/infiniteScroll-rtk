import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import { useInfiniteQuery } from "@tanstack/react-query";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  // TODO: get data for InfiniteScroll via React Query
  const {hasNextPage,isFetching,data,fetchNextPage,isLoading,isError,error} = useInfiniteQuery({
    queryKey:['sw-people'],
    queryFn: ({pageParam = initialUrl}) => fetchUrl(pageParam),
    getNextPageParam : (lastPage) => {
        return lastPage.next || undefined;
    }
  })
  if(isLoading) return <h1 className="loading">Loading...</h1>
  if(isError) return <h1>Error : {error.message}</h1>
  return  <>
    {isFetching && <div >
        <h1 className="loading">Loading...</h1>
    </div>}
    <InfiniteScroll  hasMore = {hasNextPage} loadMore = {()=> {if(!isFetching) {fetchNextPage()}} }>
    {data.pages.map((pageData)=>(
        pageData.results.map(({name,age,hair_color,eye_color})=>(
            <Person key={name} name={name} age={age} hairColor={hair_color} eyeColor={eye_color} />
        ))
    ))}
  </InfiniteScroll>
  </>
}
