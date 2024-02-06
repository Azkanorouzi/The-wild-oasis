import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable.tsx";
import AddCabin from '../features/cabins/AddCabin.tsx'

function cabins() {
  return (
    <>
    <Row type="horizontal">
      <Heading as="h1">all cabins</Heading>
      <p>filter / sort</p>
    </Row>
    <Row>
      <CabinTable />
      <AddCabin />
      </Row>
    </>
  );
}

export default cabins;
