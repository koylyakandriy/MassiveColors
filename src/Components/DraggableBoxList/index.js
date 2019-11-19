import React from "react";
import { SortableContainer } from "react-sortable-hoc";

import DraggableBox from "../DraggableBox";

const DraggableBoxList = SortableContainer(({ colors, removeColor }) => (
	<div style={{ height: "100%" }}>
		{colors &&
			colors.map(({ color, name }, i) => (
				<DraggableBox
					index={i}
					key={name}
					color={color}
					name={name}
					handleClick={() => removeColor(name)}
				/>
			))}
	</div>
));

export default DraggableBoxList;
