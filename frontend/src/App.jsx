import { RouterProvider } from "react-router-dom";
import ProviderLayout from "./ProviderLayout";
import { Router } from "./router";
import "./App.css";
import "@mantine/core/styles.css";

function App() {
  const router = Router();
  return (
    <ProviderLayout>
      <RouterProvider router={router} />
    </ProviderLayout>
  );
}

export default App;

// get hint
//Edit page jsx how to updat back end side
//night mode 
//loader

//fix later
//postdetail page& Edit page--Use mantine css
//Write down chart



