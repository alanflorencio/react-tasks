import React from 'react';
import Routes from "./routes";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	const theme = createMuiTheme(
		{
			scrollbarStyles: {
				"&::-webkit-scrollbar": {
					width: "8px",
					height: "8px",
				},
				"&::-webkit-scrollbar-thumb": {
          borderRadius: "10px",
					backgroundColor: "#b2b2b2",
				},
			},
			palette: {
				primary: { main: "#2576d2" },
			},
		}
	);
  
	return (
		<ThemeProvider theme={theme}>
			<Routes />
		</ThemeProvider>
	);
};

export default App;
