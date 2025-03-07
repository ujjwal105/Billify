import Layout from "./components/layout/layout";
import { Theme, ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme={Theme.SYSTEM} storageKey="ui-theme">
      <Layout>
        <div className=" flex items-center justify-center h-screen">
          <p>hello</p>
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
