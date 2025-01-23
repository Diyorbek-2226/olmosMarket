import { Route, Routes } from "react-router-dom";
import routes from "./route/Route";
import Layout from "./layout/Layout";


function App() {
  return (
    <Routes>
      {/* Layout komponenti asosiy struktura sifatida ishlaydi */}
      <Route path="/" element={<Layout />}>
        {/* routes ichidagi barcha yo‘llar dinamik ravishda map qilinadi */}
        {routes.map(({ id, path, component: Component }) => (
          <Route key={id} path={path} element={Component} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
