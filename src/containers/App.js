import React from "react";
import { View } from "react-vr";
import { NativeRouter, Route, Switch } from "react-router-native";
import WaitingRoomView from "./WaitingRoomView";
import ExhibitRoomView from "./ExhibitRoomView";
const App = () => (
  <NativeRouter className="App">
    <View>
    <Switch>
      <Route
        exact path="/"
        component={WaitingRoomView}
      />
      <Route
        path="/exhibit"
        component={ExhibitRoomView}
      />
      </Switch>
    </View>
  </NativeRouter>
);


export default App;