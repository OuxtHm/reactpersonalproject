import {useState,useEffect,Fragment,useRef} from "react";
import {useQuery,useMutation} from "@tanstack/react-query";
import {useNavigate,useParams} from "react-router-dom";
import boardClient from "../../board-commons";
import {AxiosError, AxiosResponse} from "axios";

interface BoardItem {
    no: number;
    name: string;
    subject: string;
    content: string;
}
// res.json({"msg":"yes"})
interface BoardResponse {
    msg: string;
}
function BoardUpdate(){
    const [name, setName] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    // v-model
    const nameRef=useRef<HTMLInputElement>(null);
    const subjectRef=useRef<HTMLInputElement>(null);
    const pwdRef=useRef<HTMLInputElement>(null);
    const contentRef=useRef<HTMLTextAreaElement>(null);

    const {no}=useParams()
    const nav=useNavigate();

    // 1. 데이터 읽기 (useQuery)
    const {isLoading,isError,error,data}=useQuery<{ data:BoardItem }>({
        queryKey:['board-update',no],
        queryFn: async()=>{
            return boardClient.get<BoardItem>(`/board/update_node?no=${no}`)
        }
    })
    console.log(data?.data)
    const board=data?.data
    console.log(board)

    useEffect(()=>{
        if(board)
        {
            setName(board.name)
            setSubject(board.subject)
            setContent(board.content)
        }
    },[board])

    // 2. 수정 => 실제 수정 (useMutation) => req.body
    const {mutate:boardUpdate}=useMutation({
        mutationFn:()=>boardClient.put(`/board/update_ok_node`,{
            no:no,
            name:name,
            subject:subject,
            content:content,
            pwd:pwd
        }),
        onSuccess:(res:AxiosResponse<BoardResponse>)=>{
            console.log(res) // response.data
            if(res.data.msg==='yes') // 비밀번호가 일치
            {
                window.location.href=`/board/detail/${no}`;
            }
            else // 비밀번호 틀린 상태
            {
                alert("비밀번호가 틀립니다")
                setPwd("")
                pwdRef.current?.focus()
            }

        },
        onError:(err:AxiosError)=>{
            console.log(err.message)
        }
    })

    const boardUpdateOk=()=>{
        if(!name.trim())
            return nameRef.current?.focus()
        if(!subject.trim())
            return subjectRef.current?.focus()
        if(!content.trim())
            return contentRef.current?.focus()
        if(!pwd.trim())
            return pwdRef.current?.focus()
        boardUpdate()
    }

    if(isLoading){
        return <h1 className={"text-center"}>Loading...</h1>
    }
    if(isError){
        return <h1 className={"text-center"}>Error:{error.message}</h1>
    }


    // HTML에 적용
    return (
        <Fragment>
            <h2 className="text-center"  style={{marginTop: 50}}>수정하기</h2>
            <div className="container">
                <div className="row" style={{"width": "900px","margin": "0px auto"}}>
                    <table className="table">
                        <tbody>
                        <tr>
                            <td width={"15%"}>이름</td>
                            <td width={"85%"}>
                                <input type={"text"} size={15} className={"input-sm"}
                                       ref={nameRef}
                                       value={name}
                                       onChange={(e:any)=>setName(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td width={"15%"}>제목</td>
                            <td width={"85%"}>
                                <input type={"text"} size={55} className={"input-sm"}
                                       ref={subjectRef}
                                       value={subject}
                                       onChange={(e:any)=>setSubject(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td width={"15%"}>내용</td>
                            <td width={"85%"}>
                                      <textarea rows={10} cols={55}
                                                ref={contentRef}
                                                value={content}
                                                onChange={(e:any)=>setContent(e.target.value)}
                                      ></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td width={"15%"}>비밀번호</td>
                            <td width={"85%"}>
                                <input type={"password"} size={15} className={"input-sm"}
                                       ref={pwdRef}
                                       value={pwd}
                                       onChange={(e:any)=>setPwd(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={"text-center"}>
                                <button className="btn-sm btn-default" onClick={boardUpdateOk}>수정</button>
                                &nbsp;
                                <button className="btn-sm btn-default" onClick={()=>nav(-1)}>취소</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}
export default BoardUpdate;