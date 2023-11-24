import { Flex, Text, Button } from "@radix-ui/themes";
import Pagination from "./components/Pagination";

export default function MyApp() {
  return <Pagination itemCount={100} pageSize={10} currentPage={5} />;
}
