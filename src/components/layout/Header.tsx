import {Link} from "react-router-dom";
import {Fragment} from "react";

function Header() {
    return (
        <Fragment>
            <header id="header">
                <div className="row " style={{width: '1500px', margin: '0px auto'}}>
                    <div className="inner">
                        <a href="/" className="logo">
                            <span className="symbol">
                                <img src="/images/logo.svg" alt=""/>
                            </span>
                            <span className="title">유재현</span>
                        </a>
                    </div>
                    <Link to={"/menu/list"}>
                        <div className="logo">메뉴</div>
                    </Link>
                    <Link to={"/board/list"}>
                        <div className="logo">게시판</div>
                    </Link>
                    <Link to={"/news/list"}>
                        <div className="logo">뉴스</div>
                    </Link>
                </div>
            </header>
        </Fragment>
    )
}

export default Header;