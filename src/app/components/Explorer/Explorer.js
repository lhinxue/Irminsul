import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { LeyLine } from "../../../core/irminsul";
import os from "../../../core/os";
import Collapse from "../Template/Collapse";
import BranchExplorer from "./BranchExplorer";
import LeafExplorer from "./LeafExplorer";
import RootExplorer from "./RootExplorer";
import ContentHeader from "../Header/ContentHeader";
import Remix from "../Icon/Remix";

export default function Explorer() {

    const { api, service, irminsul } = useContext(LeyLine)

    const [browserOn, setBrowserOn] = useState(false)

    const browserStateChange = () => setBrowserOn(on => !on)

   

    const style = {
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 70px)',
        position: 'relative',
        '& .Explorer_RootBrowser': {
            borderBottom: '1px solid silver',
            boxShadow: '2px 2px 6px 0px rgba(70, 70, 70, 0.1)',
            '& .List Button:last-child': {
                borderBottom: 0
            }
        },
        '& .Explorer_Container': {
            display: 'flex',
            height: 'calc(100% - 50px)',
            position: 'relative',
            '& .Explorer:last-child': {
                borderLeft: '1px solid silver'
            }
        }
    }

    useEffect(() => {
        service.initApiRoot()
    }, [])


    return (
        <Box sx={style}>
            <ContentHeader
                z={15}
                id={api.root}
                title={os.try(() => service.getApiRootName(api.root), '')}
                icons={[{ icon: <Remix.exchange />, onClick: browserStateChange, on: browserOn, rotate: true, tooltip: 'Change Root Directory' }]}
            />
            <Collapse
                className='Explorer_RootBrowser'
                height={'fit-content'}
                on={browserOn}
                toTop
                top={47}
                width={'100%'}
                z={13}
            >
                <RootExplorer
                    postChange={browserStateChange}
                />
            </Collapse>
            <Box className='Explorer_Container'>
                <BranchExplorer />
                <LeafExplorer />
            </Box>
        </Box>
    )
}