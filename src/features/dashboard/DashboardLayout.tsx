import styled from "styled-components";
import { useRecentBookings } from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const {booking, isLoading} = useRecentBookings();
  const {stays, confirmedStays, isLoading: isLoading1, numDays} = useRecentStays();
  const {cabins, isLoading: isLoading3} = useCabins();

  if (isLoading || isLoading1 || isLoading3) return <Spinner/>

  console.log(booking, stays)

  return (
    <StyledDashboardLayout>
      <Stats booking={booking} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins?.length}/>
      <div>Today activity</div>
      <div>Chart stay durations</div>
      <SalesChart bookings={booking} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}
