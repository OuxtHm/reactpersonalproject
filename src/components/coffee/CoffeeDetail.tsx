import {useState, Fragment,} from "react";
import {useQuery, } from "@tanstack/react-query";
import apiClient from "../../http-commons";
import {CoffeeDetailItem, CoffeeDetailData} from "../../commons/commonsDatas";
import {useNavigate, useParams} from "react-router";

function CoffeeDetail() {
    const {id} = useParams();
    const nav = useNavigate();
    const {isLoading, isError, error, data} = useQuery<{data:CoffeeDetailData}, Error>({
        queryKey: ['coffee-detail', id],
        queryFn: async () => {
            return await apiClient.get(`/menu/detail_react/${id}`)
        },
    })
    if (isLoading)
        return <h1 className={"text-center"}>Loading...</h1>
    if (isError)
        return <h1 className={"text-center"}>Error발생:{error?.message}</h1>

    const coffeeDto = data!.data.coffeeDto

    return (
        <Fragment>
            <div className="container">
                <h3 className="text-center">상세정보</h3>
                <div className="row aln-center">
                    <table className="table table-striped" style={{width: "900px"}}>
                        <tbody>
                        <tr>
                            <td className="text-center" rowSpan={8} width={"30%"}>
                                <img src={`https://composecoffee.com/${coffeeDto.image}`}
                                     style={{width: "300px", height: "400px", marginTop: "30px"}}/>
                            </td>
                            <td colSpan={2}>
                                <h3 className="text-center">{coffeeDto.menuname}</h3>
                            </td>
                        </tr>
                        <tr>
                            <td width={"30%"} className="text-center">열량(kcal)</td>
                            <td width={"50%"} className="text-left">{coffeeDto.calories}kcal</td>
                        </tr>
                        <tr>
                            <td width={"20%"} className="text-center">나트륨(mg)</td>
                            <td width={"50%"} className="text-left">{coffeeDto.sodium}mg</td>
                        </tr>
                        <tr>
                            <td width={"20%"} className="text-center">탄수화물(g)</td>
                            <td width="50%" className="text-left">{coffeeDto.carbohydrate}g</td>
                        </tr>
                        <tr>
                            <td width={"20%"} className="text-center">당류(g)</td>
                            <td width={"50%"} className="text-left">{coffeeDto.sugar}</td>
                        </tr>
                        <tr>
                            <td width={"20%"} className="text-center">지방(g)</td>
                            <td width={"50%"} className="text-left">{coffeeDto.fat}g</td>
                        </tr>
                        <tr>
                            <td width={"20%"} className="text-center">포화지방(g)</td>
                            <td width={"50%"} className="text-left">{coffeeDto.saturatedfat}g</td>
                        </tr>
                        <tr>
                            <td width={"20%"} className="text-center">단백질(g)</td>
                            <td width={"50%"} className="text-left">{coffeeDto.protein}g</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="text-right">
                    <button onClick={() => nav(-1)} className="btn-sm btn-default" style={{width: "70px"}}>목록</button>
                </div>
            </div>
        </Fragment>
    )
}

export default CoffeeDetail;