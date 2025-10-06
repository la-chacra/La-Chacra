import TopBar from "./TopBar";
import SearchBar from "./BarraBusq";
import OrderTable from "./TablaComanda";
import SummaryFooter from "./Total";
import OrderRow from "./FilaOrdenes";
import ActionButtons from "./Botones";

export default function ComandaPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <TopBar />
      <SearchBar />
      <OrderTable />
      <SummaryFooter />
      <OrderRow />
      <ActionButtons />
    </div>
  );
}
