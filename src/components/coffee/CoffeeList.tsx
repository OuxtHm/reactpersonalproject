import {useState, Fragment} from "react";
import apiClient from "../../http-commons";
import {CoffeeListData, CoffeeMainItem} from "../../commons/commonsDatas";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";

function CoffeeList() {
    const [page, setPage] = useState<number>(1);
    const pageArr = []
    const {isLoading, isError, error, data} = useQuery<{ data: CoffeeListData }, Error>({
        queryKey: ['main-data', page],
        queryFn: async () => await apiClient.get(`/menu/list_react/${page}`)
    })

    if (isLoading)
        return <h1 className={"text-center"}>Loading...</h1>
    if (isError)
        return <h1 className={"text-center"}>Error발생:{error?.message}</h1>

    const {startPage, totalPage, endPage} = data?.data || {} as CoffeeListData;
    const changePage = (page: number) => setPage(page)

    if (startPage > 1) {
        pageArr.push(
            <li className="page-item" key={"prev"}>
                <a className={"page-link nav-link"} onClick={() => changePage(startPage - 1)}>&laquo;</a>
            </li>
        )
    }

    for (let i = startPage; i <= endPage; i++) {
        pageArr.push(
            <li className={i === page ? "active page-item":"page-item"} key={i}>
                <a className={"age-link nav-link"} onClick={() => changePage(i)}>{i}</a>
            </li>
        )
    }

    if (endPage < totalPage) {
        pageArr.push(
            <li className="page-item" key={"next"}>
                <a className={"page-link nav-link"} onClick={() => changePage(endPage + 1)}>&raquo;</a>
            </li>
        )
    }


    console.log(data?.data)

    return (
        <Fragment>
            <div className="container">
                <h3 className="text-center">메뉴 리스트</h3>
                <section className="tiles" style={{marginLeft: "40px"}}>
                    {
                        data?.data.list.map((coffee: CoffeeMainItem, index: number) =>
                            <article className="style2 text-center" style={{width: "300px"}} key={index}>
                                <span className="image">
                                    <img src={`https://composecoffee.com/${coffee.image}`} style={{height: "400px"}}/>
                                </span>
                                <Link to={`/menu/detail/${coffee.id}`}>
                                    <h2 className="text-center">{coffee.menuname}</h2>
                                    <div className="content">
                                        <p>{coffee.menuname}</p>
                                    </div>
                                </Link>
                            </article>
                        )
                    }
                </section>
                <div className="row" style={{marginTop: "50px", marginBottom: "50px"}}>
                    <ul className="pagination" style={{display: "table", margin: "0 auto"}}>
                        {pageArr}
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default CoffeeList;