import styled from "styled-components";
import { useRecentBookings } from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  const {booking, isLoading} = useRecentBookings();
  const {stays, confirmedStays, isLoading: isLoading1} = useRecentStays();

  if (isLoading || isLoading1) return <Spinner/>

  console.log(booking, stays)

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today activity</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  )
}
