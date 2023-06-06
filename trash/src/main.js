import './App.css';
import Top from './top'
import PageList from './pageList'

function Main() {
    return (
        <>
            <header className="main">
                <Top leftText="분리 배출의 A to Z" />
                <h1 className='projectName'>분리 배출의 정석</h1>
            </header>
            <nav>
                <PageList />
            </nav>
        </>
    );
}

export default Main;