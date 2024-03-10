import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({booking, confirmedStays, numDays, cabinCount}) {
    // 1. Number of bookings
    const numBookings = booking.length;

    // 2. Total sales
    const sales = booking.reduce((acc, cur) => acc + cur.totalPrice,0)

    // 3. Total checkins, so some user might check in and never show up, but with confirmedStays.length now in place, we would easily prevent the users that have not been showed up to be calculated
    const checkins = confirmedStays.length;

    // 4. Occupancy rate (num days * num cabins)
    const occupation = confirmedStays.reduce((acc, cur) => {
        return acc + cur.numNights
    }, 0) / (numDays * cabinCount)

  return (
    <>
        <Stat title={'Bookings'} color={'blue'} icon={<HiOutlineBriefcase />} value={numBookings}/>
        <Stat title={'Sales'} color={'green'} icon={<HiOutlineBanknotes />} value={formatCurrency(sales)}/>
        <Stat title={'Check ins'} color={'indigo'} icon={<HiOutlineCalendarDays />} value={checkins}/>
        <Stat title={'Occupancy rate'} color={'yellow'} icon={<HiOutlineChartBar />} value={Math.round(occupation * 100) + '%'}/>
    </>
  )
}


