import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function useFetchData(endPoint,queryKey){
  async function getAllData(){
      return await axios.get(`https://ecommerce.routemisr.com/api/v1/${endPoint}`)
    }
  let {data,isLoading,isError}=useQuery({
      queryKey:[queryKey],
      queryFn:getAllData,
      // refetchInterval:30000,
      staleTime:1000*60*5,  // 5 min
      retry:2,
      retryDelay:2000,
      gcTime:50000,
      select:(data)=>{
        return data.data.data
      }
    })

  return {data,isLoading,isError}
}