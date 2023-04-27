import { Box, Paper, styled } from "@mui/material";
import { useFlags } from "launchdarkly-react-client-sdk";
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from "react";

const Item = styled(Paper)(({ theme, active, activeButton }) => ({
  backgroundColor: !active ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  cursor: 'pointer',
  ...(activeButton ? {backgroundColor: 'green', color: 'white'} : {})
}));


const Content = ({envType, toggleClientId, changeContext}) => {
  const [active, setActive] = useState(0);
  const {welcomeMessage, kloiaPocLiga, galeryTextList, boxTitle} = useFlags();

  const handleChangeContext = (contextName, contextNumber) => {
    changeContext(contextName);
    setActive(contextNumber)
  }

  return (
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid
          xs={12}
          container
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ xs: 'column', sm: 'row' }}
          sx={{ fontSize: '12px' }}
        >
          <Grid sx={{ order: { xs: 2, sm: 1 } }} onClick={toggleClientId}>
            <Item active={true}>{envType}</Item>
          </Grid>
          <Grid container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>
            <Grid onClick={() => handleChangeContext('default', 0)}>
              <Item active activeButton={active === 0}>ANONYMOUS</Item>
            </Grid>
            <Grid onClick={() => handleChangeContext('included-beta', 1)}>
              <Item active activeButton={active === 1}>BETA USER</Item>
            </Grid>
            <Grid onClick={() => handleChangeContext('excluded-beta', 2)}>
              <Item active activeButton={active === 2}>EXCLUDED BETA USER</Item>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} md={5} lg={4}>
          <Item active={welcomeMessage.message}>{welcomeMessage && JSON.stringify(welcomeMessage)}</Item>
          <br/>
          <Item active={welcomeMessage.message}>{welcomeMessage && welcomeMessage.message}</Item>
        </Grid>
        <Grid container xs={12} md={7} lg={8} spacing={4}>
          <Grid xs={6} lg={3}>
            <Item active={kloiaPocLiga}>
              <Box
                id="kloiapocliga"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                KloiaPocLiga - {kloiaPocLiga ? 'true' : 'false'}
              </Box>
              <Box component="ul" aria-labelledby="kloiapocliga" sx={{ pl: 2 }}>
                <li>POC 1</li>
                <li>POC 2</li>
                <li>POC 3</li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3}>
            <Item active={galeryTextList}>
              <Box
                id="gallery-text-list"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Gallery Text List - {galeryTextList ? 'true' : 'false'}
              </Box>
              <Box component="ul" aria-labelledby="gallery-text-list" sx={{ pl: 2 }}>
                <li>Image 1</li>
                <li>Image 2</li>
                <li>Image 3</li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3}>
            <Item>
              <Box
                id="black-box"
                sx={{ fontSize: '12px', textTransform: 'uppercase' }}
              >
                Black Box
              </Box>
              <Box component="ul" aria-labelledby="black-box" sx={{ pl: 2 }}>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </Box>
            </Item>
          </Grid>
          <Grid xs={6} lg={3}>
            <Item active>
              <Box
                id="box-title"
                sx={{ fontSize: '12px', textTransform: 'uppercase', color: boxTitle.toLowerCase() === 'variation string on' ? 'green' : '' }}
              >
                {boxTitle}
              </Box>
              <Box component="ul" aria-labelledby="box-title" sx={{ pl: 2 }}>
                <li>String 1</li>
                <li>String 2</li>
                <li>String 3</li>
              </Box>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Content;