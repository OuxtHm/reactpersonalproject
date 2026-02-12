import {Fragment} from "react";

function Footer() {
    return (
        <Fragment>
            <div style={{marginBottom: "50px"}}></div>
            <div className="row " style={{width:'1500px', margin: '0px auto'}}>
                <div className="inner">
                    <ul className="copyright">
                        <li>&copy; Untitled. All rights reserved</li>
                        <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}
export default Footer;