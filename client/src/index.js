import React, {lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {render} from "react-dom";
import "./index.css";
import Spinner from "./components/Spinner/spinner";
import * as serviceWorker from "./serviceWorker";
import ScrollToTop from "./utils/scrollToTop";
import {createBrowserHistory} from "history";

const AddComments = lazy(() => import("./pages/thread"));
const history = createBrowserHistory();

function App() {
    return (
        <Suspense fallback={<Spinner/>}>
            <Switch history={history}>
                <Route exact path={`${process.env.PUBLIC_URL}/`} component={AddComments}/>
            </Switch>
        </Suspense>
    );
}

render(
    <Router>
        <ScrollToTop/>
        <App/>
    </Router>,
    document.getElementById("root")
);

serviceWorker.unregister();
