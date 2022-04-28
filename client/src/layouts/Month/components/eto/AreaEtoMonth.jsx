import React from 'react'
import Card from "@mui/material/Card";
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';

function AreaEtoMonth() {
  return (
    <div>
        <Card id="delete-account">
      <VuiBox>
          <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
              Currunt Month Area ETO
          </VuiTypography>
      </VuiBox>
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
        </VuiBox>
      </VuiBox>
    </Card>
    </div>
  )
}

export default AreaEtoMonth