import Content from './components/Content';
import { useState } from 'react';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import { Container } from '@mui/material';
import { CLIENT_SIDE_IDS } from './constants';

function App() {
  const [envType] = useState(localStorage.getItem('id') === CLIENT_SIDE_IDS.PROD ? 'PROD' : 'TEST');
  const ldClient = useLDClient();
  
  const toggleClientId = () => {
    const id = localStorage.getItem('id');
    localStorage.setItem('id', id === CLIENT_SIDE_IDS.PROD ? CLIENT_SIDE_IDS.TEST : CLIENT_SIDE_IDS.PROD)
    window.location.reload();
  }

  const changeContext = (context) => {
    if(context === 'included-beta'){
      ldClient.identify({
        key: 'yunus'
      })
    }
    if(context === 'excluded-beta'){
      ldClient.identify({
        key: 'izzet'
      })
    }
    if(context === 'default'){
      ldClient.identify({
        kind: 'user',
        anonymous: true
      })
    }
  }
  
  return (
    <div>
      <Container style={{marginTop: '50px'}}>
        <Content envType={envType} toggleClientId={toggleClientId} changeContext={changeContext} />
      </Container>
    </div>
  );
}

export default App;
