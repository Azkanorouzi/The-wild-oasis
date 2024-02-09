import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable.tsx";
import AddCabin from '../features/cabins/AddCabin.tsx'
import CabinTableOperations from "../features/cabins/CabinTableOperations.tsx";

function cabins() {
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">all cabins</Heading>
      <CabinTableOperations />
    </Row>
    <Row>
      <CabinTable />
      <AddCabin />
      </Row>
    </>
  );
}

export default cabins;
