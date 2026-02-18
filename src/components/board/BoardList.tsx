import {useState, useEffect, Fragment} from "react";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";
import boardClient from "../../board-commons";

interface BoardItem {
    no: number;
    subject: string;
    name: string;
    dbday: string;
    hit: string;
}

interface BoardListResponse {
    list: BoardItem[];
    curpage: number;
    totalpage: number;
}

function BoardList() {
    const [curpage, setCurpage] = useState<number>(1);
    const {isLoading, isError, error, data, refetch:hitIncrement} = useQuery<{data:BoardListResponse}>({
        queryKey: ['board-list', curpage],
        queryFn: async() => await boardClient.get(`/board/list_node/${curpage}`)
    })

    useEffect(() => {

    }, [curpage]);

    if(isLoading){
        return <h1 className="text-center">Loading...</h1>;
    }
    if(isError){
        return <h1 className="text-center">Error 발생 : {error.message}</h1>;
    }

    return (
        <div id="main-wrapper">
            <div className="container">
                <h3 className="text-center">게시판</h3>
                <div className="row">
                    <table className="table">
                        <tbody>
                        <tr>
                            <td>
                                <Link to="/board/insert" className=" text-right btn btn-primary btn-sm">새글</Link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table className="table">
                        <thead>
                        <tr className="success">
                            <th className="text-center" style={{ width: '10%' }}>번호</th>
                            <th className="text-center" style={{ width: '45%' }}>제목</th>
                            <th className="text-center" style={{ width: '15%' }}>이름</th>
                            <th className="text-center" style={{ width: '20%' }}>작성일</th>
                            <th className="text-center" style={{ width: '10%' }}>조회수</th>
                        </tr>
                        </thead>
                        <tbody key={curpage}>
                        {
                            data?.data.list.map((board: BoardItem) =>
                                <tr>
                                    <td className="text-center" style={{ width: '10%' }}>{board.no}</td>
                                    <td className="aln-left" style={{ width: '45%' }}>
                                        <Link to={`/board/detail/${board.no}`}>{board.subject}</Link>
                                    </td>
                                    <td className="text-center" style={{ width: '15%' }}>{board.name}</td>
                                    <td className="text-center" style={{ width: '20%' }}>{board.dbday}</td>
                                    <td className="text-center" style={{ width: '10%' }}>{board.hit}</td>
                                </tr>
                            )
                        }
                        <tr>
                            <td colSpan={5} className="text-center">
                                <button className="btn btn-sm btn-default">이전</button>
                                {data?.data.curpage} page /  {data?.data.totalpage}pages
                                <button className="btn btn-sm btn-default">다음</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BoardList;