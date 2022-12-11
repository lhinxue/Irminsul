import { Box } from "@mui/system";
import Collapse from "./Collapse";
import List from "./List";
import SubTitle from "./SubTitle";

export default function Explorer(props) {
    return (
        <Box>
            <SubTitle />
            <Collapse
                toTop
            >

            </Collapse>
            <Box>
                <List />
                <List />
            </Box>
        </Box>
    )
}