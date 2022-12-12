import { useState } from "react";
import Collapse from "../components/Collapse";
import Explorer from "../components/Explorer";
import Header from "../components/Header";
import List from "../components/List";
import SubTitle from "../components/SubTitle";
import Title from "../components/Title";

export default function Test() {

    const [v1, setv1] = useState(false)
    const [v2, setv2] = useState(0)

    const dic = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
    ]

    return (
        <>
            <Title />
            <SubTitle />
            <div style={{ zIndex: 99 }} onClick={() => setv1(p => !p)}>touch</div>
            <Collapse
                toTop
                z={9}
                on={v1}
                backgroundColor={'silver'}
                top={50}
            />
            <List
                current={v2}
                onKeyChange={(e, k) => setv2(k)}
                source={dic}
            />
            <Explorer />
        </>

    )
}