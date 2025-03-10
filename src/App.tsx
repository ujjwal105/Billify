import Layout from "./components/layout/Layout";
import { Theme, ThemeProvider } from "./components/theme-provider";
import Invoice from "./Pages/Invoice";

function App() {
  return (
    <ThemeProvider defaultTheme={Theme.SYSTEM} storageKey="ui-theme">
      <Layout>
        <Invoice />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
