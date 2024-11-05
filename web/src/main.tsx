import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './main.scss';
import { inputsCustomizations } from './customizations/inputs';
// import { dataDisplayCustomizations } from './customizations/dataDisplay';
// import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigation';
import { surfacesCustomizations } from './customizations/surfaces';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { colorSchemes, typography, shadows, shape } from './themePrimitives';

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
        cssVarPrefix: 'template',
    },
    colorSchemes,
    typography,
    shadows,
    shape,
    components: {
        ...inputsCustomizations,
        // ...dataDisplayCustomizations,
        // ...feedbackCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
    },
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline enableColorScheme />
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>,
);
