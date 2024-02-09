import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "../bookings/useCheckIn";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const {booking, isLoading} = useBooking();
  
  useEffect(() => {
    setConfirmPaid(booking?.data?.isPaid ?? false)
  }, [booking?.data?.isPaid])
  
  const moveBack = useMoveBack();
  const {checkin, isCheckingIn} = useCheckin();
  if (isLoading) return <Spinner />

  // const {
  //   id: bookingId,
  //   guests,
  //   totalPrice,
  //   numGuests,
  //   hasBreakfast,
  //   numNights,
  // } = booking;

  function handleCheckin() {
    if (!confirmPaid) return;
    checkin(booking?.data?.id)
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking?.data?.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking?.data} />

      <Box>
        <Checkbox checked={confirmPaid} disabled={confirmPaid || isCheckingIn} onChange={() => setConfirmPaid(confirm => !confirm)} id='confirm' >
        I confirm that {booking?.data?.guests?.fullName} has paid the total amount of {formatCurrency(booking?.data?.totalPrice)}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>Check in booking #{booking?.data?.id}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
