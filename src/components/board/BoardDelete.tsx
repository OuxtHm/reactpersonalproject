import {useState,Fragment,useRef} from "react";
import {useNavigate,useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import boardClient from "../../board-commons";
import {AxiosError, AxiosResponse} from "axios";
interface BoardDeleteProps {
    msg:string
}
function BoardDelete(){
    const nav= useNavigate();
    const {no}= useParams<{no:string}>();
    const [pwd, setPwd] = useState<string>("");
    const pwdRef = useRef<HTMLInputElement>(null);
    const {mutate:boardDelete}=useMutation({
        mutationFn: async () => {
            return await boardClient.delete(`/board/delete_node/${no}/${pwd}`)
        },
        onSuccess: (res:AxiosResponse<BoardDeleteProps>) => {
            if(res.data.msg==='yes')
            {
                window.location.href="/board/list";
            }
            else
            {
                alert("비밀번호가 틀립니다")
                setPwd("");
                pwdRef.current?.focus();
            }
        },
        onError: (err:AxiosError) => {
            console.log(err.message);
        }
    })
    const boardDeleteOk=()=>{
        if(!pwd.trim())
        {
            pwdRef.current?.focus();
            return
        }
        boardDelete()
    }
    return (
        <Fragment>
            <h2 className="text-center">삭제</h2>
            <div className="container">
                <div className="row" style={{"width": "400px","margin": "0px auto"}}>
                    <table className="table">
                        <tbody>
                        <tr>
                            <td className={"text-center"}>
                                비밀번호:<input type={"password"} size={15}
                                            ref={pwdRef}
                                            value={pwd}
                                            onChange={(e)=>setPwd(e.target.value)}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td className={"text-center"}>
                                <button className="btn btn-primary" onClick={boardDeleteOk}>삭제</button>
                                &nbsp;
                                <button className="btn btn-primary" onClick={()=>nav(-1)}>취소</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}
export default BoardDelete;