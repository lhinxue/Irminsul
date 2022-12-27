import Editor from "../components/Editor";
import PageBase from "./__base";
import Sidebar from "../components/Sidebar";
import Toolbox from "../components/Toolbox";

export default function Home() {

    return (
        <PageBase>
            <Sidebar />
            <Editor />
            <Toolbox />
        </PageBase>
    )
}