import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

const ListaDeEmpresas = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleSummaryClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div style={{ paddingLeft: '270px' }}>
      <Accordion expanded={expanded} onChange={handleExpand}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon onClick={handleSummaryClick} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            flexDirection: 'row-reverse',
            '& .MuiAccordionSummary-expandIconWrapper': {
              order: 0,
            },
          }}
        >
          <Typography ml="10px">Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default ListaDeEmpresas;

