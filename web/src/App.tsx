import { Box } from '@mui/material';
import Header from './components/Header';
import Seadex from './components/Seadex';

const App = function() {
    return (
        <Box sx={(theme) => ({
            flex: '1 1',
            overflow: 'auto',
            width: '100%',
            backgroundRepeat: 'no-repeat',
            ...theme.applyStyles('dark', {
                backgroundImage:
                    'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(1, 100%, 67%), transparent)',
            }),
        })}>
            <Header />
            <Seadex />
        </Box>
    );
}

export default App;
