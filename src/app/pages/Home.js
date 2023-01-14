import Downloader from '../components/Control/Downloader';
import Editor from '../components/Editor/Editor';
import Sidebar from '../components/Sidebar/Sidebar';
import PageBase from './__base';

export default function Home() {

    return (
        <PageBase>
            <Sidebar />
            <Editor />
            <Downloader />
        </PageBase>
    )
}