import { QueryClientProvider, QueryClient } from "react-query";
import Layout from "./compoenents/Layout";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout />
    </QueryClientProvider>
  );
}

export default App;
