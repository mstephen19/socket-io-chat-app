import { Chat } from './components/Chat';
import { Start } from './components/Start';
import { socket } from './service';
import { Route, Routes } from 'react-router-dom';
import FlexContainer from './common/FlexContainer';

function App() {
    return (
        <FlexContainer>
            <Routes>
                <Route path='/' element={<Start socket={socket} />} />
                <Route path='/chat' element={<Chat socket={socket} />} />
            </Routes>
        </FlexContainer>
    );
}

export default App;
