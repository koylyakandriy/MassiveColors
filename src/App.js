import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Home from "./Pages/Home";
import Palette from "./Pages/Palette";
import seedColors from "./helpers/seedColors";
import { generatePalette } from "./helpers/colorHelpers";
import SingleColorPalette from "./Pages/SingleColorPalette";
import PaletteForm from "./Pages/PaletteForm";

import "./App.css";

const App = () => {
	const savePalettes = JSON.parse(localStorage.getItem("palettes"));

	const [palettes, setPalettes] = useState(savePalettes || seedColors);

	const syncLocalStorage = () => {
		localStorage.setItem("palettes", JSON.stringify(palettes));
	};

	useEffect(() => {
		syncLocalStorage();
	});

	const findPalette = id => {
		return palettes.find(palette => {
			return palette.id === id;
		});
	};

	const savePalette = newPalette => {
		setPalettes([...palettes, newPalette]);
	};

	const deletePalette = id => {
		const st = palettes.filter(palette => palette.id !== id);
		setPalettes(st);
	};

	return (
		<Route
			render={({ location }) => (
				<TransitionGroup>
					<CSSTransition key={location.key} timeout={500} classNames="fade">
						<Switch location={location}>
							<Route
								exact
								path="/"
								render={routeProps => (
									<div className="page">
										<Home
											pallets={palettes}
											{...routeProps}
											deletePalette={deletePalette}
										/>
									</div>
								)}
							/>
							<Route
								exact
								path="/palette/new"
								render={() => (
									<div className="page">
										<PaletteForm
											savePalette={savePalette}
											palettes={palettes}
										/>
									</div>
								)}
							/>
							<Route
								exact
								path="/palette/:id"
								render={routeProps => (
									<div className="page">
										<Palette
											palette={generatePalette(
												findPalette(routeProps.match.params.id),
											)}
										/>
									</div>
								)}
							/>
							<Route
								exact
								path="/palette/:paletteId/:colorId"
								render={routeProps => (
									<div className="page">
										<SingleColorPalette
											colorId={routeProps.match.params.colorId}
											palette={generatePalette(
												findPalette(routeProps.match.params.paletteId),
											)}
										/>
									</div>
								)}
							/>
							<Route
								render={routeProps => (
									<div className="page">
										<Home
											pallets={palettes}
											{...routeProps}
											deletePalette={deletePalette}
										/>
									</div>
								)}
							/>
						</Switch>
					</CSSTransition>
				</TransitionGroup>
			)}
		/>
	);
};

export default App;
