export const combineComponents = (...components) => {
	return components.reduce(
		(AccumulatedComponents, CurrentComponent) => {
			// eslint-disable-next-line react/display-name
			return ({ children }) => {
				return (
					<AccumulatedComponents>
						<CurrentComponent>{children}</CurrentComponent>
					</AccumulatedComponents>
				)
			}
		},
		({ children }) => <>{children}</>
	)
}
