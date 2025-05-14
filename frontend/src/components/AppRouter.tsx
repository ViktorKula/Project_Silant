import { Navigate, Route, Routes } from "react-router-dom";
import { auxEntryRoutes, privateRoutes, publicRoutes } from "../router";
import Loader from "./UI/Loader/Loader";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { RouteData } from "../types/common";
import { ModelType, isAllowedChange } from "../utils/permissions";

const AppRouter = () => {
    const account = useTypedSelector(state => state.account);
    const accountInfo = useTypedSelector(state => state.accountInfo);

    if (account.loading || accountInfo.loading) {
        return <Loader />;
    }

    console.log("before usedPrivateRoutes calc");
    console.log("account=", account);
    console.log("accountInfo=", accountInfo);

    let usedPrivateRoutes: RouteData[] = [...privateRoutes];
    if (isAllowedChange(ModelType.MODEL_TYPE_AUX_ENTRY, accountInfo.accountType)) {
        usedPrivateRoutes = [...usedPrivateRoutes, ...auxEntryRoutes];
    }

    console.log("usedPrivateRoutes=", usedPrivateRoutes);

    return (
        // token 
        account.isLogined
            ?
            <Routes>
                {/* {privateRoutes.map(({path, component: Component}) =>  */}
                {usedPrivateRoutes.map(({path, component: Component, props}) => 
                    <Route 
                        key={path} 
                        path={path} 
                        element={<Component {...props} />} 
                    />
                )}
                <Route 
                    path="*" 
                    element={<Navigate to="/cars" 
                    replace />} 
                />
            </Routes>
            :
            <Routes>
                {publicRoutes.map(({path, component: Component}) => 
                    <Route 
                        key={path} 
                        path={path} 
                        element={<Component />} 
                    />
                )}
                <Route 
                    path="*" 
                    element={<Navigate to="/simple_cars" replace />} 
                />
            </Routes>
    );
}

export default AppRouter;