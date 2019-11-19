import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Pages/Home";
import Palette from "./Pages/Palette";
import seedColors from "./helpers/seedColors";
import { generatePalette } from "./helpers/colorHelpers";
import SingleColorPalette from "./Pages/SingleColorPalette";
import PaletteForm from "./Pages/PaletteForm";

const App = () => {
	const [palettes, setPalettes] = useState(seedColors);

	const findPalette = id => {
		return palettes.find(palette => {
			return palette.id === id;
		});
	};

	const savePalette = newPalette => {
		setPalettes([...palettes, newPalette]);
	};

	return (
		<Switch>
			<Route
				exact
				path="/"
				render={routeProps => <Home pallets={palettes} {...routeProps} />}
			/>
			<Route
				exact
				path="/palette/new"
				render={() => <PaletteForm savePalette={savePalette} palettes={palettes}/>}
			/>
			<Route
				exact
				path="/palette/:id"
				render={routeProps => (
					<Palette
						palette={generatePalette(findPalette(routeProps.match.params.id))}
					/>
				)}
			/>
			<Route
				exact
				path="/palette/:paletteId/:colorId"
				render={routeProps => (
					<SingleColorPalette
						colorId={routeProps.match.params.colorId}
						palette={generatePalette(
							findPalette(routeProps.match.params.paletteId),
						)}
					/>
				)}
			/>
		</Switch>
	);
};

export default App;
