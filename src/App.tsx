import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider, liveProvider } from "./providers";
import { Home, ForgotPassword, Login, Register, CompanyList } from "./pages"

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import { resources } from "./config/resources";
import Create from "./pages/company/create";
import EditPage from "./pages/company/edit";
import List from "./pages/tasks/list";
import CreateTask from "./pages/tasks/create";
import EditTask from "./pages/tasks/edit";

function App() {
  return (
    <BrowserRouter>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "DwRH3T-KMquWm-Mf7iiF",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route path="/register" element={<Register />}/>
                  <Route path="/login" element={<Login />}/>
                  <Route path="/forgot-password" element={<ForgotPassword />}/>
                  <Route
                    element={
                    <Authenticated 
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                    }
                  >
                      <Route index element={<Home />}/>
                      <Route path="/companies">
                        <Route index element={<CompanyList />} />
                        <Route path="new" element={<Create />} />
                        <Route path="edit/:id" element={<EditPage />} />
                      </Route>
                      <Route path="/tasks" element={
                        <List>
                          <Outlet />
                        </List>
                      }>
                      <Route path="new" element={<CreateTask />} />
                      <Route path="edit:/id" element={<EditTask />} />
                      </Route>
                  </Route>
                </Routes>
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
    </BrowserRouter>
  )
}

export default App