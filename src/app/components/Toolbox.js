import AbsButton from './AbsButton';
import Remix from './Remix';

export default function Toolbox() {

    return (
        <>
            <AbsButton
                bottom={16}
                right={21}
                size={40}
                icon={<Remix.save color='primary' />}
                tooltip='Save IRMINSUL to Local'
            />
            <AbsButton
                bottom={66}
                right={21}
                size={40}
                icon={<Remix.pdf color='primary' />}
                tooltip='Export Current Leaf as PDF'
            />
        </>
    )
}