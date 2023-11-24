import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";

export default function MyApp() {
  return (
    <div>
      <LatestIssues />
      <Pagination itemCount={100} pageSize={10} currentPage={5} />
    </div>
  );
}
