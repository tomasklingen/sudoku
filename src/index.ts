import { makeDOMDriver } from "@cycle/dom";
import { normalize, setupPage } from "csstips";
import { App } from "./app";
import { run } from "@cycle/run";

normalize();
setupPage("#app");

const drivers = {
  DOM: makeDOMDriver("#app")
};

run(App, drivers);
