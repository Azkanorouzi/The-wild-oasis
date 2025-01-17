import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"

export function useBookings() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams();
  // filter
  const filtervalue = searchParams.get('status');
  const filter = !filtervalue || filtervalue === 'all' ? null : {field: 'status', value: filtervalue}
  console.log(filter)

  // Sort by
  const sortByRaw = searchParams.get('sortBy') || 'startDate-desc';
  const [field, direction] = sortByRaw.split('-')
  const sortBy = {field, direction}

  // pagination
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
  
  // Query
    const {isLoading, data, error} = useQuery({
        queryKey: ['bookings', filter, sortBy, page],
        queryFn: ()=>getBookings({filter, sortBy, page})
      })
      //Prefetching
      const pageCount=  Math.ceil(data?.count / 10)
      if(page < pageCount) {
        queryClient.prefetchQuery({
          queryKey: ['bookings', filter, sortBy, page + 1],
          queryFn: ()=>getBookings({filter, sortBy, page: page + 1})
        });
      }
      if(page > pageCount) {
        queryClient.prefetchQuery({
          queryKey: ['bookings', filter, sortBy, page - 1],
          queryFn: ()=>getBookings({filter, sortBy, page: page - 1})
        });
      }

      return {isLoading, error, data: data?.data, count: data?.count}
}