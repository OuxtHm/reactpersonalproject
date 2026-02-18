import {useParams, Link, useNavigationType} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {Fragment} from "react";
import boardClient from "../../board-commons";

interface BoardDetailProps {
    no: number;
    name: string;
    subject: string;
    content: string;
    dbday: string;
    hit: number
}

function BoardDetail() {
    const {no} = useParams();
    const type = useNavigationType()
    console.log(type)
    const {isLoading, isError, error, data} = useQuery<{ data: BoardDetailProps }>({
        queryKey: ['board-detail', no],
        queryFn: async () => {
            return boardClient.get(`/board/detail_node?no=${no}`)
        }
        // /board/detail?no=1  => req.query.no => getParameter() => 매개변수
        // /board/detail/1     => req.params.no => @PathVariable
    })

    if (isLoading) {
        return <h1 className={"text-center"}>Loading...</h1>
    }
    if (isError) {
        return <h1 className={"text-center"}>Error:{error.message}</h1>
    }
    const board = data?.data
    if (!board) {
        return null
    }
    return (
        <Fragment>
            <h2 className="text-center" style={{marginTop: 50}}>상세보기</h2>
            <div className="container">
                <div className="row">
                    <table className="table">
                        <tbody>
                        <tr>
                            <td width={"20%"} className={"text-center"}>번호</td>
                            <td width={"30%"} className={"text-center"}>{board.no}</td>
                            <td width={"20%"} className={"text-center"}>작성일</td>
                            <td width={"30%"} className={"text-center"}>{board.dbday}</td>
                        </tr>
                        <tr>
                            <td width={"20%"} className={"text-center"}>이름</td>
                            <td width={"30%"} className={"text-center"}>{board.name}</td>
                            <td width={"20%"} className={"text-center"}>조회수</td>
                            <td width={"30%"} className={"text-center"}>{board.hit}</td>
                        </tr>
                        <tr>
                            <td width={"20%"} className={"text-center"}>제목</td>
                            <td colSpan={3}>{board.subject}</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className={"text-left"} valign={"top"}
                                height={200}
                            >
                                <pre style={{
                                    "whiteSpace": "pre-wrap",
                                    "backgroundColor": "white",
                                    "border": "none"
                                }}>{board.content}</pre>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} className={"text-right"}>
                                <Link to={"/board/update/" + board.no} className={"btn btn-success"}>수정</Link>&nbsp;
                                <Link to={"/board/delete/" + board.no} className={"btn btn-warning"}>삭제</Link>&nbsp;
                                <Link to={"/board/list"} className={"btn btn-outline-primary"}>목록</Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

export default BoardDetail