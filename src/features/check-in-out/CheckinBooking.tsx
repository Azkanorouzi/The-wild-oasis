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
import { useSettings } from "../settings/useSettings";

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
  const [addBreakFast, setAddBreakFast] = useState(false);
  const {settings, isLoading: isLoadingSettings} = useSettings(); 
  const {checkin, isCheckingIn} = useCheckin();
  
  useEffect(() => {
    setConfirmPaid(booking?.data?.isPaid ?? false)
  }, [booking?.data?.isPaid])
  
  const moveBack = useMoveBack();
  if (isLoading || isLoadingSettings) return <Spinner />

  const optionalBreakFastPrice = settings.breakfastPrice * booking?.data?.numNights * booking?.data?.numGuests

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
    if (addBreakFast) {
      checkin({bookingId: booking?.data?.id, breakfast: {
        hasBreakfast: true,
        extrasPrice: optionalBreakFastPrice,
        totalPrice: booking?.data?.totalPrice + optionalBreakFastPrice,
      }})
    } else {
      checkin({bookingId: booking?.data?.id, breakfast: {}})
    }
  }
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{booking?.data?.id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking?.data} />

      { !booking?.data?.hasBreakfast && <Box>
        <Checkbox checked={addBreakFast} onChange={() => {
          // Toggling check value
          setAddBreakFast((add) => !add);
          // even if user has already paid they need to pay something more because they also want break fast
          setConfirmPaid(false);
        }}
        id='breakfast'
        >
          Want to add break fast for { formatCurrency(optionalBreakFastPrice)}?
        </Checkbox>
      </Box>}

      <Box>
        <Checkbox checked={confirmPaid} disabled={confirmPaid || isCheckingIn} onChange={() => setConfirmPaid(confirm => !confirm)} id='confirm' >
        I confirm that {booking?.data?.guests?.fullName} has paid the total amount of {!addBreakFast ? formatCurrency(booking?.data?.totalPrice) : `${formatCurrency(booking?.data?.totalPrice) + formatCurrency(optionalBreakFastPrice)}`}
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
