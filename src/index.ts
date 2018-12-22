import { makeDOMDriver } from "@cycle/dom";
import { normalize, setupPage } from "csstips";
import { App } from "./app";
import { run } from "@cycle/run";
import { cssRule } from "typestyle";

const appElSelector = "#app";

normalize();
setupPage(appElSelector);

cssRule(appElSelector, {
  display: "flex",
  justifyContent: "center"
});

run(App, {
  dom: makeDOMDriver(appElSelector)
});
