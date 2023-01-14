import { useContext } from 'react';
import { LeyLine } from '../../../core/irminsul';
import os from '../../../core/os';
import AbsControl from './AbsControl';
import Remix from '../Icon/Remix';

export default function Downloader() {

    // LeyLine
    const { api, irminsul } = useContext(LeyLine)

    return (
        <AbsControl
            bottom={16}
            right={26}
            size={50}
            icon={<Remix.save color='primary' />}
            tooltip='Save IRMINSUL to Local'
            onClick={() => {
                os.cipher(irminsul, api.key, (dt) => {
                    os.download(dt.data, 'test')
                })
            }}
        />
    )
}