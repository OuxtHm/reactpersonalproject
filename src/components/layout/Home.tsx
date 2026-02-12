import {Link} from "react-router-dom";
import {Fragment} from "react";
import {useQuery} from "@tanstack/react-query";
import {CoffeeMainItem, MainData} from "../../commons/commonsDatas";
import apiClient from "../../http-commons";

function Home() {
    const {isLoading, isError, error, data} = useQuery<{data:MainData}, Error>({
        queryKey: ['main-data'],
        queryFn: async() => await apiClient.get("/")
    })
    if(isLoading)
        return <h1 className={"text-center"}>Loading...</h1>
    if(isError)
        return <h1 className={"text-center"}>Error발생:{error?.message}</h1>

    console.log(data?.data)
    return (
        <Fragment>
            <div className="row " style={{width:'1500px', margin: '0px auto'}}>
                <div className="inner">
                    <header>
                        <h1>Coffee</h1>
                    </header>
                    <section className="tiles">
                        {
                            data?.data.list.map((coffee: CoffeeMainItem, index:number) =>
                            <article className="style2">
                                <span className="image">
                                    <Link to={`/menu/detail/${coffee.id}`}>
                                        <img src={`https://composecoffee.com/${coffee.image}`}/>
                                    </Link>
                                </span>
                                <Link to="/generic">
                                    <h2 className="text-center">{coffee.menuname}</h2>
                                    <div className="content">
                                        <p>{coffee.category}</p>
                                    </div>
                                </Link>
                            </article>
                            )
                        }
                    </section>
                </div>
            </div>
        </Fragment>
    );
}

export default Home;