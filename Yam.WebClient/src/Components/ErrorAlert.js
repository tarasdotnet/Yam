import * as React from "react";
import Box from "@mui/material/Box";
import {Alert, Collapse} from "@mui/material";

const ErrorAlert = ({children}) => {
    const [open, setOpen] = React.useState(true);
    return (
        <Box>
            <Collapse timeout={1000} in={open}>
                <Box width='100%' zIndex='999' sx={{m: 1}}>
                    <Alert severity="error" onClose={() => {
                        setOpen(false)
                    }}>{children}</Alert>
                </Box>
            </Collapse>
        </Box>
    );
};

export default ErrorAlert;